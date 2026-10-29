import React, { useState } from 'react';
import { speakArabic } from '../utils/speech';
import { 
  Sparkles, 
  Send, 
  Search, 
  BookOpen, 
  CheckCircle, 
  Volume2, 
  HelpCircle, 
  RefreshCw,
  Wand2,
  FileCode2,
  User,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ustadz';
  text: string;
  timestamp: string;
  arabicSnippet?: string;
}

interface SentenceAnalysis {
  sentenceWithHarakat: string;
  translation: string;
  words: {
    word: string;
    type: string;
    meaning: string;
    irab?: string;
  }[];
  grammarNote: string;
}

export const GeminiTutorView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'analyze' | 'generate'>('chat');

  // Chat state
  const [inputQuestion, setInputQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ustadz',
      text: 'Ahlan wa Sahlan! Saya adalah "Ustadz AI", asisten belajar Bahasa Arab khusus siswa Kelas IX MTs/SMP. Kamu bisa menanyakan apa saja seputar arti kosa kata (Mufrodat), tata bahasa (Nahwu & Shorof), rumus Fi\'il Madhi/Mudhari\', atau contoh kalimat.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Sentence analysis state
  const [sentenceInput, setSentenceInput] = useState('هَاجَرَ النَّبِيُّ ﷺ مِن مَكَّةَ إِلَى الْمَدِيْنَةِ');
  const [analysisResult, setAnalysisResult] = useState<SentenceAnalysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  // Quiz generator state
  const [quizTopic, setQuizTopic] = useState('Fi\'il Madhi dan Peristiwa Hijrah');
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [genLoading, setGenLoading] = useState(false);

  // Submit tutor question to server-side Gemini endpoint
  const handleSendQuestion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuestion.trim() || chatLoading) return;

    const userText = inputQuestion.trim();
    setInputQuestion('');

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'ustadz',
        text: data.answer || 'Maaf, belum dapat memberikan jawaban.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'ustadz',
        text: 'Kendala koneksi ke server AI Ustadz. Pastikan GEMINI_API_KEY telah dikonfigurasi.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Analyze sentence
  const handleAnalyzeSentence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentenceInput.trim() || analysisLoading) return;

    setAnalysisLoading(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/gemini/analyze-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: sentenceInput.trim() }),
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  // Generate instant quiz
  const handleGenerateQuiz = async () => {
    if (genLoading) return;
    setGenLoading(true);
    setGeneratedQuestions([]);

    try {
      const res = await fetch('/api/gemini/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterTitle: quizTopic, count: 4 }),
      });
      const data = await res.json();
      setGeneratedQuestions(data.questions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setGenLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Server-Side Gemini 3.8 Flash AI Tutor</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            Ustadz AI - Pendamping Belajar Bahasa Arab IX
          </h1>

          <p className="text-purple-100 text-xs md:text-sm leading-relaxed">
            Tanyakan kaidah Nahwu/Shorof, bedah kalimat berharakat, atau buat latihan soal otomatis kapan saja dengan bimbingan kecerdasan buatan.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-2xs gap-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveSubTab('chat')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'chat'
              ? 'bg-purple-700 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>1. Tanya Jawab Ustadz AI</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('analyze')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'analyze'
              ? 'bg-purple-700 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>2. Bedah Kalimat & I'rab</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('generate')}
          className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'generate'
              ? 'bg-purple-700 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          <span>3. Buat Kuis Kustom AI</span>
        </button>
      </div>

      {/* SUB-TAB 1: CHAT */}
      {activeSubTab === 'chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
          {/* Chat Messages scroll area */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUser
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-700 text-white shadow-xs'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[85%] md:max-w-[75%] space-y-1 ${isUser ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-700">
                        {isUser ? 'Anda' : 'Ustadz AI'}
                      </span>
                      <span>&bull;</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-emerald-700 text-white rounded-tr-xs'
                          : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-purple-700 font-semibold flex items-center gap-2 shadow-2xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Ustadz AI sedang menyusun jawaban berharakat...</span>
                </div>
              </div>
            )}
          </div>

          {/* Preset Questions Suggestions */}
          <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap pl-1">
              Contoh Tanya:
            </span>
            {[
              "Apa itu Kana wa Akhwatuha dan pengaruhnya?",
              "Jelaskan tashrif fi'il madhi untuk dhomir nahnu",
              "Apa arti dari lafaz 'Nuzulul Qur'an'?",
              "Berikan contoh kalimat isim tafdhil wazan af'alu",
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputQuestion(preset)}
                className="py-1 px-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-700 whitespace-nowrap shrink-0 text-[11px] cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendQuestion} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Tanyakan materi bahasa Arab kelas 9 (nahwu, shorof, arti mufrodat)..."
              disabled={chatLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-xs md:text-sm text-slate-800"
            />
            <button
              type="submit"
              disabled={chatLoading || !inputQuestion.trim()}
              className="py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </form>
        </div>
      )}

      {/* SUB-TAB 2: SENTENCE PARSER / I'RAB */}
      {activeSubTab === 'analyze' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Analisis Kalimat & I'rab Bahasa Arab
            </h3>
            <p className="text-xs text-slate-500">
              Masukkan kalimat bahasa Arab, AI akan membedah kedudukan tiap kata (Isim, Fi'il, Harf), terjemahan, dan harakat akhirnya.
            </p>
          </div>

          <form onSubmit={handleAnalyzeSentence} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kalimat Bahasa Arab (Boleh tanpa harakat atau berharakat):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sentenceInput}
                  onChange={(e) => setSentenceInput(e.target.value)}
                  dir="rtl"
                  placeholder="أَدْخِلِ الْجُمْلَةَ هُنَا..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-lg font-['Amiri'] text-right text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                />
                <button
                  type="submit"
                  disabled={analysisLoading}
                  className="py-3 px-5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {analysisLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>Analisis</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="text-[11px] text-slate-400 self-center">Contoh Kalimat:</span>
              {[
                "كَانَ النَّبِيُّ رَحِيْمًا بِالْأُمَّةِ",
                "لَنْ يَنْجَحَ التِّلْمِيْذُ الْكَسْلَانُ",
                "الشَّمْسُ أَكْبَرُ مِنَ الْقَمَرِ",
              ].map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSentenceInput(ex)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-800 font-['Amiri'] text-sm cursor-pointer border border-slate-200"
                >
                  {ex}
                </button>
              ))}
            </div>
          </form>

          {/* Analysis Result Box */}
          {analysisResult && (
            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-200/60 pb-3">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                  Hasil Analisis Tata Bahasa
                </span>
                <button
                  type="button"
                  onClick={() => speakArabic(analysisResult.sentenceWithHarakat)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-purple-300 text-purple-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan</span>
                </button>
              </div>

              <div className="text-right">
                <div className="font-['Amiri'] text-3xl font-bold text-purple-950 leading-relaxed">
                  {analysisResult.sentenceWithHarakat}
                </div>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  Artinya: "{analysisResult.translation}"
                </div>
              </div>

              {/* Word breakdown table */}
              {analysisResult.words && analysisResult.words.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-purple-200 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-purple-800 text-white font-semibold">
                      <tr>
                        <th className="p-3">Kata (الْكَلِمَة)</th>
                        <th className="p-3">Jenis Kata</th>
                        <th className="p-3">Arti Kata</th>
                        <th className="p-3">I'rab / Kedudukan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-100">
                      {analysisResult.words.map((w, idx) => (
                        <tr key={idx} className="hover:bg-purple-50/50">
                          <td className="p-3 font-['Amiri'] text-lg font-bold text-purple-900">
                            {w.word}
                          </td>
                          <td className="p-3 font-semibold text-slate-800">
                            {w.type}
                          </td>
                          <td className="p-3 text-slate-700">
                            {w.meaning}
                          </td>
                          <td className="p-3 text-purple-800 font-medium">
                            {w.irab || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {analysisResult.grammarNote && (
                <div className="p-4 rounded-xl bg-white border border-purple-200 text-xs text-purple-900 leading-relaxed">
                  <strong className="block mb-1 text-purple-950 font-bold">
                    Kaidah Nahwu/Shorof Terkait:
                  </strong>
                  {analysisResult.grammarNote}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: AI QUIZ GENERATOR */}
      {activeSubTab === 'generate' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Generator Soal Kuis Kustom (AI Powered)
            </h3>
            <p className="text-xs text-slate-500">
              Guru atau siswa dapat menghasilkan soal latihan baru untuk materi tertentu secara otomatis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Topik / Materi yang diinginkan:
              </label>
              <input
                type="text"
                value={quizTopic}
                onChange={(e) => setQuizTopic(e.target.value)}
                placeholder="Misal: Fi'il Amr dan Keindahan Alam / Kana wa Akhwatuha..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGenerateQuiz}
                disabled={genLoading || !quizTopic.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {genLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                <span>Buat Soal Kuis Baru</span>
              </button>
            </div>
          </div>

          {/* Generated Questions List */}
          {generatedQuestions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">
                  Hasil Pembuatan Soal ({generatedQuestions.length} Butir Soal):
                </h4>
                <span className="text-xs text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  Topik: {quizTopic}
                </span>
              </div>

              {generatedQuestions.map((q, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Soal #{i + 1}</span>
                    <span className="text-emerald-700 font-semibold">
                      Kunci: Opsi {String.fromCharCode(65 + q.correctIndex)}
                    </span>
                  </div>

                  {q.arabic && (
                    <div className="font-['Amiri'] text-xl font-bold text-right text-slate-900 leading-relaxed">
                      {q.arabic}
                    </div>
                  )}

                  <p className="text-xs md:text-sm font-semibold text-slate-800">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options?.map((opt: string, optIdx: number) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border ${
                          optIdx === q.correctIndex
                            ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      <strong>Penjelasan:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
