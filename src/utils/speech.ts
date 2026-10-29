// Speech synthesis helper for Arabic pronunciation
export function speakArabic(text: string, rate = 0.85): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis API not supported in this browser');
      resolve();
      return;
    }

    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    // Clean text of extreme symbols if needed, but preserve harakat for accurate Arabic TTS
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = rate; // Slightly slower for language learners
    utterance.pitch = 1.0;

    // Pick Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.lang.includes('Arabic'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      resolve(); // Do not throw to avoid UI break
    };

    window.speechSynthesis.speak(utterance);
  });
}
