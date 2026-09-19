import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  Activity,
  Award,
  Layers,
  HelpCircle,
  Percent,
  Check,
  XCircle,
  Flame,
  Scale,
  ChevronRight,
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InsightsPage: React.FC = () => {
  const { roles, candidates, navigateToCandidate, setCurrentPage, navigateToEvidenceBoard } = useApp();

  const [selectedFunnelStage, setSelectedFunnelStage] = useState<string | null>(null);
  const [selectedBlindSpot, setSelectedBlindSpot] = useState<string | null>(null);

  // 1. Funnel data: Applied -> Recruiter Screen -> Technical Case -> Manager Interview -> Decision
  const funnelStages = [
    { name: 'Applied', count: 48, rate: '100%', dropOff: '22 screened out for base criteria' },
    { name: 'Recruiter Screen', count: 26, rate: '54%', dropOff: '12 lacked required product scope' },
    { name: 'Technical Case', count: 14, rate: '29%', dropOff: '6 did not meet analytics bar' },
    { name: 'Manager Interview', count: 8, rate: '17%', dropOff: '4 held due to evidence gaps' },
    { name: 'Committee Decision', count: 4, rate: '8%', dropOff: 'Final human deliberation pool' }
  ];

  // 2. Feedback completion data across stages (Completed / Pending / Overdue)
  const stageFeedbackData = [
    { stage: 'Recruiter Screen', completed: 24, pending: 2, overdue: 0, total: 26, avgLatency: '6.2 hrs' },
    { stage: 'Technical Case', completed: 11, pending: 2, overdue: 1, total: 14, avgLatency: '19.4 hrs' },
    { stage: 'Manager Interview', completed: 6, pending: 2, overdue: 0, total: 8, avgLatency: '14.1 hrs' },
    { stage: 'Debrief Calibration', completed: 3, pending: 1, overdue: 0, total: 4, avgLatency: '24.0 hrs' }
  ];

  // 3. Evidence Blind Spots Heatmap across pipeline competencies
  const pipelineCompetenciesCoverage = [
    {
      competency: 'Product Thinking & Strategy',
      coveragePct: 88,
      status: 'healthy',
      totalAssessed: 14,
      missingProbes: 2,
      recommendation: 'Solid coverage across case studies. Rubric is well-calibrated.'
    },
    {
      competency: 'User Empathy & Customer Discovery',
      coveragePct: 88,
      status: 'healthy',
      totalAssessed: 14,
      missingProbes: 2,
      recommendation: 'Portfolio walkthrough round reliably captures customer quotes.'
    },
    {
      competency: 'Analytical & Financial Rigor',
      coveragePct: 76,
      status: 'moderate',
      totalAssessed: 14,
      missingProbes: 4,
      recommendation: 'Spreadsheet exercise provides proof; edge cases unprobed.'
    },
    {
      competency: 'Prioritization & Roadmapping',
      coveragePct: 52,
      status: 'blind_spot',
      totalAssessed: 14,
      missingProbes: 7,
      recommendation: 'Add targeted 15-min trade-off exercise to Manager Round.'
    },
    {
      competency: 'Distributed Systems & Tech Fluency',
      coveragePct: 45,
      status: 'blind_spot',
      totalAssessed: 14,
      missingProbes: 8,
      recommendation: 'Case prompt lacks live system partition failure scenario.'
    },
    {
      competency: 'Executive Stakeholder Communication',
      coveragePct: 38,
      status: 'critical_blind_spot',
      totalAssessed: 14,
      missingProbes: 9,
      recommendation: 'Interviewers running out of time on behavioral pushback probes.'
    }
  ];

  // 4. Interviewer disagreement stats
  const disagreementStats = {
    overallRate: 18.5,
    alignedRate: 81.5,
    totalEvaluations: 54,
    disagreements: 10,
    topDisagreementCompetency: 'Executive Stakeholder Pushback (40% Split)',
    topDisagreementRole: 'Associate Product Manager (28% Panel Divergence)'
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5" />
          <span>Institutional Oversight & Quality Audit</span>
        </div>
        <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
          Hiring Quality & Process Health
        </h1>
        <p className="text-[14px] text-[#625A5B] max-w-3xl leading-normal font-normal">
          Monitor institutional hiring signals in real-time: stage funnel conversion, scorecard completion turnaround, panel calibration consensus, and pipeline evidence blind spots.
        </p>
      </div>

      {/* 2. Top Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Evidence Coverage */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B] block">
            Overall Evidence Coverage
          </span>
          <div className="text-3xl font-bold font-mono text-[#0F766E]">78.4%</div>
          <p className="text-[12px] text-[#625A5B] leading-normal font-normal">
            Required job criteria backed by documented transcript quotes
          </p>
        </div>

        {/* Metric 2: Feedback Turnaround */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B] block">
            Feedback Turnaround
          </span>
          <div className="text-3xl font-bold font-mono text-[#1B1718]">18.4 hrs</div>
          <p className="text-[12px] text-[#625A5B] leading-normal font-normal">
            Average time from interview completion to submitted scorecard
          </p>
        </div>

        {/* Metric 3: Panel Disagreement */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B] block">
            Panel Disagreement Rate
          </span>
          <div className="text-3xl font-bold font-mono text-[#C2410C]">18.5%</div>
          <p className="text-[12px] text-[#625A5B] leading-normal font-normal">
            Scorecards with split signals requiring committee debrief
          </p>
        </div>

        {/* Metric 4: Audit Compliance */}
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B] block">
            Audit Trail Compliance
          </span>
          <div className="text-3xl font-bold font-mono text-[#7A1824]">100%</div>
          <p className="text-[12px] text-[#625A5B] leading-normal font-normal">
            All hiring decisions backed by human written rationale
          </p>
        </div>
      </div>

      {/* SECTION A: HIRING FUNNEL VISUALIZATION */}
      <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DFD7]">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#7A1824] block">
              Section A · Progression Flow
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1718] tracking-tight">
              Hiring Funnel: Progressive Conversion
            </h2>
            <p className="text-[13px] text-[#625A5B]">
              Applied → Recruiter Screen → Technical Case → Manager Interview → Decision
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-[#1B1718] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E5DFD7]">
            48 Total Applicants
          </span>
        </div>

        {/* Progressive Funnel Visualization */}
        <div className="space-y-3 pt-2">
          {funnelStages.map((stage, idx) => {
            const widthPercent = (stage.count / 48) * 100;
            const isSelected = selectedFunnelStage === stage.name;

            return (
              <div
                key={idx}
                onClick={() => setSelectedFunnelStage(isSelected ? null : stage.name)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected ? 'bg-[#FAF8F5] border-[#7A1824] shadow-xs ring-1 ring-[#7A1824]' : 'bg-[#FAF8F5] border-[#E5DFD7] hover:border-[#7A1824]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] text-[#7A1824] font-bold">0{idx + 1}</span>
                    <strong className="text-[#1B1718] text-sm font-bold">{stage.name}</strong>
                  </div>
                  <div className="space-x-3 font-mono">
                    <span className="font-bold text-[#1B1718]">{stage.count} Candidates</span>
                    <span className="text-[#625A5B] font-semibold text-[11px]">({stage.rate})</span>
                  </div>
                </div>

                {/* Funnel Bar */}
                <div className="w-full bg-[#E5DFD7] h-4 rounded-md overflow-hidden flex items-center border border-[#E5DFD7]">
                  <div
                    className="bg-[#7A1824] h-full rounded-md transition-all flex items-center justify-end pr-2 text-white font-mono text-[10px] font-bold"
                    style={{ width: `${Math.max(widthPercent, 10)}%` }}
                  >
                    {stage.count}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1.5 text-[12px] text-[#625A5B]">
                  <span>Drop-off Context: {stage.dropOff}</span>
                  <span className="text-[#7A1824] font-semibold text-[11px]">{isSelected ? 'Hide ▲' : 'Details ▼'}</span>
                </div>

                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-[#E5DFD7] text-[13px] text-[#1B1718] space-y-1">
                    <p>
                      <strong>Active Candidates in {stage.name}:</strong> 
                      {stage.name === 'Manager Interview' || stage.name === 'Committee Decision'
                        ? ' Ananya Rao, Rohan Mehta, Meera Nair, Kabir Patel'
                        : ' 8 pool candidates currently completing evaluations.'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2-Column Grid: Section B (Feedback Completion) & Section C (Panel Calibration) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION B: INTERVIEW FEEDBACK COMPLETION */}
        <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E5DFD7]">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#7A1824] block">
              Section B · Scorecard Compliance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1718] tracking-tight">
              Feedback Completion
            </h2>
            <p className="text-[13px] text-[#625A5B]">
              Segmented progress bars showing: Completed, Pending, and Overdue scorecards.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {stageFeedbackData.map((s, idx) => {
              const compPct = (s.completed / s.total) * 100;
              const pendPct = (s.pending / s.total) * 100;
              const overPct = (s.overdue / s.total) * 100;

              return (
                <div key={idx} className="space-y-1.5 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#1B1718] text-sm">{s.stage}</span>
                      <span className="text-[11px] text-[#8C8384] font-mono ml-2">Avg: {s.avgLatency}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono text-[11px]">
                      <span className="text-[#065F46] font-semibold">{s.completed} done</span>
                      <span className="text-[#C2410C] font-semibold">{s.pending} pending</span>
                      {s.overdue > 0 && <span className="text-[#7A1824] font-bold">{s.overdue} overdue</span>}
                    </div>
                  </div>

                  {/* Segmented Multi-Bar */}
                  <div className="w-full bg-[#E5DFD7] h-3.5 rounded-full overflow-hidden flex border border-[#E5DFD7]">
                    <div
                      className="bg-[#0F766E] h-full"
                      style={{ width: `${compPct}%` }}
                      title={`Completed: ${s.completed}`}
                    />
                    <div
                      className="bg-[#B45309] h-full"
                      style={{ width: `${pendPct}%` }}
                      title={`Pending: ${s.pending}`}
                    />
                    <div
                      className="bg-[#7A1824] h-full"
                      style={{ width: `${overPct}%` }}
                      title={`Overdue: ${s.overdue}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-2 border-t border-[#E5DFD7] flex items-center justify-between text-[11px] text-[#625A5B]">
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" /> Completed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" /> Pending
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A1824]" /> Overdue (&gt;24h)
              </span>
            </div>
            <span className="font-mono text-[#1B1718] font-semibold">44 Scorecards</span>
          </div>
        </section>

        {/* SECTION C: PANEL CALIBRATION */}
        <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E5DFD7]">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#7A1824] block">
              Section C · Panel Calibration
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1718] tracking-tight">
              Panel Calibration: Agreement vs. Disagreement
            </h2>
            <p className="text-[13px] text-[#625A5B]">
              Evaluates alignment across interviewers to identify rubric ambiguity and split signals.
            </p>
          </div>

          {/* Visual Agreement / Disagreement Bar */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1B1718]">Overall Panel Alignment</span>
              <div className="space-x-2 font-mono font-bold text-xs">
                <span className="text-[#065F46]">Aligned: {disagreementStats.alignedRate}%</span>
                <span className="text-[#7A1824]">Disagreement: {disagreementStats.overallRate}%</span>
              </div>
            </div>

            {/* Split Bar */}
            <div className="w-full bg-[#E5DFD7] h-4 rounded-full overflow-hidden flex border border-[#E5DFD7]">
              <div
                className="bg-[#0F766E] h-full"
                style={{ width: `${disagreementStats.alignedRate}%` }}
                title="Aligned Consensus"
              />
              <div
                className="bg-[#7A1824] h-full"
                style={{ width: `${disagreementStats.overallRate}%` }}
                title="Split / Disagreement"
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-[#625A5B]">
              <span>44 Consensus Evaluations</span>
              <span className="text-[#7A1824] font-bold">10 Disagreements Logged</span>
            </div>
          </div>

          {/* Key Divergence Focal Points */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B] block">
              Primary Disagreement Focal Points:
            </span>

            <div className="p-3 bg-white rounded-lg border border-[#E5DFD7] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#1B1718]">
                <span>Executive Stakeholder Pushback</span>
                <span className="text-[10px] text-[#7A1824] font-mono font-bold bg-[#FDF2F2] px-2 py-0.5 rounded border border-[#FEE2E2]">
                  40% Split
                </span>
              </div>
              <p className="text-[#625A5B] text-[12px] leading-normal font-normal">
                Evaluators split on whether candidate resistance was healthy pushback or poor collaboration. Committee debrief required.
              </p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#E5DFD7] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#1B1718]">
                <span>Technical Architecture Trade-offs</span>
                <span className="text-[10px] text-[#C2410C] font-mono font-bold bg-[#FFF7ED] px-2 py-0.5 rounded border border-[#FFEDD5]">
                  28% Split
                </span>
              </div>
              <p className="text-[#625A5B] text-[12px] leading-normal font-normal">
                Technical interviewers calibrated higher than product interviewers on architecture trade-offs.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION D: EVIDENCE BLIND SPOTS HEATMAP */}
      <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DFD7]">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#7A1824] block">
              Section D · Pipeline Blind Spot Heatmap
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1718] tracking-tight">
              Evidence Blind Spots Across Job Competencies
            </h2>
            <p className="text-[13px] text-[#625A5B]">
              Shows which competencies systematically lack documented evidence across all candidates, indicating where interview guides need improvement.
            </p>
          </div>
          <button
            onClick={() => navigateToEvidenceBoard()}
            className="text-xs font-semibold text-[#7A1824] hover:underline"
          >
            Audit Evidence Board →
          </button>
        </div>

        {/* Heatmap Bar Rows */}
        <div className="space-y-3 pt-1 text-xs">
          {pipelineCompetenciesCoverage.map((item, idx) => {
            const isBlindSpot = item.coveragePct < 60;
            const isSelected = selectedBlindSpot === item.competency;

            return (
              <div
                key={idx}
                onClick={() => setSelectedBlindSpot(isSelected ? null : item.competency)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF8F5] border-[#7A1824] ring-1 ring-[#7A1824]'
                    : isBlindSpot
                    ? 'bg-[#FDF2F2]/40 border-[#FEE2E2] hover:bg-[#FDF2F2]'
                    : 'bg-[#FAF8F5] border-[#E5DFD7] hover:border-[#7A1824]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <strong className="text-[#1B1718] text-sm font-bold">{item.competency}</strong>
                    {isBlindSpot && (
                      <span className="text-[10px] font-bold text-[#7A1824] bg-[#FDF2F2] px-2 py-0.5 rounded border border-[#FEE2E2]">
                        Blind Spot Flagged
                      </span>
                    )}
                  </div>
                  <div className="space-x-3 font-mono">
                    <span className="font-bold text-[#1B1718]">{item.coveragePct}% Coverage</span>
                    <span className="text-[#625A5B] text-[11px]">({item.missingProbes} Missing Probes)</span>
                  </div>
                </div>

                {/* Visual Heatmap Horizontal Bar */}
                <div className="w-full bg-[#E5DFD7] h-3.5 rounded-md overflow-hidden border border-[#E5DFD7]">
                  <div
                    className={`h-full rounded-md transition-all ${
                      item.coveragePct >= 75
                        ? 'bg-[#0F766E]'
                        : item.coveragePct >= 50
                        ? 'bg-[#B45309]'
                        : 'bg-[#7A1824]'
                    }`}
                    style={{ width: `${item.coveragePct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1.5 text-[12px] text-[#625A5B]">
                  <span className="italic">Action: {item.recommendation}</span>
                  <span className="text-[#7A1824] font-semibold text-[11px]">{isSelected ? 'Close ▲' : 'Inspect ▼'}</span>
                </div>

                {isSelected && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#E5DFD7] text-[13px] text-[#1B1718] space-y-1">
                    <p>
                      <strong>Recommendation for Hiring Manager:</strong> Interviewers consistently skip behavioral questions on this topic due to interview pacing. Recommend adding a dedicated probe to the Technical Case round.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION E: CANDIDATE EVIDENCE READINESS (MULTI-BAR VISUAL) */}
      <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#7A1824] block">
              Section E · Finalist Readiness
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1718] tracking-tight">
              Candidate Evidence Coverage Readiness
            </h2>
            <p className="text-[13px] text-[#625A5B]">
              Multi-bar visual showing verified evidence, partial signals, and unverified gaps per finalist.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1 text-xs">
          {candidates.map((cand) => {
            const total = cand.competencyEvidence.length || 1;
            const verified = cand.competencyEvidence.filter((e) => e.status === 'Evidence found').length;
            const partial = cand.competencyEvidence.filter((e) => e.status === 'Partial evidence').length;
            const gaps = cand.competencyEvidence.filter(
              (e) => e.status === 'Needs validation' || e.status === 'No evidence yet' || e.status === 'Conflicting evidence'
            ).length;

            const verifiedPct = (verified / total) * 100;
            const partialPct = (partial / total) * 100;
            const gapPct = (gaps / total) * 100;

            return (
              <div
                key={cand.id}
                onClick={() => navigateToCandidate(cand.id)}
                className="p-3.5 bg-[#FAF8F5] hover:bg-[#F0EBE3] cursor-pointer transition-colors rounded-xl border border-[#E5DFD7] space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#7A1824] text-white flex items-center justify-center font-bold text-xs font-mono">
                      {cand.avatarInitials}
                    </div>
                    <div>
                      <strong className="text-[#1B1718] group-hover:text-[#7A1824] transition-colors font-bold text-[13px]">
                        {cand.name}
                      </strong>
                      <span className="text-[11px] text-[#8C8384] ml-2">
                        {cand.roleTitle} ({cand.currentStage})
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#065F46]">
                    {Math.round(verifiedPct + partialPct * 0.5)}% Coverage
                  </span>
                </div>

                {/* Stacked 3-segment bar */}
                <div className="w-full bg-[#E5DFD7] h-3 rounded-full overflow-hidden flex border border-[#E5DFD7]">
                  <div
                    className="bg-[#0F766E] h-full"
                    style={{ width: `${verifiedPct}%` }}
                    title={`${verified} verified`}
                  />
                  <div
                    className="bg-[#B45309] h-full"
                    style={{ width: `${partialPct}%` }}
                    title={`${partial} partial`}
                  />
                  <div
                    className="bg-[#7A1824] h-full"
                    style={{ width: `${gapPct}%` }}
                    title={`${gaps} gaps`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#625A5B]">
                  <div className="space-x-3">
                    <span className="text-[#065F46] font-semibold">{verified} Verified</span>
                    <span className="text-[#B45309] font-semibold">{partial} Partial</span>
                    <span className="text-[#7A1824] font-semibold">{gaps} Gaps</span>
                  </div>
                  <span className="text-[#7A1824] font-semibold group-hover:underline">
                    Inspect Dossier →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
