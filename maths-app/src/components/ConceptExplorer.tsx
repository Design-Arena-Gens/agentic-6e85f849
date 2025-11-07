'use client';

import { useMemo, useState } from 'react';

type ConceptKey = 'trig' | 'binomial' | 'projectile';

const conceptOptions: { key: ConceptKey; label: string; summary: string }[] = [
  {
    key: 'trig',
    label: 'Sine wave transformations',
    summary: 'Visualise how amplitude, frequency, and phase affect y = A sin(B(x - C)) + D.',
  },
  {
    key: 'binomial',
    label: 'Binomial expansion',
    summary: 'Explore coefficients and remainders in (1 + x)^n expansions with fractional powers.',
  },
  {
    key: 'projectile',
    label: 'Projectile modelling',
    summary: 'Adjust launch speed and angle to see flight time and range with constant acceleration.',
  },
];

const trigDomain = Array.from({ length: 200 }, (_, index) => -Math.PI + (index / 199) * 2 * Math.PI);

export function ConceptExplorer() {
  const [concept, setConcept] = useState<ConceptKey>('trig');
  const [amplitude, setAmplitude] = useState(2);
  const [frequency, setFrequency] = useState(1);
  const [phase, setPhase] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [binomialN, setBinomialN] = useState(5);
  const [binomialX, setBinomialX] = useState(0.2);
  const [launchSpeed, setLaunchSpeed] = useState(12);
  const [launchAngle, setLaunchAngle] = useState(45);

  const trigPoints = useMemo(() => {
    return trigDomain.map((x) => ({
      x,
      y: amplitude * Math.sin(frequency * (x - phase)) + vertical,
    }));
  }, [amplitude, frequency, phase, vertical]);

  const binomialSeries = useMemo(() => {
    const terms: string[] = [];
    let currentCoefficient = 1;
    for (let r = 0; r <= 5; r += 1) {
      if (r === 0) {
        terms.push('1');
        continue;
      }
      currentCoefficient *= (binomialN - (r - 1)) / r;
      terms.push(`${currentCoefficient.toFixed(2)}x^${r}`);
    }
    const approximatedValue = Math.pow(1 + binomialX, binomialN);
    const truncated = terms.reduce((total, term, index) => {
      if (index === 0) return total + 1;
      const coeff = Number(terms[index].split('x^')[0]);
      return total + coeff * binomialX ** index;
    }, 0);
    return { terms, approximatedValue, truncated };
  }, [binomialN, binomialX]);

  const projectileStats = useMemo(() => {
    const g = 9.8;
    const angleRad = (launchAngle * Math.PI) / 180;
    const timeOfFlight = (2 * launchSpeed * Math.sin(angleRad)) / g;
    const range = (launchSpeed ** 2 * Math.sin(2 * angleRad)) / g;
    const maxHeight = (launchSpeed ** 2 * Math.sin(angleRad) ** 2) / (2 * g);
    return {
      timeOfFlight,
      range,
      maxHeight,
    };
  }, [launchSpeed, launchAngle]);

  return (
    <section className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-[0_0_80px_-30px_rgba(56,189,248,0.45)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Concept Explorer
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
            Manipulate parameters to build intuition quickly
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            Adjust sliders and instantly see the mathematical consequences—ideal for flipped
            learning or guided discovery tasks.
          </p>
        </div>
        <div className="rounded-2xl border border-sky-400/40 bg-sky-500/10 px-6 py-4 text-sm text-sky-100 shadow-inner shadow-sky-500/20">
          <p className="text-xs uppercase tracking-[0.2em]">Exploration mode</p>
          <p className="mt-1 text-3xl font-semibold text-white">
            {conceptOptions.find((item) => item.key === concept)?.label}
          </p>
          <p className="text-xs text-sky-200/70">
            {conceptOptions.find((item) => item.key === concept)?.summary}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-300">
        {conceptOptions.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setConcept(item.key)}
            className={`rounded-full border px-4 py-2 transition ${
              concept === item.key
                ? 'border-sky-400 bg-sky-500/20 text-white shadow shadow-sky-500/30'
                : 'border-slate-700 bg-slate-900/70 hover:border-sky-400/40 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          {concept === 'trig' && (
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-sky-200">
                y = A sin(B(x - C)) + D
              </p>
              <div className="mt-4 h-64 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <svg viewBox="0 0 400 200" className="h-full w-full text-slate-700">
                  <rect width="400" height="200" rx="12" className="fill-slate-900" />
                  <line x1="0" x2="400" y1="100" y2="100" className="stroke-slate-700" strokeWidth={1} />
                  <line x1="200" x2="200" y1="0" y2="200" className="stroke-slate-700" strokeWidth={1} />
                  <polyline
                    fill="none"
                    stroke="url(#wave)"
                    strokeWidth={2}
                    points={trigPoints
                      .map((point) => {
                        const scaledX = ((point.x + Math.PI) / (2 * Math.PI)) * 400;
                        const scaledY = 100 - point.y * 30;
                        return `${scaledX.toFixed(2)},${scaledY.toFixed(2)}`;
                      })
                      .join(' ')}
                  />
                  <defs>
                    <linearGradient id="wave" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">Amplitude A</span>
                  <input
                    type="range"
                    min={0.5}
                    max={4}
                    step={0.5}
                    value={amplitude}
                    onChange={(event) => setAmplitude(Number(event.target.value))}
                  />
                  <span className="text-slate-300">A = {amplitude}</span>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">Frequency B</span>
                  <input
                    type="range"
                    min={0.5}
                    max={3}
                    step={0.5}
                    value={frequency}
                    onChange={(event) => setFrequency(Number(event.target.value))}
                  />
                  <span className="text-slate-300">B = {frequency}</span>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">Phase shift C</span>
                  <input
                    type="range"
                    min={-Math.PI / 2}
                    max={Math.PI / 2}
                    step={0.1}
                    value={phase}
                    onChange={(event) => setPhase(Number(event.target.value))}
                  />
                  <span className="text-slate-300">C = {phase.toFixed(2)} rad</span>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">Vertical D</span>
                  <input
                    type="range"
                    min={-3}
                    max={3}
                    step={0.5}
                    value={vertical}
                    onChange={(event) => setVertical(Number(event.target.value))}
                  />
                  <span className="text-slate-300">D = {vertical}</span>
                </label>
              </div>
            </div>
          )}

          {concept === 'binomial' && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-200">
                (1 + x)<sup>n</sup> expansion
              </p>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-100">
                <p className="text-sky-200/80">Truncated series (up to x⁵):</p>
                <p className="mt-2 font-mono text-xs text-slate-200">
                  {binomialSeries.terms.join(' + ')}
                </p>
                <p className="mt-4 text-xs text-slate-300">
                  Approximate value at x = {binomialX}: {binomialSeries.truncated.toFixed(4)}
                </p>
                <p className="text-xs text-slate-400">
                  Exact value: {binomialSeries.approximatedValue.toFixed(4)} · Error ≈{' '}
                  {(binomialSeries.approximatedValue - binomialSeries.truncated).toExponential(2)}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">Exponent n</span>
                  <input
                    type="range"
                    min={0.5}
                    max={8}
                    step={0.5}
                    value={binomialN}
                    onChange={(event) => setBinomialN(Number(event.target.value))}
                  />
                  <span className="text-slate-300">n = {binomialN}</span>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">x value</span>
                  <input
                    type="range"
                    min={-0.5}
                    max={0.5}
                    step={0.05}
                    value={binomialX}
                    onChange={(event) => setBinomialX(Number(event.target.value))}
                  />
                  <span className="text-slate-300">x = {binomialX.toFixed(2)}</span>
                </label>
              </div>
              <p className="text-xs text-slate-400">
                Discuss: when does the binomial expansion converge? How many terms are needed for
                error &lt; 10<sup>-3</sup>?
              </p>
            </div>
          )}

          {concept === 'projectile' && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-200">
                Projectile flight (no air resistance)
              </p>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-100">
                <p className="text-sky-200/80">Time of flight: {projectileStats.timeOfFlight.toFixed(2)} s</p>
                <p className="text-sky-200/80">Range: {projectileStats.range.toFixed(2)} m</p>
                <p className="text-sky-200/80">Max height: {projectileStats.maxHeight.toFixed(2)} m</p>
              </div>
              <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">Launch speed (m/s)</span>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={launchSpeed}
                    onChange={(event) => setLaunchSpeed(Number(event.target.value))}
                  />
                  <span className="text-slate-300">Speed = {launchSpeed} m/s</span>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-200">Launch angle (°)</span>
                  <input
                    type="range"
                    min={15}
                    max={75}
                    step={1}
                    value={launchAngle}
                    onChange={(event) => setLaunchAngle(Number(event.target.value))}
                  />
                  <span className="text-slate-300">Angle = {launchAngle}°</span>
                </label>
              </div>
              <p className="text-xs text-slate-400">
                Tip: Compare sin(2θ) values to reason about optimal angle. Link with mechanics
                SUVAT equations to justify the statistics above.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-3xl border border-sky-400/30 bg-sky-500/10 p-6 text-sm text-slate-100 shadow-inner shadow-sky-500/20">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-200">Reflection prompts</p>
          <ul className="mt-4 space-y-3 text-slate-100/90">
            <li>
              • Explain how changing each parameter affects the graph or motion. Connect your
              reasoning to algebraic manipulation.
            </li>
            <li>
              • Take a screenshot of a surprising result and annotate it. Share with a peer to
              compare findings.
            </li>
            <li>
              • Create an exam-style question inspired by the current configuration. Swap questions
              and mark each other using the explanation text.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
