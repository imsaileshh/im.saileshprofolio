'use client';

export function LetsTalkButton() {
  return (
    <button 
      onClick={() => {
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('open-hire-me'));
      }}
      className="text-foreground px-7 py-3.5 rounded-xl text-[15px] font-medium hover:bg-border-subtle/30 transition-all duration-300"
    >
      Let's Talk
    </button>
  );
}
