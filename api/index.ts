import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '1mb' }));

// Helper to initialize Gemini client safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Pembelajaran Bahasa Arab Kelas IX MTs/SMP',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Admin authentication endpoint (as required: user: admin, pw: admin123)
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib diisi' });
  }

  const cleanUser = String(username).trim().toLowerCase();
  const cleanPass = String(password).trim();

  if (cleanUser === 'admin' && cleanPass === 'admin123') {
    return res.json({
      success: true,
      message: 'Login Admin Berhasil',
      user: {
        uid: 'admin_master_001',
        displayName: 'Ustadz / Admin Pengampu',
        email: 'admin@madrasah.sch.id',
        role: 'admin',
        photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=AdminUstaz',
      },
      token: 'admin_session_auth_ix_' + Date.now(),
    });
  }

  return res.status(401).json({
    error: 'Username atau password admin salah! Gunakan user: admin, pw: admin123',
  });
});

// Gemini AI Arabic Tutor endpoint
app.post('/api/gemini/tutor', async (req: Request, res: Response) => {
  try {
    const { question, topic, history } = req.body || {};

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // High-quality fallback explanation if no API key is provided
      return res.json({
        answer: `[Jawaban Terpadu Guru Bahasa Arab Kelas IX]:\n\nUntuk pertanyaan mengenai "${question}":\n\nDalam kurikulum Bahasa Arab Kelas IX MTs/SMP, perhatikan kaidah pola kalimat fi'liyyah (Fi'il + Fa'il + Maf'ul Bih) dan ismiyyah (Mubtada' + Khabar). Contoh kosa kata terkait: الْفِعْلُ الْمَاضِي (Kata kerja lampau) dan الْفِعْلُ الْمُضَارِعُ (Kata kerja sedang/akan datang).\n\nSilakan diskusikan lebih lanjut dengan guru atau coba tanyakan kaidah tertentu seperti Tashrif atau I'rab!`,
        source: 'local_fallback',
      });
    }

    const systemInstruction = `Anda adalah "Ustadz AI", guru pakar Bahasa Arab yang ramah, bijak, dan edukatif khusus untuk siswa jenjang MTs (Madrasah Tsanawiyah) / SMP Kelas 9 di Indonesia.
Materi kurikulum kelas 9 mencakup:
1. Bab 1: رأس السنة الهجرية (Tahun Baru Hijriyah) - Fi'il Madhi & Tasrif Lughawi
2. Bab 2: الحفل بمولد الرسول (Peringatan Maulid Nabi) - Kana wa Akhwatuha
3. Bab 3: نزول القرآن والعيدان (Nuzulul Qur'an & Dua Hari Raya) - Fi'il Mudhari' & Lam / Laa Nahiyah
4. Bab 4: جمال الطبيعة (Keindahan Alam) - Fi'il Amr & Tashrif
5. Bab 5: خالق العالم (Pencipta Alam Semesta) - Isim Tafdhil (أَفْعَلُ مِنْ)
6. Bab 6: الحفاظ على البيئة (Melestarikan Lingkungan) - Fi'il Mudhari' Marfu', Manshub, Majzum

Aturan Jawaban:
1. Berikan penjelasan dalam Bahasa Indonesia yang santun, jelas, dan menyemangati siswa.
2. Setiap kata atau kalimat Bahasa Arab WAJIB diberi HARAKAT LENGKAP (Tasykil).
3. Berikan arti perkata atau terjemahan, serta contoh aplikatif kalimat yang relevan.
4. Jangan terlalu panjang bertele-tele, sajikan dengan poin-poin yang mudah dibaca siswa.`;

    const prompt = `Pertanyaan Siswa Kelas 9: "${question}"
Topik yang sedang dipelajari: ${topic || 'Umum Kelas 9'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || 'Maaf, tidak dapat menghasilkan jawaban saat ini.';
    return res.json({ answer, source: 'gemini' });
  } catch (error: any) {
    console.error('Gemini tutor error:', error);
    return res.status(500).json({
      error: 'Terjadi kendala saat menghubungi AI Ustadz: ' + (error?.message || 'Error tidak diketahui'),
    });
  }
});

// Gemini AI Sentence Parser / I'rab Analyzer
app.post('/api/gemini/analyze-sentence', async (req: Request, res: Response) => {
  try {
    const { sentence } = req.body || {};
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ error: 'Kalimat bahasa Arab harus diisi' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        sentenceWithHarakat: sentence,
        translation: 'Analisis kalimat lokal (Gemini key belum terpasang)',
        words: [
          { word: sentence, type: 'Kalimah', meaning: 'Teks masukan siswa' }
        ],
        grammarNote: 'Silakan pastikan GEMINI_API_KEY aktif untuk analisis mendalam I\'rab.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Analisis kalimat bahasa Arab berikut untuk siswa kelas 9: "${sentence}"`,
      config: {
        systemInstruction: `Anda adalah asisten tata bahasa Arab (Nahwu & Shorof) untuk siswa kelas IX MTs. Kembalikan analisis dalam format JSON murni.
Format JSON harus memiliki:
{
  "sentenceWithHarakat": "string dengan harakat lengkap",
  "translation": "terjemahan bahasa Indonesia yang baik",
  "words": [
    {
      "word": "kata berharakat",
      "type": "Isim / Fi'il / Harf",
      "meaning": "arti kata",
      "irab": "penjelasan i'rab sederhana (cth: Fa'il marfu' dengan dhammah / Fi'il madhi mabni 'alal fath)"
    }
  ],
  "grammarNote": "penjelasan ringkas kaidah nahwu/shorof yang relevan untuk anak kelas 9"
}`,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Analyze sentence error:', error);
    return res.status(500).json({ error: error?.message || 'Gagal menganalisis kalimat' });
  }
});

// Gemini AI Dynamic Quiz Generator
app.post('/api/gemini/generate-quiz', async (req: Request, res: Response) => {
  try {
    const { chapterTitle, count = 5 } = req.body || {};
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        questions: [
          {
            id: 1,
            question: 'Kata berikut yang merupakan Fi\'il Madhi (kata kerja lampau) adalah...',
            arabic: 'اخْتَرْ الْفِعْلَ الْمَاضِيَ مِنْ بَيْنِ الْكَلِمَاتِ الآتِيَةِ:',
            options: ['كَتَبَ (kataba)', 'يَكْتُبُ (yaktubu)', 'اُكْتُبْ (uktub)', 'كَاتِبٌ (kaatibun)'],
            correctIndex: 0,
            explanation: 'كَتَبَ adalah Fi\'il Madhi mabni \'alal fath, bermakna "dia telah menulis".',
          },
          {
            id: 2,
            question: 'Apa arti dari ungkapan "رَأْسُ السَّنَةِ الْهِجْرِيَّةِ" ?',
            arabic: 'مَا مَعْنَى "رَأْسُ السَّنَةِ الْهِجْرِيَّةِ"؟',
            options: ['Tahun Baru Hijriyah', 'Hari Raya Idul Fitri', 'Peringatan Isra Miraj', 'Nuzulul Qur\'an'],
            correctIndex: 0,
            explanation: 'رَأْسُ السَّنَةِ الْهِجْرِيَّةِ secara harfiah adalah kepala/awal tahun hijriyah, yakni Tahun Baru Hijriyah.',
          },
        ],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Buatkan ${count} soal kuis pilihan ganda Bahasa Arab Kelas 9 MTs tentang: ${chapterTitle || 'Pelajaran Bahasa Arab Kelas IX'}.`,
      config: {
        systemInstruction: `Anda adalah pembuat soal kuis Bahasa Arab kelas IX MTs / SMP. Buat soal pilihan ganda 4 opsi (A, B, C, D) yang mendidik, relevan dengan Kurikulum Kemenag/Kemdikbud kelas 9.
Format output JSON harus berupa list objek:
[
  {
    "id": 1,
    "question": "Pertanyaan dalam bahasa Indonesia",
    "arabic": "Teks soal atau stimulus dalam bahasa Arab lengkap dengan harakat",
    "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
    "correctIndex": 0, // angka 0, 1, 2, atau 3
    "explanation": "Penjelasan kunci jawaban singkat dan mendidik"
  }
]`,
        responseMimeType: 'application/json',
      },
    });

    const questions = JSON.parse(response.text || '[]');
    return res.json({ questions });
  } catch (error: any) {
    console.error('Generate quiz error:', error);
    return res.status(500).json({ error: error?.message || 'Gagal menghasilkan kuis AI' });
  }
});

// IMPORTANT: Export default app without calling app.listen, as requested for Vercel & serverless
export default app;
