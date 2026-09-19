import React, { useState } from 'react';
import {
  Network,
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Flag,
  Plus,
  ArrowRight,
  Eye,
  FileText,
  MessageSquare,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CandidateCompetencyEvidence, EvidenceStatus } from '../../types';

export const EvidenceBoardPage: React.FC = () => {
  const {
    candidates,
    roles,
    selectedCandidate,
    setSelectedCandidateId,
    updateCompetencyEvidence,
    navigateToCandidate,
    navigateToComparison,
    selectedRole
  } = useApp();

  const [activeCandidateId, setActiveCandidateId] = useState<string>(
    selectedCandidate?.id || candidates[0]?.id || ''
  );
  const [selectedCompetencyId, setSelectedCompetencyId] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');
  const [activeTraceEvidence, setActiveTraceEvidence] = useState<CandidateCompetencyEvidence | null>(null);
  const [newFollowUpText, setNewFollowUpText] = useState<string>('');

  const currentCandidate =
    candidates.find((c) => c.id === activeCandidateId) || candidates[0];

  // Filter candidates by role filter if selected
  const availableCandidates = selectedRoleFilter === 'All'
    ? candidates
    : candidates.filter((c) => c.roleId === selectedRoleFilter);

  // Filter evidence cards
  const filteredEvidence = currentCandidate.competencyEvidence.filter((ev) => {
    const matchesCompetency =
      !selectedCompetencyId || ev.competencyId === selectedCompetencyId;

    let matchesStatus = true;
    if (statusFilter === 'Verified') {
      matchesStatus = ev.status === 'Evidence found';
    } else if (statusFilter === 'Gap') {
      matchesStatus = ev.status === 'Needs validation' || ev.status === 'No evidence yet';
    } else if (statusFilter === 'Needs Probe') {
      matchesStatus = ev.status === 'Partial evidence' || ev.status === 'Conflicting evidence';
    }

    const matchesStage = stageFilter === 'All' || ev.evidenceSource.toLowerCase().includes(stageFilter.toLowerCase());

    return matchesCompetency && matchesStatus && matchesStage;
  });

  const handleAddFollowUpToTrace = (compId: string) => {
    if (!newFollowUpText.trim()) return;
    updateCompetencyEvidence(currentCandidate.id, compId, {
      newFollowUpQuestion: newFollowUpText.trim()
    });
    if (activeTraceEvidence) {
      setActiveTraceEvidence({
        ...activeTraceEvidence,
        followUpQuestions: [...activeTraceEvidence.followUpQuestions, newFollowUpText.trim()]
      });
    }
    setNewFollowUpText('');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header & Investigation Principle */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7A1824]" />
              <span>Evidence Trace Engine · Intellectual Core</span>
            </div>
            <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
              The Evidence Investigation Board
            </h1>
            <p className="text-[14px] text-[#625A5B] mt-2 max-w-3xl leading-normal font-normal">
              Traces every hiring signal along an unbroken chain of custody:{' '}
              <strong className="text-[#1B1718]">Competency → Question → Observation → Verifiable Evidence → Gap → Recommended Action</strong>.
              Ensures evaluators never evaluate candidates based on gut feeling or ungrounded assumptions.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => navigateToCandidate(currentCandidate.id)}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#1B1718] text-[13px] font-semibold rounded-lg border border-[#E5DFD7] transition-colors"
            >
              <Users className="w-4 h-4 text-[#7A1824]" />
              <span>Open Candidate Profile</span>
            </button>
            <button
              onClick={() => navigateToComparison([currentCandidate.id, 'cand-rohan'])}
              className="flex items-center space-x-1.5 px-4 py-2 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-[13px] font-semibold rounded-lg shadow-xs transition-colors"
            >
              <span>Compare Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Step Connected Flow Visualizer Banner */}
        <div className="pt-4 border-t border-[#E5DFD7] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-[#625A5B]">
            <span className="px-3 py-1 rounded-md bg-[#FAF8F5] text-[#1B1718] border border-[#E5DFD7] font-semibold">
              1. Competency
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#625A5B]" />
            <span className="px-3 py-1 rounded-md bg-[#FAF8F5] text-[#1B1718] border border-[#E5DFD7] font-semibold">
              2. Question
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#625A5B]" />
            <span className="px-3 py-1 rounded-md bg-[#FAF8F5] text-[#1B1718] border border-[#E5DFD7] font-semibold">
              3. Observation
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#625A5B]" />
            <span className="px-3 py-1 rounded-md bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-bold">
              4. Verifiable Quote
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#625A5B]" />
            <span className="px-3 py-1 rounded-md bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5] font-bold">
              5. Gap Detected
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#625A5B]" />
            <span className="px-3 py-1 rounded-md bg-[#7A1824] text-white font-bold">
              6. Next Action
            </span>
          </div>

          <span className="text-[12px] text-[#625A5B] font-medium">
            Click any block below to trace evidence
          </span>
        </div>
      </div>

      {/* 2. Multi-Facet Filtering Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* 1. Filter by Role */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#625A5B] block mb-1">
              Role
            </label>
            <select
              value={selectedRoleFilter}
              onChange={(e) => {
                setSelectedRoleFilter(e.target.value);
                const matched = e.target.value === 'All'
                  ? candidates[0]
                  : candidates.find((c) => c.roleId === e.target.value) || candidates[0];
                if (matched) {
                  setActiveCandidateId(matched.id);
                  setSelectedCandidateId(matched.id);
                }
              }}
              className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] font-medium focus:ring-1 focus:ring-[#7A1824] focus:outline-none"
            >
              <option value="All">All Open Roles ({roles.length})</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Filter by Candidate */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#625A5B] block mb-1">
              Candidate
            </label>
            <select
              value={activeCandidateId}
              onChange={(e) => {
                setActiveCandidateId(e.target.value);
                setSelectedCandidateId(e.target.value);
                setSelectedCompetencyId(null);
                setActiveTraceEvidence(null);
              }}
              className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] font-medium focus:ring-1 focus:ring-[#7A1824] focus:outline-none"
            >
              {availableCandidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.roleTitle})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Filter by Stage */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#625A5B] block mb-1">
              Interview Stage
            </label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] font-medium focus:ring-1 focus:ring-[#7A1824] focus:outline-none"
            >
              <option value="All">All Stages</option>
              <option value="Screen">Recruiter Screen</option>
              <option value="Technical">Technical Case</option>
              <option value="Interview">Manager Interview</option>
              <option value="Debrief">Final Review</option>
            </select>
          </div>

          {/* 4. Filter by Status */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#625A5B] block mb-1">
              Evidence Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] font-medium focus:ring-1 focus:ring-[#7A1824] focus:outline-none"
            >
              <option value="All">All Signal States</option>
              <option value="Verified">Verified Evidence Only</option>
              <option value="Gap">Evidence Gaps Only</option>
              <option value="Needs Probe">Needs Probe / Partial</option>
            </select>
          </div>
        </div>

        {/* Competency Pill Filter Strip */}
        <div className="pt-2 border-t border-[#E5DFD7] flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-[#625A5B] mr-1">Filter Competency:</span>
          <button
            onClick={() => setSelectedCompetencyId(null)}
            className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
              selectedCompetencyId === null
                ? 'bg-[#7A1824] text-white font-semibold'
                : 'bg-[#FAF8F5] text-[#1B1718] hover:bg-[#E5DFD7] border border-[#E5DFD7]'
            }`}
          >
            All ({currentCandidate.competencyEvidence.length})
          </button>
          {currentCandidate.competencyEvidence.map((ev) => (
            <button
              key={ev.competencyId}
              onClick={() => setSelectedCompetencyId(ev.competencyId)}
              className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                selectedCompetencyId === ev.competencyId
                  ? 'bg-[#7A1824] text-white font-semibold'
                  : 'bg-[#FAF8F5] text-[#1B1718] hover:bg-[#E5DFD7] border border-[#E5DFD7]'
              }`}
            >
              {ev.competencyName}
            </button>
          ))}
        </div>
      </div>

      {/* 3. The Visual Mapping Grid: Competency → Question → Observation → Evidence → Gap → Action */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#625A5B]">
            Active Evidence Traces ({filteredEvidence.length} Competency Signals)
          </span>
          <span className="text-[#625A5B]">
            Candidate: <strong className="text-[#1B1718] font-semibold">{currentCandidate.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredEvidence.map((ev) => {
            const hasGap = ev.status === 'Needs validation' || ev.status === 'No evidence yet' || ev.status === 'Conflicting evidence';
            const isVerified = ev.status === 'Evidence found';

            return (
              <div
                key={ev.competencyId}
                onClick={() => setActiveTraceEvidence(ev)}
                className={`bg-white border rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3.5 group relative ${
                  hasGap
                    ? 'border-[#E5DFD7] hover:border-[#7A1824]'
                    : 'border-[#E5DFD7] hover:border-[#7A1824]'
                }`}
              >
                {/* 1. Header: Competency & Status Pill */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A1824]">
                      Competency
                    </span>
                    <h3 className="font-bold text-base text-[#1B1718] group-hover:text-[#7A1824] transition-colors">
                      {ev.competencyName}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isVerified
                          ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                          : hasGap
                          ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                          : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </div>
                </div>

                {/* 2. Step: Question Asked */}
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#625A5B]">
                    <span>1. Standardized Question</span>
                    <span className="font-mono text-[9px] text-[#625A5B]">
                      {ev.evidenceSource}
                    </span>
                  </div>
                  <p className="italic text-[#1B1718] font-medium">
                    "{ev.relatedInterviewQuestion}"
                  </p>
                </div>

                {/* 3. Step: Observation & Verifiable Quote */}
                <div className="p-3.5 bg-white border border-[#E5DFD7] rounded-lg text-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#166534]">
                    <span>2. Direct Observation</span>
                    <span className="font-mono text-[9px] bg-[#F0FDF4] px-1.5 py-0.5 rounded text-[#166534] border border-[#BBF7D0]">
                      Strength: {ev.evidenceStrength}
                    </span>
                  </div>
                  <p className="text-[#1B1718] leading-relaxed">
                    {ev.evidenceSummary}
                  </p>
                  {ev.evidenceQuote && (
                    <blockquote className="border-l-2 border-[#166534] pl-2.5 text-[11px] text-[#625A5B] italic bg-[#FAF8F5] py-1 rounded-r">
                      "{ev.evidenceQuote}"
                    </blockquote>
                  )}
                </div>

                {/* 4. Step: Gap Detected (if any) */}
                {ev.missingEvidence ? (
                  <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs space-y-1">
                    <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold text-[#B91C1C]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>3. Evidence Gap Flagged</span>
                    </div>
                    <p className="text-[#1B1718] leading-relaxed">
                      {ev.missingEvidence}
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-xs flex items-center justify-between text-[#166534]">
                    <span className="text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Core evidence requirements verified
                    </span>
                    <span className="text-[10px] font-mono font-bold">Complete</span>
                  </div>
                )}

                {/* 5. Step: Recommended Follow-Up Action */}
                {ev.followUpQuestions.length > 0 && (
                  <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#92400E] block">
                      4. Recommended Follow-Up Probe:
                    </span>
                    <p className="text-[#1B1718] italic">
                      "{ev.followUpQuestions[0]}"
                    </p>
                  </div>
                )}

                {/* Bottom Card Footer */}
                <div className="pt-3 border-t border-[#E5DFD7] flex items-center justify-between text-xs text-[#625A5B]">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Sparkles className="w-3 h-3 text-[#7A1824]" /> Traceable in transcripts
                  </span>
                  <span className="text-xs font-bold text-[#7A1824] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Inspect Trace <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Side-Drawer: Interactive Evidence Trace Inspector */}
      {activeTraceEvidence && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-[#E5DFD7] flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-[#E5DFD7] bg-[#FAF8F5] flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#7A1824] mb-1">
                  <span>Evidence Trace Inspector</span>
                  <span>·</span>
                  <span>Chain of Custody</span>
                </div>
                <h2 className="text-xl font-bold text-[#1B1718]">
                  {activeTraceEvidence.competencyName}
                </h2>
                <p className="text-xs text-[#625A5B] mt-0.5">
                  Candidate: <strong className="text-[#1B1718]">{currentCandidate.name}</strong> ({currentCandidate.roleTitle})
                </p>
              </div>
              <button
                onClick={() => setActiveTraceEvidence(null)}
                className="p-1.5 rounded-lg hover:bg-[#E5DFD7] text-[#625A5B] hover:text-[#1B1718] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trace Chain Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
              {/* Question */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1824] block">
                  1. Question Asked
                </span>
                <p className="italic text-[#1B1718] text-xs">
                  "{activeTraceEvidence.relatedInterviewQuestion}"
                </p>
                <span className="text-[10px] text-[#625A5B] block font-mono mt-1">
                  Logged in: {activeTraceEvidence.evidenceSource}
                </span>
              </div>

              {/* Observation & Quote */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E5DFD7] space-y-2 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E4620] block">
                  2. Verifiable Evidence Quote
                </span>
                <p className="text-[#1B1718] text-xs leading-relaxed">
                  {activeTraceEvidence.evidenceSummary}
                </p>
                <blockquote className="p-2.5 bg-[#FAF8F5] border-l-2 border-[#1E4620] rounded-r-lg text-[11px] text-[#1B1718] italic">
                  "{activeTraceEvidence.evidenceQuote || 'Direct transcript quote is linked in candidate profile.'}"
                </blockquote>
              </div>

              {/* Gap Analysis */}
              <div className="p-3.5 bg-[#FEF2F2] rounded-xl border border-[#FECACA] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B91C1C] block">
                  3. Evidence Gap Analysis
                </span>
                <p className="text-xs text-[#1B1718] leading-relaxed">
                  {activeTraceEvidence.missingEvidence ||
                    'All rubric criteria were documented with high confidence.'}
                </p>
              </div>

              {/* Probes & Add Probe */}
              <div className="p-3.5 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400E] block">
                  4. Human Next Action & Follow-up Probes
                </span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-[#1B1718]">
                  {activeTraceEvidence.followUpQuestions.map((q, qIdx) => (
                    <li key={qIdx} className="italic">"{q}"</li>
                  ))}
                </ul>

                <div className="pt-2 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add custom follow-up probe..."
                    value={newFollowUpText}
                    onChange={(e) => setNewFollowUpText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddFollowUpToTrace(activeTraceEvidence.competencyId);
                    }}
                    className="flex-1 bg-white border border-[#E5DFD7] rounded-lg px-3 py-1.5 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  />
                  <button
                    onClick={() => handleAddFollowUpToTrace(activeTraceEvidence.competencyId)}
                    className="px-3.5 py-1.5 bg-[#7A1824] text-white text-xs font-bold rounded-lg hover:bg-[#4A0F18] transition-colors shrink-0 shadow-xs"
                  >
                    Add Probe
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#E5DFD7] bg-[#FAF8F5] flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  navigateToCandidate(currentCandidate.id);
                  setActiveTraceEvidence(null);
                }}
                className="font-bold text-[#7A1824] hover:underline"
              >
                Go to Candidate Profile →
              </button>
              <button
                onClick={() => setActiveTraceEvidence(null)}
                className="px-4 py-2 bg-[#7A1824] text-white font-bold rounded-lg hover:bg-[#4A0F18] transition-colors shadow-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
