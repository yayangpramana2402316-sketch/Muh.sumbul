import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { ChapterView } from './components/ChapterView';
import { QuizView } from './components/QuizView';
import { GeminiTutorView } from './components/GeminiTutorView';
import { VocabDictionaryView } from './components/VocabDictionaryView';
import { AdminPortalView } from './components/AdminPortalView';
import { testConnection } from './lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from './lib/firebase';
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Megaphone,
  CheckCircle2,
  Heart
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'materi' | 'kuis' | 'tutor' | 'kamus' | 'admin'>('materi');
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Test Firestore connection on boot as mandated by skill
  useEffect(() => {
    testConnection();
  }, []);

  // Fetch announcements if any
  useEffect(() => {
    if (!user) return;
    const loadAnnouncements = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'announcements'), limit(2)));
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setAnnouncements(list);
      } catch (e) {
        // Non-blocking
      }
    };
    loadAnnouncements();
  }, [user]);

  // Mandatory login check: if still loading auth state, show spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 animate-bounce">
          <BookOpen className="w-8 h-8 text-amber-300" />
        </div>
        <div className="font-['Amiri'] text-2xl text-amber-200 mb-2">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <h2 className="text-lg font-bold text-slate-100">
          Memuat Al-Arabiyyah IX...
        </h2>
        <p className="text-xs text-emerald-200 mt-1">
          Menyiapkan materi pembelajaran Bahasa Arab Kelas 9 MTs/SMP
        </p>
      </div>
    );
  }

  // MANDATORY LOGIN: If not logged in, render LoginPage
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Class Announcements Bar (if any) */}
      {announcements.length > 0 && (
        <div className="bg-amber-500/10 border-b border-amber-200 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-2.5 text-xs text-amber-900">
            <Megaphone className="w-4 h-4 text-amber-700 shrink-0" />
            <div className="flex-1 truncate">
              <strong>Info Madrasah:</strong> {announcements[0].title} — {announcements[0].content}
            </div>
          </div>
        </div>
      )}

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'materi' && <ChapterView />}
        {activeTab === 'kuis' && <QuizView />}
        {activeTab === 'tutor' && <GeminiTutorView />}
        {activeTab === 'kamus' && <VocabDictionaryView />}
        {activeTab === 'admin' && <AdminPortalView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Al-Arabiyyah IX</span>
            <span>&bull;</span>
            <span>Media Pembelajaran Bahasa Arab Kelas IX MTs / SMP</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
              Kurikulum Merdeka / Kemenag
            </span>
            <span className="text-slate-400">
              Admin: <code className="font-mono font-bold text-slate-600">admin</code>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
