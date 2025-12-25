import { useCallback, useRef } from 'react';

export function useTextToSpeech() {
    const synth = window.speechSynthesis;
    // Keep track of the last spoken text to avoid repeating the exact same phrase too quickly if needed,
    // though for this specific request we might want to announce every detection result.
    const isSpeakingRef = useRef(false);

    const speak = useCallback((text: string) => {
        if (!synth) {
            console.warn('Text-to-speech not supported in this browser.');
            return;
        }

        // Cancel any currently playing speech to ensure immediate feedback for the new emotion
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Select an English voice if available
        const voices = synth.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        utterance.rate = 1; // Normal speed
        utterance.pitch = 1; // Normal pitch

        utterance.onstart = () => {
            isSpeakingRef.current = true;
        };

        utterance.onend = () => {
            isSpeakingRef.current = false;
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            isSpeakingRef.current = false;
        };

        try {
            synth.speak(utterance);
        } catch (e) {
            // Ignore auto-play errors or other speech synthesis issues
            console.warn('Speech synthesis blocked or failed', e);
            isSpeakingRef.current = false;
        }
    }, [synth]);

    return { speak };
}
