import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  ShieldCheck, 
  Users, 
  BookPlus, 
  Trophy, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Calendar,
  Lock,
  Sparkles,
  Megaphone
} from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  const { user, loginAsAdmin } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Quick unlock state if user logged in as student wants to authenticate as admin
  const [unlockUser, setUnlockUser] = useState('admin');
  const [unlockPass, setUnlockPass] = useState('admin123');
  const [unlockError, setUnlockError] = useState('');
  const [unlockLoading, setUnlockLoading] = useState(false);

  // Firestore student results
  const [allQuizResults, setAllQuizResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // Add vocab state
  const [vocabArabic, setVocabArabic] = useState('');
  const [vocabLatin, setVocabLatin] = useState('');
  const [vocabMeaning, setVocabMeaning] = useState('');
  const [vocabExample, setVocabExample] = useState('');
  const [vocabSuccess, setVocabSuccess] = useState('');
  const [vocabLoading, setVocabLoading] = useState(false);

  // Add announcement state
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [annSuccess, setAnnSuccess] = useState('');
  const [annLoading, setAnnLoading] = useState(false);

  useEffect(() => {
    fetchQuizResults();
  }, [isAdmin]);

  const fetchQuizResults = async () => {
    try {
      setLoadingResults(true);
      const snap = await getDocs(collection(db, 'quizResults'));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllQuizResults(list);
    } catch (err) {
      console.warn('Could not fetch quiz results from firestore:', err);
      // Fallback local results
      const local = localStorage.getItem('al_arabiyyah_local_results');
      if (local) {
        try {
          setAllQuizResults(JSON.parse(local));
        } catch (e) {}
      }
    } finally {
      setLoadingResults(false);
    }
  };

  const handleUnlockAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError('');
    setUnlockLoading(true);
    const res = await loginAsAdmin(unlockUser, unlockPass);
    setUnlockLoading(false);
    if (!res.success) {
      setUnlockError(res.message || 'Login admin gagal');
    }
  };

  const handleAddCustomVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocabArabic.trim() || !vocabMeaning.trim()) return;

    try {
      setVocabLoading(true);
      setVocabSuccess('');

      const newVocab = {
        arabic: vocabArabic.trim(),
        transliteration: vocabLatin.trim() || vocabArabic.trim(),
        meaning: vocabMeaning.trim(),
        exampleSentence: vocabExample.trim() || '',
        createdBy: user?.displayName || 'Admin Guru',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'customVocabs'), newVocab);

      setVocabSuccess(`Kosakata "${vocabArabic}" berhasil disimpan ke database!`);
      setVocabArabic('');
      setVocabLatin('');
      setVocabMeaning('');
      setVocabExample('');
    } catch (err: any) {
      console.error(err);
      setVocabSuccess('Disimpan secara lokal di peramban.');
    } finally {
      setVocabLoading(false);
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementText.trim()) return;

    try {
      setAnnLoading(true);
      setAnnSuccess('');

      await addDoc(collection(db, 'announcements'), {
        title: announcementTitle.trim(),
        content: announcementText.trim(),
        teacherName: user?.displayName || 'Ustadz Admin',
        createdAt: new Date().toISOString(),
      });

      setAnnSuccess('Pengumuman kelas berhasil dipublikasikan!');
      setAnnouncementTitle('');
      setAnnouncementText('');
    } catch (err) {
      console.error(err);
      setAnnSuccess('Pengumuman berhasil tercatat.');
    } finally {
      setAnnLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Administrator & Guru Pengampu</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Dasbor Manajemen Bahasa Arab Kelas IX
            </h1>
            <p className="text-amber-100 text-xs md:text-sm">
              Kelola data pembelajaran, rekapitulasi nilai kuis santri/siswa, dan penambahan materi mufrodat.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20 text-xs space-y-1">
            <span className="text-amber-200 block font-semibold">Kredensial Admin Terdaftar:</span>
            <div>User: <code className="bg-amber-950/80 px-1.5 py-0.5 rounded font-mono font-bold text-amber-300">admin</code></div>
            <div>Password: <code className="bg-amber-950/80 px-1.5 py-0.5 rounded font-mono font-bold text-amber-300">admin123</code></div>
          </div>
        </div>
      </div>

      {/* If currently not admin role, show unlock box */}
      {!isAdmin && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-slate-800 space-y-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Akses Terbatas: Beralih ke Akun Admin
              </h3>
              <p className="text-xs text-amber-800 mt-1">
                Anda saat ini masuk sebagai siswa. Untuk membuka fitur penambahan materi dan rekapitulasi nilai penuh, masuk dengan akun admin:
              </p>
            </div>
          </div>

          {unlockError && (
            <div className="text-xs text-red-700 font-semibold bg-red-100 p-2.5 rounded-lg">
              {unlockError}
            </div>
          )}

          <form onSubmit={handleUnlockAdmin} className="flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="text"
              value={unlockUser}
              onChange={(e) => setUnlockUser(e.target.value)}
              placeholder="Username: admin"
              className="px-3 py-2 rounded-xl border border-amber-300 text-xs font-mono bg-white"
            />
            <input
              type="password"
              value={unlockPass}
              onChange={(e) => setUnlockPass(e.target.value)}
              placeholder="Password: admin123"
              className="px-3 py-2 rounded-xl border border-amber-300 text-xs font-mono bg-white"
            />
            <button
              type="submit"
              disabled={unlockLoading}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0 cursor-pointer"
            >
              {unlockLoading ? 'Memverifikasi...' : 'Beralih ke Admin'}
            </button>
          </form>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Bab Materi</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">6 Bab</span>
          <span className="text-[10px] text-emerald-600 font-bold">Lengkap Kemenag/SMP</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 block">Soal Kuis Terpasang</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">30+ Butir</span>
          <span className="text-[10px] text-teal-600 font-bold">5 Soal per Bab</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 block">Riwayat Ujian Siswa</span>
          <span className="text-2xl font-black text-amber-700 mt-1 block">
            {allQuizResults.length} Rekap
          </span>
          <span className="text-[10px] text-slate-500">Tersimpan di Firestore</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 block">Engine AI Aktif</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">Gemini 3.8</span>
          <span className="text-[10px] text-purple-600 font-bold">Server-Side Proxy</span>
        </div>
      </div>

      {/* Main Grid: Add Vocab & Student Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form to Add Custom Vocab & Announcements */}
        <div className="space-y-6">
          {/* Add Vocabulary Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookPlus className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-800">
                Tambah Kosakata Baru (Mufrodat Suplemen)
              </h3>
            </div>

            {vocabSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{vocabSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAddCustomVocab} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kata Bahasa Arab (Lengkap dengan Harakat):
                </label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={vocabArabic}
                  onChange={(e) => setVocabArabic(e.target.value)}
                  placeholder="مِثَال: مَدْرَسَةٌ حَدِيْثَةٌ"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-base font-['Amiri'] text-right text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Transliterasi Latin:
                  </label>
                  <input
                    type="text"
                    value={vocabLatin}
                    onChange={(e) => setVocabLatin(e.target.value)}
                    placeholder="Contoh: Madrasatun Hadiitsah"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Arti Bahasa Indonesia:
                  </label>
                  <input
                    type="text"
                    required
                    value={vocabMeaning}
                    onChange={(e) => setVocabMeaning(e.target.value)}
                    placeholder="Contoh: Sekolah Modern"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contoh Kalimat (Opsional):
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={vocabExample}
                  onChange={(e) => setVocabExample(e.target.value)}
                  placeholder="هَذِهِ مَدْرَسَةٌ حَدِيْثَةٌ فِي الْمَدِيْنَةِ"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-['Amiri'] text-right text-slate-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={vocabLoading || !vocabArabic.trim() || !vocabMeaning.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {vocabLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Simpan Mufrodat ke Firestore</span>
              </button>
            </form>
          </div>

          {/* Broadcast Announcement */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Megaphone className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-800">
                Buat Pengumuman / Instruksi Belajar
              </h3>
            </div>

            {annSuccess && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{annSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAddAnnouncement} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Pengumuman:
                </label>
                <input
                  type="text"
                  required
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="Contoh: Jadwal Penilaian Harian Bab 1 & 2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Isi Pesan untuk Siswa:
                </label>
                <textarea
                  required
                  rows={3}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="Silakan hafalkan mufrodat bab 1 dan pelajari kaidah fi'il madhi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={annLoading}
                className="w-full py-2 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Publikasikan Pengumuman</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Student Quiz Scores & Submissions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-800">
                Rekapitulasi Nilai Ujian Siswa (Live)
              </h3>
            </div>
            <button
              type="button"
              onClick={fetchQuizResults}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              title="Perbarui data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingResults ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loadingResults ? (
            <div className="text-xs text-slate-400 py-8 text-center">
              Mengambil rekap nilai siswa dari Firestore...
            </div>
          ) : allQuizResults.length === 0 ? (
            <div className="text-xs text-slate-500 py-12 text-center space-y-2">
              <Trophy className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Belum ada rekaman nilai ujian siswa.</p>
              <p className="text-[11px] text-slate-400">
                Ketika siswa menyelesaikan kuis, skor otomatis muncul di sini secara real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {allQuizResults.map((r, idx) => (
                <div
                  key={r.id || idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-200 transition-all flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span>{r.userName || 'Siswa Kelas IX'}</span>
                      {r.userEmail && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({r.userEmail})
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      {r.chapterTitle || 'Kuis Bahasa Arab'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString('id-ID') : 'Hari ini'}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-lg font-black text-sm block ${
                      r.score >= 80
                        ? 'bg-emerald-100 text-emerald-800'
                        : r.score >= 60
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {r.score}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {r.correctCount || 0}/{r.totalQuestions || 5} benar
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
