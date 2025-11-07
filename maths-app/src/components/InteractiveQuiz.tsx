'use client';

import { useMemo, useState } from 'react';
import { questionBank } from '@/data/questionBank';

const strands = [
  { key: 'pure', label: 'Pure' },
  { key: 'statistics', label: 'Statistics' },
  { key: 'mechanics', label: 'Mechanics' },
  { key: 'complex', label: 'Complex numbers' },
  { key: 'matrices', label: 'Matrices' },
] as const;

export function InteractiveQuiz() {
  const [strand, setStrand] = useState<(typeof strands)[number]['key']>('pure');
  const strandQuestions = useMemo(
    () => questionBank.filter((question) => question.strand === strand),
    [strand],
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isMarked, setIsMarked] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const question = strandQuestions[currentQuestionIndex];

  function markAnswer() {
    if (selectedOption === null || isMarked) return;
    setIsMarked(true);
    setAttempts((prev) => prev + 1);
    if (selectedOption === question.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    const nextIndex = (currentQuestionIndex + 1) % strandQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    setSelectedOption(null);
    setIsMarked(false);
  }

  const accuracy = attempts === 0 ? 0 : Math.round((score / attempts) * 100);

  return (
    <section
      id="practice"
      className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-[0_0_80px_-30px_rgba(168,85,247,0.65)]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Smart Diagnostics
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
            Rapid-fire questions with instant feedback and mastery tracking
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            Switch strands to tailor practice, mark your working, then reinforce with a
            fresh variation. Accuracy updates after every submission.
          </p>
        </div>
        <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 px-6 py-4 text-sm text-violet-100 shadow-inner shadow-violet-500/10">
          <p className="text-xs uppercase tracking-[0.2em]">Accuracy</p>
          <p className="mt-1 text-3xl font-semibold text-white">{accuracy}%</p>
          <p className="text-xs text-violet-200/70">
            {attempts} attempt{attempts === 1 ? '' : 's'} · {score} correct
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {strands.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setStrand(item.key);
              setCurrentQuestionIndex(0);
              setSelectedOption(null);
              setIsMarked(false);
            }}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              item.key === strand
                ? 'border-violet-400 bg-violet-500/20 text-white shadow shadow-violet-500/30'
                : 'border-violet-500/30 bg-slate-900/60 text-violet-100 hover:border-violet-400/40 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 md:grid md:grid-cols-[1fr_auto] md:gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-200/90">
            Question {currentQuestionIndex + 1} of {strandQuestions.length}
          </p>
          <h3 className="mt-3 text-lg font-semibold text-white">{question.prompt}</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-100">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = question.answer === index;
              let optionStyles =
                'border border-slate-800 bg-slate-900/60 hover:border-violet-400/40';
              if (isMarked) {
                optionStyles = isCorrect
                  ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-100'
                  : isSelected
                    ? 'border-rose-400/60 bg-rose-500/10 text-rose-100'
                    : 'border-slate-800 bg-slate-900/60';
              } else if (isSelected) {
                optionStyles = 'border-violet-400/60 bg-violet-500/10 text-white';
              }

              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => setSelectedOption(index)}
                    className={`w-full rounded-2xl px-4 py-3 text-left transition ${optionStyles}`}
                  >
                    <span className="font-semibold">({String.fromCharCode(65 + index)})</span>{' '}
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={markAnswer}
              className="rounded-full bg-violet-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:bg-violet-300"
            >
              Check answer
            </button>
            <button
              type="button"
              onClick={nextQuestion}
              className="rounded-full border border-slate-700 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-violet-400 hover:text-white"
            >
              Next prompt
            </button>
          </div>
        </div>
        <aside className="mt-6 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4 text-sm text-violet-100 shadow-inner shadow-violet-500/10 md:mt-0 md:w-72">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
            Worked reasoning
          </p>
          <p className="mt-2 text-slate-100/90">
            {isMarked ? question.explanation : 'Submit your answer to reveal a detailed explanation and check the reasoning examiners are targeting.'}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-violet-200/70">
            Suggested challenge
          </p>
          <p className="mt-2 text-slate-200/80">
            {question.difficulty === 3
              ? 'Try forming your own follow-up question and swap with a peer to compare strategies.'
              : 'Attempt a variant by changing coefficients or context to see if the method still holds.'}
          </p>
        </aside>
      </div>
    </section>
  );
}
