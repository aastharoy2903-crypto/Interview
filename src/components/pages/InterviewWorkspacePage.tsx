import React, { useState } from 'react';
import {
  ClipboardCheck,
  User,
  Briefcase,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Eye,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CompetencyAssessmentRating } from '../../types';

export const InterviewWorkspacePage: React.FC = () => {
  const {
    candidates,
    selectedCandidate,
    setSelectedCandidateId,
    selectedRole,
    addCandidateNote,
    navigateToCandidate,
    userRole
  } = useApp();

  const [activeCandidateId, setActiveCandidateId] = useState<string>(
    selectedCandidate?.id || candidates[0]?.id || ''
  );

  const candidate = candidates.find((c) => c.id === activeCandidateId) || candidates[0];

  // Competency Ratings state
  const [ratings, setRatings] = useState<Record<string, CompetencyAssessmentRating>>({});
  const [evidenceNotes, setEvidenceNotes] = useState<Record<string, string>>({});
  const [overallObservations, setOverallObservations] = useState('');
  const [observedStrengths, setObservedStrengths] = useState('');
  const [concernsOrUncertainties, setConcernsOrUncertainties] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState<'High' | 'Moderate' | 'Exploratory'>('High');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (compId: string, rating: CompetencyAssessmentRating) => {
    setRatings((prev) => ({ ...prev, [compId]: rating }));
  };

  const handleNoteChange = (compId: string, note: string) => {
    setEvidenceNotes((prev) => ({ ...prev, [compId]: note }));
  };

  const handleSubmitScorecard = (e: React.FormEvent) => {
    e.preventDefault();

    // Compile notes
    const compiledNotes = `INTERVIEW SUMMARY & COMPETENCY EVIDENCE:
${Object.entries(evidenceNotes)
  .map(([compId, note]) => {
    const compName = candidate.competencyEvidence.find((e) => e.competencyId === compId)?.competencyName || compId;
    const rating = ratings[compId] || 'Not assessed';
    return `• [${compName}] (${rating}): ${note}`;
  })
  .join('\n')}

OVERALL SYNTHESIS:
${overallObservations}

STRENGTHS OBSERVED:
${observedStrengths}

CONCERNS / GAPS:
${concernsOrUncertainties}

CONFIDENCE LEVEL: ${confidenceLevel}`;

    const interviewerNames: Record<string, { name: string; role: string }> = {
      interviewer: { name: 'Kavita Patel', role: 'Staff PM (Panelist)' },
      hiring_manager: { name: 'Priya Sen', role: 'VP of Product (HM)' },
      recruiter: { name: 'Sarah Lin', role: 'Lead Talent Partner (Recruiter)' }
    };

    const currentProfile = interviewerNames[userRole] || interviewerNames.interviewer;

    addCandidateNote(candidate.id, {
      stage: candidate.currentStage,
      interviewerName: currentProfile.name,
      interviewerRole: currentProfile.role,
      notes: compiledNotes,
      keyObservations: observedStrengths
        ? observedStrengths.split('\n').filter(Boolean)
        : ['Structured problem solving', 'Good communication'],
      followUpQuestions: concernsOrUncertainties
        ? concernsOrUncertainties.split('\n').filter(Boolean)
        : [],
      competencyRatings: ratings
    });

    setIsSubmitted(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider mb-1">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Standardized Evaluation Guide · Human Scoring</span>
            </div>
            <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
              Interview Guide & Evidence Intake
            </h1>
            <p className="text-[14px] text-[#625A5B] max-w-3xl leading-normal font-normal mt-1.5">
              Conduct rubric-aligned competency evaluations. Ground ratings in observable behavior, transcript excerpts, and concrete candidate answers.
            </p>
          </div>

          {/* Candidate Selector */}
          <div className="flex items-center space-x-2 bg-[#FAF8F5] p-2 rounded-xl border border-[#E5DFD7] shrink-0">
            <span className="text-xs font-bold text-[#625A5B] pl-1">Candidate:</span>
            <select
              value={activeCandidateId}
              onChange={(e) => {
                setActiveCandidateId(e.target.value);
                setSelectedCandidateId(e.target.value);
                setIsSubmitted(false);
              }}
              className="text-xs bg-white border border-[#E5DFD7] rounded-lg px-3 py-2 font-bold text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.roleTitle} ({c.currentStage})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Structured Guide Body */}
      {isSubmitted ? (
        <div className="bg-white border border-[#E5DFD7] rounded-xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#E8EFE9] text-[#065F46] flex items-center justify-center mx-auto border border-[#C4D9C7]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B1718] tracking-tight">
            Structured Feedback Submitted for {candidate.name}
          </h2>
          <p className="text-[14px] text-[#625A5B] max-w-md mx-auto leading-relaxed">
            Your competency evidence and observation notes have been routed to the candidate’s profile and the central Evidence Board.
          </p>
          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-5 py-2.5 border border-[#E5DFD7] bg-[#FAF8F5] text-xs font-bold rounded-lg hover:bg-[#F0EBE3] text-[#1B1718] transition-colors"
            >
              Edit Submission
            </button>
            <button
              onClick={() => navigateToCandidate(candidate.id)}
              className="px-5 py-2.5 bg-[#7A1824] text-white text-xs font-bold rounded-lg hover:bg-[#4A0F18] shadow-xs transition-colors"
            >
              View Updated Candidate Profile →
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitScorecard} className="space-y-6">
          {/* Preparation Card */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E5DFD7]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A1824]">
                  Session Preparation
                </span>
                <h2 className="text-2xl font-bold text-[#1B1718] tracking-tight">
                  {candidate.name} · {candidate.currentStage}
                </h2>
              </div>
              <div className="text-xs text-[#625A5B]">
                Role: <strong className="text-[#1B1718] font-bold text-sm ml-1">{candidate.roleTitle}</strong>
              </div>
            </div>

            <div className="mt-4 text-xs text-[#625A5B] leading-relaxed">
              <strong className="text-[#1B1718]">Interview Objective:</strong> Evaluate core role competencies using open-ended questions. Capture verbatim quotes, specific user problem breakdowns, and trade-off rationales.
            </div>

            {/* Structured Guidance Warning Banner */}
            <div className="mt-4 p-4 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#7A1824] shrink-0 mt-0.5" />
              <div className="text-[#1B1718] leading-relaxed">
                <strong className="font-bold">Interviewer Rubric Standard:</strong> Please support assessments with specific observations or examples. Avoid evaluating traits that are unrelated to the role.
              </div>
            </div>
          </div>

          {/* Competency Interview Guide Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1B1718] tracking-tight">
              Competencies Under Evaluation ({candidate.competencyEvidence.length})
            </h2>

            {candidate.competencyEvidence.map((ev) => (
              <div
                key={ev.competencyId}
                className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5DFD7]">
                  <div>
                    <h3 className="font-bold text-base text-[#1B1718]">{ev.competencyName}</h3>
                    <span className="text-[12px] text-[#625A5B]">
                      Prior Status: <strong className="text-[#1B1718] font-bold">{ev.status}</strong>
                    </span>
                  </div>

                  {/* Rating Selector */}
                  <div className="flex items-center space-x-1.5 text-xs">
                    {(
                      [
                        'Strong evidence',
                        'Some evidence',
                        'Limited evidence',
                        'Not assessed'
                      ] as CompetencyAssessmentRating[]
                    ).map((ratingOption) => (
                      <button
                        type="button"
                        key={ratingOption}
                        onClick={() => handleRatingChange(ev.competencyId, ratingOption)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                          ratings[ev.competencyId] === ratingOption
                            ? ratingOption === 'Strong evidence'
                              ? 'bg-[#065F46] text-white shadow-xs'
                              : ratingOption === 'Some evidence'
                              ? 'bg-[#C2410C] text-white shadow-xs'
                              : ratingOption === 'Limited evidence'
                              ? 'bg-[#7A1824] text-white shadow-xs'
                              : 'bg-[#625A5B] text-white'
                            : 'bg-[#FAF8F5] border border-[#E5DFD7] text-[#625A5B] hover:text-[#1B1718]'
                        }`}
                      >
                        {ratingOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question & Listen For */}
                <div className="p-4 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs space-y-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A1824] block">
                      Recommended Interview Question:
                    </span>
                    <p className="font-bold text-[#1B1718] text-sm mt-1">
                      "{ev.relatedInterviewQuestion}"
                    </p>
                  </div>

                  {ev.followUpQuestions && ev.followUpQuestions.length > 0 && (
                    <div className="pt-2.5 border-t border-[#E5DFD7]">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8384] block">
                        Targeted Follow-up Prompt:
                      </span>
                      <p className="italic text-[#625A5B] text-xs mt-0.5">
                        "{ev.followUpQuestions[0]}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Evidence Notes Input */}
                <div>
                  <label className="text-[11px] font-bold text-[#625A5B] block mb-1.5">
                    Observable Evidence & Candidate Response Excerpt:
                  </label>
                  <textarea
                    rows={2}
                    value={evidenceNotes[ev.competencyId] || ''}
                    onChange={(e) => handleNoteChange(ev.competencyId, e.target.value)}
                    placeholder="Candidate demonstrated structured framework by... Or candidate struggled to explain trade-offs when..."
                    className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl p-3 text-xs text-[#1B1718] focus:bg-white focus:outline-none focus:border-[#7A1824] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Qualitative Synthesis & Confidence */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-[#1B1718] tracking-tight">
              Overall Interview Synthesis & Follow-up Agenda
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#625A5B] block mb-1.5">
                  Observed Strengths (with factual context):
                </label>
                <textarea
                  rows={3}
                  value={observedStrengths}
                  onChange={(e) => setObservedStrengths(e.target.value)}
                  placeholder="Clear user empathy, rigorous diagnostic approach to metrics..."
                  className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl p-3 text-xs text-[#1B1718] focus:bg-white focus:outline-none focus:border-[#7A1824] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#625A5B] block mb-1.5">
                  Concerns, Uncertainties, or Evidence Gaps:
                </label>
                <textarea
                  rows={3}
                  value={concernsOrUncertainties}
                  onChange={(e) => setConcernsOrUncertainties(e.target.value)}
                  placeholder="Prioritization conviction remains theoretical under executive pushback..."
                  className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl p-3 text-xs text-[#1B1718] focus:bg-white focus:outline-none focus:border-[#7A1824] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E5DFD7]">
              <div className="flex items-center space-x-3 text-xs">
                <span className="font-bold text-[#625A5B]">Assessment Confidence:</span>
                {(['High', 'Moderate', 'Exploratory'] as const).map((conf) => (
                  <button
                    type="button"
                    key={conf}
                    onClick={() => setConfidenceLevel(conf)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      confidenceLevel === conf
                        ? 'bg-[#7A1824] text-white shadow-xs'
                        : 'bg-[#FAF8F5] border border-[#E5DFD7] text-[#625A5B] hover:text-[#1B1718]'
                    }`}
                  >
                    {conf}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Structured Feedback</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
