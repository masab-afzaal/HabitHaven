import { apiService } from '../api';

// Quranic verses collection with Urdu translations
const quranicVerses = [
  {
    id: 1,
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "بےشک مشکل کے ساتھ آسانی ہے",
    reference: "سورۃ الم نشرح (94:6)",
    surah: "Al-Inshirah",
    ayah: 6
  },
  {
    id: 2,
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    translation: "اور عنقریب آپ کا رب آپ کو اتنا دے گا کہ آپ راضی ہو جائیں گے",
    reference: "سورۃ الضحیٰ (93:5)",
    surah: "Ad-Duha",
    ayah: 5
  },
  {
    id: 3,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "پس یقیناً مشکل کے ساتھ آسانی ہے",
    reference: "سورۃ الم نشرح (94:5)",
    surah: "Al-Inshirah",
    ayah: 5
  },
  {
    id: 4,
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    translation: "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی دے اور آخرت میں بھی بھلائی عطا فرما",
    reference: "سورۃ البقرہ (2:201)",
    surah: "Al-Baqarah",
    ayah: 201
  },
  {
    id: 5,
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation: "اور جو اللہ سے ڈرتا ہے، اللہ اس کے لیے نکلنے کی راہ بنا دیتا ہے",
    reference: "سورۃ الطلاق (65:2)",
    surah: "At-Talaq",
    ayah: 2
  },
  {
    id: 6,
    arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
    translation: "اور اللہ کی رحمت سے مایوس نہ ہو",
    reference: "سورۃ یوسف (12:87)",
    surah: "Yusuf",
    ayah: 87
  },
  {
    id: 7,
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    translation: "پس تم مجھے یاد کرو میں تمہیں یاد کروں گا",
    reference: "سورۃ البقرہ (2:152)",
    surah: "Al-Baqarah",
    ayah: 152
  },
  {
    id: 8,
    arabic: "وَبَشِّرِ الصَّابِرِينَ",
    translation: "اور صبر کرنے والوں کو خوشخبری دے دو",
    reference: "سورۃ البقرہ (2:155)",
    surah: "Al-Baqarah",
    ayah: 155
  },
  {
    id: 9,
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "بےشک اللہ صبر کرنے والوں کے ساتھ ہے",
    reference: "سورۃ البقرہ (2:153)",
    surah: "Al-Baqarah",
    ayah: 153
  },
  {
    id: 10,
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    translation: "اور وہ تمہارے ساتھ ہے جہاں کہیں بھی تم ہو",
    reference: "سورۃ الحدید (57:4)",
    surah: "Al-Hadid",
    ayah: 4
  },
  {
    id: 11,
    arabic: "فَإِذَا فَرَغْتَ فَانصَبْ",
    translation: "پھر جب فارغ ہو تو عبادت میں مشغول ہو جا",
    reference: "سورۃ الم نشرح (94:7)",
    surah: "Al-Inshirah",
    ayah: 7
  },
  {
    id: 12,
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    translation: "اور دعا کرو کہ اے میرے رب! میرے علم میں اضافہ فرما",
    reference: "سورۃ طٰہٰ (20:114)",
    surah: "Ta-Ha",
    ayah: 114
  },
  {
    id: 13,
    arabic: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
    translation: "بےشک اللہ نیکی کرنے والوں کا اجر ضائع نہیں کرتا",
    reference: "سورۃ التوبہ (9:120)",
    surah: "At-Tawbah",
    ayah: 120
  },
  {
    id: 14,
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translation: "اور جو اللہ پر بھروسہ کرے تو وہ اس کے لیے کافی ہے",
    reference: "سورۃ الطلاق (65:3)",
    surah: "At-Talaq",
    ayah: 3
  },
  {
    id: 15,
    arabic: "وَاللَّهُ خَيْرٌ حَافِظًا",
    translation: "اور اللہ سب سے بہتر نگہبان ہے",
    reference: "سورۃ یوسف (12:64)",
    surah: "Yusuf",
    ayah: 64
  }
];

// Sahih Hadith collection (short) with references
const sahihHadith = [
  {
    id: 1,
    translation: "سب سے بہتر انسان وہ ہے جو لوگوں کے لیے سب سے زیادہ نفع بخش ہو",
    reference: "صحیح الجامع (3289)",
    narrator: "جابر بن عبداللہ رضی اللہ عنہ",
    book: "Sahih Al-Jami"
  },
  {
    id: 2,
    translation: "تمہارے لیے دو نعمتیں ہیں جن کے بارے میں بہت سے لوگ دھوکے میں ہیں: صحت اور فراغت",
    reference: "صحیح بخاری (6412)",
    narrator: "ابن عباس رضی اللہ عنہما",
    book: "Sahih Bukhari"
  },
  {
    id: 3,
    translation: "جو شخص اللہ کی راہ میں ایک قدم چلے، اللہ اس کی اور اس کے درمیان جو کچھ ہے اسے معاف کر دیتا ہے",
    reference: "سنن نسائی (3099)",
    narrator: "ابو ہریرہ رضی اللہ عنہ",
    book: "Sunan An-Nasa'i"
  },
  {
    id: 4,
    translation: "مؤمن کا معاملہ بھی عجیب ہے، اس کا ہر معاملہ بھلائی والا ہے",
    reference: "صحیح مسلم (2999)",
    narrator: "صہیب رضی اللہ عنہ",
    book: "Sahih Muslim"
  },
  {
    id: 5,
    translation: "اللہ تعالیٰ نرمی کرنے والے پر نرمی فرماتا ہے",
    reference: "صحیح بخاری (6927)",
    narrator: "عائشہ رضی اللہ عنہا",
    book: "Sahih Bukhari"
  },
  {
    id: 6,
    translation: "جو شخص اپنے بھائی کی حاجت میں ہو، اللہ اس کی حاجت میں ہوتا ہے",
    reference: "صحیح بخاری (2442)",
    narrator: "عبداللہ بن عمر رضی اللہ عنہما",
    book: "Sahih Bukhari"
  },
  {
    id: 7,
    translation: "مسکراہٹ بھی صدقہ ہے",
    reference: "صحیح مسلم (1009)",
    narrator: "ابو ذر رضی اللہ عنہ",
    book: "Sahih Muslim"
  },
  {
    id: 8,
    translation: "اچھی بات کرنا بھی صدقہ ہے",
    reference: "صحیح بخاری (2989)",
    narrator: "ابو ہریرہ رضی اللہ عنہ",
    book: "Sahih Bukhari"
  },
  {
    id: 9,
    translation: "جنت ان لوگوں کی جگہ ہے جو نرم دل اور نرم گفتار ہیں",
    reference: "صحیح مسلم (2321)",
    narrator: "عبداللہ بن مسعود رضی اللہ عنہ",
    book: "Sahih Muslim"
  },
  {
    id: 10,
    translation: "صبر کرنا روشنی ہے",
    reference: "صحیح مسلم (223)",
    narrator: "ابو مالک اشعری رضی اللہ عنہ",
    book: "Sahih Muslim"
  },
  {
    id: 11,
    translation: "اللہ کے ذکر سے دل اطمینان پاتے ہیں",
    reference: "سورۃ الرعد (13:28)",
    narrator: "قرآنی آیت",
    book: "Al-Quran"
  },
  {
    id: 12,
    translation: "جو چیز تمہیں شک میں ڈالے اسے چھوڑ دو اور جو چیز شک میں نہ ڈالے اسے اختیار کرو",
    reference: "سنن ترمذی (2518)",
    narrator: "حسن بن علی رضی اللہ عنہما",
    book: "Sunan At-Tirmidhi"
  },
  {
    id: 13,
    translation: "نیکی اچھے اخلاق کا نام ہے",
    reference: "صحیح مسلم (2553)",
    narrator: "نواس بن سمعان رضی اللہ عنہ",
    book: "Sahih Muslim"
  },
  {
    id: 14,
    translation: "طہارت ایمان کا حصہ ہے",
    reference: "صحیح مسلم (223)",
    narrator: "ابو مالک اشعری رضی اللہ عنہ",
    book: "Sahih Muslim"
  },
  {
    id: 15,
    translation: "تم میں سے کوئی اس وقت تک مومن نہیں ہو سکتا جب تک اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے",
    reference: "صحیح بخاری (13)",
    narrator: "انس بن مالک رضی اللہ عنہ",
    book: "Sahih Bukhari"
  }
];

export const islamicContentService = {
  /**
   * Get random Quranic verse (refreshes on each call)
   */
  getDailyQuranVerse: () => {
    try {
      const randomIndex = Math.floor(Math.random() * quranicVerses.length);
      const verse = quranicVerses[randomIndex];
      
      return {
        success: true,
        data: verse
      };
    } catch (error) {
      console.error('Error fetching Quran verse:', error);
      return {
        success: false,
        error: 'Failed to fetch verse'
      };
    }
  },

  /**
   * Get random Hadith (refreshes on each call)
   */
  getDailyHadith: () => {
    try {
      const randomIndex = Math.floor(Math.random() * sahihHadith.length);
      const hadith = sahihHadith[randomIndex];
      
      return {
        success: true,
        data: hadith
      };
    } catch (error) {
      console.error('Error fetching Hadith:', error);
      return {
        success: false,
        error: 'Failed to fetch Hadith'
      };
    }
  },

  /**
   * Get random Quranic verse
   */
  getRandomQuranVerse: () => {
    try {
      const randomIndex = Math.floor(Math.random() * quranicVerses.length);
      const verse = quranicVerses[randomIndex];
      
      return {
        success: true,
        data: verse
      };
    } catch (error) {
      console.error('Error fetching random Quran verse:', error);
      return {
        success: false,
        error: 'Failed to fetch random verse'
      };
    }
  },

  /**
   * Get random Hadith
   */
  getRandomHadith: () => {
    try {
      const randomIndex = Math.floor(Math.random() * sahihHadith.length);
      const hadith = sahihHadith[randomIndex];
      
      return {
        success: true,
        data: hadith
      };
    } catch (error) {
      console.error('Error fetching random Hadith:', error);
      return {
        success: false,
        error: 'Failed to fetch random Hadith'
      };
    }
  }
};
