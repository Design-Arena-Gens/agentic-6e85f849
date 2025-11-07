'use client';

import { useMemo, useState } from 'react';
import { modules } from '@/data/topics';

type Intensity = 'steady' | 'exam-crunch' | 'rapid-refresh';

const intensityPresets: Record<Intensity, { weeklyHours: number; description: string }> = {
  steady: { weeklyHours: 6, description: 'Keeps pace with school teaching, ideal 12+ weeks out.' },
  'exam-crunch': { weeklyHours: 10, description: 'Boost progress 6–10 weeks before exams.' },
  'rapid-refresh': { weeklyHours: 4, description: 'Quick wins during holidays or mock revision.' },
};

const weekDaySlots = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export function RevisionPlanner() {
  const [selectedLevel, setSelectedLevel] = useState<'A Level' | 'Further Maths'>('A Level');
  const [intensity, setIntensity] = useState<Intensity>('steady');

  const levelModules = useMemo(
    () => modules.filter((module) => module.level === selectedLevel),
    [selectedLevel],
  );

  const { weeklyHours, description } = intensityPresets[intensity];
  const hourPerSession = Math.max(1, Math.round((weeklyHours / weekDaySlots.length) * 2) / 2);
  const suggestedWeeks = selectedLevel === 'A Level' ? 12 : 10;

  return (
    <section
      id="planner"
      className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-[0_0_80px_-30px_rgba(16,185,129,0.55)]"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Guided Revision
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
            Pacing plans aligned with your chosen intensity
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            The planner blends pure, applied, and further topics, ensuring spaced retrieval.
            Adjust intensity to see how study blocks redistribute.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-6 py-4 text-sm text-emerald-100 shadow-inner shadow-emerald-500/10">
          <p className="text-xs uppercase tracking-[0.2em]">Weekly focus</p>
          <p className="mt-1 text-3xl font-semibold text-white">{weeklyHours} hrs</p>
          <p className="text-xs text-emerald-200/70">{description}</p>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-200">
        {(['A Level', 'Further Maths'] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setSelectedLevel(level)}
            className={`rounded-full border px-4 py-2 transition ${
              level === selectedLevel
                ? 'border-emerald-400 bg-emerald-500/20 text-white shadow shadow-emerald-500/30'
                : 'border-emerald-500/30 bg-slate-900/70 text-emerald-100 hover:border-emerald-400/40 hover:text-white'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-300">
        {(Object.keys(intensityPresets) as Intensity[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setIntensity(key)}
            className={`rounded-full border px-4 py-2 transition ${
              key === intensity
                ? 'border-emerald-400 bg-emerald-500/20 text-white'
                : 'border-slate-700 bg-slate-900/60 hover:border-emerald-400/40 hover:text-white'
            }`}
          >
            {key.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
            Weekly timetable
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-100 sm:grid-cols-2 xl:grid-cols-3">
            {weekDaySlots.map((day, index) => {
              const weekModule = levelModules[index % levelModules.length];
              const lesson = weekModule.lessons[index % weekModule.lessons.length];
              return (
                <div
                  key={day}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                    {day}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {weekModule.title}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald-300">
                    Focus: {lesson.title}
                  </p>
                  <p className="mt-2 text-slate-300/80">
                    {hourPerSession} hr session · target outcome:{' '}
                    <span className="text-slate-100">{lesson.outcomes[0]}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-sm text-emerald-100 shadow-inner shadow-emerald-500/20">
          <p className="text-xs uppercase tracking-[0.3em]">Escalate mastery</p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {suggestedWeeks}-week ramp up plan
          </h3>
          <ul className="mt-4 space-y-3">
            <li className="rounded-2xl border border-emerald-400/20 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                Weeks 1–{Math.ceil(suggestedWeeks / 3)}
              </p>
              <p className="mt-1 text-slate-100/90">
                Diagnose understanding with the <strong>Smart Diagnostics</strong> quiz and use
                hint-led walkthroughs to patch weak strands.
              </p>
            </li>
            <li className="rounded-2xl border border-emerald-400/20 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                Weeks {Math.ceil(suggestedWeeks / 3) + 1}–{Math.ceil((2 * suggestedWeeks) / 3)}
              </p>
              <p className="mt-1 text-slate-100/90">
                Rotate exam board papers, time mini sections (25 mins) and escalate to full papers
                once accuracy hits 75%+.
              </p>
            </li>
            <li className="rounded-2xl border border-emerald-400/20 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                Weeks {Math.ceil((2 * suggestedWeeks) / 3) + 1}–{suggestedWeeks}
              </p>
              <p className="mt-1 text-slate-100/90">
                Switch to retrieval-heavy warm-ups (flash cards, quick-fire derivations) before
                attempting mixed-topic papers under timed pressure.
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
