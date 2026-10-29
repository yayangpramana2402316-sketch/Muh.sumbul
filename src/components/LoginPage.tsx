import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  LogIn, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  GraduationCap
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithGoogle, loginAsAdmin, loginAsStudentGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<'google' | 'admin' | 'guest'>('google');
  
  // Admin form state
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPass, setAdminPass] = useState('admin123');
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // Guest student state
  const [studentName, setStudentName] = useState('');
  const [studentNis, setStudentNis] = useState('');

  // Google loading
  const [googleLoading, setGoogleLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setGeneralError('');
      await loginWithGoogle();
    } catch (err: any) {
      console.error(err);
      setGeneralError(err?.message || 'Gagal masuk dengan Google. Anda juga dapat menggunakan opsi Masuk Cepat Siswa atau Admin.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);
    const result = await loginAsAdmin(adminUser, adminPass);
    setAdminLoading(false);
    if (!result.success) {
      setAdminError(result.message || 'Login admin gagal');
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setAdminError('Nama siswa wajib diisi');
      return;
    }
    loginAsStudentGuest(studentName, studentNis);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-10 transition-all">
        {/* Header Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-inner">
            <BookOpen className="w-9 h-9 text-emerald-100" />
          </div>
          <div className="font-['Amiri'] text-2xl tracking-wide text-amber-200 mb-1">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Al-Arabiyyah IX (الصف التاسع)
          </h1>
          <p className="text-emerald-100 text-sm mt-1 max-w-md mx-auto">
            Media Pembelajaran Digital Bahasa Arab Interaktif Kelas IX MTs / SMP
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-600/50 text-xs text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Halaman Wajib Login untuk Mengakses Materi</span>
          </div>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'google'
                ? 'bg-white text-emerald-800 shadow-sm font-bold border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <LogIn className="w-4 h-4 text-emerald-600" />
            <span>Google Auth</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-white text-emerald-800 shadow-sm font-bold border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <KeyRound className="w-4 h-4 text-amber-600" />
            <span>Akun Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guest')}
            className={`py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'guest'
                ? 'bg-white text-emerald-800 shadow-sm font-bold border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <UserCheck className="w-4 h-4 text-teal-600" />
            <span>Siswa Cepat</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {generalError && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>{generalError}</div>
            </div>
          )}

          {/* TAB 1: GOOGLE AUTH */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              <div className="text-center space-y-1 mb-4">
                <h2 className="text-base font-semibold text-slate-800">
                  Masuk dengan Akun Google
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Gunakan email madrasah atau akun Google untuk menyimpan progres kuis dan mufrodat secara tersinkronisasi.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-emerald-500 text-slate-700 font-medium text-sm transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
              >
                {googleLoading ? (
                  <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Masuk Sekarang dengan Google</span>
              </button>

              <div className="pt-3 border-t border-slate-100">
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Info Otomatis:</span> Guru / Pengajar dapat langsung login menggunakan akun Admin pada tab <strong>Akun Admin</strong> (User: <code className="bg-emerald-200/60 px-1 py-0.5 rounded text-emerald-900 font-mono">admin</code>, PW: <code className="bg-emerald-200/60 px-1 py-0.5 rounded text-emerald-900 font-mono">admin123</code>).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADMIN LOGIN (user: admin, pw: admin123) */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="text-center space-y-1 mb-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                  Portal Guru & Administrator
                </div>
                <h2 className="text-base font-semibold text-slate-800">
                  Login Admin Pengampu Bahasa Arab
                </h2>
                <p className="text-xs text-slate-500">
                  Akses khusus untuk guru untuk mengelola mufrodat, melihat nilai siswa, dan menguji generator kuis AI.
                </p>
              </div>

              {adminError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Username Admin
                  </label>
                  <input
                    type="text"
                    required
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    placeholder="admin"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-mono text-slate-800 transition-all bg-white"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Kredensial sesuai instruksi: <strong className="text-emerald-700 font-mono">admin</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password Admin
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="admin123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-mono text-slate-800 transition-all bg-white"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Password sesuai instruksi: <strong className="text-emerald-700 font-mono">admin123</strong>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={adminLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-emerald-600/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {adminLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Masuk sebagai Admin</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: GUEST STUDENT */}
          {activeTab === 'guest' && (
            <form onSubmit={handleGuestSubmit} className="space-y-4">
              <div className="text-center space-y-1 mb-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
                  Mode Cepat Siswa
                </div>
                <h2 className="text-base font-semibold text-slate-800">
                  Mulai Belajar Langsung
                </h2>
                <p className="text-xs text-slate-500">
                  Masukkan nama santri / siswa untuk langsung mengakses materi Bab 1 s/d Bab 6 dan kuis interaktif.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap Siswa / Panggilan
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Muhammad Raihan / Siti Fatimah"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-800 transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NIS / Kelas (Opsional)
                  </label>
                  <input
                    type="text"
                    value={studentNis}
                    onChange={(e) => setStudentNis(e.target.value)}
                    placeholder="Contoh: 9A / 12345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-800 transition-all bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-teal-600/20 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Masuk ke Kelas Bahasa Arab IX</span>
              </button>
            </form>
          )}

          {/* Curriculum feature badges */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>6 Bab Lengkap Kemenag/SMP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Audio Mufrodat Berharakat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Kuis Interaktif & Nilai Live</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>AI Ustadz Tutor (Gemini 3.8)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer attribution */}
      <div className="mt-6 text-center text-xs text-emerald-200/70">
        Al-Arabiyyah IX &bull; Kurikulum Bahasa Arab Madrasah Tsanawiyah / SMP Kelas IX
      </div>
    </div>
  );
};
