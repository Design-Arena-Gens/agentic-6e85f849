'use client';

import { useState } from 'react';
import type { Module } from '@/data/topics';

type TopicShowcaseProps = {
  modules: Module[];
};

const levelFilters = [
  { key: 'all', label: 'All strands' },
  { key: 'A Level', label: 'A Level' },
  { key: 'Further Maths', label: 'Further Maths' },
] as const;

export function TopicShowcase({ modules }: TopicShowcaseProps) {
  const [level, setLevel] = useState<(typeof levelFilters)[number]['key']>('all');
  const filtered =
    level === 'all' ? modules : modules.filter((module) => module.level === level);

  return (
    <section id="curriculum" className="rounded-3xl border border-slate-200/10 bg-slate-950/60 p-8 shadow-inner shadow-black/40 backdrop-blur">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            Structured Mastery
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
            Curriculum pathways that mirror exam board sequencing
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Every module blends key theory, a diagnostic prompt, and extension routes.
            Switch between A Level and Further Maths to curate your study journey.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 rounded-full border border-slate-700 bg-slate-900/80 p-1 text-sm">
          {levelFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`rounded-full px-4 py-1.5 transition ${
                level === filter.key ? 'bg-cyan-400 text-slate-900 shadow-md shadow-cyan-400/40' : 'text-slate-200 hover:text-white'
              }`}
              onClick={() => setLevel(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {filtered.map((module) => (
          <article
            key={module.slug}
            className="group flex flex-col rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 transition hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
                  {module.level}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  {module.title}
                </h3>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {module.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cyan-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">{module.focus}</p>
            <ul className="mt-6 space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm leading-relaxed text-slate-200">
              {module.lessons.map((lesson) => (
                <li key={lesson.id} className="rounded-xl border border-transparent p-3 transition hover:border-cyan-400/30 hover:bg-slate-900/60">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-white">{lesson.title}</p>
                    <div className="flex gap-2 text-[11px] uppercase tracking-wide text-cyan-200/80">
                      {lesson.pathway.map((path) => (
                        <span
                          key={path}
                          className="rounded-full border border-cyan-400/30 px-2 py-0.5"
                        >
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-slate-400">{lesson.summary}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
