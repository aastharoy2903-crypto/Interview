import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Clock,
  Send,
  FileText,
  User,
  History,
  Lock,
  ChevronRight,
  Scale,
  MessageSquare,
  AlertCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DecisionAction } from '../../types';

export const DecisionsPage: React.FC = () => {
  const {
    candidates,
    selectedCandidate,
    recordCandidateDecision,
    navigateToCandidate,
    userRole
  } = useApp();

  const [activeCandidateId, setActiveCandidateId] = useState<string>(
    selectedCandidate?.id || candidates[0]?.id || ''
  );

  const currentCandidate =
    candidates.find((c) => c.id === activeCandidateId) || candidates[0];

  const [selectedDecision, setSelectedDecision] = useState<DecisionAction>('Advance');
  const [rationale, setRationale] = useState('');
  const [selectedEvidenceChecked, setSelectedEvidenceChecked] = useState<string[]>([
    'Product Case Rubric',
    'Technical Alignment Notes'
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const evidenceOptions = [
    'Product Case Rubric',
    'Technical Alignment Notes',
    'Behavioral & Empathy Interview',
    'Analytical Case Analysis',
    'Customer Success Scenario Notes',
    'Reference Verification'
  ];

  const toggleEvidence = (item: string) => {
    if (selectedEvidenceChecked.includes(item)) {
      setSelectedEvidenceChecked(selectedEvidenceChecked.filter((i) => i !== item));
    } else {
      setSelectedEvidenceChecked([...selectedEvidenceChecked, item]);
    }
  };

  const handleRecordDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rationale.trim()) return;

    recordCandidateDecision(
      currentCandidate.id,
      selectedDecision,
      rationale,
      selectedEvidenceChecked
    );
    setIsSuccess(true);
  };

  // List candidates with recorded decisions
  const decidedCandidates = candidates.filter((c) => c.decisionState !== undefined);

  // Evidence breakdown calculation for Snapshot
  const strongEvidenceList = currentCandidate.competencyEvidence.filter(
    (e) => e.status === 'Evidence found'
  );
  const openGapsList = currentCandidate.competencyEvidence.filter(
    (e) => e.status === 'Needs validation' || e.status === 'No evidence yet'
  );
  const conflictingSignalsList = currentCandidate.competencyEvidence.filter(
    (e) => e.status === 'Conflicting evidence'
  );
  const partialList = currentCandidate.competencyEvidence.filter(
    (e) => e.status === 'Partial evidence'
  );

  const disagreementsCount = currentCandidate.aiEvidenceSummary.interviewerDisagreements.length;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header with Role & Stage Context */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider mb-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Institutional Accountability Desk · Sole Human Authority</span>
            </div>
            <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
              Decision & Accountability Desk
            </h1>
            <p className="text-[14px] text-[#625A5B] mt-2 max-w-3xl leading-normal font-normal">
              Mandatory documented rationale and verified evidence review ensure institutional transparency. AI surfaces signals and gaps; humans hold sole hiring authority.
            </p>
          </div>

          {/* Candidate Quick Selector */}
          <div className="flex items-center space-x-2 bg-[#FAF8F5] p-2 rounded-xl border border-[#E5DFD7] shrink-0">
            <span className="text-xs font-bold text-[#625A5B] pl-1 uppercase tracking-wider text-[11px]">Deliberating:</span>
            <select
              value={activeCandidateId}
              onChange={(e) => {
                setActiveCandidateId(e.target.value);
                setIsSuccess(false);
                const targetCand = candidates.find((c) => c.id === e.target.value);
                if (targetCand?.decisionState) {
                  setRationale(targetCand.decisionState.rationale);
                  setSelectedDecision(targetCand.decisionState.decision);
                } else {
                  setRationale('');
                }
              }}
              className="text-xs bg-white border border-[#E5DFD7] rounded-lg px-3 py-1.5 font-bold text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.roleTitle} ({c.currentStage})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Candidate Context Pill Banner */}
        <div className="pt-3 border-t border-[#E5DFD7] flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#625A5B]">Candidate:</span>
            <strong className="text-[#1B1718] text-sm font-bold">{currentCandidate.name}</strong>
          </div>
          <span className="text-[#E5DFD7]">·</span>
          <div className="flex items-center space-x-2">
            <span className="text-[#625A5B]">Role:</span>
            <strong className="text-[#1B1718] font-semibold">{currentCandidate.roleTitle}</strong>
          </div>
          <span className="text-[#E5DFD7]">·</span>
          <div className="flex items-center space-x-2">
            <span className="text-[#625A5B]">Current Stage:</span>
            <strong className="text-[#1B1718] font-semibold">{currentCandidate.currentStage}</strong>
          </div>
          <span className="text-[#E5DFD7]">·</span>
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
              currentCandidate.overallSignalStatus === 'Decision discussion required'
                ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]'
                : currentCandidate.overallSignalStatus === 'Interviewers disagree'
                ? 'bg-[#FDF2F2] text-[#7A1824] border-[#FEE2E2]'
                : 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
            }`}
          >
            {currentCandidate.overallSignalStatus}
          </span>
        </div>
      </div>

      {/* 2. SECTION: DECISION EVIDENCE SNAPSHOT (5 COMPACT VISUAL BLOCKS) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#7A1824]">
            Evidence Audit Layer
          </span>
          <span className="text-xs text-[#625A5B] font-mono font-medium">
            {currentCandidate.competencyEvidence.length} Competencies Evaluated
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Block 1: Strong Evidence */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-4 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B]">
                Strong Evidence
              </span>
              <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#0F766E]">
              {strongEvidenceList.length}
            </div>
            <div className="text-[11px] text-[#625A5B] truncate">
              {strongEvidenceList.map((e) => e.competencyName.split(' ')[0]).join(', ') || 'None verified'}
            </div>
          </div>

          {/* Block 2: Open Gaps */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-4 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B]">
                Open Gaps
              </span>
              <span className="w-2 h-2 rounded-full bg-[#7A1824]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#7A1824]">
              {openGapsList.length}
            </div>
            <div className="text-[11px] text-[#625A5B] truncate">
              {openGapsList.map((e) => e.competencyName.split(' ')[0]).join(', ') || 'No open gaps'}
            </div>
          </div>

          {/* Block 3: Conflicting Signals */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-4 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B]">
                Conflicting Signals
              </span>
              <span className="text-[#C2410C] font-bold text-xs">⚡</span>
            </div>
            <div className="text-2xl font-bold font-mono text-[#C2410C]">
              {conflictingSignalsList.length}
            </div>
            <div className="text-[11px] text-[#625A5B] truncate">
              {conflictingSignalsList.map((e) => e.competencyName.split(' ')[0]).join(', ') || 'None split'}
            </div>
          </div>

          {/* Block 4: Partial Evidence */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-4 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B]">
                Partial Evidence
              </span>
              <span className="w-2 h-2 rounded-full bg-[#B45309]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#B45309]">
              {partialList.length}
            </div>
            <div className="text-[11px] text-[#625A5B] truncate">
              {partialList.map((e) => e.competencyName.split(' ')[0]).join(', ') || 'None partial'}
            </div>
          </div>

          {/* Block 5: Interviewer Disagreement */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-4 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#625A5B]">
                Disagreement
              </span>
              <AlertCircle className="w-3.5 h-3.5 text-[#C2410C]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#C2410C]">
              {disagreementsCount}
            </div>
            <div className="text-[11px] text-[#625A5B] truncate">
              {disagreementsCount > 0 ? 'Panel split logged' : 'Aligned consensus'}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: HUMAN VALIDATION REQUIRED (PROMINENT BURGUNDY SECTION) */}
      <section className="bg-[#7A1824] text-white rounded-xl p-6 shadow-sm space-y-4 border border-[#4A0F18]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/20">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-[#FCD34D]">
              <Sparkles className="w-3.5 h-3.5 text-[#FCD34D]" />
              <span>Human Validation Required · AI Decision Safeguard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-white">
              Human Review Required
            </h2>
            <p className="text-[13px] text-white/90 max-w-2xl leading-normal mt-1 font-normal">
              AI does not recommend hiring or calculate acceptance probabilities. The hiring committee must resolve the following evidence inquiries before recording an official outcome.
            </p>
          </div>

          <span className="text-[11px] font-mono font-bold bg-white/15 px-3 py-1.5 rounded-lg border border-white/20 text-white shrink-0">
            Sole Human Authority
          </span>
        </div>

        {/* 4 Critical Deliberation Inquiries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Question 1: Insufficient Evidence */}
          <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#FEE2E2] block">
              1. Which competency still lacks sufficient evidence?
            </span>
            <p className="text-white/90 leading-relaxed text-[13px]">
              {openGapsList.length > 0 ? (
                <>
                  Missing verifiable behavioral quotes for <strong className="text-white font-semibold">{openGapsList[0].competencyName}</strong>. Evaluators should request a focused 20-min probe before making a commitment.
                </>
              ) : (
                'All core competencies have at least one supporting transcript quote logged in scorecards.'
              )}
            </p>
          </div>

          {/* Question 2: Interviewer Disagreement */}
          <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#FEE2E2] block">
              2. Which interviewer signals conflict?
            </span>
            <p className="text-white/90 leading-relaxed text-[13px]">
              {currentCandidate.aiEvidenceSummary.interviewerDisagreements.length > 0 ? (
                <>
                  <strong className="text-white font-semibold">{currentCandidate.aiEvidenceSummary.interviewerDisagreements[0]}</strong>. Committee should align on rubric definition during debrief.
                </>
              ) : (
                'No diverging scorecards detected across panelists for this candidate.'
              )}
            </p>
          </div>

          {/* Question 3: Evidence to Review */}
          <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#FEE2E2] block">
              3. What evidence should the committee review?
            </span>
            <p className="text-white/90 leading-relaxed text-[13px]">
              Audit the Product Case Assessment transcript and the take-home portfolio notes regarding customer problem framing and trade-offs.
            </p>
          </div>

          {/* Question 4: Debate Question */}
          <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#FEE2E2] block">
              4. Key question to discuss before deciding?
            </span>
            <p className="text-white/90 leading-relaxed text-[13px]">
              "Given the candidate's strong user empathy versus moderate technical architecture depth, does the current team composition have mentorship capacity for technical onboarding?"
            </p>
          </div>
        </div>
      </section>

      {/* 4. MAIN DECISION FORM & AUDIT LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Decision Intake Form */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleRecordDecision}
            className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-5"
          >
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B1718] block mb-2">
                1. Select Official Committee Action:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(
                  [
                    'Advance',
                    'Request more evidence',
                    'Hold',
                    'Reject'
                  ] as DecisionAction[]
                ).map((action) => {
                  const isSelected = selectedDecision === action;
                  return (
                    <button
                      key={action}
                      type="button"
                      onClick={() => setSelectedDecision(action)}
                      className={`p-3 rounded-lg border text-xs font-bold text-center transition-all ${
                        isSelected
                          ? action === 'Advance'
                            ? 'bg-[#ECFDF5] border-[#0F766E] text-[#065F46] ring-1 ring-[#0F766E]'
                            : action === 'Request more evidence'
                            ? 'bg-[#FFF7ED] border-[#C2410C] text-[#C2410C] ring-1 ring-[#C2410C]'
                            : action === 'Hold'
                            ? 'bg-[#FAF8F5] border-[#625A5B] text-[#1B1718] ring-1 ring-[#625A5B]'
                            : 'bg-[#FDF2F2] border-[#7A1824] text-[#7A1824] ring-1 ring-[#7A1824]'
                          : 'bg-[#FAF8F5] border-[#E5DFD7] text-[#625A5B] hover:text-[#1B1718]'
                      }`}
                    >
                      {action}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evidence Reviewed Checkboxes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B1718] block mb-2">
                2. Explicit Evidence Sources Audited for Decision:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {evidenceOptions.map((ev) => {
                  const checked = selectedEvidenceChecked.includes(ev);
                  return (
                    <label
                      key={ev}
                      onClick={() => toggleEvidence(ev)}
                      className={`p-3 rounded-lg border flex items-center space-x-2.5 cursor-pointer transition-colors ${
                        checked
                          ? 'bg-[#FAF8F5] border-[#7A1824] text-[#1B1718] font-semibold'
                          : 'bg-white border-[#E5DFD7] text-[#625A5B]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="rounded border-[#E5DFD7] text-[#7A1824] focus:ring-0"
                      />
                      <span className="text-[13px]">{ev}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Decision Rationale */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B1718] block mb-1">
                3. Mandatory Committee Written Rationale:
              </label>
              <p className="text-[12px] text-[#625A5B] mb-2 font-normal">
                Explain the committee's reasoning based on role competencies. This will be permanently recorded in the candidate audit log.
              </p>
              <textarea
                rows={4}
                required
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                placeholder="Example: Candidate demonstrated superior customer discovery intuition in the product case. While SQL query optimization is a growth area, the verified behavioral evidence provides high confidence to advance to final review..."
                className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg p-3 text-[13px] text-[#1B1718] focus:bg-white focus:outline-none focus:border-[#7A1824] leading-relaxed"
              />
            </div>

            {isSuccess && (
              <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg text-xs text-[#065F46] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-medium">Hiring decision successfully recorded and committed to candidate dossier.</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-[#E5DFD7]">
              <div className="text-[12px] text-[#625A5B]">
                Reviewing Role: <strong className="text-[#1B1718] font-semibold">{userRole}</strong>
              </div>

              <button
                type="submit"
                disabled={!rationale.trim()}
                className="flex items-center space-x-2 px-5 py-2.5 bg-[#7A1824] hover:bg-[#4A0F18] disabled:opacity-50 text-white text-[13px] font-semibold rounded-lg shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Commit Hiring Decision</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Audit Log of Previous Decisions */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-[#7A1824]" />
              <h3 className="font-bold text-base text-[#1B1718]">Audit Log: Recorded Decisions</h3>
            </div>
            <p className="text-[12px] text-[#625A5B] leading-normal font-normal">
              Permanent institutional record of hiring committee outcomes across all candidates.
            </p>

            <div className="space-y-3 pt-2">
              {decidedCandidates.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#625A5B] bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
                  No decisions committed yet.
                </div>
              ) : (
                decidedCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => {
                      setActiveCandidateId(cand.id);
                      if (cand.decisionState) {
                        setRationale(cand.decisionState.rationale);
                        setSelectedDecision(cand.decisionState.decision);
                      }
                    }}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      cand.id === activeCandidateId
                        ? 'bg-[#FAF8F5] border-[#7A1824] shadow-xs'
                        : 'bg-white border-[#E5DFD7] hover:border-[#7A1824]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-[#1B1718] font-bold text-[13px]">{cand.name}</strong>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          cand.decisionState?.decision === 'Advance'
                            ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                            : cand.decisionState?.decision === 'Hold'
                            ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]'
                            : 'bg-[#FDF2F2] text-[#7A1824] border-[#FEE2E2]'
                        }`}
                      >
                        {cand.decisionState?.decision}
                      </span>
                    </div>

                    <p className="text-[12px] text-[#625A5B] line-clamp-2 italic font-normal">
                      "{cand.decisionState?.rationale}"
                    </p>

                    <div className="mt-2 text-[10px] text-[#8C8384] flex justify-between font-mono">
                      <span>By {cand.decisionState?.decidedBy}</span>
                      <span>{cand.decisionState?.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
