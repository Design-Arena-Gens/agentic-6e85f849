'use client';

import { useState } from 'react';
import type { Module } from '@/data/topics';

type LessonInsightsProps = {
  modules: Module[];
};

export function LessonInsights({ modules }: LessonInsightsProps) {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = modules[activeModuleIndex];
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const lesson = activeModule.lessons[activeLessonIndex];
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <section className="rounded-3xl border border-slate-200/10 bg-slate-950/60 p-8 shadow-inner shadow-black/40 backdrop-blur md:grid md:grid-cols-[320px_1fr] md:gap-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Guided Lesson
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
          Step-by-step walkthrough built for sticky concepts
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          Toggle between pure, applied, and further topics. Each walkthrough
          highlights high-leverage outcomes and model responses examiners expect.
        </p>
        <div className="mt-6 space-y-4">
          {modules.map((moduleItem, index) => (
            <button
              key={moduleItem.slug}
              type="button"
              onClick={() => {
                setActiveModuleIndex(index);
                setActiveLessonIndex(0);
                setShowHint(false);
                setShowSolution(false);
              }}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                index === activeModuleIndex
                  ? 'border-cyan-400/60 bg-cyan-500/10 text-white shadow shadow-cyan-400/20'
                  : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-cyan-400/40 hover:text-white'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                {moduleItem.level}
              </p>
              <p className="font-semibold">{moduleItem.title}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 md:mt-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
              Learning objectives
            </p>
            <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
          </div>
          <div className="flex gap-2 text-[11px] uppercase tracking-wide text-cyan-200">
            {lesson.pathway.map((path) => (
              <span
                key={path}
                className="rounded-full border border-cyan-400/40 px-2 py-1"
              >
                {path}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-300">{lesson.summary}</p>
        <ul className="mt-4 grid gap-2 text-sm text-slate-200">
          {lesson.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3"
            >
              {outcome}
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 p-6 text-sm text-slate-100 shadow-inner shadow-cyan-500/10">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
            Diagnostic prompt
          </p>
          <p className="mt-2 text-base font-semibold">{lesson.sampleProblem.prompt}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="rounded-full border border-cyan-400/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-100 transition hover:bg-cyan-500/10"
            >
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            <button
              type="button"
              onClick={() => setShowSolution((prev) => !prev)}
              className="rounded-full border border-slate-800 bg-slate-900/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
            >
              {showSolution ? 'Hide solution' : 'Reveal solution'}
            </button>
          </div>
          {showHint && (
            <p className="mt-3 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-cyan-50/90">
              {lesson.sampleProblem.hint}
            </p>
          )}
          {showSolution && (
            <p className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-100/90">
              {lesson.sampleProblem.solution}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
          {activeModule.lessons.map((les, index) => (
            <button
              key={les.id}
              type="button"
              onClick={() => {
                setActiveLessonIndex(index);
                setShowHint(false);
                setShowSolution(false);
              }}
              className={`rounded-full border px-3 py-1 transition ${
                index === activeLessonIndex
                  ? 'border-cyan-400 bg-cyan-500/20 text-white'
                  : 'border-slate-700 bg-slate-900/50 hover:border-cyan-400/40 hover:text-white'
              }`}
            >
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
