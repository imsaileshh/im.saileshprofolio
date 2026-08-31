import React from 'react';

type IconProps = {
  size?: number;
  className?: string;
};

// ─── FRONTEND LOGOS ─────────────────────────────────────────────────────────

export function ReactLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

export function NextjsLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="90" cy="90" r="90" fill="currentColor"/>
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next_paint0)"/>
      <rect x="115" y="54" width="12" height="72" fill="url(#next_paint1)"/>
      <defs>
        <linearGradient id="next_paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--bg, #000)"/>
          <stop offset="1" stopColor="var(--bg, #000)" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="next_paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--bg, #000)"/>
          <stop offset="1" stopColor="var(--bg, #000)" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TypeScriptLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="4" fill="#3178C6"/>
      <path d="M11.5 8.5H5.5V10.5H7.5V17.5H9.5V10.5H11.5V8.5Z" fill="#FFFFFF"/>
      <path d="M19 11.2C18.5 10.7 17.6 10.3 16.6 10.3C14.8 10.3 13.8 11.2 13.8 12.5C13.8 15.7 17.9 14.5 17.9 16.2C17.9 16.9 17.2 17.3 16.2 17.3C15 17.3 14 16.6 13.5 15.8L12.3 17.2C13.2 18.4 14.6 19 16.2 19C18.3 19 19.8 17.8 19.8 16.2C19.8 13.1 15.6 14.1 15.6 12.6C15.6 12 16.2 11.7 16.8 11.7C17.7 11.7 18.4 12.1 18.8 12.6L19 11.2Z" fill="#FFFFFF"/>
    </svg>
  );
}

export function JavaScriptLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
      <path d="M7 16.5C7.5 17.3 8.3 17.8 9.5 17.8C10.6 17.8 11.3 17.2 11.3 16.1V9.5H9.3V15.9C9.3 16.4 9 16.6 8.5 16.6C8 16.6 7.6 16.3 7.3 15.8L7 16.5Z" fill="#000000"/>
      <path d="M13.2 16.3C13.8 17.3 14.9 17.8 16.3 17.8C17.8 17.8 18.8 17 18.8 15.8C18.8 14.4 17.9 13.8 16.5 13.2L15.9 12.9C15 12.5 14.5 12.1 14.5 11.4C14.5 10.6 15.1 10 16.1 10C16.9 10 17.6 10.4 18 11.2L19.3 10.4C18.6 9.1 17.4 8.5 16.1 8.5C14.1 8.5 12.6 9.8 12.6 11.5C12.6 13.1 13.6 13.8 14.9 14.4L15.5 14.7C16.5 15.1 17.1 15.6 17.1 16.4C17.1 17.3 16.3 17.8 15.2 17.8C14.2 17.8 13.4 17.2 12.8 16.1L13.2 16.3Z" fill="#000000"/>
    </svg>
  );
}

export function TailwindLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8"/>
    </svg>
  );
}

export function HtmlLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 2L4.636 20.364L12 22.4L19.364 20.364L21 2H3Z" fill="#E34F26"/>
      <path d="M12 3.818V20.509L17.818 18.909L19.182 3.818H12Z" fill="#EF652A"/>
      <path d="M12 7.636H7.909L8.273 11.455H12V7.636ZM12 14.455L9.636 13.818L9.455 12.273H7.545L7.909 16.091L12 17.273V14.455Z" fill="#FFFFFF"/>
      <path d="M12 7.636V11.455H15.727L15.364 15.273L12 16.182V17.273L16.091 16.091L16.455 12.273L16.545 11.455L16.909 7.636H12Z" fill="#EBEBEB"/>
    </svg>
  );
}

export function CssLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 2L4.636 20.364L12 22.4L19.364 20.364L21 2H3Z" fill="#1572B6"/>
      <path d="M12 3.818V20.509L17.818 18.909L19.182 3.818H12Z" fill="#33A9DC"/>
      <path d="M12 7.636H7.909L8.273 11.455H12V7.636ZM12 14.455L9.636 13.818L9.455 12.273H7.545L7.909 16.091L12 17.273V14.455Z" fill="#FFFFFF"/>
      <path d="M16.909 7.636H12V11.455H14.727L14.455 14.455L12 15.182V16.273L15.727 15.273L16.182 10.455L16.273 9.455L16.909 7.636Z" fill="#EBEBEB"/>
    </svg>
  );
}

// ─── BACKEND LOGOS ──────────────────────────────────────────────────────────

export function NodeLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#339933"/>
      <path d="M12 4.2L5.2 8.2V15.8L12 19.8L18.8 15.8V8.2L12 4.2Z" fill="#539E43"/>
      <path d="M12 7L7.5 9.6V14.4L12 17L16.5 14.4V9.6L12 7Z" fill="#FFFFFF"/>
    </svg>
  );
}

export function RestApiLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14.5V9.5C4 8.11929 5.11929 7 6.5 7H17.5C18.8807 7 20 8.11929 20 9.5V14.5C20 15.8807 18.8807 17 17.5 17H6.5C5.11929 17 4 15.8807 4 14.5Z"/>
      <path d="M8 12H16"/>
      <path d="M14 9L17 12L14 15"/>
      <path d="M10 15L7 12L10 9"/>
    </svg>
  );
}

export function PostgreSqlLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.2 16.6C16.8 17.2 15.9 17.5 15.1 17.5C13.8 17.5 12.8 16.8 12.2 15.7C11.5 16.9 10.3 17.5 8.9 17.5C7.2 17.5 5.8 16.1 5.8 14.4C5.8 12.7 7.2 11.3 8.9 11.3C9.7 11.3 10.5 11.6 11.1 12.1V7.5H13.1V12.7C13.6 12.3 14.3 12 15.1 12C16.8 12 18.2 13.4 18.2 15.1C18.2 15.7 17.8 16.3 17.2 16.6Z" fill="#336791"/>
    </svg>
  );
}

export function MongoDbLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C11.8 2.4 10.2 6.1 10.2 9.5C10.2 13.9 12 16.5 12 22C12 16.5 13.8 13.9 13.8 9.5C13.8 6.1 12.2 2.4 12 2Z" fill="#47A248"/>
      <path d="M12 2C11.9 2.2 11.6 3.1 11.2 4.4C10.5 6.9 10.2 8.4 10.2 9.5C10.2 13.6 11.7 16.1 12 21.3V2Z" fill="#499D4A"/>
      <path d="M12 2C12.1 2.2 12.4 3.1 12.8 4.4C13.5 6.9 13.8 8.4 13.8 9.5C13.8 13.6 12.3 16.1 12 21.3V2Z" fill="#58AA50"/>
    </svg>
  );
}

// ─── DESIGN LOGOS ───────────────────────────────────────────────────────────

export function FigmaLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 2H12V8H8C6.34315 8 5 6.65685 5 5C5 3.34315 6.34315 2 8 2Z" fill="#F24E1E"/>
      <path d="M12 2H16C17.6569 2 19 3.34315 19 5C19 6.65685 17.6569 8 16 8H12V2Z" fill="#FF7262"/>
      <path d="M8 8H12V14H8C6.34315 14 5 12.6569 5 11C5 9.34315 6.34315 8 8 8Z" fill="#A259FF"/>
      <circle cx="15.5" cy="11" r="3" fill="#1ABCFE"/>
      <path d="M8 14H12V19C12 20.6569 10.6569 22 9 22C7.34315 22 6 20.6569 6 19C6 17.3431 7.34315 16 9 16C9.35626 16 9.6974 16.0622 10.0135 16.1764C10.0046 16.1186 10 16.0597 10 16V14H8Z" fill="#0ACF83"/>
    </svg>
  );
}

export function PhotoshopLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="4.5" fill="#001E36"/>
      <path d="M6.5 7.5H10.2C11.8 7.5 12.8 8.4 12.8 9.8C12.8 11.2 11.7 12.1 10.2 12.1H8.3V16.5H6.5V7.5ZM8.3 10.6H10.1C10.8 10.6 11.2 10.3 11.2 9.8C11.2 9.3 10.8 9 10.1 9H8.3V10.6Z" fill="#31A8FF"/>
      <path d="M14.2 14.8C14.6 15.3 15.3 15.6 16.2 15.6C17.1 15.6 17.6 15.2 17.6 14.6C17.6 13.9 17 13.5 15.8 13.1C14.2 12.5 13.5 11.8 13.5 10.7C13.5 9.4 14.6 8.5 16.1 8.5C17.2 8.5 18.1 8.9 18.7 9.6L17.7 10.7C17.3 10.2 16.7 9.9 16 9.9C15.3 9.9 14.9 10.3 14.9 10.7C14.9 11.2 15.4 11.6 16.4 12C18 12.6 18.9 13.2 18.9 14.5C18.9 15.9 17.7 16.9 16.1 16.9C14.9 16.9 13.9 16.4 13.2 15.6L14.2 14.8Z" fill="#31A8FF"/>
    </svg>
  );
}

export function IllustratorLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="4.5" fill="#330000"/>
      <path d="M5.8 16.5L8.9 7.5H10.9L14 16.5H12.1L11.5 14.7H8.3L7.7 16.5H5.8ZM8.8 13.2H11L9.9 9.8L8.8 13.2Z" fill="#FF9A00"/>
      <path d="M16 8.8C16 8.2 16.4 7.8 17 7.8C17.6 7.8 18 8.2 18 8.8C18 9.4 17.6 9.8 17 9.8C16.4 9.8 16 9.4 16 8.8ZM16.1 16.5V10.8H17.9V16.5H16.1Z" fill="#FF9A00"/>
    </svg>
  );
}

export function LightroomLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="24" height="24" rx="4.5" fill="#001D26"/>
      <path d="M7 7.5H8.8V15H12V16.5H7V7.5Z" fill="#31A8FF"/>
      <path d="M14 10.5H15.6V11.5C16 10.8 16.8 10.4 17.7 10.4C18 10.4 18.3 10.5 18.5 10.6L17.9 12.1C17.6 12 17.3 12 17 12C16.2 12 15.6 12.5 15.6 13.4V16.5H14V10.5Z" fill="#31A8FF"/>
    </svg>
  );
}

export function FramerLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 2H20V9H12L20 16H12V23L4 16V9H12L4 2Z" fill="#0055FF"/>
    </svg>
  );
}

// ─── SOFTWARE LOGOS ─────────────────────────────────────────────────────────

export function VsCodeLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M17.5 2.5L12 7.7L7.6 4.3L4.5 5.8L7.6 9.8L4.5 13.8L7.6 15.3L12 11.9L17.5 17.1L21 15.5V4.1L17.5 2.5Z" fill="#007ACC"/>
      <path d="M17.5 2.5L7.6 9.8L12 11.9L17.5 2.5Z" fill="#0065A9"/>
      <path d="M17.5 17.1L12 7.7L7.6 9.8L17.5 17.1Z" fill="#1F9CF0"/>
    </svg>
  );
}

export function GitLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M21.6 10.9L13.1 2.4C12.6 1.9 11.7 1.9 11.2 2.4L9.3 4.3L11.8 6.8C12.3 6.6 12.9 6.8 13.3 7.2C13.7 7.6 13.8 8.2 13.7 8.7L16.1 11.1C16.6 11 17.2 11.1 17.6 11.5C18.1 12 18.1 12.9 17.6 13.4C17.1 13.9 16.2 13.9 15.7 13.4C15.3 13 15.2 12.4 15.3 11.9L13.1 9.7V14.6C13.2 14.8 13.3 15.1 13.3 15.4C13.3 16.2 12.7 16.8 11.9 16.8C11.1 16.8 10.5 16.2 10.5 15.4C10.5 14.8 10.9 14.2 11.5 14V8.9C10.9 8.7 10.5 8.1 10.5 7.5C10.5 7.1 10.7 6.7 11 6.4L8.5 3.9L2.4 10C1.9 10.5 1.9 11.4 2.4 11.9L10.9 20.4C11.4 20.9 12.3 20.9 12.8 20.4L21.6 11.6C22.1 11.4 22.1 11.1 21.6 10.9Z" fill="#F05032"/>
    </svg>
  );
}

export function GitHubLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export function DockerLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M13.9 8.2H16.2V10.5H13.9V8.2ZM11.1 8.2H13.4V10.5H11.1V8.2ZM8.3 8.2H10.6V10.5H8.3V8.2ZM13.9 5.4H16.2V7.7H13.9V5.4ZM11.1 5.4H13.4V7.7H11.1V5.4ZM8.3 5.4H10.6V7.7H8.3V5.4ZM11.1 2.6H13.4V4.9H11.1V2.6ZM8.3 2.6H10.6V4.9H8.3V2.6ZM5.5 8.2H7.8V10.5H5.5V8.2ZM23.8 11.2C23.5 11.1 22.3 11 21.3 11.6C21 11.8 20.8 12.1 20.6 12.4C20.2 12.2 19.3 12 18.2 12.3C17.6 12.4 17.1 12.7 16.7 13.1H1.5C0.9 13.1 0.4 13.5 0.2 14.1C-0.3 15.9 0.2 18.2 1.7 19.8C3.1 21.2 5.1 22 7.7 22C14.4 22 18.8 17.6 19.5 14C20.6 14.1 22.4 13.9 23.6 12.4C24 11.9 23.9 11.3 23.8 11.2Z" fill="#2496ED"/>
    </svg>
  );
}

export function VercelLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L24 22H0L12 2Z"/>
    </svg>
  );
}

// ─── E-COMMERCE LOGOS ───────────────────────────────────────────────────────

export function ShopifyLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18.8 4.3L15.7 2.5C15.4 2.3 15 2.5 14.9 2.8L14.3 4.2L12.5 3.1C12.2 2.9 11.7 3.1 11.6 3.4L6.2 17.8L3.2 17.1C2.9 17 2.6 17.2 2.5 17.5L2.1 18.6C2 18.9 2.2 19.2 2.5 19.3L11.5 22.2C11.8 22.3 12.1 22.1 12.2 21.8L19.4 5.3C19.5 4.9 19.2 4.5 18.8 4.3Z" fill="#95BF47"/>
      <path d="M14.9 2.8L12.2 21.8L19.4 5.3C19.5 4.9 19.2 4.5 18.8 4.3L15.7 2.5C15.4 2.3 15 2.5 14.9 2.8Z" fill="#5E8E3E"/>
      <path d="M14.3 4.2L12.5 3.1C12.2 2.9 11.7 3.1 11.6 3.4L6.2 17.8L12.2 21.8L14.9 2.8C15 2.5 14.6 2.3 14.3 4.2Z" fill="#7AB55C"/>
      <path d="M12.9 9.1C11.9 9.1 11.2 9.7 11.2 10.4C11.2 12 14.3 12 14.3 14C14.3 15.2 13.3 15.8 12.1 15.8C10.7 15.8 9.9 15.1 9.9 15.1L10.3 13.9C10.3 13.9 11.1 14.5 12 14.5C12.6 14.5 13 14.2 13 13.7C13 12.1 10 12.1 10 10.2C10 8.9 11 8 12.5 8C13.6 8 14.2 8.4 14.2 8.4L13.7 9.6C13.7 9.6 13.2 9.1 12.9 9.1Z" fill="#FFFFFF"/>
    </svg>
  );
}

export function LiquidLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      <path d="M10 12.5L12 14.5L14 12.5"/>
    </svg>
  );
}

export function CustomThemesLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9z"/>
      <path d="M12 3v18"/>
      <path d="M12 12h9"/>
    </svg>
  );
}

export function StorefrontUxLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8"/>
      <path d="M12 17v4"/>
      <path d="M6 8h4"/>
      <path d="M6 11h8"/>
    </svg>
  );
}

// ─── TOOLS & WORKFLOW LOGOS ─────────────────────────────────────────────────

export function CursorLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 2L20 9L12.5 12.5L9 20L4 2Z" fill="currentColor"/>
    </svg>
  );
}

export function WarpLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00C0A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  );
}

export function PostmanLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="10" fill="#FF6C37"/>
      <path d="M15.5 12L8.5 7.5V16.5L15.5 12Z" fill="#FFFFFF"/>
    </svg>
  );
}

export function NotionLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.5 3.5L17.5 2.5C18.5 2.4 19.5 3.2 19.5 4.3V19.5C19.5 20.6 18.6 21.5 17.5 21.5L6.5 22.5C5.4 22.6 4.5 21.7 4.5 20.6V3.5Z" fill="currentColor"/>
      <path d="M7 6.5L14 5.5V17.5L7 18.5V6.5Z" fill="var(--bg, #090A0C)"/>
      <path d="M9.5 8.5V16.5L14 8.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function LinearLogo({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12Z" stroke="#5E6AD2" strokeWidth="1.5"/>
      <path d="M6 17.5L17.5 6" stroke="#5E6AD2" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 19L19 10" stroke="#5E6AD2" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
