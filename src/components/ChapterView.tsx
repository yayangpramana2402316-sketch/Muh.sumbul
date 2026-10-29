import React, { useState } from 'react';
import { ARABIC_CHAPTERS, Chapter, VocabItem } from '../data/arabicData';
import { speakArabic } from '../utils/speech';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Layers, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface ChapterViewProps {
  onStartFullQuiz?: (chapterId: string) => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ onStartFullQuiz }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(ARABIC_CHAPTERS[0].id);
  const [activeSection, setActiveSection] = useState<'mufrodat' | 'hiwar' | 'qiraah' | 'qawaid' | 'latihan'>('mufrodat');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(true);

  // Mini quiz state for the chapter
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentChapter = ARABIC_CHAPTERS.find((c) => c.id === selectedChapterId) || ARABIC_CHAPTERS[0];

  const handleSpeak = async (id: string, text: string) => {
    try {
      setPlayingAudioId(id);
      await speakArabic(text);
    } finally {
      setPlayingAudioId(null);
    }
  };

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    let correct = 0;
    currentChapter.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    if (correct >= 4) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe confetti catch
      }
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    currentChapter.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) correct++;
    });
    return Math.round((correct / currentChapter.quiz.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Chapter Selection Horizontal Strip */}
      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold text-slate-800">
              Pilihan Bab Bahasa Arab Kelas IX (MTs/SMP)
            </h2>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
            6 Bab Terpadu
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {ARABIC_CHAPTERS.map((chap) => {
            const isSelected = chap.id === selectedChapterId;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => {
                  setSelectedChapterId(chap.id);
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                }}
                className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-800 to-teal-800 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-emerald-100' : 'bg-slate-200 text-slate-700'
                  }`}>
                    BAB {chap.number}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                </div>

                <div className="font-['Amiri'] text-lg font-bold truncate leading-relaxed">
                  {chap.titleArabic}
                </div>
                <div className={`text-xs font-semibold truncate ${isSelected ? 'text-emerald-100' : 'text-slate-800'}`}>
                  {chap.titleIndonesian}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Chapter Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
            <span>Bab {currentChapter.number}</span>
            <span>&bull;</span>
            <span>{currentChapter.theme}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
            <h1 className="font-['Amiri'] text-3xl md:text-5xl font-bold text-amber-200 leading-tight">
              {currentChapter.titleArabic}
            </h1>
            <span className="text-xl md:text-2xl font-bold text-white">
              ({currentChapter.titleIndonesian})
            </span>
          </div>

          <p className="text-emerald-100 text-sm leading-relaxed">
            {currentChapter.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
              Kaidah: <strong>{currentChapter.grammar.title.split('(')[0]}</strong>
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
              Mufrodat: <strong>{currentChapter.vocabulary.length} Kosakata Kunci</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Sub-tabs within Chapter */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1.5 gap-1 shadow-2xs overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveSection('mufrodat')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'mufrodat'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>1. Mufrodat (المُفْرَدَات)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('hiwar')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'hiwar'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>2. Hiwar Percakapan (الحِوَار)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('qiraah')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'qiraah'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>3. Qira'ah Teks (القِرَاءَة)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('qawaid')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'qawaid'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>4. Qawa'id Tata Bahasa (القَوَاعِد)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('latihan')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'latihan'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>5. Latihan Kuis Bab ({currentChapter.quiz.length} Soal)</span>
        </button>
      </div>

      {/* SECTION 1: MUFRODAT */}
      {activeSection === 'mufrodat' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-5 bg-emerald-600 rounded-sm" />
              Mufrodat Pilihan Bab {currentChapter.number}
            </h3>
            <span className="text-xs text-slate-500">
              Klik ikon speaker untuk mendengarkan lafal makhraj Arab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentChapter.vocabulary.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                      {item.category.replace('_', ' ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeak(item.id, item.arabic)}
                      title="Dengarkan pelafalan Arab"
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        playingAudioId === item.id
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right py-2">
                    <div className="font-['Amiri'] text-2xl font-bold text-slate-900 leading-relaxed group-hover:text-emerald-800 transition-colors">
                      {item.arabic}
                    </div>
                    <div className="text-xs font-mono text-emerald-700 mt-0.5">
                      {item.transliteration}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="text-sm font-bold text-slate-800">
                      {item.meaning}
                    </div>
                  </div>
                </div>

                {item.exampleArabic && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                      <span>Contoh Kalimat:</span>
                      <button
                        type="button"
                        onClick={() => handleSpeak(item.id + '-ex', item.exampleArabic!)}
                        className="text-emerald-700 hover:text-emerald-900 cursor-pointer flex items-center gap-0.5"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Putar</span>
                      </button>
                    </div>
                    <div className="font-['Amiri'] text-sm text-right text-slate-800 leading-relaxed">
                      {item.exampleArabic}
                    </div>
                    <div className="text-[11px] text-slate-600 italic mt-1">
                      "{item.exampleTranslation}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: HIWAR */}
      {activeSection === 'hiwar' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                الحِوَارُ (Percakapan Interaktif)
              </h3>
              <p className="text-xs text-slate-500">
                Praktekkan dialog bahasa Arab bersama teman atau dengarkan audio per kalimat
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowTranslation(!showTranslation)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {showTranslation ? 'Sembunyikan Terjemahan' : 'Tampilkan Terjemahan'}
            </button>
          </div>

          <div className="space-y-4">
            {currentChapter.dialogue.map((line, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col p-4 rounded-2xl border transition-all ${
                    isEven
                      ? 'bg-emerald-50/50 border-emerald-100'
                      : 'bg-teal-50/50 border-teal-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 shadow-2xs">
                      {line.speaker}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeak(`hiwar-${idx}`, line.arabic)}
                      className={`p-1.5 rounded-lg text-emerald-700 hover:bg-white transition-all flex items-center gap-1 text-xs cursor-pointer ${
                        playingAudioId === `hiwar-${idx}` ? 'bg-emerald-600 text-white' : ''
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan</span>
                    </button>
                  </div>

                  <div className="text-right py-2">
                    <p className="font-['Amiri'] text-xl md:text-2xl font-bold text-slate-900 leading-loose">
                      {line.arabic}
                    </p>
                    <p className="text-xs font-mono text-emerald-700 mt-1">
                      {line.transliteration}
                    </p>
                  </div>

                  {showTranslation && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-700 font-medium">
                      Artinya: <span className="italic">"{line.meaning}"</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: QIRAAH */}
      {activeSection === 'qiraah' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                النَّصُّ الْقِرَائِيُّ (Teks Bacaan)
              </span>
              <h3 className="text-lg font-bold text-slate-800 font-['Amiri'] text-2xl mt-1">
                {currentChapter.readingText.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleSpeak('qiraah-full', currentChapter.readingText.arabic)}
              className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Bacaan Lengkap</span>
            </button>
          </div>

          <div className="bg-amber-50/40 rounded-2xl p-6 border border-amber-100/80">
            <p className="font-['Amiri'] text-2xl md:text-3xl text-right text-slate-900 leading-[2.5] tracking-wide">
              {currentChapter.readingText.arabic}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Terjemahan Bahasa Indonesia:
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentChapter.readingText.translation}
            </p>
          </div>
        </div>
      )}

      {/* SECTION 4: QAWAID (GRAMMAR) */}
      {activeSection === 'qawaid' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              القَوَاعِدُ النَّحْوِيَّةُ وَالصَّرْفِيَّةُ (Kaidah Nahwu & Shorof)
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {currentChapter.grammar.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentChapter.grammar.explanation}
            </p>
          </div>

          {currentChapter.grammar.tableHeaders && currentChapter.grammar.tableRows && (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-800 text-white font-semibold">
                  <tr>
                    {currentChapter.grammar.tableHeaders.map((head, i) => (
                      <th key={i} className="p-3 whitespace-nowrap">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {currentChapter.grammar.tableRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 font-medium text-slate-800">
                          {cIdx === 2 ? (
                            <span className="font-['Amiri'] text-lg font-bold text-emerald-800">
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {currentChapter.grammar.examples && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Contoh Kalimat & Analisis I'rab:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentChapter.grammar.examples.map((ex, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Contoh #{i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSpeak(`gramm-${i}`, ex.arabic)}
                        className="text-emerald-700 hover:text-emerald-900 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Putar</span>
                      </button>
                    </div>
                    <div className="font-['Amiri'] text-xl font-bold text-right text-slate-900 leading-relaxed">
                      {ex.arabic}
                    </div>
                    <div className="text-xs font-semibold text-slate-800">
                      Artinya: "{ex.meaning}"
                    </div>
                    <div className="text-xs text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                      <strong>Analisis:</strong> {ex.analysis}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: LATIHAN KUIS */}
      {activeSection === 'latihan' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Kuis Evaluasi Mandiri Bab {currentChapter.number}
              </span>
              <h3 className="text-lg font-bold text-slate-800">
                Latihan Pemahaman Materi
              </h3>
            </div>

            {quizSubmitted && (
              <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
                <div>
                  <span className="text-xs text-amber-800 font-semibold">Skor Anda:</span>
                  <div className="text-2xl font-black text-amber-900">
                    {calculateScore()}%
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 text-xs font-bold flex items-center gap-1 hover:bg-amber-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {currentChapter.quiz.map((q, qIndex) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    quizSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : 'bg-red-50/60 border-red-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      Soal {qIndex + 1} dari {currentChapter.quiz.length}
                    </span>

                    {quizSubmitted && (
                      <span className={`text-xs font-bold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-700' : 'text-red-700'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle className="w-4 h-4" /> Benar (+20 Poin)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" /> Kurang Tepat
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {q.arabicPrompt && (
                    <div className="font-['Amiri'] text-xl font-bold text-right text-slate-900 py-1 leading-relaxed">
                      {q.arabicPrompt}
                    </div>
                  )}

                  <p className="text-sm font-semibold text-slate-800 mb-4">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400';

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-700';
                        } else if (isThisSelected && !isCorrect) {
                          btnStyle = 'bg-red-600 text-white font-bold border-red-700';
                        } else {
                          btnStyle = 'bg-white/60 text-slate-400 border-slate-200';
                        }
                      } else if (isThisSelected) {
                        btnStyle = 'bg-emerald-700 text-white font-bold border-emerald-800 shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                      <strong className="text-slate-900">Pembahasan:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted && (
            <button
              type="button"
              onClick={handleSubmitQuiz}
              disabled={Object.keys(quizAnswers).length === 0}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              Periksa & Nilai Jawaban ({Object.keys(quizAnswers).length}/{currentChapter.quiz.length} Dijawab)
            </button>
          )}
        </div>
      )}
    </div>
  );
};
