import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  GitCompare,
  Network,
  ChevronRight,
  CheckSquare,
  Square,
  ArrowRight,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SignalStatus } from '../../types';

export const CandidatesPage: React.FC = () => {
  const {
    candidates,
    roles,
    selectedRoleId,
    setSelectedRoleId,
    navigateToCandidate,
    navigateToEvidenceBoard,
    comparedCandidateIds,
    toggleCandidateComparison,
    navigateToComparison,
    setCurrentPage
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [signalFilter, setSignalFilter] = useState<string>('All');

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.relevantSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = !selectedRoleId || c.roleId === selectedRoleId;
    const matchesStage = stageFilter === 'All' || c.currentStage === stageFilter;
    const matchesSignal = signalFilter === 'All' || c.overallSignalStatus === signalFilter;

    return matchesSearch && matchesRole && matchesStage && matchesSignal;
  });

  // Extract distinct stages
  const allStages = Array.from(new Set(candidates.map((c) => c.currentStage)));

  const signalStatuses: SignalStatus[] = [
    'Ready for review',
    'Evidence incomplete',
    'Feedback pending',
    'Interviewers disagree',
    'Strong evidence across competencies',
    'Additional validation recommended',
    'Decision discussion required'
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider mb-1.5">
              <Users className="w-3.5 h-3.5 text-[#7A1824]" />
              <span>Evidence-Backed Talent Directory</span>
            </div>
            <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
              Candidate Pipeline
            </h1>
            <p className="text-[14px] text-[#625A5B] max-w-3xl leading-normal mt-1 font-normal">
              Transparent candidate overview grounded in verifiable signals, stage checkpoints, and evidence completeness. Automatic score cutoffs are disabled to uphold human judgment.
            </p>
          </div>

          {comparedCandidateIds.length > 0 && (
            <button
              onClick={() => navigateToComparison()}
              className="flex items-center space-x-2 px-4 py-2 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-[13px] font-semibold rounded-lg shadow-xs transition-colors shrink-0"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Compare Selected ({comparedCandidateIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="flex items-center bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-3 py-1.5 w-full md:w-80 focus-within:border-[#7A1824] focus-within:ring-1 focus-within:ring-[#7A1824]">
            <Search className="w-3.5 h-3.5 text-[#625A5B] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search by candidate name, skill, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-[13px] text-[#1B1718] placeholder-[#8C8384] focus:outline-none w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Role Filter */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#625A5B] font-bold text-[11px] uppercase tracking-wider">Role:</span>
              <select
                value={selectedRoleId || ''}
                onChange={(e) => setSelectedRoleId(e.target.value || null)}
                className="bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] font-medium focus:ring-1 focus:ring-[#7A1824]"
              >
                <option value="">All Open Roles ({roles.length})</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Filter */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#625A5B] font-bold text-[11px] uppercase tracking-wider">Stage:</span>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] font-medium focus:ring-1 focus:ring-[#7A1824]"
              >
                <option value="All">All Stages</option>
                {allStages.map((stg) => (
                  <option key={stg} value={stg}>
                    {stg}
                  </option>
                ))}
              </select>
            </div>

            {/* Signal Filter */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#625A5B] font-bold text-[11px] uppercase tracking-wider">Signal:</span>
              <select
                value={signalFilter}
                onChange={(e) => setSignalFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] font-medium focus:ring-1 focus:ring-[#7A1824]"
              >
                <option value="All">All Signal States</option>
                {signalStatuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Candidates List */}
      <div className="space-y-3">
        {filteredCandidates.length === 0 ? (
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-10 text-center text-xs text-[#625A5B]">
            No candidates match the active filter criteria.{' '}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRoleId(null);
                setStageFilter('All');
                setSignalFilter('All');
              }}
              className="underline text-[#7A1824] font-semibold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredCandidates.map((cand) => {
            const isCompared = comparedCandidateIds.includes(cand.id);

            // Calculate evidence stats
            const totalComps = cand.competencyEvidence.length || 1;
            const evidenceFoundCount = cand.competencyEvidence.filter(
              (e) => e.status === 'Evidence found'
            ).length;
            const partialCount = cand.competencyEvidence.filter(
              (e) => e.status === 'Partial evidence'
            ).length;
            const gapsCount = cand.competencyEvidence.filter(
              (e) => e.status === 'Needs validation' || e.status === 'Conflicting evidence'
            ).length;

            return (
              <div
                key={cand.id}
                className={`bg-white border rounded-xl p-4 md:p-5 transition-all shadow-xs hover:shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompared
                    ? 'border-[#7A1824] bg-[#FAF8F5] ring-2 ring-[#7A1824]'
                    : 'border-[#E5DFD7] hover:border-[#7A1824]'
                }`}
              >
                {/* Left: Checkbox + Avatar + Info */}
                <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleCandidateComparison(cand.id)}
                    className="mt-1 text-[#625A5B] hover:text-[#1B1718] transition-colors p-0.5"
                    title={isCompared ? 'Remove from comparison' : 'Select to compare'}
                  >
                    {isCompared ? (
                      <CheckSquare className="w-5 h-5 text-[#7A1824]" />
                    ) : (
                      <Square className="w-5 h-5 text-[#E5DFD7]" />
                    )}
                  </button>

                  <div className="w-11 h-11 rounded-xl bg-[#7A1824] text-white flex items-center justify-center font-bold text-sm shrink-0 font-mono shadow-xs">
                    {cand.avatarInitials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => navigateToCandidate(cand.id)}
                        className="font-bold text-[18px] text-[#1B1718] hover:text-[#7A1824] transition-colors text-left truncate leading-tight"
                      >
                        {cand.name}
                      </button>
                      <span className="text-[13px] text-[#625A5B] font-medium">
                        · {cand.roleTitle}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[12px] text-[#625A5B]">
                      <span>
                        Stage: <strong className="text-[#1B1718] font-semibold">{cand.currentStage}</strong>
                      </span>
                      <span>·</span>
                      <span>Applied {cand.appliedDate}</span>
                      <span>·</span>
                      <span>
                        {cand.interviewNotes.length} scorecards logged
                      </span>
                    </div>

                    <div className="mt-2 text-[13px] text-[#625A5B] line-clamp-1 max-w-2xl leading-normal">
                      {cand.resumeSummary}
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cand.relevantSkills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 bg-[#FAF8F5] border border-[#E5DFD7] text-[#1B1718] text-[11px] rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center: Evidence Completeness Matrix Summary */}
                <div className="flex flex-col md:items-end justify-center shrink-0 md:min-w-[200px] border-t md:border-t-0 pt-3 md:pt-0 border-[#E5DFD7]">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        cand.overallSignalStatus === 'Decision discussion required'
                          ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]'
                          : cand.overallSignalStatus === 'Interviewers disagree'
                          ? 'bg-[#FDF2F2] text-[#7A1824] border-[#FEE2E2]'
                          : cand.overallSignalStatus === 'Evidence incomplete'
                          ? 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
                          : cand.overallSignalStatus === 'Ready for review'
                          ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                          : 'bg-[#FAF8F5] text-[#1B1718] border-[#E5DFD7]'
                      }`}
                    >
                      {cand.overallSignalStatus}
                    </span>
                  </div>

                  {/* Competency Evidence mini-bar */}
                  <div className="mt-2 text-right">
                    <div className="text-[11px] text-[#625A5B] font-medium">
                      <span className="text-[#0F766E] font-semibold">{evidenceFoundCount} found</span> ·{' '}
                      <span className="text-[#B45309]">{partialCount} partial</span>
                      {gapsCount > 0 && (
                        <span className="text-[#7A1824] font-semibold"> · {gapsCount} gaps</span>
                      )}
                    </div>
                    <div className="w-36 bg-[#E5DFD7] h-2 rounded-full overflow-hidden mt-1.5 flex border border-[#E5DFD7]">
                      <div
                        className="bg-[#0F766E] h-full"
                        style={{ width: `${(evidenceFoundCount / totalComps) * 100}%` }}
                        title="Verified evidence"
                      />
                      <div
                        className="bg-[#B45309] h-full"
                        style={{ width: `${(partialCount / totalComps) * 100}%` }}
                        title="Partial evidence"
                      />
                      <div
                        className="bg-[#7A1824] h-full"
                        style={{ width: `${(gapsCount / totalComps) * 100}%` }}
                        title="Gaps / Disagreements"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Quick action buttons */}
                <div className="flex items-center space-x-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-[#E5DFD7]">
                  <button
                    onClick={() => navigateToEvidenceBoard(cand.id)}
                    className="p-2 text-[#625A5B] hover:text-[#1B1718] hover:bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg transition-colors"
                    title="Inspect on Evidence Board"
                  >
                    <Network className="w-4 h-4 text-[#7A1824]" />
                  </button>

                  <button
                    onClick={() => navigateToCandidate(cand.id)}
                    className="flex items-center space-x-1 px-3.5 py-2 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-[13px] font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <span>Inspect Evidence</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sticky Compare Bottom Float Bar */}
      {comparedCandidateIds.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-[#1B1718] text-[#FAF8F5] rounded-xl px-5 py-3 shadow-2xl flex items-center space-x-4 border border-[#4A0F18] animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center space-x-2 text-[13px]">
            <GitCompare className="w-4 h-4 text-[#7A1824]" />
            <span className="font-semibold">{comparedCandidateIds.length} candidate(s) selected for comparison</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateToComparison()}
              className="px-4 py-1.5 bg-[#7A1824] hover:bg-[#4A0F18] text-white font-bold text-[13px] rounded-lg transition-colors shadow-xs"
            >
              Launch Side-by-Side
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
