'use client';

import { useEffect } from 'react';

export function LocalBackgroundOverride({ color }: { color: string | null | undefined }) {
  useEffect(() => {
    if (!color) return;

    // Save previous background color
    const prevVar = document.documentElement.style.getPropertyValue('--bg');
    const prevBody = document.body.style.backgroundColor;

    document.documentElement.style.setProperty('--bg', color, 'important');
    document.body.style.setProperty('background-color', color, 'important');

    return () => {
      // Restore previous styles or clean up if there were none
      if (prevVar) document.documentElement.style.setProperty('--bg', prevVar);
      else document.documentElement.style.removeProperty('--bg');
      
      if (prevBody) document.body.style.backgroundColor = prevBody;
      else document.body.style.backgroundColor = '';
    };
  }, [color]);

  return null;
}
