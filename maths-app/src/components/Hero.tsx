'use client';

import Link from 'next/link';

const navLinks = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Practice', href: '#practice' },
  { label: 'Planner', href: '#planner' },
  { label: 'Exam Boost', href: '#exam' },
];

export function Hero() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-16 text-white shadow-xl">
      <div className="absolute inset-y-8 right-12 hidden w-80 rounded-full bg-gradient-to-b from-violet-500/20 to-cyan-500/20 blur-3xl md:block" />
      <div className="relative mx-auto max-w-3xl text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          A Level & Further Maths
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
          Unlock top grades with structured theory, diagnostics, and exam-style
          practice.
        </h1>
        <p className="mt-6 text-lg text-slate-200 md:max-w-xl">
          A complete learning environment blending concise tutorials, guided
          problem solving, and auto-generated practice tailored to each strand.
          Immediate feedback keeps learners on track for both A Level and Further
          Maths success.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Link
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300"
            href="#curriculum"
          >
            Start exploring topics
          </Link>
          <Link
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            href="#practice"
          >
            Jump into diagnostics
          </Link>
        </div>
      </div>
      <nav className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-200/80 md:justify-start">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-cyan-300 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
