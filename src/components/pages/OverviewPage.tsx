import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Clock,
  AlertTriangle,
  FileCheck2,
  ArrowRight,
  GitCompare,
  Network,
  ShieldCheck,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BarChart2,
  Check,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OverviewPage: React.FC = () => {
  const {
    roles,
    candidates,
    activity,
    setCurrentPage,
    navigateToCandidate,
    navigateToRole,
    navigateToEvidenceBoard,
    navigateToComparison
  } = useApp();

  const [pipelineStageFilter, setPipelineStageFilter] = useState<string | null>(null);

  // Stage pipeline data for the horizontal interactive process visualizer
  const pipelineStages = [
    { key: 'Applications', label: 'Applications', count: 38, pct: '100%' },
    { key: 'Recruiter Screen', label: 'Screen', count: 18, pct: '47%' },
    { key: 'Assessment', label: 'Assessment', count: 11, pct: '29%' },
    { key: 'Interview', label: 'Panel Interview', count: 7, pct: '18%' },
    { key: 'Final Review', label: 'Final Review', count: 3, pct: '8%' },
    { key: 'Decision', label: 'Decision Desk', count: 2, pct: '5%' }
  ];

  // Candidates requiring review
  const candidatesRequiringReview = candidates.filter(
    (c) =>
      c.overallSignalStatus === 'Decision discussion required' ||
      c.overallSignalStatus === 'Interviewers disagree' ||
      c.overallSignalStatus === 'Ready for review' ||
      c.overallSignalStatus === 'Evidence incomplete'
  );

  // Evidence coverage calculation across active pool
  const assessedCount = 5;
  const partialCount = 1;
  const missingCount = 1;
  const totalCompetencies = 7;
  const coveragePercent = Math.round(((assessedCount + partialCount * 0.5) / totalCompetencies) * 100);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. EXECUTIVE EDITORIAL HEADER */}
      <div className="border-b border-[#E5DFD7] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-wider uppercase text-[#7A1824] mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7A1824]" />
            <span>Executive Hiring Intelligence · Evidence-First</span>
          </div>
          <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
            Hiring Signal Overview
          </h1>
          <p className="text-[15px] text-[#625A5B] mt-2 max-w-2xl leading-normal font-normal">
            Objective decision workspace for hiring teams. Surfaces verifiable transcript evidence, flags unassessed rubric blind spots, and highlights panel divergence while preserving human decision authority.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <button
            onClick={() => navigateToEvidenceBoard()}
            className="flex items-center space-x-2 px-3.5 py-2 bg-white hover:bg-[#F0EBE3] text-[#1B1718] text-[14px] font-semibold rounded-lg border border-[#E5DFD7] shadow-xs transition-colors"
          >
            <Network className="w-4 h-4 text-[#7A1824]" />
            <span>Evidence Board</span>
          </button>
          <button
            onClick={() => setCurrentPage('decisions')}
            className="flex items-center space-x-2 px-4 py-2 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-[14px] font-semibold rounded-lg shadow-xs transition-colors"
          >
            <span>Decision Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. EXECUTIVE KPI CARDS STRIP WITH 40px NUMBERS & VISUAL PROGRESS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Evidence Coverage */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A1824]">
              Process Completeness
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#F0EBE3] text-[#1B1718]">
              5/7 Assessed
            </span>
          </div>
          <div>
            <div className="text-[40px] font-bold text-[#1B1718] leading-none tracking-tight">
              {coveragePercent}%
            </div>
            <div className="text-[14px] font-semibold text-[#1B1718] mt-1">
              Evidence Coverage
            </div>
            <div className="text-[12px] text-[#625A5B] mt-0.5">
              Across 7 core job competencies
            </div>
          </div>
          {/* Segmented bar */}
          <div className="pt-2 border-t border-[#E5DFD7]">
            <div className="w-full bg-[#E5DFD7] h-2 rounded-full overflow-hidden flex">
              <div className="bg-[#0F766E] h-full" style={{ width: `${(assessedCount / totalCompetencies) * 100}%` }} title="Complete" />
              <div className="bg-[#B45309] h-full" style={{ width: `${(partialCount / totalCompetencies) * 100}%` }} title="Partial" />
              <div className="bg-[#7A1824] h-full" style={{ width: `${(missingCount / totalCompetencies) * 100}%` }} title="Gap" />
            </div>
            <div className="flex justify-between text-[11px] text-[#625A5B] font-medium mt-1.5">
              <span className="text-[#0F766E] font-semibold">5 Complete</span>
              <span className="text-[#B45309] font-semibold">1 Partial</span>
              <span className="text-[#7A1824] font-semibold">1 Gap</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Active Pipeline */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#625A5B]">
              Active Pipeline
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#F0EBE3] text-[#1B1718]">
              4 Roles
            </span>
          </div>
          <div>
            <div className="text-[40px] font-bold text-[#1B1718] leading-none tracking-tight">
              38
            </div>
            <div className="text-[14px] font-semibold text-[#1B1718] mt-1">
              Candidates in Process
            </div>
            <div className="text-[12px] text-[#625A5B] mt-0.5">
              12 in active interview stages
            </div>
          </div>
          <div className="pt-2 border-t border-[#E5DFD7] flex items-center justify-between text-[12px]">
            <span className="text-[#625A5B]">Avg velocity:</span>
            <span className="font-semibold text-[#1B1718]">14.2 days to offer</span>
          </div>
        </div>

        {/* KPI 3: Panel Calibration & Agreement */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#625A5B]">
              Evaluator Calibration
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#065F46]">
              High Alignment
            </span>
          </div>
          <div>
            <div className="text-[40px] font-bold text-[#1B1718] leading-none tracking-tight">
              87%
            </div>
            <div className="text-[14px] font-semibold text-[#1B1718] mt-1">
              Panel Agreement Rate
            </div>
            <div className="text-[12px] text-[#625A5B] mt-0.5">
              18 scorecards logged this cycle
            </div>
          </div>
          <div className="pt-2 border-t border-[#E5DFD7] flex items-center justify-between text-[12px]">
            <span className="text-[#625A5B]">Divergence flag:</span>
            <span className="font-semibold text-[#B45309]">1 panel debrief required</span>
          </div>
        </div>

        {/* KPI 4: Pending Decisions */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A1824]">
              Human Deliberation
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#7A1824]">
              Action Required
            </span>
          </div>
          <div>
            <div className="text-[40px] font-bold text-[#7A1824] leading-none tracking-tight">
              {candidatesRequiringReview.length}
            </div>
            <div className="text-[14px] font-semibold text-[#1B1718] mt-1">
              Candidates Requiring Review
            </div>
            <div className="text-[12px] text-[#625A5B] mt-0.5">
              Gaps flagged or ready for decision
            </div>
          </div>
          <div className="pt-2 border-t border-[#E5DFD7] flex items-center justify-between text-[12px]">
            <button
              onClick={() => setCurrentPage('decisions')}
              className="text-[#7A1824] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Review cases</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#8C8384] text-[11px]">Zero auto-rejections</span>
          </div>
        </div>
      </div>

      {/* 3. HORIZONTAL INTERACTIVE HIRING PIPELINE FUNNEL */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <h2 className="text-[22px] font-bold text-[#1B1718] tracking-tight leading-[1.25]">
              Active Hiring Funnel
            </h2>
            <span className="text-[12px] font-semibold text-[#625A5B] bg-[#F0EBE3] px-2.5 py-0.5 rounded-full border border-[#E5DFD7]">
              38 Candidates
            </span>
          </div>
          <span className="text-[13px] text-[#625A5B] hidden sm:inline">
            Click any stage to filter candidate cases
          </span>
        </div>

        <div className="bg-white border border-[#E5DFD7] rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {pipelineStages.map((stage, idx) => {
              const isSelected = pipelineStageFilter === stage.key;
              return (
                <button
                  key={stage.key}
                  onClick={() => setPipelineStageFilter(isSelected ? null : stage.key)}
                  className={`relative p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#FAF8F5] border-[#7A1824] ring-2 ring-[#7A1824]'
                      : 'bg-[#FAF8F5] border-[#E5DFD7] hover:border-[#7A1824]/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[12px] text-[#625A5B]">
                    <span className="font-mono font-bold text-[11px] text-[#7A1824]">0{idx + 1}</span>
                    <span className="text-[11px] font-semibold text-[#8C8384]">{stage.pct}</span>
                  </div>
                  <div className="text-2xl sm:text-[28px] font-bold text-[#1B1718] my-1 font-mono">
                    {stage.count}
                  </div>
                  <div className="text-[14px] font-semibold text-[#1B1718] truncate">
                    {stage.label}
                  </div>
                  {/* Progress fill */}
                  <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div
                      className="bg-[#7A1824] h-full rounded-full transition-all"
                      style={{ width: `${Math.max(12, (stage.count / 38) * 100)}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {pipelineStageFilter && (
            <div className="mt-3 pt-3 border-t border-[#E5DFD7] flex items-center justify-between text-[13px]">
              <span className="text-[#1B1718]">
                Filtered by stage: <strong className="font-semibold text-[#7A1824]">{pipelineStageFilter}</strong>
              </span>
              <button
                onClick={() => setPipelineStageFilter(null)}
                className="text-[12px] text-[#7A1824] font-semibold hover:underline"
              >
                Clear stage filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. EVIDENCE COVERAGE & PROCESS HEALTH SIGNALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: EVIDENCE COVERAGE & MATRIX (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD7]">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#7A1824]">
                Auditability Benchmark
              </div>
              <h2 className="text-[22px] font-bold text-[#1B1718] tracking-tight">
                Role Competency Coverage Matrix
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[28px] font-bold text-[#1B1718] font-mono leading-none">
                {coveragePercent}%
              </span>
              <span className="block text-[11px] text-[#625A5B] font-medium">
                Documented Depth
              </span>
            </div>
          </div>

          <p className="text-[14px] text-[#625A5B] leading-relaxed">
            Measures the proportion of required role competencies supported by verbatim interview quotes and rubric ratings before debriefs. <strong className="text-[#1B1718]">This measures evidence collection rigor, not candidate quality.</strong>
          </p>

          {/* Segmented Visual Bar */}
          <div className="space-y-2">
            <div className="flex h-4 w-full rounded-full overflow-hidden bg-[#E5DFD7] p-0.5 border border-[#E5DFD7]">
              <div
                className="bg-[#0F766E] h-full rounded-l-full transition-all"
                style={{ width: `${(assessedCount / totalCompetencies) * 100}%` }}
                title={`${assessedCount} competencies complete`}
              />
              <div
                className="bg-[#B45309] h-full transition-all"
                style={{ width: `${(partialCount / totalCompetencies) * 100}%` }}
                title={`${partialCount} competency partial`}
              />
              <div
                className="bg-[#7A1824] h-full rounded-r-full transition-all"
                style={{ width: `${(missingCount / totalCompetencies) * 100}%` }}
                title={`${missingCount} competency missing`}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-[13px]">
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFD7] flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-[#0F766E] shrink-0" />
                <div>
                  <div className="font-bold text-[#1B1718] text-[15px] font-mono">{assessedCount}</div>
                  <div className="text-[11px] text-[#625A5B] font-medium">Verified Rubrics</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFD7] flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-[#B45309] shrink-0" />
                <div>
                  <div className="font-bold text-[#1B1718] text-[15px] font-mono">{partialCount}</div>
                  <div className="text-[11px] text-[#625A5B] font-medium">Partially Documented</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFD7] flex items-center space-x-2.5">
                <span className="w-3 h-3 rounded-full bg-[#7A1824] shrink-0" />
                <div>
                  <div className="font-bold text-[#1B1718] text-[15px] font-mono">{missingCount}</div>
                  <div className="text-[11px] text-[#625A5B] font-medium">Flagged Gaps</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Rubric Breakdown Chips */}
          <div className="pt-3 border-t border-[#E5DFD7] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
              <span className="text-[11px] text-[#8C8384] block font-semibold uppercase">Product Sense</span>
              <span className="text-[12px] font-bold text-[#065F46] flex items-center gap-1 mt-0.5">
                <Check className="w-3.5 h-3.5" /> 4 Verified Quotes
              </span>
            </div>
            <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
              <span className="text-[11px] text-[#8C8384] block font-semibold uppercase">Technical Systems</span>
              <span className="text-[12px] font-bold text-[#065F46] flex items-center gap-1 mt-0.5">
                <Check className="w-3.5 h-3.5" /> Case Verified
              </span>
            </div>
            <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
              <span className="text-[11px] text-[#8C8384] block font-semibold uppercase">Communication</span>
              <span className="text-[12px] font-bold text-[#B45309] flex items-center gap-1 mt-0.5">
                ● Partial (Panel 2)
              </span>
            </div>
            <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
              <span className="text-[11px] text-[#8C8384] block font-semibold uppercase">Prioritization</span>
              <span className="text-[12px] font-bold text-[#7A1824] flex items-center gap-1 mt-0.5">
                ○ Missing Probe
              </span>
            </div>
          </div>
        </div>

        {/* Right: PROCESS HEALTH SIGNALS (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD7]">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#625A5B]">
                Live Operational Signals
              </div>
              <h2 className="text-[22px] font-bold text-[#1B1718] tracking-tight">
                Process Health Checks
              </h2>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E5DFD7] text-[#625A5B]">
              Real-Time
            </span>
          </div>

          <div className="space-y-3">
            {/* 1. Feedback pending */}
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <div className="flex items-center space-x-3">
                <FileCheck2 className="w-5 h-5 text-[#B45309] shrink-0" />
                <div>
                  <div className="font-semibold text-[14px] text-[#1B1718]">Feedback Pending</div>
                  <div className="text-[12px] text-[#625A5B]">5 scorecards awaiting interviewer submission</div>
                </div>
              </div>
              <span className="font-mono font-bold text-[14px] text-[#B45309] bg-[#FEF3C7] px-2.5 py-1 rounded-lg border border-[#FDE68A]">
                5
              </span>
            </div>

            {/* 2. Evidence gaps */}
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-[#7A1824] shrink-0" />
                <div>
                  <div className="font-semibold text-[14px] text-[#1B1718]">Evidence Gaps</div>
                  <div className="text-[12px] text-[#625A5B]">3 candidates lack core rubric proof points</div>
                </div>
              </div>
              <button
                onClick={() => navigateToEvidenceBoard()}
                className="font-mono font-bold text-[13px] text-[#7A1824] bg-[#FDF2F2] px-2.5 py-1 rounded-lg border border-[#FEE2E2] hover:bg-[#FEE2E2] transition-colors"
              >
                3 Gaps →
              </button>
            </div>

            {/* 3. Interviewer disagreement */}
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-[#C2410C] shrink-0" />
                <div>
                  <div className="font-semibold text-[14px] text-[#1B1718]">Interviewer Disagreement</div>
                  <div className="text-[12px] text-[#625A5B]">1 split panel flagged for calibration debrief</div>
                </div>
              </div>
              <button
                onClick={() => navigateToCandidate('cand-meera')}
                className="font-mono font-bold text-[13px] text-[#C2410C] bg-[#FFF7ED] px-2.5 py-1 rounded-lg border border-[#FFEDD5] hover:bg-[#FFEDD5] transition-colors"
              >
                1 Panel →
              </button>
            </div>

            {/* 4. Decisions awaiting review */}
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0" />
                <div>
                  <div className="font-semibold text-[14px] text-[#1B1718]">Decisions Awaiting Review</div>
                  <div className="text-[12px] text-[#625A5B]">2 ready for hiring committee vote</div>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('decisions')}
                className="font-mono font-bold text-[13px] text-[#0F766E] bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0] hover:bg-[#D1FAE5] transition-colors"
              >
                2 Ready →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CANDIDATES REQUIRING REVIEW & LIVE ACTIVITY TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: CANDIDATES REQUIRING ATTENTION (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD7]">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#7A1824]">
                Priority Committee Cases
              </div>
              <h2 className="text-[22px] font-bold text-[#1B1718] tracking-tight">
                Candidates Requiring Review ({candidatesRequiringReview.length})
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('candidates')}
              className="text-[13px] font-semibold text-[#7A1824] hover:underline flex items-center gap-1"
            >
              All Candidates <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-[#E5DFD7]">
            {candidatesRequiringReview.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#FAF8F5] px-3 rounded-xl transition-colors"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateToCandidate(c.id)}
                      className="font-bold text-[18px] text-[#1B1718] hover:text-[#7A1824] text-left transition-colors truncate"
                    >
                      {c.name}
                    </button>
                    <span className="text-[12px] text-[#625A5B] font-medium truncate">
                      · {c.roleTitle}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Status Pill */}
                    <span
                      className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        c.overallSignalStatus === 'Interviewers disagree'
                          ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]'
                          : c.overallSignalStatus === 'Evidence incomplete'
                          ? 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
                          : 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                      }`}
                    >
                      {c.overallSignalStatus}
                    </span>

                    <span className="text-[12px] text-[#625A5B]">
                      Stage: <strong className="text-[#1B1718] font-semibold">{c.currentStage}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => navigateToEvidenceBoard(c.id)}
                    className="px-3 py-1.5 text-[13px] font-semibold text-[#1B1718] hover:text-[#7A1824] bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg hover:bg-[#F0EBE3] transition-colors"
                    title="Inspect evidence map"
                  >
                    Evidence
                  </button>
                  <button
                    onClick={() => navigateToCandidate(c.id)}
                    className="px-3.5 py-1.5 text-[13px] font-semibold text-white bg-[#7A1824] hover:bg-[#4A0F18] rounded-lg shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: LIVE ACTIVITY AUDIT (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD7]">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#625A5B]">
                Governance Log
              </div>
              <h2 className="text-[22px] font-bold text-[#1B1718] tracking-tight">
                Activity Audit Trail
              </h2>
            </div>
            <span className="text-[11px] font-semibold bg-[#FAF8F5] text-[#625A5B] px-2.5 py-0.5 rounded-full border border-[#E5DFD7] font-mono">
              Live Feed
            </span>
          </div>

          <div className="relative pl-4 space-y-4.5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-[#E5DFD7]">
            {/* Activity items */}
            <div className="relative group text-xs">
              <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#7A1824] border-2 border-white ring-1 ring-[#7A1824]" />
              <div className="font-mono text-[11px] text-[#7A1824] font-bold">14:10 · Today</div>
              <div className="font-semibold text-[14px] text-[#1B1718]">Follow-up probe requested</div>
              <p className="text-[13px] text-[#625A5B] mt-0.5 leading-normal">
                Priya Sen requested secondary technical probe on SQL schema design for Rohan Mehta.
              </p>
            </div>

            <div className="relative group text-xs">
              <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#0F766E] border-2 border-white ring-1 ring-[#0F766E]" />
              <div className="font-mono text-[11px] text-[#0F766E] font-bold">12:20 · Today</div>
              <div className="font-semibold text-[14px] text-[#1B1718]">Hiring manager reviewed dossier</div>
              <p className="text-[13px] text-[#625A5B] mt-0.5 leading-normal">
                Verified hypothesis discovery rubric for Ananya Rao with high confidence.
              </p>
            </div>

            <div className="relative group text-xs">
              <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#7A1824] border-2 border-white ring-1 ring-[#7A1824]" />
              <div className="font-mono text-[11px] text-[#7A1824] font-bold">11:03 · Today</div>
              <div className="font-semibold text-[14px] text-[#1B1718]">Evidence gap detected</div>
              <p className="text-[13px] text-[#625A5B] mt-0.5 leading-normal">
                System flagged missing user discovery quotes in take-home case for Tariq Al-Mansoor.
              </p>
            </div>

            <div className="relative group text-xs">
              <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#B45309] border-2 border-white ring-1 ring-[#B45309]" />
              <div className="font-mono text-[11px] text-[#B45309] font-bold">10:15 · Today</div>
              <div className="font-semibold text-[14px] text-[#1B1718]">Scorecard submitted</div>
              <p className="text-[13px] text-[#625A5B] mt-0.5 leading-normal">
                Marcus Vance submitted Customer Success EBR simulation evaluation.
              </p>
            </div>

            <div className="relative group text-xs">
              <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#625A5B] border-2 border-white ring-1 ring-[#625A5B]" />
              <div className="font-mono text-[11px] text-[#625A5B] font-bold">09:42 · Today</div>
              <div className="font-semibold text-[14px] text-[#1B1718]">Panel debrief logged</div>
              <p className="text-[13px] text-[#625A5B] mt-0.5 leading-normal">
                Panel discussion completed for APM stage 3 case study.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
