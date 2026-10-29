import React, { useState, useEffect } from 'react';
import { ARABIC_CHAPTERS, QuizQuestion } from '../data/arabicData';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  Clock, 
  ChevronRight, 
  BookOpen, 
  Save, 
  AlertCircle
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [savedToDb, setSavedToDb] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [pastResults, setPastResults] = useState<any[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);

  // Initialize questions based on selection
  useEffect(() => {
    resetQuiz();
  }, [selectedFilter]);

  // Load student's past quiz results
  useEffect(() => {
    if (!user) return;
    loadPastResults();
  }, [user]);

  const loadPastResults = async () => {
    try {
      setResultsLoading(true);
      const q = query(
        collection(db, 'quizResults'),
        where('userId', '==', user?.uid),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPastResults(list);
    } catch (err) {
      console.warn('Could not load past results from firestore:', err);
      // Try local storage fallback
      const local = localStorage.getItem('al_arabiyyah_local_results');
      if (local) {
        try {
          setPastResults(JSON.parse(local));
        } catch (e) {}
      }
    } finally {
      setResultsLoading(false);
    }
  };

  const resetQuiz = () => {
    let pool: QuizQuestion[] = [];
    if (selectedFilter === 'all') {
      // Pick questions from all 6 chapters
      ARABIC_CHAPTERS.forEach((c) => {
        pool = [...pool, ...c.quiz];
      });
      // Shuffle slightly or take top 10
      pool = pool.slice(0, 10);
    } else {
      const chapter = ARABIC_CHAPTERS.find(c => c.id === selectedFilter);
      pool = chapter ? chapter.quiz : ARABIC_CHAPTERS[0].quiz;
    }
    setActiveQuizQuestions(pool);
    setUserAnswers({});
    setIsFinished(false);
    setSavedToDb(false);
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isFinished) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleFinishQuiz = async () => {
    setIsFinished(true);
    let correct = 0;
    activeQuizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const score = Math.round((correct / activeQuizQuestions.length) * 100);

    if (score >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    // Auto save to Firestore if user is logged in
    if (user) {
      await saveResultToDatabase(score, correct, activeQuizQuestions.length);
    }
  };

  const saveResultToDatabase = async (score: number, correctCount: number, totalQuestions: number) => {
    if (!user || savedToDb) return;
    try {
      setSaveLoading(true);
      const chapterName = selectedFilter === 'all' 
        ? 'Ujian Gabungan Bab 1 - 6' 
        : (ARABIC_CHAPTERS.find(c => c.id === selectedFilter)?.titleIndonesian || 'Kuis Bab');

      const payload = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        chapterId: selectedFilter,
        chapterTitle: chapterName,
        score,
        correctCount,
        totalQuestions,
        createdAt: new Date().toISOString(),
      };

      try {
        await addDoc(collection(db, 'quizResults'), payload);
      } catch (fireErr) {
        console.warn('Firestore write warning:', fireErr);
      }

      // Also save to localStorage for instant UI feedback
      const local = localStorage.getItem('al_arabiyyah_local_results');
      const parsed = local ? JSON.parse(local) : [];
      const updated = [payload, ...parsed].slice(0, 15);
      localStorage.setItem('al_arabiyyah_local_results', JSON.stringify(updated));
      setPastResults(updated);
      setSavedToDb(true);
    } catch (e) {
      console.error('Failed to save score:', e);
    } finally {
      setSaveLoading(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    activeQuizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) correct++;
    });
    return {
      correct,
      total: activeQuizQuestions.length,
      percentage: Math.round((correct / activeQuizQuestions.length) * 100),
    };
  };

  const stats = calculateScore();

  return (
    <div className="space-y-6">
      {/* Header and selector */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Kuis & Evaluasi Nilai</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            Latihan Soal Bahasa Arab Kelas IX
          </h2>
          <p className="text-xs text-slate-500">
            Pilih bab tertentu atau uji seluruh materi kurikulum kelas 9 MTs/SMP
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            Pilih Materi:
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">🌟 Gabungan Semua Bab (10 Soal)</option>
            {ARABIC_CHAPTERS.map(c => (
              <option key={c.id} value={c.id}>
                Bab {c.number}: {c.titleIndonesian}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">
              Progres Pengerjaan: {Object.keys(userAnswers).length} dari {activeQuizQuestions.length} Soal
            </span>
            <span className="font-bold text-emerald-700">
              {Math.round((Object.keys(userAnswers).length / activeQuizQuestions.length) * 100)}%
            </span>
          </div>

          {/* Question List */}
          {activeQuizQuestions.map((q, idx) => {
            const selectedOpt = userAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl p-5 border transition-all ${
                  isFinished
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-red-300 bg-red-50/40'
                    : isAnswered
                    ? 'border-emerald-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    Nomor {idx + 1}
                  </span>

                  {isFinished && (
                    <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isCorrect ? '✓ Benar' : '✗ Salah'}
                    </span>
                  )}
                </div>

                {q.arabicPrompt && (
                  <div className="font-['Amiri'] text-xl font-bold text-right text-slate-900 py-1 leading-relaxed">
                    {q.arabicPrompt}
                  </div>
                )}

                <h4 className="text-sm font-semibold text-slate-800 mb-3">
                  {q.question}
                </h4>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedOpt === oIdx;
                    let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';

                    if (isFinished) {
                      if (oIdx === q.correctIndex) {
                        style = 'bg-emerald-600 text-white font-bold border-emerald-700';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-red-600 text-white font-bold border-red-700';
                      } else {
                        style = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                      }
                    } else if (isSelected) {
                      style = 'bg-emerald-700 text-white font-bold border-emerald-800 shadow-xs';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={isFinished}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${style}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isFinished && (
                  <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                    <strong className="text-slate-900">Kunci & Pembahasan:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {/* Action button */}
          <div className="pt-2">
            {!isFinished ? (
              <button
                type="button"
                onClick={handleFinishQuiz}
                disabled={Object.keys(userAnswers).length === 0}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                Selesaikan Kuis & Hitung Nilai ({Object.keys(userAnswers).length}/{activeQuizQuestions.length} Terjawab)
              </button>
            ) : (
              <button
                type="button"
                onClick={resetQuiz}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Mulai Ulang Kuis Ini</span>
              </button>
            )}
          </div>
        </div>

        {/* Sidebar: Score card & Past History */}
        <div className="space-y-4">
          {/* Current result card */}
          {isFinished ? (
            <div className="bg-gradient-to-br from-emerald-800 to-teal-800 text-white rounded-2xl p-6 shadow-md text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-white/20 mx-auto flex items-center justify-center text-amber-300">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs text-emerald-200 uppercase font-semibold">
                  Hasil Nilai Anda
                </span>
                <div className="text-5xl font-black text-white mt-1">
                  {stats.percentage}
                </div>
                <div className="text-xs text-emerald-100 mt-1">
                  Benar {stats.correct} dari {stats.total} Soal
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 text-xs text-emerald-100">
                {stats.percentage >= 80 ? (
                  <span>Mumtaz! (ممتاز) Nilai luar biasa, pertahankan prestasimu!</span>
                ) : stats.percentage >= 60 ? (
                  <span>Jayyid Jiddan! (جيد جدا) Pemahamanmu sudah baik, perkuat mufrodat.</span>
                ) : (
                  <span>Ayo ulangi lagi belajarnya agar nilai semakin memuaskan!</span>
                )}
              </div>

              {savedToDb && (
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-200 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nilai tersimpan di database</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Petunjuk Pengerjaan
              </h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Bacalah setiap teks bahasa Arab dengan cermat.</li>
                <li>Pilih satu jawaban terbaik dari 4 opsi yang tersedia.</li>
                <li>Setelah selesai, tekan tombol "Selesaikan Kuis" untuk melihat nilai dan pembahasan lengkap.</li>
                <li>Nilai akan otomatis tercatat pada profil belajar Anda.</li>
              </ul>
            </div>
          )}

          {/* Past History from Firestore */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Riwayat Nilai Tersimpan
              </h4>
              <span className="text-[10px] text-slate-400">
                {pastResults.length} catatan
              </span>
            </div>

            {resultsLoading ? (
              <div className="text-xs text-slate-400 py-4 text-center">
                Memuat riwayat...
              </div>
            ) : pastResults.length === 0 ? (
              <div className="text-xs text-slate-500 py-3 text-center italic">
                Belum ada riwayat kuis tersimpan. Selesaikan kuis untuk mencatat skor!
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {pastResults.map((res, i) => (
                  <div
                    key={res.id || i}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 truncate max-w-[140px]">
                        {res.chapterTitle || 'Kuis Bahasa Arab'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {res.createdAt ? new Date(res.createdAt).toLocaleDateString('id-ID') : 'Baru saja'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                        res.score >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : res.score >= 60
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {res.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
