import React, { useState } from 'react';
import {
  GitCompare,
  Users,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  ChevronRight,
  Plus,
  Scale,
  Sparkles,
  MessageSquare,
  X,
  Info,
  Layers,
  Check,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Candidate, Competency, CandidateCompetencyEvidence } from '../../types';

export const CandidateComparisonPage: React.FC = () => {
  const {
    candidates,
    comparedCandidateIds,
    toggleCandidateComparison,
    navigateToCandidate,
    setCurrentPage,
    selectedRole,
    roles
  } = useApp();

  // Active drawer for detailed evidence inspection
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<{
    candidate: Candidate;
    competency: Competency;
    evidence?: CandidateCompetencyEvidence;
  } | null>(null);

  const [activeDivergenceFilter, setActiveDivergenceFilter] = useState<string | null>(null);
  const [showCoverageExplainer, setShowCoverageExplainer] = useState(false);

  // If no compared candidates, default to first 3 candidates (Ananya, Rohan, Meera)
  const defaultCandidateIds =
    comparedCandidateIds.length >= 2
      ? comparedCandidateIds
      : candidates.length >= 2
      ? candidates.slice(0, 3).map((c) => c.id)
      : [];

  const comparedCandidates = candidates.filter((c) =>
    defaultCandidateIds.includes(c.id)
  );

  // Competencies list
  const roleCompetencies: Competency[] =
    selectedRole?.competencies ||
    (comparedCandidates[0]
      ? roles.find((r) => r.id === comparedCandidates[0].roleId)?.competencies
      : roles[0]?.competencies) ||
    [];

  if (comparedCandidates.length < 2) {
    return (
      <div className="p-8 text-center text-xs text-[#625A5B] space-y-3 max-w-lg mx-auto my-12 bg-white border border-[#E5DFD7] rounded-xl shadow-xs">
        <GitCompare className="w-8 h-8 text-[#7A1824] mx-auto opacity-70" />
        <h2 className="text-xl font-bold text-[#1B1718] tracking-tight">Select Candidates to Compare</h2>
        <p className="text-[#625A5B] text-xs leading-relaxed">
          Please select at least two candidates to generate the visual signal map and side-by-side evidence matrix.
        </p>
        <div className="flex justify-center gap-2 pt-2">
          {candidates.slice(0, 3).map((c) => (
            <button
              key={c.id}
              onClick={() => toggleCandidateComparison(c.id)}
              className="px-3.5 py-1.5 bg-[#7A1824] text-white rounded-lg text-xs font-bold hover:bg-[#4A0F18] transition-colors shadow-xs"
            >
              + Add {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Helper to calculate verified evidence coverage %
  const getCandidateCoverage = (cand: Candidate) => {
    const total = roleCompetencies.length || 1;
    let score = 0;
    let strongCount = 0;
    let partialCount = 0;
    let missingCount = 0;
    let conflictingCount = 0;

    roleCompetencies.forEach((comp) => {
      const ev = cand.competencyEvidence.find(
        (e) => e.competencyId === comp.id || e.competencyName.toLowerCase() === comp.name.toLowerCase()
      );
      if (!ev || ev.status === 'No evidence yet') {
        missingCount++;
      } else if (ev.status === 'Evidence found') {
        score += 1;
        strongCount++;
      } else if (ev.status === 'Partial evidence') {
        score += 0.5;
        partialCount++;
      } else if (ev.status === 'Conflicting evidence') {
        score += 0.5;
        conflictingCount++;
      } else {
        missingCount++;
      }
    });

    const percentage = Math.round((score / total) * 100);
    return { percentage, strongCount, partialCount, missingCount, conflictingCount, total };
  };

  // Helper for evidence status classification
  const getCompetencyEvidenceStatus = (cand: Candidate, comp: Competency) => {
    const ev = cand.competencyEvidence.find(
      (e) => e.competencyId === comp.id || e.competencyName.toLowerCase() === comp.name.toLowerCase()
    );
    if (!ev) return { type: 'not_assessed', label: 'Not assessed', badgeClass: 'bg-[#FAF8F5] text-[#625A5B] border-[#E5DFD7]', barFilled: 0 };
    if (ev.status === 'Evidence found') {
      return { type: 'strong', label: 'Strong evidence', badgeClass: 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]', barFilled: 3 };
    }
    if (ev.status === 'Partial evidence') {
      return { type: 'partial', label: 'Partial evidence', badgeClass: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]', barFilled: 2 };
    }
    if (ev.status === 'Conflicting evidence') {
      return { type: 'conflicting', label: 'Conflicting signals', badgeClass: 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]', barFilled: 2 };
    }
    if (ev.status === 'Needs validation') {
      return { type: 'limited', label: 'Limited evidence', badgeClass: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]', barFilled: 1 };
    }
    return { type: 'missing', label: 'Missing evidence', badgeClass: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]', barFilled: 0 };
  };

  // Divergence analysis
  const divergenceItems = roleCompetencies.map((comp) => {
    const candidateStatuses = comparedCandidates.map((cand) => ({
      candidate: cand,
      status: getCompetencyEvidenceStatus(cand, comp),
      evidence: cand.competencyEvidence.find(
        (e) => e.competencyId === comp.id || e.competencyName.toLowerCase() === comp.name.toLowerCase()
      )
    }));
    const uniqueTypes = Array.from(new Set(candidateStatuses.map((s) => s.status.type)));
    const hasDivergence = uniqueTypes.length > 1;
    return { comp, candidateStatuses, hasDivergence };
  }).filter((item) => item.hasDivergence);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Governance Guardrail */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider mb-1.5">
              <Scale className="w-3.5 h-3.5 text-[#7A1824]" />
              <span>Evidence-First Decision Support · Humans Hold Hiring Authority</span>
            </div>
            <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
              Candidate Competency Comparison
            </h1>
            <p className="text-[14px] text-[#625A5B] mt-2 max-w-3xl leading-normal font-normal">
              Compare documented behavioral evidence, identify unverified rubric gaps, and investigate where panel signals diverge.
              Visual metrics measure <strong className="text-[#1B1718]">evidence coverage depth</strong>—never black-box candidate scores or automated rankings.
            </p>
          </div>

          {/* Candidate Multi-select Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-lg border border-[#E5DFD7] shrink-0">
            <span className="text-[12px] text-[#625A5B] font-bold uppercase tracking-wider px-1">Compare:</span>
            {candidates.slice(0, 4).map((c) => {
              const isSelected = defaultCandidateIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCandidateComparison(c.id)}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#7A1824] text-white shadow-xs'
                      : 'bg-white text-[#1B1718] hover:bg-[#F0EBE3] border border-[#E5DFD7]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{c.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Informational Banner on Evidence Coverage Definition */}
        <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[#1B1718]">
            <Info className="w-4 h-4 text-[#7A1824] shrink-0" />
            <span className="leading-relaxed text-[13px]">
              <strong className="font-semibold text-[#1B1718]">Evidence Coverage Definition:</strong> % of required role competencies supported by auditable, documented interview evidence.
              Not candidate quality, probability of hiring, or AI confidence.
            </span>
          </div>
          <button
            onClick={() => setShowCoverageExplainer(!showCoverageExplainer)}
            className="text-[12px] font-semibold text-[#7A1824] hover:underline whitespace-nowrap"
          >
            {showCoverageExplainer ? 'Hide Details' : 'How this is computed'}
          </button>
        </div>

        {showCoverageExplainer && (
          <div className="p-3.5 bg-white border border-[#E5DFD7] rounded-xl text-xs space-y-2 text-[#625A5B] shadow-xs">
            <p className="font-bold text-[#1B1718]">
              Institutional Calculation Methodology:
            </p>
            <p>
              Formula: <code className="font-mono bg-[#FAF8F5] px-1.5 py-0.5 rounded text-[#1B1718] text-[11px] border border-[#E5DFD7]">Coverage % = (Strong Competencies × 1.0 + Partial Competencies × 0.5) / Total Role Competencies</code>
            </p>
            <p className="text-[11px] leading-relaxed">
              A 78% evidence coverage score means 5.5 of 7 required job competencies have verifiable quotes logged in scorecards. Candidates with lower coverage typically indicate that interviewers ran out of time or omitted standard rubric questions.
            </p>
          </div>
        )}
      </div>

      {/* 2. SECTION: CANDIDATE SIGNAL MAP & EVIDENCE COVERAGE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A1824] block">
              Overview Layer 01
            </span>
            <h2 className="text-2xl font-bold text-[#1B1718] tracking-tight">
              Candidate Signal Map & Evidence Coverage
            </h2>
            <p className="text-xs text-[#625A5B] mt-0.5">
              Compact visual indicators of where evidence is verified versus missing before final committee review.
            </p>
          </div>
          <span className="text-xs text-[#625A5B] font-mono">
            {comparedCandidates.length} Candidates Analyzed
          </span>
        </div>

        <div className={`grid grid-cols-1 ${comparedCandidates.length === 2 ? 'md:grid-cols-2' : comparedCandidates.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-4`}>
          {comparedCandidates.map((cand) => {
            const coverage = getCandidateCoverage(cand);

            return (
              <div
                key={cand.id}
                className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#7A1824] transition-all group"
              >
                <div className="space-y-3">
                  {/* Candidate Identity */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#7A1824] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs">
                        {cand.avatarInitials}
                      </div>
                      <div>
                        <h3 className="font-bold text-[17px] text-[#1B1718] group-hover:text-[#7A1824] transition-colors leading-tight">
                          {cand.name}
                        </h3>
                        <div className="text-[12px] text-[#625A5B] mt-0.5">
                          Stage: <strong className="text-[#1B1718] font-semibold">{cand.currentStage}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigateToCandidate(cand.id)}
                      className="text-xs text-[#7A1824] hover:underline p-1"
                      title="View candidate profile"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Visual Evidence Coverage Bar */}
                  <div className="space-y-1.5 p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1B1718] text-[11px] uppercase tracking-wider">
                        Evidence Coverage:
                      </span>
                      <span className="font-mono font-bold text-sm text-[#0F766E]">
                        {coverage.percentage}%
                      </span>
                    </div>

                    {/* Compact visual progress indicator */}
                    <div className="w-full bg-[#E5DFD7] h-2 rounded-full overflow-hidden flex border border-[#E5DFD7]">
                      <div
                        className="bg-[#0F766E] h-full transition-all"
                        style={{ width: `${(coverage.strongCount / coverage.total) * 100}%` }}
                        title={`${coverage.strongCount} Strong`}
                      />
                      <div
                        className="bg-[#B45309] h-full transition-all"
                        style={{ width: `${(coverage.partialCount / coverage.total) * 100}%` }}
                        title={`${coverage.partialCount} Partial`}
                      />
                      <div
                        className="bg-[#7A1824] h-full transition-all"
                        style={{ width: `${(coverage.missingCount / coverage.total) * 100}%` }}
                        title={`${coverage.missingCount} Missing`}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-medium text-[#625A5B] pt-0.5">
                      <span className="text-[#0F766E] font-semibold">{coverage.strongCount} verified</span>
                      <span className="text-[#B45309] font-semibold">{coverage.partialCount} partial</span>
                      <span className="text-[#7A1824] font-semibold">{coverage.missingCount} missing</span>
                    </div>
                  </div>

                  {/* Horizontal Segmented Signal Map */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B] block">
                      Competency Signal Profile:
                    </span>

                    <div className="space-y-1.5">
                      {roleCompetencies.map((comp) => {
                        const status = getCompetencyEvidenceStatus(cand, comp);
                        const ev = cand.competencyEvidence.find(
                          (e) => e.competencyId === comp.id || e.competencyName.toLowerCase() === comp.name.toLowerCase()
                        );

                        return (
                          <div
                            key={comp.id}
                            onClick={() =>
                              setActiveEvidenceModal({
                                candidate: cand,
                                competency: comp,
                                evidence: ev
                              })
                            }
                            className="flex items-center justify-between p-1.5 rounded hover:bg-[#FAF8F5] cursor-pointer transition-colors text-xs group/comp"
                          >
                            <span className="text-[11px] text-[#1B1718] truncate max-w-[130px] font-medium group-hover/comp:text-[#7A1824]">
                              {comp.name}
                            </span>

                            {/* Segmented Compact Dots / Bars */}
                            <div className="flex items-center space-x-1">
                              {status.type === 'strong' ? (
                                <div className="flex items-center space-x-1" title="Strong evidence">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
                                </div>
                              ) : status.type === 'partial' ? (
                                <div className="flex items-center space-x-1" title="Partial evidence">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD7] border border-[#E5DFD7]" />
                                </div>
                              ) : status.type === 'conflicting' ? (
                                <div className="flex items-center space-x-1" title="Conflicting panel signals">
                                  <span className="text-[10px] font-bold text-[#C2410C] bg-[#FFF7ED] px-1 rounded border border-[#FDBA74]">
                                    ⚡ Split
                                  </span>
                                </div>
                              ) : status.type === 'limited' ? (
                                <div className="flex items-center space-x-1" title="Limited evidence">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD7] border border-[#E5DFD7]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD7] border border-[#E5DFD7]" />
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1" title="Missing evidence">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD7] border border-[#E5DFD7]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD7] border border-[#E5DFD7]" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD7] border border-[#E5DFD7]" />
                                </div>
                              )}
                              <span className="text-[9px] font-mono text-[#625A5B] pl-1 uppercase">
                                {status.type === 'strong'
                                  ? 'Strong'
                                  : status.type === 'partial'
                                  ? 'Partial'
                                  : status.type === 'conflicting'
                                  ? 'Split'
                                  : 'Missing'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5DFD7] flex items-center justify-between text-xs text-[#625A5B]">
                  <span className="text-[10px] font-mono">
                    Status: <strong className="text-[#1B1718]">{cand.overallSignalStatus}</strong>
                  </span>
                  <button
                    onClick={() => navigateToCandidate(cand.id)}
                    className="text-xs font-bold text-[#7A1824] hover:underline"
                  >
                    Dossier →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION: COMPETENCY EVIDENCE OVERVIEW (VISUAL MATRIX WITH INTERACTIVE CELLS) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A1824] block">
              Analytical Matrix
            </span>
            <h2 className="text-2xl font-bold text-[#1B1718] tracking-tight">
              Competency Evidence Overview
            </h2>
            <p className="text-xs text-[#625A5B] mt-0.5">
              Candidates as columns, standardized rubrics as rows. Click any cell to inspect verbatim interview quotes and unverified gaps.
            </p>
          </div>

          {/* Matrix Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] bg-[#FAF8F5] p-2 px-3 rounded-lg border border-[#E5DFD7]">
            <span className="flex items-center gap-1 font-medium text-[#166534]">
              <span className="w-2 h-2 rounded-full bg-[#166534]" /> Strong (●●●)
            </span>
            <span className="flex items-center gap-1 font-medium text-[#92400E]">
              <span className="w-2 h-2 rounded-full bg-[#B45309]" /> Partial (●●)
            </span>
            <span className="flex items-center gap-1 font-medium text-[#B91C1C]">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C]" /> Missing (░░░)
            </span>
            <span className="flex items-center gap-1 font-medium text-[#C2410C]">
              <span className="text-[#C2410C] font-bold">⚡</span> Conflicting
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#E5DFD7] rounded-xl overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E5DFD7] text-xs">
                <th className="p-4 font-bold text-[#625A5B] uppercase tracking-wider w-1/4">
                  Standardized Competency Rubric
                </th>
                {comparedCandidates.map((cand) => (
                  <th key={cand.id} className="p-4 font-bold text-[#1B1718] border-l border-[#E5DFD7]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[#1B1718]">{cand.name}</div>
                        <div className="text-[10px] text-[#625A5B] font-normal">{cand.roleTitle}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E5DFD7] text-[#7A1824]">
                        {getCandidateCoverage(cand).percentage}% Cov.
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5DFD7] text-xs">
              {roleCompetencies.map((comp) => {
                // Check if candidates differ on this competency
                const statuses = comparedCandidates.map((c) => getCompetencyEvidenceStatus(c, comp).type);
                const hasDivergence = Array.from(new Set(statuses)).length > 1;

                return (
                  <tr key={comp.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    {/* Competency definition column */}
                    <td className="p-4 align-top space-y-1">
                      <div className="flex items-center space-x-2">
                        <strong className="text-sm text-[#1B1718] font-bold">{comp.name}</strong>
                        {hasDivergence && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]">
                            Diverges
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#625A5B] leading-relaxed line-clamp-2">
                        {comp.description}
                      </p>
                      <div className="text-[11px] text-[#625A5B] italic pt-0.5">
                        Suggested: "{comp.suggestedQuestion.slice(0, 70)}..."
                      </div>
                    </td>

                    {/* Candidate Evidence Cells */}
                    {comparedCandidates.map((cand) => {
                      const status = getCompetencyEvidenceStatus(cand, comp);
                      const ev = cand.competencyEvidence.find(
                        (e) => e.competencyId === comp.id || e.competencyName.toLowerCase() === comp.name.toLowerCase()
                      );

                      return (
                        <td
                          key={cand.id}
                          onClick={() =>
                            setActiveEvidenceModal({
                              candidate: cand,
                              competency: comp,
                              evidence: ev
                            })
                          }
                          className="p-3.5 align-top border-l border-[#E5DFD7] cursor-pointer hover:bg-[#FAF8F5] transition-all group"
                          title="Click to inspect verified quote and interview source"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${status.badgeClass} flex items-center gap-1`}
                              >
                                {status.type === 'strong' ? (
                                  <span>●●● Strong</span>
                                ) : status.type === 'partial' ? (
                                  <span>●● Partial</span>
                                ) : status.type === 'conflicting' ? (
                                  <span>⚡ Conflicting</span>
                                ) : (
                                  <span>░░ Missing</span>
                                )}
                              </span>

                              <Maximize2 className="w-3.5 h-3.5 text-[#8C8384] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Summary snippet */}
                            <p className="text-xs text-[#1B1718] leading-snug line-clamp-2">
                              {ev?.evidenceSummary || (
                                <span className="text-[#8C8384] italic">
                                  No documented behavioral evidence captured during interviews.
                                </span>
                              )}
                            </p>

                            {/* Verbatim quote snippet */}
                            {ev?.evidenceQuote && (
                              <div className="text-[11px] italic text-[#625A5B] border-l-2 border-[#7A1824] pl-2 line-clamp-2 bg-[#FAF8F5] py-0.5 rounded-r">
                                "{ev.evidenceQuote}"
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-1 text-[10px] text-[#625A5B] font-mono">
                              <span>Source: {ev?.evidenceSource || 'Not assessed'}</span>
                              <span className="text-[#7A1824] font-bold group-hover:underline">
                                Inspect →
                              </span>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. SECTION: "WHERE SIGNALS DIVERGE" (DIVERGENCE VIEW) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A1824]">
              <Sparkles className="w-3.5 h-3.5 text-[#7A1824]" />
              <span>Comparative Synthesis</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1B1718] tracking-tight">
              Where Signals Diverge
            </h2>
            <p className="text-[14px] text-[#625A5B] mt-1">
              Pinpoints the competencies where candidates exhibit contrasting behavioral patterns and evidence depth.
            </p>
          </div>
          <span className="text-xs font-mono text-[#C2410C] bg-[#FFF7ED] px-3 py-1.5 rounded-lg border border-[#FDBA74] font-bold">
            {divergenceItems.length} Rubrics Divergent
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {divergenceItems.map(({ comp, candidateStatuses }) => (
            <div
              key={comp.id}
              className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-[#7A1824] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD7]">
                  <h3 className="font-bold text-sm text-[#1B1718]">{comp.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded border border-[#FDBA74]">
                    Divergence
                  </span>
                </div>

                <p className="text-xs text-[#625A5B] leading-relaxed">
                  {comp.whyItMatters}
                </p>

                {/* Candidate by Candidate Divergence Breakdown */}
                <div className="space-y-2 pt-1">
                  {candidateStatuses.map(({ candidate, status, evidence }) => (
                    <div
                      key={candidate.id}
                      onClick={() =>
                        setActiveEvidenceModal({
                          candidate,
                          competency: comp,
                          evidence
                        })
                      }
                      className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7] hover:bg-white cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-[#1B1718] group-hover:text-[#7A1824] font-bold">
                          {candidate.name}
                        </strong>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.badgeClass}`}>
                          {status.label}
                        </span>
                      </div>

                      {/* Evidence quote or gap */}
                      <p className="text-xs text-[#625A5B] leading-snug line-clamp-2">
                        {evidence?.evidenceQuote
                          ? `"${evidence.evidenceQuote}"`
                          : evidence?.evidenceSummary || 'No documented transcript quote.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5DFD7] flex items-center justify-between text-xs text-[#625A5B]">
                <span className="font-medium">Click any card to inspect full quotes</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#7A1824]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECTION: COMMITTEE DELIBERATION PROMPTS */}
      <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E5DFD7]">
          <div>
            <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A1824]">
              <MessageSquare className="w-3.5 h-3.5 text-[#7A1824]" />
              <span>Human-Led Decision Protocol</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1B1718] tracking-tight mt-1">
              Trade-Off Committee Discussion Prompts
            </h3>
            <p className="text-xs text-[#625A5B] mt-1">
              Structured questions for debrief deliberations to resolve candidate trade-offs without automated bias.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('decisions')}
            className="px-5 py-2.5 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
          >
            Open Decision Desk →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A1824] block font-mono">
              Debate Prompt 01 · Customer Discovery vs. Technical Architecture
            </span>
            <p className="font-bold text-[#1B1718] text-sm leading-snug">
              "How should the committee weigh {comparedCandidates[0].name}'s proven customer discovery empathy against {comparedCandidates[1]?.name || 'the other finalist'}'s deeper distributed systems architecture experience?"
            </p>
            <p className="text-[#625A5B] text-xs leading-relaxed">
              Action: Review team mentorship bandwidth in the APM squad. Which skill is harder to train on the job in the first 90 days?
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A1824] block font-mono">
              Debate Prompt 02 · Panel Disagreement Resolution
            </span>
            <p className="font-bold text-[#1B1718] text-sm leading-snug">
              "Where interviewers split on prioritization and analytical rigor, what additional evidence or work sample would establish objective alignment?"
            </p>
            <p className="text-[#625A5B] text-xs leading-relaxed">
              Action: Check the Decision Desk to request an explicit follow-up probe rather than making an ungrounded rejection.
            </p>
          </div>
        </div>
      </section>

      {/* MODAL / DRAWER: DETAILED EVIDENCE INSPECTION */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF8F5] border border-[#E5DFD7] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E5DFD7]">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#7A1824]">
                  <span>Evidence Inspection Dossier</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1718] mt-0.5 tracking-tight">
                  {activeEvidenceModal.competency.name}
                </h3>
                <div className="text-xs text-[#625A5B]">
                  Candidate: <strong className="text-[#1B1718] font-bold">{activeEvidenceModal.candidate.name}</strong> ({activeEvidenceModal.candidate.roleTitle})
                </div>
              </div>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="p-1 rounded-md text-[#8C8384] hover:text-[#1B1718] hover:bg-[#F0EBE3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rubric Definition & Purpose */}
            <div className="p-4 bg-white rounded-xl border border-[#E5DFD7] space-y-1.5 text-xs shadow-xs">
              <span className="font-bold text-[#1B1718] block text-[11px] uppercase tracking-wider">
                Competency Definition & Why It Matters:
              </span>
              <p className="text-[#625A5B] leading-relaxed">
                {activeEvidenceModal.competency.description}
              </p>
              <div className="text-xs text-[#1B1718] pt-1">
                <strong>Why It Matters:</strong> {activeEvidenceModal.competency.whyItMatters}
              </div>
            </div>

            {/* Evidence Body */}
            {activeEvidenceModal.evidence ? (
              <div className="space-y-4 text-xs">
                {/* Status & Source Meta */}
                <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#E5DFD7] shadow-xs">
                  <div>
                    <span className="text-[10px] text-[#625A5B] uppercase font-bold block">Status</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border inline-block mt-0.5 ${
                        getCompetencyEvidenceStatus(activeEvidenceModal.candidate, activeEvidenceModal.competency).badgeClass
                      }`}
                    >
                      {activeEvidenceModal.evidence.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#625A5B] uppercase font-bold block">Evidence Source</span>
                    <span className="font-bold text-[#1B1718]">{activeEvidenceModal.evidence.evidenceSource}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#625A5B] uppercase font-bold block">Strength</span>
                    <span className="font-mono font-bold text-[#1B1718]">{activeEvidenceModal.evidence.evidenceStrength}</span>
                  </div>
                </div>

                {/* Evidence Summary */}
                <div className="space-y-1">
                  <span className="font-bold text-[#1B1718] uppercase text-[10px] tracking-wider block">
                    Documented Evidence Summary:
                  </span>
                  <p className="text-[#1B1718] bg-white p-3.5 rounded-xl border border-[#E5DFD7] leading-relaxed shadow-xs">
                    {activeEvidenceModal.evidence.evidenceSummary}
                  </p>
                </div>

                {/* Verbatim Interview Quote */}
                {activeEvidenceModal.evidence.evidenceQuote && (
                  <div className="space-y-1">
                    <span className="font-bold text-[#7A1824] uppercase text-[10px] tracking-wider block">
                      Verbatim Transcript Quote:
                    </span>
                    <blockquote className="p-3.5 bg-white border-l-4 border-[#7A1824] rounded-r-xl text-xs italic text-[#1B1718] leading-relaxed shadow-xs">
                      "{activeEvidenceModal.evidence.evidenceQuote}"
                    </blockquote>
                  </div>
                )}

                {/* Identified Gaps */}
                {activeEvidenceModal.evidence.missingEvidence && (
                  <div className="p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#B91C1C] font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Identified Competency Gaps:</span>
                    </div>
                    <p className="text-[#625A5B] leading-relaxed pl-5">
                      {activeEvidenceModal.evidence.missingEvidence}
                    </p>
                  </div>
                )}

                {/* Interviewer Comments */}
                {activeEvidenceModal.evidence.interviewerComments && activeEvidenceModal.evidence.interviewerComments.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="font-bold text-[#1B1718] uppercase text-[10px] tracking-wider block">
                      Interviewer Comments:
                    </span>
                    <div className="space-y-2">
                      {activeEvidenceModal.evidence.interviewerComments.map((comm, idx) => (
                        <div key={idx} className="p-3 bg-white border border-[#E5DFD7] rounded-xl space-y-1 shadow-xs">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-[#1B1718]">{comm.interviewer} ({comm.role})</span>
                            <span className="text-[10px] font-mono text-[#8C8384]">{comm.date}</span>
                          </div>
                          <p className="text-[#625A5B] text-xs italic">"{comm.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-[#625A5B] bg-white rounded-xl border border-[#E5DFD7] space-y-2 shadow-xs">
                <AlertCircle className="w-6 h-6 text-[#B91C1C] mx-auto opacity-70" />
                <strong className="text-[#1B1718] block font-bold text-sm">No Documented Evidence Collected Yet</strong>
                <p>
                  Interviewers have not yet logged behavioral quotes or scorecards for this competency with {activeEvidenceModal.candidate.name}.
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#E5DFD7] flex items-center justify-between">
              <button
                onClick={() => {
                  navigateToCandidate(activeEvidenceModal.candidate.id);
                  setActiveEvidenceModal(null);
                }}
                className="text-xs font-bold text-[#7A1824] hover:underline"
              >
                Open Full Candidate Dossier →
              </button>

              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="px-5 py-2.5 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
