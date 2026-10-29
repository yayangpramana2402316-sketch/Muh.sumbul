import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  LogOut, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  BookMarked, 
  ShieldAlert, 
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'materi' | 'kuis' | 'tutor' | 'kamus' | 'admin';
  setActiveTab: (tab: 'materi' | 'kuis' | 'tutor' | 'kamus' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('materi')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-base md:text-lg tracking-tight font-sans">
                  Al-Arabiyyah IX
                </span>
                <span className="font-['Amiri'] text-emerald-700 text-lg font-bold">
                  العَرَبِيَّة
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Bahasa Arab Kelas IX MTs / SMP
              </p>
            </div>
          </div>

          {/* Nav Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('materi')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'materi'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Materi Bab (1-6)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kuis')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'kuis'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Latihan & Kuis</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tutor')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'tutor'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Ustadz AI</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kamus')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'kamus'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 text-teal-600" />
              <span>Kamus Mufrodat</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : isAdmin
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Portal Guru/Admin</span>
            </button>
          </nav>

          {/* User profile & Explicit Logout Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-2">
              <img
                src={user?.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.displayName || 'user'}`}
                alt={user?.displayName || 'User'}
                className="w-8 h-8 rounded-full border border-emerald-200 bg-emerald-50 shrink-0"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                  {user?.displayName || 'Pengguna'}
                </div>
                <div className="flex items-center gap-1">
                  {isAdmin ? (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-full">
                      Admin / Guru
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <GraduationCap className="w-2.5 h-2.5" />
                      Siswa Kelas 9
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* MANDATORY LOGOUT BUTTON */}
            <button
              type="button"
              onClick={logout}
              title="Keluar dari akun (Logout)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-100 no-scrollbar text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('materi')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'materi' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Materi Bab
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kuis')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'kuis' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Latihan Kuis
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tutor')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'tutor' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Ustadz AI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kamus')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'kamus' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Kamus
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'admin' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-900'
            }`}
          >
            Admin Guru
          </button>
        </div>
      </div>
    </header>
  );
};
