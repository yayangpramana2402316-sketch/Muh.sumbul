export interface VocabItem {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: 'kata_benda' | 'kata_kerja' | 'ungkapan';
  exampleArabic?: string;
  exampleTranslation?: string;
}

export interface DialogueLine {
  speaker: string;
  arabic: string;
  transliteration: string;
  meaning: string;
}

export interface GrammarRule {
  title: string;
  explanation: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  examples: {
    arabic: string;
    meaning: string;
    analysis: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  number: number;
  titleArabic: string;
  titleTransliteration: string;
  titleIndonesian: string;
  theme: string;
  summary: string;
  iconName: string;
  badgeColor: string;
  vocabulary: VocabItem[];
  dialogue: DialogueLine[];
  readingText: {
    title: string;
    arabic: string;
    translation: string;
  };
  grammar: GrammarRule;
  quiz: QuizQuestion[];
}

export const ARABIC_CHAPTERS: Chapter[] = [
  {
    id: 'bab-1',
    number: 1,
    titleArabic: 'رَأْسُ السَّنَةِ الْهِجْرِيَّةِ',
    titleTransliteration: "Ra'su as-Sanati al-Hijriyyah",
    titleIndonesian: 'Tahun Baru Hijriyah',
    theme: 'Sejarah Hijrah Nabi & Penetapan Kalender Hijriyah',
    iconName: 'Calendar',
    badgeColor: 'emerald',
    summary: 'Mempelajari peristiwa agung hijrahnya Nabi Muhammad SAW dari Makkah ke Madinah, sejarah kalender Hijriyah pada masa Khalifah Umar bin Khattab, serta kaidah Fi\'il Madhi dan Tashrif Lughawi.',
    vocabulary: [
      {
        id: 'b1-1',
        arabic: 'رَأْسُ السَّنَةِ',
        transliteration: "Ra'sus-Sanah",
        meaning: 'Awal Tahun / Tahun Baru',
        category: 'kata_benda',
        exampleArabic: 'نَحْتَفِلُ بِرَأْسِ السَّنَةِ الْهِجْرِيَّةِ الجَدِيْدَةِ.',
        exampleTranslation: 'Kami merayakan tahun baru hijriyah yang baru.',
      },
      {
        id: 'b1-2',
        arabic: 'هَاجَرَ - يُهَاجِرُ',
        transliteration: 'Haajara - Yuhaajiru',
        meaning: 'Berhijrah / Berpindah',
        category: 'kata_kerja',
        exampleArabic: 'هَاجَرَ النَّبِيُّ ﷺ مِنْ مَكَّةَ إِلَى الْمَدِيْنَةِ.',
        exampleTranslation: 'Nabi SAW berhijrah dari Makkah ke Madinah.',
      },
      {
        id: 'b1-3',
        arabic: 'التَّقْوِيْمُ الْهِجْرِيُّ',
        transliteration: 'At-Taqwimul-Hijriyy',
        meaning: 'Kalender Hijriyah',
        category: 'kata_benda',
        exampleArabic: 'وَضَعَ عُمَرُ بنُ الْخَطَّابِ التَّقْوِيْمَ الْهِجْرِيَّ.',
        exampleTranslation: 'Umar bin Khattab menetapkan kalender hijriyah.',
      },
      {
        id: 'b1-4',
        arabic: 'اسْتَقْبَلَ - يَسْتَقْبِلُ',
        transliteration: 'Istaqbala - Yastaqbilu',
        meaning: 'Menyambut',
        category: 'kata_kerja',
        exampleArabic: 'اسْتَقْبَلَ أَهْلُ الْمَدِيْنَةِ النَّبِيَّ بِفَرَحٍ سُرُوْرٍ.',
        exampleTranslation: 'Penduduk Madinah menyambut Nabi dengan penuh kegembiraan.',
      },
      {
        id: 'b1-5',
        arabic: 'شَهْرُ مُحَرَّمٍ',
        transliteration: 'Syahru Muharram',
        meaning: 'Bulan Muharram (Bulan Pertama)',
        category: 'kata_benda',
        exampleArabic: 'شَهْرُ مُحَرَّمٍ هُوَ أَوَّلُ شَهْرٍ فِي السَّنَةِ الْهِجْرِيَّةِ.',
        exampleTranslation: 'Bulan Muharram adalah bulan pertama dalam tahun hijriyah.',
      },
      {
        id: 'b1-6',
        arabic: 'الْمُهَاجِرُوْنَ وَالْأَنْصَارُ',
        transliteration: 'Al-Muhaajiruuna wal-Anshaar',
        meaning: 'Kaum Muhajirin dan Kaum Anshar',
        category: 'kata_benda',
        exampleArabic: 'آخَى النَّبِيُّ بَيْنَ الْمُهَاجِرِيْنَ وَالْأَنْصَارِ.',
        exampleTranslation: 'Nabi mempersaudarakan kaum Muhajirin dan kaum Anshar.',
      },
    ],
    dialogue: [
      {
        speaker: 'فَرِيْد (Farid)',
        arabic: 'السَّلَامُ عَلَيْكُمْ يَا حَسَن! كَيْفَ حَالُكَ؟',
        transliteration: "Assalamu'alaikum yaa Hasan! Kaifa haaluka?",
        meaning: 'Assalamu\'alaikum wahai Hasan! Bagaimana kabarmu?',
      },
      {
        speaker: 'حَسَن (Hasan)',
        arabic: 'وَعَلَيْكُمُ السَّلَامُ، أَنَا بِخَيْرٍ وَالْحَمْدُ لِلّٰهِ. هَلْ حَضَرْتَ حَفْلَ رَأْسِ السَّنَةِ الْهِجْرِيَّةِ أَمْسِ؟',
        transliteration: "Wa'alaikumussalam, ana bikhair walhamdulillah. Hal hadharta hafla ra'sis-sanatil-hijriyyati amsi?",
        meaning: 'Wa\'alaikumsalam, aku baik-baik saja alhamdulillah. Apakah kamu hadir dalam perayaan tahun baru hijriyah kemarin?',
      },
      {
        speaker: 'فَرِيْد (Farid)',
        arabic: 'نَعَمْ، حَضَرْتُ مَعَ زُمَلَائِي فِي مَسْجِدِ الْمَدْرَسَةِ. اسْتَمَعْنَا إِلَى مُحَاضَرَةِ الْأُسْتَاذِ عَنْ هِجْرَةِ الرَّسُوْلِ ﷺ.',
        transliteration: "Na'am, hadhartu ma'a zumalaa'i fi masjidil-madrasah. Istama'naa ilaa muhaadharatil-ustadz 'an hijratir-rasuul SAW.",
        meaning: 'Ya, aku hadir bersama teman-temanku di masjid madrasah. Kami mendengarkan ceramah ustadz tentang hijrah Rasulullah SAW.',
      },
      {
        speaker: 'حَسَن (Hasan)',
        arabic: 'مَا شَاءَ اللّٰهُ! إِنَّ حَادِثَةَ الْهِجْرَةِ حَادِثَةٌ عَظِيْمَةٌ فِي تَارِيْخِ الْإِسْلَامِ.',
        transliteration: "Maa syaa'a Allah! Inna haaditsatal-hijrati haaditsatun 'azhiimatun fii taariikhil-Islam.",
        meaning: 'Masya Allah! Sungguh peristiwa hijrah adalah peristiwa agung dalam sejarah Islam.',
      },
    ],
    readingText: {
      title: 'الْهِجْرَةُ النَّبَوِيَّةُ الشَّرِيْفَةُ',
      arabic: `كَانَ الْمُسْلِمُوْنَ فِي مَكَّةَ يَلْقَوْنَ أَذًى كَثِيْرًا مِنَ الْكُفَّارِ. فَأَمَرَهُمُ اللّٰهُ تَعَالَى بِالْهِجْرَةِ إِلَى الْمَدِيْنَةِ الْمُنَوَّرَةِ. خَرَجَ النَّبِيُّ ﷺ مَعَ صَاحِبِهِ أَبِي بَكْرٍ الصِّدِّيْقِ رَضِيَ اللّٰهُ عَنْهُ سِرًّا، وَوَصَلَا إِلَى الْمَدِيْنَةِ سَالِمَيْنِ. وَفِي عَهْدِ الْخَلِيْفَةِ عُمَرَ بْنِ الْخَطَّابِ، اتَّفَقَ الصَّحَابَةُ عَلَى جَعْلِ عَامِ الْهِجْرَةِ بَدَايَةَ التَّقْوِيْمِ الْإِسْلَامِيِّ.`,
      translation: `Dahulu kaum muslimin di Makkah mengalami banyak gangguan dari orang-orang kafir. Maka Allah Ta'ala memerintahkan mereka untuk berhijrah ke Madinah Munawwarah. Nabi SAW berangkat bersama sahabatnya Abu Bakar Ash-Shiddiq ra secara sembunyi-sembunyi, lalu keduanya sampai di Madinah dengan selamat. Pada masa Khalifah Umar bin Khattab, para sahabat sepakat menjadikan tahun hijrah sebagai awal penanggalan Islam (Taqwim Hijriyah).`,
    },
    grammar: {
      title: 'الْفِعْلُ الْمَاضِي وَتَصْرِيْفُهُ اللُّغَوِيُّ (Fi\'il Madhi & Konjugasinya)',
      explanation: 'Fi\'il Madhi adalah kata kerja yang menunjukkan perbuatan yang telah selesai dilakukan (waktu lampau). Fi\'il Madhi berubah bentuknya sesuai dengan Dhamir (kata ganti subjek).',
      tableHeaders: ['Dhamir (Kata Ganti)', 'Arti Dhamir', 'Bentuk Fi\'il Madhi (Contoh: كَتَبَ)', 'Keterangan Tambahan'],
      tableRows: [
        ['هُوَ (Huwa)', 'Dia (1 Laki-laki)', 'كَتَبَ (Kataba)', 'Bentuk asal / Mabni alal fath'],
        ['هُمَا (Humaa)', 'Mereka (2 Laki-laki)', 'كَتَبَا (Katabaa)', 'Tambahan Alif tasniyah'],
        ['هُمْ (Hum)', 'Mereka (>2 Laki-laki)', 'كَتَبُوْا (Katabuu)', 'Tambahan Wawu jama\'ah'],
        ['هِيَ (Hiya)', 'Dia (1 Perempuan)', 'كَتَبَتْ (Katabat)', 'Tambahan Ta\' ta\'nits sukun'],
        ['أَنْتَ (Anta)', 'Kamu (1 Laki-laki)', 'كَتَبْتَ (Katabta)', 'Tambahan Ta mutaharrikah (fathah)'],
        ['أَنْتِ (Anti)', 'Kamu (1 Perempuan)', 'كَتَبْتِ (Katabti)', 'Tambahan Ti (kasrah)'],
        ['أَنَا (Ana)', 'Saya / Aku', 'كَتَبْتُ (Katabtu)', 'Tambahan Tu (dhammah)'],
        ['نَحْنُ (Nahnu)', 'Kami / Kita', 'كَتَبْنَا (Katabnaa)', 'Tambahan Naa panjang'],
      ],
      examples: [
        {
          arabic: 'هَاجَرَ النَّبِيُّ إِلَى الْمَدِيْنَةِ',
          meaning: 'Nabi telah berhijrah ke Madinah.',
          analysis: 'هَاجَرَ adalah Fi\'il Madhi untuk subjek tunggal laki-laki (هُوَ).',
        },
        {
          arabic: 'حَضَرْنَا حَفْلَ رَأْسِ السَّنَةِ',
          meaning: 'Kami telah menghadiri peringatan tahun baru.',
          analysis: 'حَضَرْنَا berakhiran نَا menunjukkan subjek نَحْنُ (Kami).',
        },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Siapakah Khalifah yang pertama kali menetapkan awal penanggalan Kalender Hijriyah?',
        arabicPrompt: 'مَنِ الَّذِي وَضَعَ التَّقْوِيْمَ الْهِجْرِيَّ؟',
        options: ['Abu Bakar Ash-Shiddiq', 'Umar bin Khattab', 'Utsman bin Affan', 'Ali bin Abi Thalib'],
        correctIndex: 1,
        explanation: 'Khalifah Umar bin Khattab r.a. adalah khalifah yang menetapkan kalender Hijriyah dimulai dari peristiwa hijrah Nabi SAW.',
      },
      {
        id: 2,
        question: 'Bentuk Fi\'il Madhi dari kata "ذَهَبَ" jika pelakunya adalah "أَنَا" (Saya) adalah...',
        arabicPrompt: 'تَصْرِيْفُ الْفِعْلِ "ذَهَبَ" مَعَ الضَّمِيْرِ (أَنَا) هُوَ:',
        options: ['ذَهَبَتْ', 'ذَهَبْتَ', 'ذَهَبْتُ', 'ذَهَبْنَا'],
        correctIndex: 2,
        explanation: 'Untuk dhamir أَنَا (saya), Fi\'il Madhi berakhiran -tu (تُ), sehingga menjadi ذَهَبْتُ (dzahabtu).',
      },
      {
        id: 3,
        question: 'Apa arti dari kata "الْمُهَاجِرُوْنَ" dalam konteks sejarah hijrah?',
        arabicPrompt: 'مَا مَعْنَى كَلِمَةِ "الْمُهَاجِرُوْنَ"؟',
        options: [
          'Kaum muslimin yang berhijrah dari Makkah ke Madinah',
          'Penduduk asli Madinah yang menolong',
          'Para pedagang di kota Syam',
          'Kaum Quraisy yang menentang Islam',
        ],
        correctIndex: 0,
        explanation: 'Al-Muhajirun adalah kaum muslimin yang berhijrah meninggalkan Makkah menuju Madinah.',
      },
      {
        id: 4,
        question: 'Kalimat yang menggunakan Fi\'il Madhi dengan benar untuk dhamir "نَحْنُ" adalah...',
        arabicPrompt: 'الْجُمْلَةُ الصَّحِيْحَةُ مَعَ الضَّمِيْرِ "نَحْنُ" هِيَ:',
        options: ['نَحْنُ قَرَأَ الْقُرْآنَ', 'نَحْنُ قَرَأْتُ الْقُرْآنَ', 'نَحْنُ قَرَأْنَا الْقُرْآنَ', 'نَحْنُ قَرَأَتْ الْقُرْآنَ'],
        correctIndex: 2,
        explanation: 'Dhamir نَحْنُ menggunakan akhiran نَا (قَرَأْنَا).',
      },
      {
        id: 5,
        question: 'Bulan pertama dalam kalender Hijriyah adalah...',
        arabicPrompt: 'أَوَّلُ شَهْرٍ فِي التَّقْوِيْمِ الْهِجْرِيِّ هُوَ:',
        options: ['شَهْرُ رَمَضَان', 'شَهْرُ مُحَرَّم', 'شَهْرُ شَوَّال', 'شَهْرُ رَبِيْعِ الْأَوَّل'],
        correctIndex: 1,
        explanation: 'Bulan pertama kalender Hijriyah adalah Muharram (مُحَرَّم).',
      },
    ],
  },
  {
    id: 'bab-2',
    number: 2,
    titleArabic: 'الْحَفْلُ بِمَوْلِدِ الرَّسُوْلِ',
    titleTransliteration: 'Al-Haflu bi Maulidir-Rasuul',
    titleIndonesian: 'Peringatan Maulid Nabi SAW',
    theme: 'Kelahiran Nabi & Kaidah Kaana wa Akhwatuha',
    iconName: 'Sparkles',
    badgeColor: 'sky',
    summary: 'Mempelajari sirah kelahiran Rasulullah SAW pada tanggal 12 Rabi\'ul Awwal Tahun Gajah, akhlak mulia beliau sebagai uswatun hasanah, serta mendalami kaidah Kana wa Akhwatuha.',
    vocabulary: [
      {
        id: 'b2-1',
        arabic: 'وُلِدَ - يُوْلَدُ',
        transliteration: 'Wulida - Yuuladu',
        meaning: 'Dilahirkan',
        category: 'kata_kerja',
        exampleArabic: 'وُلِدَ النَّبِيُّ ﷺ فِي عَامِ الْفِيْلِ.',
        exampleTranslation: 'Nabi SAW dilahirkan pada tahun gajah.',
      },
      {
        id: 'b2-2',
        arabic: 'أُسْوَةٌ حَسَنَةٌ',
        transliteration: 'Uswatun Hasanah',
        meaning: 'Teladan yang Baik',
        category: 'kata_benda',
        exampleArabic: 'لَقَدْ كَانَ لَكُمْ فِي رَسُوْلِ اللّٰهِ أُسْوَةٌ حَسَنَةٌ.',
        exampleTranslation: 'Sungguh telah ada pada diri Rasulullah teladan yang baik bagi kalian.',
      },
      {
        id: 'b2-3',
        arabic: 'عَامُ الْفِيْلِ',
        transliteration: "'Aamul-Fiil",
        meaning: 'Tahun Gajah',
        category: 'kata_benda',
        exampleArabic: 'سُمِّيَ الْعَامُ بِعَامِ الْفِيْلِ لِهَلَاكِ جَيْشِ أَبْرَهَةَ.',
        exampleTranslation: 'Tahun itu dinamai Tahun Gajah karena kehancuran pasukan Abrahah.',
      },
      {
        id: 'b2-4',
        arabic: 'أَخْلَاقٌ كَرِيْمَةٌ',
        transliteration: 'Akhlaaqun Kariimah',
        meaning: 'Akhlak Mulia / Budi Pekerti Luhur',
        category: 'kata_benda',
        exampleArabic: 'بُعِثَ النَّبِيُّ لِيُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ.',
        exampleTranslation: 'Nabi diutus untuk menyempurnakan kemuliaan akhlak.',
      },
      {
        id: 'b2-5',
        arabic: 'مُحَاضَرَةٌ دِيْنِيَّةٌ',
        transliteration: 'Muhaadharatun Diiniyyah',
        meaning: 'Ceramah Keagamaan / Mau\'izhah',
        category: 'kata_benda',
        exampleArabic: 'أَلْقَى الدَّاعِي مُحَاضَرَةً دِيْنِيَّةً قَيِّمَةً.',
        exampleTranslation: 'Sang da\'i menyampaikan ceramah keagamaan yang bernilai.',
      },
    ],
    dialogue: [
      {
        speaker: 'عَائِشَة (Aisyah)',
        arabic: 'مَتَى سَتُقِيْمُ مَدْرَسَتُنَا حَفْلَ مَوْلِدِ الرَّسُوْلِ يَا فَاطِمَة؟',
        transliteration: 'Mataa satuqiimu madrasatunaa hafla maulidir-rasuuli yaa Fathimah?',
        meaning: 'Kapan madrasah kita akan menyelenggarakan peringatan maulid nabi wahai Fathimah?',
      },
      {
        speaker: 'فَاطِمَة (Fathimah)',
        arabic: 'سَتُقِيْمُ الْمَدْرَسَةُ الْحَفْلَ فِي الْأُسْبُوْعِ الْقَادِمِ، فِي الثَّانِي عَشَرَ مِنْ رَبِيْعِ الْأَوَّلِ.',
        transliteration: "Satuqiimul-madrasatul-hafla fil-usbuu'il-qaadimi, fits-tsaanii 'asyara min Rabi'il-Awwal.",
        meaning: 'Madrasah akan menyelenggarakannya pekan depan, pada tanggal 12 Rabi\'ul Awwal.',
      },
      {
        speaker: 'عَائِشَة (Aisyah)',
        arabic: 'مَاذَا سَنَفْعَلُ فِي الْحَفْلِ؟',
        transliteration: 'Maadzaa sanaf\'alu fil-hafl?',
        meaning: 'Apa yang akan kita lakukan dalam perayaan tersebut?',
      },
      {
        speaker: 'فَاطِمَة (Fathimah)',
        arabic: 'سَنَقْرَأُ الْقُرْآنَ، وَنُنْشِدُ الْمَدَائِحَ النَّبَوِيَّةَ، وَنَسْتَمِعُ إِلَى كَلِمَةِ الْمُدِيْرِ.',
        transliteration: "Sanaqra'ul-Qur'an, wa nunsyidul-madaa'ihan-nabawiyyata, wa nastami'u ilaa kalimatil-mudiir.",
        meaning: 'Kita akan membaca Al-Qur\'an, melantunkan kasidah pujian kepada Nabi, dan mendengarkan sambutan kepala madrasah.',
      },
    ],
    readingText: {
      title: 'مَوْلِدُ خَاتَمِ الْأَنْبِيَاءِ ﷺ',
      arabic: `وُلِدَ النَّبِيُّ مُحَمَّدٌ ﷺ يَوْمَ الِاثْنَيْنِ، الثَّانِي عَشَرَ مِنْ شَهْرِ رَبِيْعِ الْأَوَّلِ فِي عَامِ الْفِيْلِ بِمَكَّةَ الْمُكَرَّمَةِ. مَاتَ أَبُوْهُ عَبْدُ اللّٰهِ وَهُوَ فِي بَطْنِ أُمِّهِ، ثُمَّ مَاتَتْ أُمُّهُ آمِنَةُ وَعُمْرُهُ سِتُّ سَنَوَاتٍ. فَعَاشَ يَتِيْمًا وَكَفَلَهُ جَدُّهُ عَبْدُ الْمُطَّلِبِ ثُمَّ عَمُّهُ أَبُوْ طَالِبٍ. كَانَ النَّبِيُّ مَعْرُوْفًا بِالصِّدْقِ وَالْأَمَانَةِ فَسُمِّيَ بِـ "الْأَمِيْنِ".`,
      translation: `Nabi Muhammad SAW dilahirkan pada hari Senin, tanggal 12 Rabi'ul Awwal pada Tahun Gajah di Makkah Al-Mukarramah. Ayahnya, Abdullah, wafat ketika beliau masih dalam kandungan ibunya. Kemudian ibunya, Aminah, wafat saat beliau berusia enam tahun. Beliau hidup sebagai anak yatim, lalu diasuh oleh kakeknya Abdul Muththalib kemudian pamannya Abu Thalib. Nabi terkenal dengan kejujuran dan amanahnya sehingga dijuluki "Al-Amin".`,
    },
    grammar: {
      title: 'كَانَ وَأَخَوَاتُهَا (Kana dan Saudara-Saudaranya)',
      explanation: 'كَانَ dan saudara-saudaranya masuk ke dalam Jumlah Ismiyyah (Mubtada\' + Khabar). Pengaruhnya: Merofa\'kan Mubtada\' (disebut Isim Kaana) dan Menashobkan Khabar (disebut Khabar Kaana berharakat fathah/ya).',
      tableHeaders: ['Kata Kerja Bantu', 'Arti / Makna', 'Contoh Kalimat', 'Analisis I\'rab'],
      tableRows: [
        ['كَانَ (Kaana)', 'Dahulu / Adalah', 'كَانَ الرَّسُوْلُ صَادِقًا', 'الرَّسُوْلُ: Isim Kaana (Rofa\' - Dhammah), صَادِقًا: Khabar Kaana (Nashab - Fathah)'],
        ['أَصْبَحَ (Ashbaha)', 'Menjadi (waktu pagi)', 'أَصْبَحَ الْجَوُّ بَارِدًا', 'الْجَوُّ: Isim Ashbaha (Dhammah), بَارِدًا: Khabar Ashbaha (Fathah)'],
        ['صَارَ (Shaara)', 'Menjadi / Berubah', 'صَارَ التِّلْمِيْذُ نَشِيْطًا', 'التِّلْمِيْذُ: Isim Shaara (Dhammah), نَشِيْطًا: Khabar Shaara (Fathah)'],
        ['لَيْسَ (Laisa)', 'Bukan / Tidak', 'لَيْسَ الِامْتِحَانُ صَعْبًا', 'الِامْتِحَانُ: Isim Laisa (Dhammah), صَعْبًا: Khabar Laisa (Fathah)'],
      ],
      examples: [
        {
          arabic: 'كَانَ النَّبِيُّ يَتِيْمًا',
          meaning: 'Nabi dahulu adalah seorang anak yatim.',
          analysis: 'يَتِيْمًا berharakat fathah dua (tanwin nashab) karena berkedudukan sebagai Khabar Kaana.',
        },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Pada tanggal berapakah Nabi Muhammad SAW dilahirkan menurut tarikh?',
        arabicPrompt: 'فِي أَيِّ يَوْمٍ وُلِدَ الرَّسُوْلُ ﷺ؟',
        options: ['1 Muharram', '12 Rabi\'ul Awwal', '17 Ramadhan', '10 Dzulhijjah'],
        correctIndex: 1,
        explanation: 'Rasulullah SAW dilahirkan pada tanggal 12 Rabi\'ul Awwal Tahun Gajah.',
      },
      {
        id: 2,
        question: 'Dalam kaidah "كَانَ وَأَخَوَاتُهَا", harakat khabar Kaana adalah...',
        arabicPrompt: 'إِعْرَابُ خَبَرِ "كَانَ" هُوَ:',
        options: ['Marfu\' (Dhammah)', 'Manshub (Fathah)', 'Majrur (Kasrah)', 'Majzum (Sukun)'],
        correctIndex: 1,
        explanation: 'Khabar Kaana selalu berkedudukan Manshub (berharakat fathah atau tanda nashab lainnya).',
      },
      {
        id: 3,
        question: 'Manakah penulisan kalimat Kaana yang benar di bawah ini?',
        arabicPrompt: 'أَيُّ الْجُمَلِ الْآتِيَةِ صَحِيْحَةٌ؟',
        options: [
          'كَانَ الْمَسْجِدُ كَبِيْرٌ',
          'كَانَ الْمَسْجِدَ كَبِيْرٌ',
          'كَانَ الْمَسْجِدُ كَبِيْرًا',
          'كَانَ الْمَسْجِدِ كَبِيْرًا',
        ],
        correctIndex: 2,
        explanation: 'Isim Kaana marfu\' (الْمَسْجِدُ) dan khabar Kaana manshub (كَبِيْرًا).',
      },
      {
        id: 4,
        question: 'Gelar "Al-Amin" yang disandang Rasulullah SAW bermakna...',
        arabicPrompt: 'مَا مَعْنَى لَقَبِ "الْأَمِيْن" لِلنَّبِيِّ ﷺ؟',
        options: ['Yang dapat dipercaya', 'Pemberani', 'Pemimpin perang', 'Ahli berniaga'],
        correctIndex: 0,
        explanation: 'Al-Amin artinya orang yang jujur dan sangat terpercaya.',
      },
      {
        id: 5,
        question: 'Kata "لَيْسَ" termasuk saudara Kaana yang berfungsi untuk...',
        arabicPrompt: 'كَلِمَةُ "لَيْسَ" تُفِيْدُ:',
        options: ['Perubahan waktu pagi', 'Penafian / Bukan / Tidak', 'Harapan', 'Perintah'],
        correctIndex: 1,
        explanation: 'Laisa (لَيْسَ) berfaedah li-nafyi (menafikan / menyatakan tidak / bukan).',
      },
    ],
  },
  {
    id: 'bab-3',
    number: 3,
    titleArabic: 'نُزُوْلُ الْقُرْآنِ وَالْعِيْدَانِ',
    titleTransliteration: "Nuzuulul-Qur'an wal-'Iidaan",
    titleIndonesian: "Nuzulul Qur'an & Dua Hari Raya",
    theme: "Turunnya Al-Qur'an & I'rab Fi'il Mudhari'",
    iconName: 'BookOpen',
    badgeColor: 'amber',
    summary: 'Mempelajari peristiwa Nuzulul Qur\'an di Gua Hira, malam Lailatul Qadar, Hari Raya Idul Fitri & Idul Adha, serta huruf nashab dan jazam pada Fi\'il Mudhari\'.',
    vocabulary: [
      {
        id: 'b3-1',
        arabic: 'نَزَلَ - يَنْزِلُ',
        transliteration: 'Nazala - Yanzilu',
        meaning: 'Turun',
        category: 'kata_kerja',
        exampleArabic: 'نَزَلَ الْقُرْآنُ فِي لَيْلَةِ الْقَدْرِ.',
        exampleTranslation: 'Al-Qur\'an diturunkan pada malam Lailatul Qadar.',
      },
      {
        id: 'b3-2',
        arabic: 'غَارُ حِرَاء',
        transliteration: 'Ghaaru Hiraa\'',
        meaning: 'Gua Hira',
        category: 'kata_benda',
        exampleArabic: 'كَانَ النَّبِيُّ يَتَعَبَّدُ فِي غَارِ حِرَاء.',
        exampleTranslation: 'Nabi dahulu beribadah di Gua Hira.',
      },
      {
        id: 'b3-3',
        arabic: 'عِيْدُ الْفِطْرِ وَعِيْدُ الْأَضْحَى',
        transliteration: "'Iidul-Fithri wa 'Iidul-Adh-haa",
        meaning: 'Hari Raya Idul Fitri dan Idul Adha',
        category: 'kata_benda',
        exampleArabic: 'يَحْتَفِلُ الْمُسْلِمُوْنَ بِعِيْدَيْنِ: عِيْدِ الْفِطْرِ وَعِيْدِ الْأَضْحَى.',
        exampleTranslation: 'Kaum muslimin merayakan dua hari raya: Idul Fitri dan Idul Adha.',
      },
      {
        id: 'b3-4',
        arabic: 'ذَبَحَ - يَذْبَحُ',
        transliteration: 'Dzabaha - Yadzbahu',
        meaning: 'Menyembelih (Kurban)',
        category: 'kata_kerja',
        exampleArabic: 'يَذْبَحُ الْمُسْلِمُوْنَ الْأُضْحِيَّةَ يَوْمَ عِيْدِ الْأَضْحَى.',
        exampleTranslation: 'Kaum muslimin menyembelih kurban pada hari raya Idul Adha.',
      },
      {
        id: 'b3-5',
        arabic: 'زَكَاةُ الْفِطْرِ',
        transliteration: 'Zakaatul-Fithr',
        meaning: 'Zakat Fitrah',
        category: 'kata_benda',
        exampleArabic: 'يُؤَدِّي الْمُسْلِمُ زَكَاةَ الْفِطْرِ قَبْلَ صَلَاةِ الْعِيْدِ.',
        exampleTranslation: 'Muslim menunaikan zakat fitrah sebelum shalat Id.',
      },
    ],
    dialogue: [
      {
        speaker: 'رِضْوَان (Ridwan)',
        arabic: 'مَاذَا تُحِبُّ أَنْ تَعْمَلَ فِي يَوْمِ عِيْدِ الْفِطْرِ؟',
        transliteration: "Maadzaa tuhibbu an ta'mala fii yaumi 'iidil-fithr?",
        meaning: 'Apa yang kamu sukai untuk dikerjakan pada hari raya Idul Fitri?',
      },
      {
        speaker: 'زَيْد (Zaid)',
        arabic: 'أُحِبُّ أَنْ أُصَلِّيَ صَلَاةَ الْعِيْدِ فِي الْمُصَلَّى، ثُمَّ أَزُوْرَ أَقَارِبِي وَأَصْدِقَائِي.',
        transliteration: "Uhibbu an ushalliya shalaatal-'iidi fil-mushallaa, tsumma azuura aqaaribii wa ashdiqaa'ii.",
        meaning: 'Aku suka melaksanakan shalat Id di lapangan, kemudian bersilaturahmi ke kerabat dan sahabat-sahabatku.',
      },
    ],
    readingText: {
      title: 'نُزُوْلُ الْقُرْآنِ الْكَرِيْمِ',
      arabic: `فِي السَّابِعَ عَشَرَ مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ، جَاءَ جِبْرِيْلُ عَلَيْهِ السَّلَامُ إِلَى رَسُوْلِ اللّٰهِ ﷺ فِي غَارِ حِرَاء، وَقَالَ لَهُ: "اقْرَأْ!". فَقَالَ النَّبِيُّ: "مَا أَنَا بِقَارِئٍ". فَأَنْزَلَ اللّٰهُ أَوَّلَ آيَاتِ الْقُرْآنِ: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾. وَهَكَذَا بَدَأَتِ الرِّسَالَةُ النَّبَوِيَّةُ لِهِدَايَةِ الْبَشَرِيَّةِ.`,
      translation: `Pada tanggal 17 bulan suci Ramadhan, Malaikat Jibril as datang kepada Rasulullah SAW di Gua Hira dan berkata kepadanya: "Bacalah!". Maka Nabi menjawab: "Aku tidak bisa membaca". Lalu Allah menurunkan permulaan ayat Al-Qur'an: "Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan". Demikianlah permulaan risalah kenabian untuk petunjuk seluruh umat manusia.`,
    },
    grammar: {
      title: 'إِعْرَابُ الْفِعْلِ الْمُضَارِعِ (I\'rab Fi\'il Mudhari\')',
      explanation: 'Fi\'il Mudhari\' secara asal adalah Marfu\' (tanda dhammah: يَكْتُبُ). Namun jika didahului Huruf Nashab menjadi Manshub (fathah: أَنْ يَكْتُبَ), dan jika didahului Huruf Jazm menjadi Majzum (sukun: لَمْ يَكْتُبْ).',
      tableHeaders: ['Keadaan', 'Pemicu / Huruf', 'Contoh Kalimat', 'Tanda I\'rab'],
      tableRows: [
        ['مَرْفُوْعٌ (Marfu\')', 'Tanpa huruf nashab / jazm', 'يَذْهَبُ التِّلْمِيْذُ إِلَى الْمَدْرَسَةِ', 'Dhammah (ـُ) di akhir'],
        ['مَنْصُوْبٌ (Manshub)', 'أَنْ (bahwa), لَنْ (tidak akan), كَيْ (agar)', 'أُرِيْدُ أَنْ أَقْرَأَ الْقُرْآنَ', 'Fathah (ـَ) di akhir'],
        ['مَجْزُوْمٌ (Majzum)', 'لَمْ (belum/tidak), لَا النَّاهِيَة (jangan)', 'لَا تَتَكَاسَلْ فِي الدِّرَاسَةِ', 'Sukun (ـْ) di akhir'],
      ],
      examples: [
        {
          arabic: 'لَنْ يَنْجَحَ الْكَسْلَانُ',
          meaning: 'Orang malas tidak akan pernah sukses.',
          analysis: 'يَنْجَحَ manshub dengan fathah karena didahului huruf لَنْ.',
        },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Surat dan ayat apakah yang pertama kali turun di Gua Hira?',
        arabicPrompt: 'مَا هِيَ أَوَّلُ آيَةٍ نَزَلَتْ مِنَ الْقُرْآنِ الْكَرِيْمِ؟',
        options: ['Surat Al-Baqarah ayat 1', 'Surat Al-Fatihah', 'Surat Al-\'Alaq ayat 1-5', 'Surat Al-Ikhlas'],
        correctIndex: 2,
        explanation: 'Ayat pertama yang diturunkan adalah Surah Al-\'Alaq ayat 1-5 diawali firman "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ".',
      },
      {
        id: 2,
        question: 'Jika kata "يَكْتُبُ" didahului oleh huruf "لَمْ", maka harakat akhirnya menjadi...',
        arabicPrompt: 'إِذَا دَخَلَتْ "لَمْ" عَلَى الْفِعْلِ "يَكْتُبُ" فَإِنَّهُ يُصْبِحُ:',
        options: ['لَمْ يَكْتُبُ', 'لَمْ يَكْتُبَ', 'لَمْ يَكْتُبْ', 'لَمْ يَكْتُبِ'],
        correctIndex: 2,
        explanation: 'Huruf "لَمْ" adalah huruf jazm yang men-sukunkan huruf terakhir fi\'il mudhari\' (لَمْ يَكْتُبْ).',
      },
      {
        id: 3,
        question: 'Kapan umat Islam merayakan Hari Raya Idul Adha?',
        arabicPrompt: 'مَتَى يَحْتَفِلُ الْمُسْلِمُوْنَ بِعِيْدِ الْأَضْحَى؟',
        options: ['1 Syawal', '10 Dzulhijjah', '1 Muharram', '17 Ramadhan'],
        correctIndex: 1,
        explanation: 'Idul Adha dirayakan pada 10 Dzulhijjah bertepatan dengan pelaksanaan ibadah Haji dan Kurban.',
      },
      {
        id: 4,
        question: 'Kata berikut yang merupakan Huruf Nashab untuk Fi\'il Mudhari\' adalah...',
        arabicPrompt: 'مِنْ حُرُوْفِ النَّصْبِ لِلْفِعْلِ الْمُضَارِعِ:',
        options: ['لَمْ', 'أَنْ', 'فِي', 'مِنْ'],
        correctIndex: 1,
        explanation: 'أَنْ adalah salah satu huruf nashab utama pembuat Fi\'il Mudhari\' berharakat fathah.',
      },
      {
        id: 5,
        question: 'Apa arti dari ungkapan "لَا تَلْعَبْ فِي الشَّارِعِ" ?',
        arabicPrompt: 'مَا مَعْنَى "لَا تَلْعَبْ فِي الشَّارِعِ"؟',
        options: [
          'Dia tidak bermain di jalan',
          'Jangan kamu bermain di jalan!',
          'Saya senang bermain di jalan',
          'Kamu telah bermain di jalan',
        ],
        correctIndex: 1,
        explanation: 'لَا di sini adalah Laa An-Nahiyah (larangan), bermakna: "Jangan kamu bermain di jalan!".',
      },
    ],
  },
  {
    id: 'bab-4',
    number: 4,
    titleArabic: 'جَمَالُ الطَّبِيْعَةِ',
    titleTransliteration: "Jamaaluth-Thabi'ah",
    titleIndonesian: 'Keindahan Alam Semesta',
    theme: 'Menikmati Alam & Kaidah Fi\'il Amr',
    iconName: 'Mountain',
    badgeColor: 'teal',
    summary: 'Mempelajari kosakata tentang bentang alam, gunung, pantai, air terjun, keindahan negeri Indonesia, serta pembentukan kata kerja perintah (Fi\'il Amr) dan tashrifnya.',
    vocabulary: [
      {
        id: 'b4-1',
        arabic: 'جَبَلٌ - جِبَالٌ',
        transliteration: 'Jabalun - Jibaalun',
        meaning: 'Gunung - Pegunungan',
        category: 'kata_benda',
        exampleArabic: 'جَبَلُ بُرُوْمُوْ مِنْ أَجْمَلِ الْجِبَالِ فِي إِنْدُوْنِيْسِيَا.',
        exampleTranslation: 'Gunung Bromo adalah salah satu gunung terindah di Indonesia.',
      },
      {
        id: 'b4-2',
        arabic: 'بَحْرٌ - بِحَارٌ',
        transliteration: 'Bahrun - Bihaarun',
        meaning: 'Laut - Lautan',
        category: 'kata_benda',
        exampleArabic: 'مَاءُ الْبَحْرِ أَزْرَقُ جَمِيْلٌ.',
        exampleTranslation: 'Air laut berwarna biru yang indah.',
      },
      {
        id: 'b4-3',
        arabic: 'شَلَّالٌ - شَلَّالَاتٌ',
        transliteration: 'Syallaalun - Syallaalaat',
        meaning: 'Air Terjun',
        category: 'kata_benda',
        exampleArabic: 'زُرْنَا الشَّلَّالَ فِي الْعُطْلَةِ الْمَاضِيَةِ.',
        exampleTranslation: 'Kami mengunjungi air terjun pada liburan lalu.',
      },
      {
        id: 'b4-4',
        arabic: 'اُنْظُرْ - اُنْظُرِي',
        transliteration: 'Unzhur - Unzhurii',
        meaning: 'Lihatlah! (Perintah untuk L / P)',
        category: 'kata_kerja',
        exampleArabic: 'اُنْظُرْ إِلَى تِلْكَ الْأَشْجَارِ الْخَضْرَاءِ!',
        exampleTranslation: 'Lihatlah ke pohon-pohon yang hijau itu!',
      },
      {
        id: 'b4-5',
        arabic: 'مَزْرَعَةٌ - مَزَارِعُ',
        transliteration: "Mazra'atun - Mazaari'",
        meaning: 'Sawah / Ladang / Perkebunan',
        category: 'kata_benda',
        exampleArabic: 'الْمَزَارِعُ خَضْرَاءُ وَاسِعَةٌ.',
        exampleTranslation: 'Sawah-sawah itu hijau dan luas.',
      },
    ],
    dialogue: [
      {
        speaker: 'طَارِق (Thariq)',
        arabic: 'يَا لَهُ مِنْ مَنْظَرٍ رَائِعٍ! اُنْظُرْ يَا سَلْمَان إِلَى هَذَا الْجَبَلِ الْعَالِي.',
        transliteration: "Yaa lahu min manzharin raa'i'! Unzhur yaa Salman ilaa haadzal-jabalil-'aalii.",
        meaning: 'Betapa indahnya pemandangan ini! Lihatlah wahai Salman ke gunung yang tinggi ini.',
      },
      {
        speaker: 'سَلْمَان (Salman)',
        arabic: 'سُبْحَانَ اللّٰهِ الْخَالِقِ! إِنَّ إِنْدُوْنِيْسِيَا بَلَدٌ غَنِيٌّ بِالْمَنَاظِرِ الطَّبِيْعِيَّةِ الْجَمِيْلَةِ.',
        transliteration: "Subhaana Allahil-Khaaliq! Inna Induuniisiyaa baladun ghaniyyun bil-manaa-zhirith-thabii'iyyatil-jamiilah.",
        meaning: 'Maha Suci Allah Sang Pencipta! Sungguh Indonesia adalah negeri yang kaya akan pemandangan alam yang indah.',
      },
    ],
    readingText: {
      title: 'رِحْلَةٌ إِلَى شَاطِئِ الْبَحْرِ',
      arabic: `ذَهَبَ التَّلَامِيْذُ فِي رِحْلَةٍ مَدْرَسِيَّةٍ إِلَى شَاطِئِ الْبَحْرِ. رَأَوْا أَمْوَاجَ الْبَحْرِ تَتَلَاطَمُ، وَالرِّمَالَ النَّاعِمَةَ، وَأَشْجَارَ النَّارَجِيْلِ تَتَمَايَلُ مَعَ الرِّيْحِ. فَرِحَ التَّلَامِيْذُ كَثِيْرًا وَشَكَرُوا اللّٰهَ عَلَى نِعَمِهِ الْعَظِيْمَةِ الَّتِي أَوْدَعَهَا فِي هَذَا الْكَوْنِ.`,
      translation: `Para murid pergi dalam sebuah rekreasi sekolah ke tepi pantai. Mereka melihat ombak laut saling berkejaran, pasir pantai yang halus, dan pohon kelapa yang melambai ditiup angin. Para murid sangat gembira dan bersyukur kepada Allah atas nikmat-nikmat agung yang Dia titipkan di alam semesta ini.`,
    },
    grammar: {
      title: 'فِعْلُ الْأَمْرِ وَتَصْرِيْفُهُ (Fi\'il Amr & Konjugasinya)',
      explanation: 'Fi\'il Amr adalah kata kerja yang digunakan untuk meminta atau memerintahkan seseorang mengerjakan sesuatu. Fi\'il Amr ditujukan kepada lawan bicara (Mukhathab).',
      tableHeaders: ['Dhamir Lawan Bicara', 'Arti', 'Bentuk Fi\'il Amr (Contoh: نَظَرَ)', 'Tanda Bina\' / Akhiran'],
      tableRows: [
        ['أَنْتَ (Anta)', 'Kamu (1 Laki-laki)', 'اُنْظُرْ (Unzhur)', "Mabni 'alal Sukun (ـْ)"],
        ['أَنْتُمَا (Antumaa)', 'Kalian (2 Orang)', 'اُنْظُرَا (Unzhuraa)', 'Membuang Nun (Alif tasniyah)'],
        ['أَنْتُمْ (Antum)', 'Kalian (>2 Laki-laki)', 'اُنْظُرُوْا (Unzhuruu)', "Membuang Nun (Wawu jama'ah)"],
        ['أَنْتِ (Anti)', 'Kamu (1 Perempuan)', 'اُنْظُرِي (Unzhurii)', 'Membuang Nun (Ya mukhatabah)'],
        ['أَنْتُنَّ (Antunna)', 'Kalian (>2 Perempuan)', 'اُنْظُرْنَ (Unzhurna)', 'Nun Niswah'],
      ],
      examples: [
        {
          arabic: 'يَا حَسَنُ، اقْرَأْ هَذَا الدَّرْسَ!',
          meaning: 'Wahai Hasan, bacalah pelajaran ini!',
          analysis: "اقْرَأْ adalah Fi'il Amr mabni 'alal sukun untuk أَنْتَ.",
        },
        {
          arabic: 'يَا عَائِشَةُ، اُكْتُبِي الْوَاجِبَ!',
          meaning: 'Wahai Aisyah, tulislah PR-mu!',
          analysis: 'اُكْتُبِي ditujukan untuk perempuan tunggal (أَنْتِ) dengan tambahan Ya.',
        },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Fi\'il Amr dari kata "فَتَحَ - يَفْتَحُ" untuk kamu seorang laki-laki (أَنْتَ) adalah...',
        arabicPrompt: 'فِعْلُ الْأَمْرِ مِنْ "فَتَحَ" لِلْمُفْرَدِ الْمُذَكَّرِ هُوَ:',
        options: ['اِفْتَحْ', 'اِفْتَحِي', 'اِفْتَحُوْا', 'يَفْتَحُ'],
        correctIndex: 0,
        explanation: 'Bentuk fi\'il amr untuk satu laki-laki adalah اِفْتَحْ (iftah) dengan sukun di akhir.',
      },
      {
        id: 2,
        question: 'Bagaimanakah bentuk perintah untuk seorang siswi perempuan (Fatima): "Masuklah ke kelas!" ?',
        arabicPrompt: 'يَا فَاطِمَةُ، ... إِلَى الْفَصْلِ!',
        options: ['اُدْخُلْ', 'اُدْخُلِي', 'اُدْخُلُوْا', 'دَخَلَتْ'],
        correctIndex: 1,
        explanation: 'Untuk lawan bicara perempuan tunggal (أَنْتِ), Fi\'il Amr berakhiran Ya Mukhathabah: اُدْخُلِي (udkhulii).',
      },
      {
        id: 3,
        question: 'Kata "شَلَّالٌ" dalam bahasa Indonesia berarti...',
        arabicPrompt: 'مَا مَعْنَى كَلِمَةِ "شَلَّالٌ"؟',
        options: ['Danau', 'Sungai', 'Air Terjun', 'Lembah'],
        correctIndex: 2,
        explanation: 'Syallal (شَلَّالٌ) artinya adalah air terjun.',
      },
      {
        id: 4,
        question: 'Bentuk perintah jama\' untuk banyak siswa laki-laki "Duduklah kalian!" adalah...',
        arabicPrompt: 'الْأَمْرُ لِجَمَاعَةِ الذُّكُوْرِ (أَنْتُمْ):',
        options: ['اِجْلِسْ', 'اِجْلِسَا', 'اِجْلِسُوْا', 'اِجْلِسْنَ'],
        correctIndex: 2,
        explanation: 'Untuk dhamir antum (kalian laki-laki), fi\'il amr ditambah Wawu Jama\'ah: اِجْلِسُوْا (ijilisuu).',
      },
      {
        id: 5,
        question: 'Apa arti dari "جَبَلٌ عَالٍ" ?',
        arabicPrompt: 'مَا مَعْنَى "جَبَلٌ عَالٍ"؟',
        options: ['Lembah yang dalam', 'Gunung yang tinggi', 'Laut yang luas', 'Pohon yang rindang'],
        correctIndex: 1,
        explanation: 'جَبَلٌ عَالٍ artinya gunung yang tinggi.',
      },
    ],
  },
  {
    id: 'bab-5',
    number: 5,
    titleArabic: 'خَالِقُ الْعَالَمِ',
    titleTransliteration: "Khaaliqul-'Aalam",
    titleIndonesian: 'Pencipta Alam Semesta',
    theme: 'Tadabbur Ciptaan Allah & Isim Tafdhil',
    iconName: 'Sun',
    badgeColor: 'violet',
    summary: 'Mempelajari kosakata benda-benda langit (matahari, bulan, bintang, bumi), keagungan Allah sebagai Sang Khaliq, serta kaidah Isim Tafdhil (komparatif & superlatif wazan أَفْعَلُ).',
    vocabulary: [
      {
        id: 'b5-1',
        arabic: 'خَلَقَ - يَخْلُقُ',
        transliteration: 'Khalaqa - Yakhluqu',
        meaning: 'Menciptakan',
        category: 'kata_kerja',
        exampleArabic: 'اللّٰهُ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ.',
        exampleTranslation: 'Allah menciptakan langit dan bumi dengan benar.',
      },
      {
        id: 'b5-2',
        arabic: 'شَمْسٌ وَقَمَرٌ',
        transliteration: 'Syamsun wa Qamarun',
        meaning: 'Matahari dan Bulan',
        category: 'kata_benda',
        exampleArabic: 'الشَّمْسُ تُضِيْءُ النَّهَارَ، وَالْقَمَرُ يُنِيْرُ اللَّيْلَ.',
        exampleTranslation: 'Matahari menerangi siang hari dan bulan menyinari malam.',
      },
      {
        id: 'b5-3',
        arabic: 'نُجُوْمٌ - نَجْمٌ',
        transliteration: 'Nujuumun - Najmun',
        meaning: 'Bintang - Bintang-bintang',
        category: 'kata_benda',
        exampleArabic: 'النُّجُوْمُ تَلْمَعُ فِي السَّمَاءِ لَيْلًا.',
        exampleTranslation: 'Bintang-bintang berkilauan di langit pada malam hari.',
      },
      {
        id: 'b5-4',
        arabic: 'أَكْبَرُ مِنْ / أَصْغَرُ مِنْ',
        transliteration: 'Akbaru min / Ashgharu min',
        meaning: 'Lebih besar dari / Lebih kecil dari',
        category: 'ungkapan',
        exampleArabic: 'الشَّمْسُ أَكْبَرُ مِنَ الْأَرْضِ.',
        exampleTranslation: 'Matahari lebih besar daripada bumi.',
      },
      {
        id: 'b5-5',
        arabic: 'الْقَادِرُ عَلَى كُلِّ شَيْءٍ',
        transliteration: "Al-Qaadiru 'alaa kulli syai'",
        meaning: 'Maha Kuasa atas segala sesuatu',
        category: 'ungkapan',
        exampleArabic: 'إِنَّ اللّٰهَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ.',
        exampleTranslation: 'Sesungguhnya Allah Maha Kuasa atas segala sesuatu.',
      },
    ],
    dialogue: [
      {
        speaker: 'يُوْسُف (Yusuf)',
        arabic: 'تَأَمَّلْ يَا صَدِيْقِي فِي عَظَمَةِ هَذَا الْكَوْنِ! مَنْ خَلَقَ كُلَّ هَذَا؟',
        transliteration: "Ta'ammal yaa shadiiqii fii 'azhamati haadzal-kaun! Man khalaqa kulla haadzaa?",
        meaning: 'Renungkanlah wahai sahabatku keagungan alam semesta ini! Siapakah yang menciptakan semua ini?',
      },
      {
        speaker: 'إِبْرَاهِيْم (Ibrahim)',
        arabic: 'اللّٰهُ الْوَاحِدُ الْأَحَدُ هُوَ الَّذِي خَلَقَ الْعَالَمَ بِحِكْمَتِهِ وَقُدْرَتِهِ.',
        transliteration: "Allahu al-Waahidul-Ahad huwa alladzii khalaqal-'aalama bihikmatihii wa qudratih.",
        meaning: 'Allah Yang Maha Esa, Dialah yang menciptakan alam semesta dengan hikmah dan kekuasaan-Nya.',
      },
    ],
    readingText: {
      title: 'عَظَمَةُ خَلْقِ اللّٰهِ',
      arabic: `إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ لَآيَاتٍ لِأُوْلِي الْأَلْبَابِ. خَلَقَ اللّٰهُ الشَّمْسَ لِتَكُوْنَ سِرَاجًا وَهَّاجًا، وَجَعَلَ الْقَمَرَ نُوْرًا. وَمَدَّ الْأَرْضَ وَأَرْسَى فِيْهَا الْجِبَالَ الرَّوَاسِيَ، وَأَنْبَتَ فِيْهَا مِنْ كُلِّ زَوْجٍ بَهِيْجٍ. كُلُّ ذٰلِكَ يَدُلُّ عَلَى وَحْدَانِيَّةِ اللّٰهِ وَقُدْرَتِهِ الْمُطْلَقَةِ.`,
      translation: `Sesungguhnya dalam penciptaan langit dan bumi terdapat tanda-tanda bagi orang yang berakal. Allah menciptakan matahari sebagai pelita yang terang benderang, dan menjadikan bulan bercahaya. Dan Dia menghamparkan bumi serta menancapkan gunung-gunung yang kokoh di atasnya, serta menumbuhkan berbagai tanaman yang indah. Semua itu menunjukkan keesaan Allah dan kekuasaan-Nya yang mutlak.`,
    },
    grammar: {
      title: 'اسْمُ التَّفْضِيْلِ (Isim Tafdhil: Komparatif & Superlatif)',
      explanation: 'Isim Tafdhil mengikuti pola wazan أَفْعَلُ (Af\'alu). Digunakan untuk menyatakan "lebih ..." (jika ditambah مِنْ) atau "paling ..." (jika disandarkan pada kata benda berikutnya).',
      tableHeaders: ['Kata Sifat Dasar', 'Isim Tafdhil (أَفْعَلُ)', 'Contoh Kalimat', 'Arti'],
      tableRows: [
        ['كَبِيْرٌ (Besar)', 'أَكْبَرُ (Lebih/Paling besar)', 'الشَّمْسُ أَكْبَرُ مِنَ الْقَمَرِ', 'Matahari lebih besar daripada bulan.'],
        ['جَمِيْلٌ (Indah)', 'أَجْمَلُ (Lebih/Paling indah)', 'الْحَدِيْقَةُ أَجْمَلُ مِنَ الشَّارِعِ', 'Taman lebih indah daripada jalan raya.'],
        ['عَالٍ (Tinggi)', 'أَعْلَى (Lebih/Paling tinggi)', 'هَذَا الْجَبَلُ أَعْلَى جَبَلٍ', 'Gunung ini adalah gunung yang paling tinggi.'],
        ['كَثِيْرٌ (Banyak)', 'أَكْثَرُ (Lebih/Paling banyak)', 'الْمُجْتَهِدُ أَكْثَرُ نَجَاحًا', 'Orang rajin lebih banyak kesuksesannya.'],
      ],
      examples: [
        {
          arabic: 'اللّٰهُ أَكْبَرُ مِنْ كُلِّ شَيْءٍ',
          meaning: 'Allah Maha Besar dari segala sesuatu.',
          analysis: 'أَكْبَرُ adalah isim tafdhil wazan أَفْعَلُ.',
        },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Pola wazan baku untuk membentuk Isim Tafdhil (menyatakan lebih/paling) adalah...',
        arabicPrompt: 'وَزْنُ اسْمِ التَّفْضِيْلِ هُوَ:',
        options: ['فَاعِلٌ', 'مَفْعُوْلٌ', 'أَفْعَلُ', 'فَعِيْلٌ'],
        correctIndex: 2,
        explanation: 'Isim Tafdhil dibentuk berdasarkan wazan أَفْعَلُ (contoh: أَكْبَرُ, أَجْمَلُ, أَصْغَرُ).',
      },
      {
        id: 2,
        question: 'Manakah bentuk komparatif yang benar untuk mengatakan: "Gajah lebih besar daripada kucing" ?',
        arabicPrompt: 'الْفِيْلُ ... مِنَ الْقِطِّ.',
        options: ['كَبِيْرٌ', 'أَكْبَرُ', 'كِبَارٌ', 'تَكْبِيْرٌ'],
        correctIndex: 1,
        explanation: 'Gunakan pola isim tafdhil: أَكْبَرُ مِنْ (lebih besar dari).',
      },
      {
        id: 3,
        question: 'Kata bahasa Arab untuk "Bintang-bintang di langit" adalah...',
        arabicPrompt: 'مَا مَعْنَى "النُّجُوْمُ فِي السَّمَاءِ"؟',
        options: ['Matahari di bumi', 'Bintang-bintang di langit', 'Bulan di malam hari', 'Awan di udara'],
        correctIndex: 1,
        explanation: 'النُّجُوْمُ adalah bentuk jamak dari نَجْمٌ (bintang), السَّمَاءِ artinya langit.',
      },
      {
        id: 4,
        question: 'Isim tafdhil dari kata sifat "قَرِيْبٌ" (dekat) adalah...',
        arabicPrompt: 'اسْمُ التَّفْضِيْلِ مِنْ "قَرِيْبٌ" هُوَ:',
        options: ['أَقْرَبُ', 'مُقَرَّبٌ', 'قُرْبَانٌ', 'قَرِيْبُوْنَ'],
        correctIndex: 0,
        explanation: 'Berdasarkan wazan أَفْعَلُ, kata قَرِيْبٌ berubah menjadi أَقْرَبُ (lebih dekat).',
      },
      {
        id: 5,
        question: 'Lengkapilah kalimat berikut: "مَسْجِدُ الْمَدْرَسَةِ ... مَسْجِدٍ فِي الْقَرْيَةِ" (paling luas)',
        arabicPrompt: 'مَسْجِدُ الْمَدْرَسَةِ ... مَسْجِدٍ فِي الْقَرْيَةِ.',
        options: ['وَاسِعٌ', 'أَوْسَعُ', 'اتِّسَاعٌ', 'تَوْسِيْعٌ'],
        correctIndex: 1,
        explanation: 'Superlatif dari وَاسِعٌ adalah أَوْسَعُ (paling luas).',
      },
    ],
  },
  {
    id: 'bab-6',
    number: 6,
    titleArabic: 'الْحِفَاظُ عَلَى الْبِيْئَةِ',
    titleTransliteration: "Al-Hifaazhu 'alal-Bii'ah",
    titleIndonesian: 'Pelestarian Lingkungan Hidup',
    theme: 'Menjaga Kebersihan & Struktur Jumlah Ismiyyah/Fi\'liyyah',
    iconName: 'Leaf',
    badgeColor: 'green',
    summary: 'Mempelajari adab Islam dalam menjaga kelestarian alam, tidak mencemari air dan udara, menanam pohon, serta menguasai struktur kalimat Ismiyyah dan Fi\'liyyah.',
    vocabulary: [
      {
        id: 'b6-1',
        arabic: 'الْبِيْئَةُ',
        transliteration: "Al-Bii'ah",
        meaning: 'Lingkungan Hidup',
        category: 'kata_benda',
        exampleArabic: 'يَجِبُ عَلَيْنَا أَنْ نُحَافِظَ عَلَى الْبِيْئَةِ.',
        exampleTranslation: 'Wajib bagi kita untuk menjaga kelestarian lingkungan.',
      },
      {
        id: 'b6-2',
        arabic: 'نَظَافَةٌ',
        transliteration: 'Nazhaafatun',
        meaning: 'Kebersihan',
        category: 'kata_benda',
        exampleArabic: 'النَّظَافَةُ مِنَ الْإِيْمَانِ.',
        exampleTranslation: 'Kebersihan itu sebagian dari iman.',
      },
      {
        id: 'b6-3',
        arabic: 'قُمَامَةٌ / مَزْبَلَةٌ',
        transliteration: 'Qumaamatun / Mazbalah',
        meaning: 'Sampah / Tempat Pembuangan Sampah',
        category: 'kata_benda',
        exampleArabic: 'اِرْمِ الْقُمَامَةَ فِي مَكَانِهَا الْمُخَصَّصِ!',
        exampleTranslation: 'Buanglah sampah pada tempat yang disediakan!',
      },
      {
        id: 'b6-4',
        arabic: 'غَرَسَ - يَغْرِسُ',
        transliteration: 'Gharasa - Yaghrisu',
        meaning: 'Menanam (Pohon / Tanaman)',
        category: 'kata_kerja',
        exampleArabic: 'غَرَسَ التَّلَامِيْذُ الْأَشْجَارَ فِي فِنَاءِ الْمَدْرَسَةِ.',
        exampleTranslation: 'Para siswa menanam pepohonan di halaman madrasah.',
      },
      {
        id: 'b6-5',
        arabic: 'تَلَوُّثُ الْهَوَاءِ وَالْمَاءِ',
        transliteration: "Talawwutsul-hawaa'i wal-maa'",
        meaning: 'Pencemaran Udara dan Air',
        category: 'kata_benda',
        exampleArabic: 'التَّلَوُّثُ يَضُرُّ بِصِحَّةِ الْإِنْسَانِ.',
        exampleTranslation: 'Polusi itu membahayakan kesehatan manusia.',
      },
    ],
    dialogue: [
      {
        speaker: 'مُحَمَّد (Muhammad)',
        arabic: 'لِمَاذَا تَقُوْمُوْنَ بِحَمْلَةِ النَّظَافَةِ الْيَوْمَ؟',
        transliteration: "Limaadzaa taquumuuna bihamlatin-nazhaafatil-yaum?",
        meaning: 'Mengapa kalian mengadakan aksi bersih-bersih hari ini?',
      },
      {
        speaker: 'عُمَر (Umar)',
        arabic: 'لِأَنَّ دِيْنَنَا يَحُثُّنَا عَلَى النَّظَافَةِ وَحِمَايَةِ بِيْئَتِنَا مِنَ التَّلَوُّثِ.',
        transliteration: "Li'anna diinanaa yahutstsunaa 'alan-nazhaafati wa himaayati bii'atinaa minat-talawwuts.",
        meaning: 'Karena agama kita menganjurkan kebersihan dan melindungi lingkungan kita dari polusi.',
      },
    ],
    readingText: {
      title: 'الْإِسْلَامُ وَحِمَايَةُ الْبِيْئَةِ',
      arabic: `حَثَّ الْإِسْلَامُ عَلَى عِمَارَةِ الْأَرْضِ وَالْمُحَافَظَةِ عَلَيْهَا. نَهَى النَّبِيُّ ﷺ عَنْ إِفْسَادِ الْبِيْئَةِ، كَقَطْعِ الْأَشْجَارِ بِغَيْرِ حَقٍّ، أَوْ تَلْوِيْثِ مَصَادِرِ الْمِيَاهِ وَالطُّرُقِ. وَوَعَدَ مَنْ يَغْرِسُ غَرْسًا يَأْكُلُ مِنْهُ إِنْسَانٌ أَوْ طَيْرٌ بِأَجْرٍ وَصَدَقَةٍ جَارِيَةٍ عِنْدَ اللّٰهِ تَعَالَى.`,
      translation: `Islam sangat menganjurkan untuk memakmurkan bumi dan menjaganya. Nabi SAW melarang merusak lingkungan hidup, seperti menebang pepohonan tanpa hak, atau mencemari sumber-sumber air dan jalan umum. Beliau menjanjikan siapa saja yang menanam bibit pohon lalu buahnya dimakan oleh manusia atau burung, maka baginya pahala dan sedekah jariyah di sisi Allah Ta'ala.`,
    },
    grammar: {
      title: 'الْجُمْلَةُ الِاسْمِيَّةُ وَالْجُمْلَةُ الْفِعْلِيَّةُ (Kalimat Ismiyyah & Fi\'liyyah)',
      explanation: 'Jumlah Ismiyyah dimulai dengan Isim (Mubtada\' + Khabar, cth: التِّلْمِيْذُ نَشِيْطٌ). Sedangkan Jumlah Fi\'liyyah dimulai dengan Kata Kerja (Fi\'il + Fa\'il + Maf\'ul Bih, cth: يَغْرِسُ التِّلْمِيْذُ الشَّجَرَةَ).',
      tableHeaders: ['Tipe Kalimat', 'Pola Dasar', 'Contoh', 'Penjelasan'],
      tableRows: [
        ['جُمْلَةٌ اسْمِيَّةٌ', 'Isim (Mubtada\') + Khabar', 'الْبِيْئَةُ نَظِيْفَةٌ', 'الْبِيْئَةُ (Mubtada\' marfu\'), نَظِيْفَةٌ (Khabar marfu\')'],
        ['جُمْلَةٌ فِعْلِيَّةٌ', 'Fi\'il + Fa\'il + Maf\'ul Bih', 'يَحْمِي الْمُسْلِمُ الْبِيْئَةَ', 'يَحْمِي (Fi\'il), الْمُسْلِمُ (Fa\'il/Pelaku), الْبِيْئَةَ (Maf\'ul Bih/Objek manshub)'],
      ],
      examples: [
        {
          arabic: 'يَرْمِي الْوَلَدُ الْقُمَامَةَ فِي الصُّنْدُوْقِ',
          meaning: 'Anak itu membuang sampah ke dalam kotak tong sampah.',
          analysis: 'الْقُمَامَةَ berkedudukan sebagai Maf\'ul Bih (objek penderita), harakat akhirnya fathah (manshub).',
        },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Hadits Nabi yang masyhur menegaskan bahwa kebersihan adalah sebagian dari iman:',
        arabicPrompt: 'أَكْمِلِ الْحَدِيْثَ: "النَّظَافَةُ مِنَ ..."',
        options: ['الْعَمَلِ', 'الْإِيْمَانِ', 'الْإِحْسَانِ', 'الْعِلْمِ'],
        correctIndex: 1,
        explanation: 'Bunyi hadits masyhur adalah: "النَّظَافَةُ مِنَ الْإِيْمَانِ" (Kebersihan sebagian dari iman).',
      },
      {
        id: 2,
        question: 'Kalimat yang diawali dengan kata kerja (Fi\'il) disebut...',
        arabicPrompt: 'الْجُمْلَةُ الَّتِي تَبْدَأُ بِالْفِعْلِ تُسَمَّى:',
        options: ['Jumlah Ismiyyah', 'Jumlah Fi\'liyyah', 'Syibhuz Jumlah', 'Jumlah Shilah'],
        correctIndex: 1,
        explanation: 'Kalimat yang diawali kata kerja (fi\'il) disebut Jumlah Fi\'liyyah.',
      },
      {
        id: 3,
        question: 'Dalam kalimat "غَرَسَ التَّلَامِيْذُ الْأَشْجَارَ", kedudukan kata "الْأَشْجَارَ" adalah...',
        arabicPrompt: 'إِعْرَابُ كَلِمَةِ "الْأَشْجَارَ" فِي الْجُمْلَةِ:',
        options: ['Fi\'il (Kata kerja)', 'Fa\'il (Subjek)', 'Maf\'ul Bih (Objek)', 'Khabar'],
        correctIndex: 2,
        explanation: 'الْأَشْجَارَ (pepohonan) adalah objek yang ditanam (Maf\'ul Bih) sehingga berharakat fathah.',
      },
      {
        id: 4,
        question: 'Kata "تَلَوُّثٌ" dalam konteks lingkungan berarti...',
        arabicPrompt: 'مَا مَعْنَى كَلِمَةِ "تَلَوُّثٌ"؟',
        options: ['Penghijauan', 'Pencemaran / Polusi', 'Kelestarian', 'Banjir'],
        correctIndex: 1,
        explanation: 'Talawwuts (تَلَوُّثٌ) artinya pencemaran atau polusi.',
      },
      {
        id: 5,
        question: 'Pilihlah Jumlah Ismiyyah yang benar di bawah ini:',
        arabicPrompt: 'أَيُّ الْجُمَلِ الْآتِيَةِ جُمْلَةٌ اسْمِيَّةٌ؟',
        options: [
          'يَحْرِصُ التِّلْمِيْذُ عَلَى النَّظَافَةِ',
          'الْمَدْرَسَةُ نَظِيْفَةٌ وَجَمِيْلَةٌ',
          'تَكَلَّمَ الْمُعَلِّمُ أَمَامَ الْفَصْلِ',
          'اِجْتَهِدْ فِي دِرَاسَتِكَ',
        ],
        correctIndex: 1,
        explanation: 'الْمَدْرَسَةُ نَظِيْفَةٌ وَجَمِيْلَةٌ diawali dengan Isim (الْمَدْرَسَةُ) sehingga merupakan Jumlah Ismiyyah.',
      },
    ],
  },
];
