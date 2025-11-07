'use client';

import { useMemo, useState } from 'react';
import { modules } from '@/data/topics';

const boards = [
  { key: 'aqa', label: 'AQA' },
  { key: 'edexcel', label: 'Edexcel' },
  { key: 'ocr', label: 'OCR' },
] as const;

const skillBands = [
  { key: 'fluency', label: 'Fluency', colour: 'from-blue-500/30 to-cyan-400/30' },
  { key: 'problem-solving', label: 'Problem solving', colour: 'from-violet-500/30 to-fuchsia-400/30' },
  { key: 'reasoning', label: 'Reasoning', colour: 'from-emerald-500/30 to-teal-400/30' },
] as const;

type SkillBand = (typeof skillBands)[number]['key'];

const skillPrompts: Record<SkillBand, string> = {
  fluency: 'Warm up with derivative drills, equation solving, and core identities to bank easy marks.',
  'problem-solving': 'Blend multiple topics, practice modelling questions, and narrate each step clearly.',
  reasoning: 'Focus on “show that” proofs, error analysis, and comparing multiple strategies.',
};

export function ExamBoost() {
  const [board, setBoard] = useState<(typeof boards)[number]['key']>('edexcel');
  const [skill, setSkill] = useState<SkillBand>('problem-solving');
  const levelModules = useMemo(
    () => modules.filter((moduleItem) => moduleItem.level === 'A Level'),
    [],
  );

  const boardFocus = useMemo(() => {
    switch (board) {
      case 'aqa':
        return levelModules.filter((moduleItem) => moduleItem.tags.includes('statistics'));
      case 'ocr':
        return levelModules.filter((moduleItem) => moduleItem.tags.includes('mechanics'));
      default:
        return levelModules;
    }
  }, [board, levelModules]);

  return (
    <section
      id="exam"
      className="rounded-3xl border border-orange-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-[0_0_80px_-30px_rgba(249,115,22,0.45)]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
            Exam Boost
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
            Drill exam skills by board emphasis and mark scheme expectations
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            Toggle exam board weightings to rebalance your practice focus. Each skill band
            suggests technique-driven prompts to mirror high-tariff questions.
          </p>
        </div>
        <div className="rounded-2xl border border-orange-400/40 bg-orange-500/10 px-6 py-4 text-sm text-orange-100 shadow-inner shadow-orange-500/10">
          <p className="text-xs uppercase tracking-[0.2em]">Board emphasis</p>
          <p className="mt-1 text-3xl font-semibold capitalize text-white">{board}</p>
          <p className="text-xs text-orange-200/70">
            {board === 'aqa'
              ? 'More data interpretation and statistical modelling.'
              : board === 'ocr'
                ? 'Greater weight on mechanics modelling and vectors.'
                : 'Balanced mix of pure, statistics, and mechanics.'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-300">
        {boards.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setBoard(item.key)}
            className={`rounded-full border px-4 py-2 transition ${
              board === item.key
                ? 'border-orange-400 bg-orange-500/20 text-white shadow shadow-orange-500/40'
                : 'border-slate-700 bg-slate-900/70 hover:border-orange-400/40 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-300">
        {skillBands.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSkill(item.key)}
            className={`rounded-full border px-4 py-2 transition ${
              skill === item.key
                ? `border-orange-400 bg-orange-500/10 text-white`
                : 'border-slate-700 bg-slate-900/70 hover:border-orange-400/40 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          {boardFocus.map((moduleItem) => (
            <article
              key={moduleItem.slug}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">
                {moduleItem.level} · {moduleItem.tags.join(' · ')}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{moduleItem.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{moduleItem.focus}</p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-100 sm:grid-cols-2">
                {moduleItem.lessons.slice(0, 2).map((lesson) => (
                  <li
                    key={lesson.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-orange-200">
                      Exam trigger
                    </p>
                    <p className="mt-1 font-semibold text-white">{lesson.title}</p>
                    <p className="mt-2 text-xs text-slate-300">
                      Model: {lesson.sampleProblem.prompt}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <aside className="space-y-4">
          <div
            className={`rounded-3xl border border-orange-400/30 bg-gradient-to-br ${skillBands.find((item) => item.key === skill)?.colour} p-6 text-sm text-slate-100`}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-orange-200">
              Skill emphasis
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {skillBands.find((item) => item.key === skill)?.label}
            </h3>
            <p className="mt-2 text-slate-100/90">{skillPrompts[skill]}</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-100/90">
              <li>• Build a reflection log: summarise errors and upgrade them to golden rules.</li>
              <li>• Attempt 15-minute mini mocks mixing pure, stats, and applied questions.</li>
              <li>• Teach a worked solution aloud to check for reasoning gaps.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 text-sm text-slate-100">
            <p className="text-xs uppercase tracking-[0.25em] text-orange-300">
              Quick readiness check
            </p>
            <div className="mt-3 space-y-3">
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <span>Past paper accuracy ≥ 75%</span>
                <input type="checkbox" className="h-5 w-5 accent-orange-400" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <span>Know formulas flash deck</span>
                <input type="checkbox" className="h-5 w-5 accent-orange-400" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <span>Timed mock completed this week</span>
                <input type="checkbox" className="h-5 w-5 accent-orange-400" />
              </label>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Tick off readiness markers after each study cycle—you&apos;ll instantly see
              whether you&apos;re exam-day sharp or need a targeted booster.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
