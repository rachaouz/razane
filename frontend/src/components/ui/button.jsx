// src/components/common/Button.jsx
import React from "react";

export default function Button({
  children,
  onClick,
  variant = "hero",
  disabled = false,
  loading = false,
  size = "md",
  fullWidth = false,
  className = "",
  theme = {},
}) {

  /* ─────────────────────────────────────────────────────────────
     Sizes
  ───────────────────────────────────────────────────────────── */
  const sizes = {
    sm: "px-3 py-1.5 text-[0.65rem] tracking-[0.14em]",
    md: "px-5 py-2.5 text-[0.74rem] tracking-[0.18em]",
    lg: "px-6 py-3 text-[0.82rem] tracking-[0.2em]",
  };

  /* ─────────────────────────────────────────────────────────────
     Base
  ───────────────────────────────────────────────────────────── */
  const base = `
    inline-flex items-center justify-center gap-2
    rounded-lg
    font-['DM_Mono'] font-semibold uppercase
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const width = fullWidth ? "w-full" : "";

  /* ─────────────────────────────────────────────────────────────
     Variants
  ───────────────────────────────────────────────────────────── */
  const variants = {

    login: `
      font-display
      text-[0.7rem]
      tracking-[0.15em]
      px-6 py-[0.6rem]
      border border-accent
      text-accent
      bg-[rgba(0,212,255,0.05)]
      clip-login
      hover:bg-[rgba(0,212,255,0.15)]
      hover:shadow-[0_0_20px_rgba(0,212,255,0.35)]
      hover:-translate-y-px
    `,

    hero: `
      group relative overflow-hidden
      font-body text-[0.95rem] font-medium tracking-[0.12em]
      px-6 py-[0.85rem]
      border border-[rgba(0,212,255,0.2)]
      bg-[rgba(4,16,32,0.7)]
      text-slate-200
      clip-hero
      flex items-center justify-between text-left
      hover:border-[rgba(0,212,255,0.5)]
      hover:bg-[rgba(0,212,255,0.07)]
      hover:text-white
      hover:translate-x-1
    `,

  submit: `
  w-full
  px-10 py-3.5
  bg-[rgba(0,212,255,0.08)]
  border border-[#00d4ff]
  text-[#00d4ff]
  rounded-full
  text-[0.85rem] tracking-[0.22em] font-mono font-bold
  shadow-[0_0_16px_rgba(0,212,255,0.22)]
  hover:bg-[rgba(0,212,255,0.18)]
  hover:shadow-[0_0_28px_rgba(0,212,255,0.4)]
`,

    

    green: `
      bg-[rgba(127,216,50,0.05)]
      border border-[rgba(127,216,50,0.3)]
      text-[#7fd832]
      hover:bg-[rgba(127,216,50,0.1)]
      hover:border-[rgba(127,216,50,0.5)]
    `,

    success: `
      bg-[rgba(34,197,94,0.12)]
      border border-[rgba(34,197,94,0.4)]
      text-[#22c55e]
      hover:bg-[rgba(34,197,94,0.2)]
    `,

    danger: `
      bg-[rgba(239,68,68,0.12)]
      border border-[rgba(239,68,68,0.4)]
      text-[#ef4444]
      hover:bg-[rgba(239,68,68,0.2)]
    `,

    primary: `
      bg-[#00d4ff]
      border border-[#00d4ff]
      text-[#041018]
      hover:brightness-110
    `,

    outline: `
      bg-transparent
      border border-[rgba(255,255,255,0.18)]
      text-white
      hover:bg-[rgba(255,255,255,0.05)]
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${base}
        ${sizes[size]}
        ${width}
        ${variants[variant] || variants.submit}
        ${className}
      `}
    >
      {variant === "hero" && (
        <span
          className="
            absolute left-0 top-0 bottom-0 w-[3px]
            bg-accent shadow-[0_0_10px_#00d4ff]
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          "
        />
      )}

      <span className="flex items-center justify-center w-full">
        {loading ? "..." : children}
      </span>

      {variant === "hero" && (
        <span className="text-accent text-[0.9rem] opacity-60">
          ›
        </span>
      )}
    </button>
  );
}
