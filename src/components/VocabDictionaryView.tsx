import React, { useState, useMemo, useEffect } from 'react';
import { ARABIC_CHAPTERS, VocabItem } from '../data/arabicData';
import { speakArabic } from '../utils/speech';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Search, 
  Volume2, 
  BookMarked, 
  Filter, 
  Sparkles,
  Tag
} from 'lucide-react';

export const VocabDictionaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customVocabs, setCustomVocabs] = useState<VocabItem[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Load custom vocabs from Firestore
  useEffect(() => {
    const fetchCustomVocabs = async () => {
      try {
        const snap = await getDocs(collection(db, 'customVocabs'));
        const list: VocabItem[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            arabic: data.arabic,
            transliteration: data.transliteration || '',
            meaning: data.meaning,
            category: 'kata_benda',
            exampleArabic: data.exampleSentence,
            exampleTranslation: data.exampleTranslation,
          };
        });
        setCustomVocabs(list);
      } catch (err) {
        // Fallback or ignore if offline
      }
    };
    fetchCustomVocabs();
  }, []);

  // Compile all vocab items
  const allVocabs = useMemo(() => {
    let combined: { item: VocabItem; chapterNum: number; chapterTitle: string }[] = [];
    ARABIC_CHAPTERS.forEach((c) => {
      c.vocabulary.forEach((v) => {
        combined.push({ item: v, chapterNum: c.number, chapterTitle: c.titleIndonesian });
      });
    });

    customVocabs.forEach((v) => {
      combined.push({ item: v, chapterNum: 99, chapterTitle: 'Tambahan Guru/Admin' });
    });

    return combined;
  }, [customVocabs]);

  // Filtered vocabs
  const filteredVocabs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allVocabs.filter(({ item, chapterNum }) => {
      // Chapter filter
      if (selectedChapter !== 'all' && String(chapterNum) !== selectedChapter) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (q) {
        const matchArabic = item.arabic.includes(q);
        const matchTrans = item.transliteration.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        return matchArabic || matchTrans || matchMeaning;
      }
      return true;
    });
  }, [allVocabs, searchQuery, selectedChapter, selectedCategory]);

  const handleSpeak = async (id: string, text: string) => {
    try {
      setPlayingId(id);
      await speakArabic(text);
    } finally {
      setPlayingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
            <BookMarked className="w-3.5 h-3.5 text-teal-700" />
            <span>Kamus Digital Terpadu</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            Kamus Mufrodat Bahasa Arab Kelas IX
          </h2>
          <p className="text-xs text-slate-500">
            Daftar lengkap kosakata beserta audio pelafalan, transliterasi Latin, dan arti
          </p>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-700">
            {filteredVocabs.length}
          </span>
          <span className="text-xs text-slate-500 block">Kosakata Tersedia</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari arti kata, teks Arab, atau lafal Latin (cth: hijrah, masjid, jabal)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Bab:
          </span>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Bab</option>
            {ARABIC_CHAPTERS.map((c) => (
              <option key={c.id} value={String(c.number)}>
                Bab {c.number}: {c.titleIndonesian}
              </option>
            ))}
          </select>

          <span className="text-slate-400 font-semibold ml-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Kategori:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Jenis</option>
            <option value="kata_benda">Kata Benda (Isim)</option>
            <option value="kata_kerja">Kata Kerja (Fi'il)</option>
            <option value="ungkapan">Ungkapan / Istilah</option>
          </select>
        </div>
      </div>

      {/* Vocab Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVocabs.map(({ item, chapterNum, chapterTitle }, idx) => (
          <div
            key={item.id || idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {chapterNum === 99 ? 'Tambahan Guru' : `Bab ${chapterNum}`}
                </span>

                <button
                  type="button"
                  onClick={() => handleSpeak(`dict-${idx}`, item.arabic)}
                  title="Dengarkan makhraj"
                  className={`p-2 rounded-xl text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer ${
                    playingId === `dict-${idx}` ? 'bg-emerald-600 text-white animate-pulse' : ''
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right py-2">
                <div className="font-['Amiri'] text-2xl font-bold text-slate-900 leading-relaxed">
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
                <div className="text-[11px] text-slate-400 capitalize mt-0.5">
                  {item.category.replace('_', ' ')} &bull; {chapterTitle}
                </div>
              </div>
            </div>

            {item.exampleArabic && (
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="font-['Amiri'] text-xs text-right text-slate-800">
                  {item.exampleArabic}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
