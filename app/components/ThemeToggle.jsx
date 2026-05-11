'use client';

export default function ThemeToggle() {
  return (
    <button id="themeToggleBtn" className="theme-switch" aria-label="Toggle theme" title="Toggle theme">
      <span className="ts-icon ts-moon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
        </svg>
      </span>
      <span className="ts-icon ts-sun" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9.83-3.16l-1.79-1.79-1.8 1.79 1.8 1.79 1.79-1.79zM20 11v2h3v-2h-3zM12 1h-2v3h2V1zm6.24 3.84l1.79-1.79-1.79-1.79-1.8 1.79 1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12zM4.84 17.24l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79z" />
        </svg>
      </span>
      <span className="ts-knob" aria-hidden="true" />
    </button>
  );
}
