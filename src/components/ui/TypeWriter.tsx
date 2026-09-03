'use client';

import { useState, useEffect } from 'react';

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBeforeDelete?: number;
  delayBeforeType?: number;
  enableSound?: boolean;
  loop?: boolean;
}

export function TypeWriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBeforeDelete = 2000,
  delayBeforeType = 300,
  enableSound = false,
  loop = true,
}: TypeWriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Helper for typing sound
  const playTypingSound = () => {
    if (!enableSound) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') return;
      
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      // High frequency for a click/tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
      
      // Fast decay
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const currentWord = words[currentWordIndex];

    if (isFinished) return;

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
          playTypingSound();
        }, deletingSpeed);
      }
    } else {
      if (currentText === currentWord) {
        if (!loop && currentWordIndex === words.length - 1) {
          setIsFinished(true);
          return;
        }
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBeforeDelete);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          playTypingSound();
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeType]);

  return (
    <span className="inline-flex items-center">
      <span className="text-foreground font-medium">{currentText}</span>
      {!isFinished && (
        <span 
          className="w-[2.5px] h-[1.1em] bg-accent ml-[4px]" 
          style={{ animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
      )}
    </span>
  );
}
