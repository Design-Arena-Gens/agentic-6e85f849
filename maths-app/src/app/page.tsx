import { Hero } from '@/components/Hero';
import { TopicShowcase } from '@/components/TopicShowcase';
import { ConceptExplorer } from '@/components/ConceptExplorer';
import { InteractiveQuiz } from '@/components/InteractiveQuiz';
import { RevisionPlanner } from '@/components/RevisionPlanner';
import { ExamBoost } from '@/components/ExamBoost';
import { LessonInsights } from '@/components/LessonInsights';
import { modules } from '@/data/topics';

export default function Home() {
  return (
    <main className="px-6 pt-16">
      <div className="mx-auto max-w-6xl space-y-12">
        <Hero />
      </div>
      <div className="space-y-12 pb-20">
        <TopicShowcase modules={modules} />
        <LessonInsights modules={modules} />
        <ConceptExplorer />
        <InteractiveQuiz />
        <RevisionPlanner />
        <ExamBoost />
      </div>
      <footer className="mx-auto mt-16 max-w-6xl rounded-3xl border border-slate-800 bg-slate-950/70 px-8 py-12 text-sm text-slate-400">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-slate-300">
            Maths Studio pulls together pure, statistics, mechanics, and further maths strands into
            a single learning hub. Share feedback and feature ideas to keep the roadmap evolving.
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-slate-500">
            <a href="#curriculum" className="hover:text-cyan-200">
              Curriculum
            </a>
            <a href="#practice" className="hover:text-violet-200">
              Practice
            </a>
            <a href="#planner" className="hover:text-emerald-200">
              Planner
            </a>
            <a href="#exam" className="hover:text-orange-200">
              Exam boost
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
