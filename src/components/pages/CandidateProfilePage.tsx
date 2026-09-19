import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  FileText,
  Tag,
  Plus,
  ArrowRight,
  Flag,
  GitCompare,
  Network,
  X,
  Check,
  AlertCircle,
  Maximize2,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CompetencyAssessmentRating, EvidenceStatus } from '../../types';

export const CandidateProfilePage: React.FC = () => {
  const {
    selectedCandidate,
    candidates,
    navigateToCandidate,
    navigateToEvidenceBoard,
    navigateToComparison,
    setCurrentPage,
    updateCompetencyEvidence,
    updateAIInsightStatus,
    addCandidateNote
  } = useApp();

  const [activeTab, setActiveTab] = useState<'evidence' | 'notes' | 'ai_summary' | 'decision'>('evidence');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [newFollowUpText, setNewFollowUpText] = useState<Record<string, string>>({});
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [selectedJourneyStage, setSelectedJourneyStage] = useState<string | null>(null);

  // New Note modal state
  const [newNoteStage, setNewNoteStage] = useState('Hiring manager interview');
  const [newNoteInterviewer, setNewNoteInterviewer] = useState('Priya Sen');
  const [newNoteRole, setNewNoteRole] = useState('VP of Product');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteObservations, setNewNoteObservations] = useState('');
  const [newNoteFollowUps, setNewNoteFollowUps] = useState('');

  if (!selectedCandidate) {
    return (
      <div className="p-8 text-center text-xs text-[#625A5B]">
        No candidate selected.{' '}
        <button onClick={() => setCurrentPage('candidates')} className="underline text-[#7A1824] font-bold">
          Return to pipeline
        </button>
      </div>
    );
  }

  // Calculate evidence snapshot stats
  const totalComp = selectedCandidate.competencyEvidence.length;
  const verifiedComp = selectedCandidate.competencyEvidence.filter(
    (e) => e.status === 'Evidence found'
  ).length;
  const partialComp = selectedCandidate.competencyEvidence.filter(
    (e) => e.status === 'Partial evidence'
  ).length;
  const gapsComp = selectedCandidate.competencyEvidence.filter(
    (e) => e.status === 'Needs validation' || e.status === 'No evidence yet'
  ).length;
  const conflictingComp = selectedCandidate.competencyEvidence.filter(
    (e) => e.status === 'Conflicting evidence'
  ).length;

  const completenessPercent = totalComp > 0
    ? Math.round(((verifiedComp + partialComp * 0.5) / totalComp) * 100)
    : 0;

  // Stages completed count
  const completedStagesCount = selectedCandidate.journey.filter((j) => j.status === 'completed').length;
  const totalStagesCount = selectedCandidate.journey.length;

  // Evaluator agreement derivation
  const hasDisagreement =
    selectedCandidate.overallSignalStatus === 'Interviewers disagree' ||
    selectedCandidate.aiEvidenceSummary.interviewerDisagreements.length > 0 ||
    conflictingComp > 0;

  const handleAddFollowUpQuestion = (compId: string) => {
    const question = newFollowUpText[compId]?.trim();
    if (!question) return;
    updateCompetencyEvidence(selectedCandidate.id, compId, {
      newFollowUpQuestion: question
    });
    setNewFollowUpText((prev) => ({ ...prev, [compId]: '' }));
  };

  const handleSaveNewNote = () => {
    if (!newNoteContent.trim()) return;
    addCandidateNote(selectedCandidate.id, {
      stage: newNoteStage,
      interviewerName: newNoteInterviewer,
      interviewerRole: newNoteRole,
      notes: newNoteContent,
      keyObservations: newNoteObservations
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      followUpQuestions: newNoteFollowUps
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    });
    setShowAddNoteModal(false);
    setNewNoteContent('');
    setNewNoteObservations('');
    setNewNoteFollowUps('');
  };

  // Helper to map status to 5-block visual meter
  const getCompetencyMeter = (status: EvidenceStatus) => {
    if (status === 'Evidence found') {
      return {
        blocks: [true, true, true, true, true],
        colorClass: 'bg-[#2D6A4F]',
        label: 'Strong',
        badgeClass: 'bg-[#E8EFE9] text-[#1E4620] border-[#C4D9C7]'
      };
    }
    if (status === 'Partial evidence') {
      return {
        blocks: [true, true, true, false, false],
        colorClass: 'bg-[#B45309]',
        label: 'Partial',
        badgeClass: 'bg-[#FAF2E5] text-[#854D0E] border-[#EAD9BE]'
      };
    }
    if (status === 'Needs validation') {
      return {
        blocks: [true, true, false, false, false],
        colorClass: 'bg-[#B45309]',
        label: 'Limited',
        badgeClass: 'bg-[#FAF2E5] text-[#B45309] border-[#EAD9BE]'
      };
    }
    if (status === 'Conflicting evidence') {
      return {
        blocks: [true, true, true, false, false],
        colorClass: 'bg-[#9A3412]',
        label: 'Split',
        badgeClass: 'bg-[#FCEDE8] text-[#9A3412] border-[#F5C7B8]'
      };
    }
    return {
      blocks: [false, false, false, false, false],
      colorClass: 'bg-[#E5DFD7]',
      label: 'Missing',
      badgeClass: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
    };
  };

  // Stage details lookup for the journey
  const stageMetaLookup: Record<string, {
    evidenceSignals: number;
    scorecardStatus: string;
    interviewers: string;
    disagreement: string | null;
    missingEvidence: string | null;
  }> = {
    'Application': {
      evidenceSignals: 1,
      scorecardStatus: 'System Verified',
      interviewers: 'Automated Intake',
      disagreement: null,
      missingEvidence: null
    },
    'Recruiter Screen': {
      evidenceSignals: 2,
      scorecardStatus: 'Scorecard Submitted',
      interviewers: 'Sarah Jenkins (Lead Recruiter)',
      disagreement: null,
      missingEvidence: null
    },
    'Product Case Assessment': {
      evidenceSignals: 3,
      scorecardStatus: 'Scorecard Submitted',
      interviewers: 'Priya Sen (VP Product), Alex Rivera (Principal PM)',
      disagreement: hasDisagreement ? '1 disagreement on prioritization threshold' : null,
      missingEvidence: gapsComp > 0 ? 'Missing: SQL optimization proof' : null
    },
    'Hiring Manager Interview': {
      evidenceSignals: 2,
      scorecardStatus: selectedCandidate.currentStage === 'Hiring manager interview' ? 'In Progress' : 'Scorecard Submitted',
      interviewers: 'Marcus Vance (Director of Product)',
      disagreement: null,
      missingEvidence: null
    },
    'Decision Committee': {
      evidenceSignals: 0,
      scorecardStatus: 'Pending Committee Review',
      interviewers: 'Hiring Committee Panel (5 voting members)',
      disagreement: null,
      missingEvidence: null
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Profile Header with Visual Key Metrics */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-xl bg-[#7A1824] text-white flex items-center justify-center font-bold text-lg font-mono shrink-0 shadow-xs">
              {selectedCandidate.avatarInitials}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
                  {selectedCandidate.name}
                </h1>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    selectedCandidate.overallSignalStatus === 'Decision discussion required'
                      ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]'
                      : selectedCandidate.overallSignalStatus === 'Interviewers disagree'
                      ? 'bg-[#FDF2F2] text-[#7A1824] border-[#FEE2E2]'
                      : selectedCandidate.overallSignalStatus === 'Evidence incomplete'
                      ? 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
                      : 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                  }`}
                >
                  {selectedCandidate.overallSignalStatus}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#625A5B]">
                <span className="font-semibold text-[#1B1718] text-[13px]">{selectedCandidate.roleTitle}</span>
                <span className="text-[#E5DFD7]">·</span>
                <span>Current Stage: <strong className="text-[#1B1718] font-semibold">{selectedCandidate.currentStage}</strong></span>
                <span className="text-[#E5DFD7]">·</span>
                <span>Applied {selectedCandidate.appliedDate}</span>
              </div>

              <p className="text-[13px] text-[#625A5B] mt-1 max-w-3xl leading-normal font-normal">
                {selectedCandidate.resumeSummary}
              </p>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedCandidate.relevantSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-[#FAF8F5] border border-[#E5DFD7] text-[#1B1718] text-[11px] rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => navigateToEvidenceBoard(selectedCandidate.id)}
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#1B1718] text-[13px] font-semibold rounded-lg border border-[#E5DFD7] transition-colors"
            >
              <Network className="w-3.5 h-3.5 text-[#7A1824]" />
              <span>Evidence Board</span>
            </button>

            <button
              onClick={() => navigateToComparison([selectedCandidate.id, 'cand-rohan'])}
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#1B1718] text-[13px] font-semibold rounded-lg border border-[#E5DFD7] transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5 text-[#7A1824]" />
              <span>Compare</span>
            </button>

            <button
              onClick={() => setCurrentPage('decisions')}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-[13px] font-semibold rounded-lg shadow-xs transition-colors"
            >
              <span>Record Decision</span>
            </button>
          </div>
        </div>

        {/* 6 KEY METRICS SNAPSHOT AT THE TOP */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-[#E5DFD7] text-xs">
          {/* 1. Current Stage */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
            <span className="text-[10px] uppercase text-[#625A5B] font-bold tracking-wider block">Current Stage</span>
            <div className="font-bold text-[13px] text-[#1B1718] mt-1 truncate">{selectedCandidate.currentStage}</div>
            <span className="text-[11px] text-[#8C8384]">Active pipeline</span>
          </div>

          {/* 2. Evidence Coverage */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
            <span className="text-[10px] uppercase text-[#625A5B] font-bold tracking-wider block">Evidence Coverage</span>
            <div className="font-mono font-bold text-xl text-[#0F766E] mt-0.5">{completenessPercent}%</div>
            <span className="text-[11px] text-[#625A5B]">{verifiedComp} of {totalComp} verified</span>
          </div>

          {/* 3. Stages Completed */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
            <span className="text-[10px] uppercase text-[#625A5B] font-bold tracking-wider block">Stages Completed</span>
            <div className="font-mono font-bold text-xl text-[#1B1718] mt-0.5">{completedStagesCount} / {totalStagesCount}</div>
            <span className="text-[11px] text-[#8C8384]">Timeline status</span>
          </div>

          {/* 4. Evidence Gaps */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
            <span className="text-[10px] uppercase text-[#625A5B] font-bold tracking-wider block">Evidence Gaps</span>
            <div className={`font-mono font-bold text-xl mt-0.5 ${gapsComp > 0 ? 'text-[#7A1824]' : 'text-[#0F766E]'}`}>
              {gapsComp} {gapsComp === 1 ? 'Gap' : 'Gaps'}
            </div>
            <span className="text-[11px] text-[#8C8384]">Needs validation</span>
          </div>

          {/* 5. Panel Disagreement Status */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
            <span className="text-[10px] uppercase text-[#625A5B] font-bold tracking-wider block">Panel Calibration</span>
            <div className="font-bold text-[13px] mt-1 truncate">
              {hasDisagreement ? (
                <span className="text-[#C2410C]">Split Signal</span>
              ) : (
                <span className="text-[#0F766E]">Aligned Consensus</span>
              )}
            </div>
            <span className="text-[11px] text-[#8C8384]">Scorecard alignment</span>
          </div>

          {/* 6. Human Action */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7]">
            <span className="text-[10px] uppercase text-[#7A1824] font-bold tracking-wider block">Human Authority</span>
            <div className="font-bold text-[13px] text-[#1B1718] mt-1 truncate">Review Required</div>
            <span className="text-[11px] text-[#8C8384]">No auto-decisions</span>
          </div>
        </div>
      </div>

      {/* 2. SECTION: VISUAL "EVIDENCE PROFILE" (HORIZONTAL COMPETENCY MAP) */}
      <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DFD7]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#7A1824]">
              <Layers className="w-3.5 h-3.5" />
              <span>Competency Evidence Profile</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1718] tracking-tight">
              Visual Evidence Profile
            </h2>
            <p className="text-[13px] text-[#625A5B]">
              Horizontal competency map. Click any competency to inspect supporting quotes and probe questions.
            </p>
          </div>

          {/* Meter Legend */}
          <div className="flex items-center space-x-3 text-[11px] text-[#625A5B] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E5DFD7]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="flex gap-0.5"><span className="w-2 h-2 rounded-xs bg-[#0F766E]" /><span className="w-2 h-2 rounded-xs bg-[#0F766E]" /></span> Strong
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="flex gap-0.5"><span className="w-2 h-2 rounded-xs bg-[#B45309]" /></span> Partial
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="flex gap-0.5"><span className="w-2 h-2 rounded-xs bg-[#E5DFD7]" /></span> Missing
            </span>
          </div>
        </div>

        {/* The Visual Horizontal Competency Map */}
        <div className="space-y-2.5">
          {selectedCandidate.competencyEvidence.map((ev) => {
            const meter = getCompetencyMeter(ev.status);
            const isExpanded = expandedRowId === ev.competencyId;

            return (
              <div
                key={ev.competencyId}
                onClick={() => {
                  setActiveTab('evidence');
                  setExpandedRowId(isExpanded ? null : ev.competencyId);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-[#FAF8F5] border-[#7A1824] shadow-xs ring-2 ring-[#7A1824]/20'
                    : 'bg-white border-[#E5DFD7] hover:bg-[#FAF8F5] hover:border-[#7A1824]/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Left: Competency Name */}
                  <div className="sm:w-1/3">
                    <div className="font-bold text-xs text-[#1B1718] flex items-center gap-2">
                      <span>{ev.competencyName}</span>
                      {ev.flaggedForDiscussion && (
                        <span className="text-[9px] font-mono font-bold text-[#991B1B] bg-[#FEF2F2] px-1.5 py-0.5 rounded border border-[#FECACA]">
                          Flagged
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#625A5B] font-mono">
                      Source: {ev.evidenceSource}
                    </span>
                  </div>

                  {/* Middle: 5-block Segmented Visual Meter */}
                  <div className="sm:w-1/3 flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {meter.blocks.map((filled, bIdx) => (
                        <span
                          key={bIdx}
                          className={`w-5 h-3 rounded-xs transition-all ${
                            filled ? meter.colorClass : 'bg-[#E5DFD7]/80'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border ${meter.badgeClass}`}>
                      {meter.label}
                    </span>
                  </div>

                  {/* Right: Snippet & Action */}
                  <div className="sm:w-1/3 flex items-center justify-between text-xs">
                    <p className="text-[11px] text-[#625A5B] truncate pr-2 italic">
                      {ev.evidenceQuote ? `"${ev.evidenceQuote}"` : ev.evidenceSummary}
                    </p>
                    <span className="text-[11px] font-bold text-[#7A1824] shrink-0 hover:underline">
                      {isExpanded ? 'Collapse ▲' : 'Inspect ▼'}
                    </span>
                  </div>
                </div>

                {/* Inline preview when expanded */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#E5DFD7] space-y-2 text-xs">
                    <div className="p-3.5 bg-white rounded-lg border border-[#E5DFD7] space-y-1 shadow-2xs">
                      <span className="text-[10px] uppercase font-bold text-[#7A1824] block">
                        Verbatim Transcript Quote
                      </span>
                      <blockquote className="italic text-xs text-[#1B1718] leading-relaxed">
                        "{ev.evidenceQuote || 'No direct transcript quote recorded.'}"
                      </blockquote>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 bg-white rounded-lg border border-[#E5DFD7]">
                        <strong className="text-[#1B1718] block mb-0.5 font-bold">Observation:</strong>
                        <span className="text-[#625A5B]">{ev.evidenceSummary}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-[#E5DFD7]">
                        <strong className="text-[#B91C1C] block mb-0.5 font-bold">Identified Gap:</strong>
                        <span className="text-[#625A5B]">
                          {ev.missingEvidence || 'No critical gaps flagged by panelists.'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION: INTERACTIVE INTERVIEW JOURNEY VISUALIZATION */}
      <section className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DFD7]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#7A1824]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Pipeline Journey Timeline</span>
            </div>
            <h2 className="text-xl font-bold text-[#1B1718] tracking-tight">
              Interactive Interview Journey
            </h2>
            <p className="text-xs text-[#625A5B] mt-0.5">
              Progression through interview milestones. Click any stage to reveal scorecards, panel disagreements, and collected signals.
            </p>
          </div>
          <span className="text-xs font-mono text-[#625A5B]">
            Stage: <strong className="text-[#1B1718]">{selectedCandidate.currentStage}</strong>
          </span>
        </div>

        {/* Timeline Horizontal Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {selectedCandidate.journey.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';
            const meta = stageMetaLookup[step.stage] || {
              evidenceSignals: 1,
              scorecardStatus: 'Completed',
              interviewers: 'Panel',
              disagreement: null,
              missingEvidence: null
            };
            const isSelected = selectedJourneyStage === step.stage;

            return (
              <div
                key={idx}
                onClick={() => setSelectedJourneyStage(isSelected ? null : step.stage)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-[#FAF8F5] border-[#7A1824] ring-2 ring-[#7A1824]/20 shadow-xs'
                    : isCompleted
                    ? 'bg-[#F0FDF4]/50 border-[#BBF7D0] hover:border-[#7A1824]'
                    : isInProgress
                    ? 'bg-[#FFFBEB]/60 border-[#FDE68A] ring-1 ring-[#D97706]'
                    : 'bg-[#FAF8F5] border-[#E5DFD7] hover:border-[#7A1824]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-[#7A1824]">0{idx + 1}</span>
                    {isCompleted ? (
                      <span className="text-[#166534] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Complete
                      </span>
                    ) : isInProgress ? (
                      <span className="text-[#B45309] font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" /> In Progress
                      </span>
                    ) : (
                      <span className="text-[#625A5B]">Upcoming</span>
                    )}
                  </div>

                  <h3 className="font-bold text-xs text-[#1B1718] leading-snug">
                    {step.stage}
                  </h3>
                  <div className="text-[10px] font-mono text-[#625A5B] mt-0.5">
                    {step.date || 'Pending'}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5DFD7] space-y-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#625A5B]">Signals:</span>
                    <strong className="text-[#1B1718] font-mono">{meta.evidenceSignals} evidence signals</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#625A5B]">Status:</span>
                    <span className="text-[#1B1718] font-semibold">{meta.scorecardStatus}</span>
                  </div>

                  {meta.disagreement && (
                    <div className="text-[#991B1B] font-bold flex items-center gap-1 bg-[#FEF2F2] p-1 rounded-md border border-[#FECACA]">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span className="truncate">1 disagreement</span>
                    </div>
                  )}

                  {meta.missingEvidence && (
                    <div className="text-[#B91C1C] text-[9px] bg-[#FEF2F2] p-1 rounded-md truncate border border-[#FECACA]">
                      {meta.missingEvidence}
                    </div>
                  )}
                </div>

                <div className="text-right text-[10px] text-[#7A1824] font-bold pt-1">
                  {isSelected ? 'Close Details ▲' : 'Inspect Stage ▼'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Stage Inspection Drawer */}
        {selectedJourneyStage && (
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD7]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7A1824] block">
                  Stage Audit Details
                </span>
                <h4 className="font-bold text-base text-[#1B1718]">
                  {selectedJourneyStage}
                </h4>
              </div>
              <button
                onClick={() => setSelectedJourneyStage(null)}
                className="p-1 text-[#625A5B] hover:text-[#1B1718] rounded-md hover:bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white rounded-xl border border-[#E5DFD7] space-y-1 shadow-2xs">
                <span className="text-[10px] uppercase text-[#625A5B] font-bold block">Interviewers</span>
                <p className="font-bold text-xs text-[#1B1718]">
                  {stageMetaLookup[selectedJourneyStage]?.interviewers || 'Evaluator team'}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#E5DFD7] space-y-1 shadow-2xs">
                <span className="text-[10px] uppercase text-[#625A5B] font-bold block">Scorecard State</span>
                <p className="font-bold text-xs text-[#1B1718]">
                  {stageMetaLookup[selectedJourneyStage]?.scorecardStatus}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#E5DFD7] space-y-1 shadow-2xs">
                <span className="text-[10px] uppercase text-[#625A5B] font-bold block">Disagreement / Alert</span>
                <p className="text-xs text-[#B91C1C] font-bold">
                  {stageMetaLookup[selectedJourneyStage]?.disagreement || 'None · Panel signals aligned'}
                </p>
              </div>
            </div>

            {/* Notes matching this stage */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase font-bold text-[#625A5B] block">
                Logged Transcripts & Feedback for {selectedJourneyStage}:
              </span>
              {selectedCandidate.interviewNotes.filter((n) =>
                n.stage.toLowerCase().includes(selectedJourneyStage.toLowerCase().split(' ')[0])
              ).length > 0 ? (
                selectedCandidate.interviewNotes
                  .filter((n) =>
                    n.stage.toLowerCase().includes(selectedJourneyStage.toLowerCase().split(' ')[0])
                  )
                  .map((note) => (
                    <div key={note.id} className="p-3.5 bg-white rounded-xl border border-[#E5DFD7] space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1B1718] font-bold">{note.interviewerName} ({note.interviewerRole})</strong>
                        <span className="text-[10px] text-[#625A5B] font-mono">{note.date}</span>
                      </div>
                      <p className="text-[#625A5B] text-xs leading-relaxed">{note.notes}</p>
                    </div>
                  ))
              ) : (
                <div className="p-3.5 bg-white rounded-xl border border-[#E5DFD7] text-[#625A5B] text-xs italic">
                  No additional scorecards or pending stage observations for this milestone.
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 4. DETAIL TABS: Competency Evidence Matrix / Notes / AI Insights / Decision */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4 border-b border-[#E5DFD7]">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'evidence'
                ? 'border-[#7A1824] text-[#7A1824]'
                : 'border-transparent text-[#625A5B] hover:text-[#1B1718]'
            }`}
          >
            Detailed Evidence Table ({selectedCandidate.competencyEvidence.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'notes'
                ? 'border-[#7A1824] text-[#7A1824]'
                : 'border-transparent text-[#625A5B] hover:text-[#1B1718]'
            }`}
          >
            Interview Notes & Scorecards ({selectedCandidate.interviewNotes.length})
          </button>
          <button
            onClick={() => setActiveTab('ai_summary')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'ai_summary'
                ? 'border-[#7A1824] text-[#7A1824]'
                : 'border-transparent text-[#625A5B] hover:text-[#1B1718]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7A1824]" />
            <span>AI Evidence Insights</span>
          </button>
          <button
            onClick={() => setActiveTab('decision')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'decision'
                ? 'border-[#7A1824] text-[#7A1824]'
                : 'border-transparent text-[#625A5B] hover:text-[#1B1718]'
            }`}
          >
            Decision Record
          </button>
        </div>

        {/* TAB 1: DETAILED EVIDENCE TABLE */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#1B1718] tracking-tight">
                  Structured Competency Breakdown
                </h2>
                <p className="text-xs text-[#625A5B]">
                  Click any row to expand the complete evidence chain, verbatim transcript quotes, and interview probes.
                </p>
              </div>
              <button
                onClick={() => navigateToEvidenceBoard(selectedCandidate.id)}
                className="text-xs font-bold text-[#7A1824] hover:underline flex items-center gap-1"
              >
                Open Full Interactive Board →
              </button>
            </div>

            {/* Structured Table Container */}
            <div className="bg-white border border-[#E5DFD7] rounded-xl overflow-hidden shadow-xs">
              <div className="hidden lg:grid lg:grid-cols-12 gap-3 px-4 py-3 bg-[#FAF8F5] border-b border-[#E5DFD7] text-[11px] font-bold text-[#625A5B] uppercase tracking-wider">
                <div className="col-span-3">Competency & Status</div>
                <div className="col-span-3">Direct Observation</div>
                <div className="col-span-3">Verifiable Quote</div>
                <div className="col-span-2">Gap Flag / Next Action</div>
                <div className="col-span-1 text-right">Details</div>
              </div>

              <div className="divide-y divide-[#E5DFD7]">
                {selectedCandidate.competencyEvidence.map((ev) => {
                  const isExpanded = expandedRowId === ev.competencyId;
                  const hasGap = ev.status === 'Needs validation' || ev.status === 'No evidence yet' || ev.status === 'Conflicting evidence';

                  return (
                    <div key={ev.competencyId} className="transition-colors hover:bg-[#FAF8F5]/60">
                      <div
                        onClick={() => setExpandedRowId(isExpanded ? null : ev.competencyId)}
                        className="p-4 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-3 items-center"
                      >
                        <div className="lg:col-span-3 space-y-1">
                          <h3 className="font-bold text-sm text-[#1B1718]">
                            {ev.competencyName}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                ev.status === 'Evidence found'
                                  ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                                  : ev.status === 'Partial evidence'
                                  ? 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                                  : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                              }`}
                            >
                              {ev.status}
                            </span>
                            <span className="text-[10px] text-[#625A5B] font-mono">
                              {ev.evidenceSource}
                            </span>
                          </div>
                        </div>

                        <div className="lg:col-span-3 text-xs text-[#1B1718] line-clamp-2">
                          <span className="text-[10px] uppercase font-bold text-[#625A5B] block lg:hidden">
                            Observation:
                          </span>
                          {ev.evidenceSummary}
                        </div>

                        <div className="lg:col-span-3 text-xs italic text-[#625A5B] line-clamp-2">
                          <span className="text-[10px] uppercase font-bold text-[#625A5B] block lg:hidden not-italic">
                            Quote:
                          </span>
                          {ev.evidenceQuote ? `"${ev.evidenceQuote}"` : '—'}
                        </div>

                        <div className="lg:col-span-2 text-xs">
                          <span className="text-[10px] uppercase font-bold text-[#625A5B] block lg:hidden">
                            Gap / Action:
                          </span>
                          {hasGap ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B91C1C] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
                              <AlertTriangle className="w-3 h-3" /> Gap Flagged
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#166534] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                              <Check className="w-3 h-3" /> Validated
                            </span>
                          )}
                        </div>

                        <div className="lg:col-span-1 flex justify-end">
                          <button
                            className="p-1 rounded text-[#625A5B] hover:text-[#1B1718]"
                            aria-label="Expand row"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-[#7A1824]" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Evidence Details Box */}
                      {isExpanded && (
                        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E5DFD7] space-y-3 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 bg-white p-3.5 rounded-lg border border-[#E5DFD7] shadow-2xs">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1824] block">
                                Verbatim Transcript Quote
                              </span>
                              <blockquote className="italic text-xs text-[#1B1718] leading-relaxed">
                                "{ev.evidenceQuote || 'No direct transcript quote recorded.'}"
                              </blockquote>
                            </div>

                            <div className="space-y-1 bg-white p-3.5 rounded-lg border border-[#E5DFD7] shadow-2xs">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B91C1C] block">
                                Identified Gap Analysis
                              </span>
                              <p className="text-xs text-[#1B1718] leading-relaxed">
                                {ev.missingEvidence || 'No critical evidence gaps detected for this competency rubric.'}
                              </p>
                            </div>
                          </div>

                          {/* Follow-up Questions & Next Probe */}
                          <div className="space-y-2 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#625A5B] block">
                              Recommended Follow-Up Probes ({ev.followUpQuestions.length})
                            </span>
                            <div className="space-y-1.5">
                              {ev.followUpQuestions.map((q, qIdx) => (
                                <div
                                  key={qIdx}
                                  className="flex items-start space-x-2 bg-white p-2.5 rounded-lg border border-[#E5DFD7] text-xs text-[#1B1718]"
                                >
                                  <span className="font-mono text-[#7A1824] font-bold text-[10px]">P{qIdx + 1}</span>
                                  <span>{q}</span>
                                </div>
                              ))}
                            </div>

                            {/* Add Custom Follow-up Probe */}
                            <div className="flex items-center space-x-2 pt-1">
                              <input
                                type="text"
                                placeholder="Add customized follow-up question for next round..."
                                value={newFollowUpText[ev.competencyId] || ''}
                                onChange={(e) =>
                                  setNewFollowUpText({
                                    ...newFollowUpText,
                                    [ev.competencyId]: e.target.value
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddFollowUpQuestion(ev.competencyId);
                                }}
                                className="flex-1 bg-white border border-[#E5DFD7] rounded-lg px-2.5 py-1.5 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                              />
                              <button
                                onClick={() => handleAddFollowUpQuestion(ev.competencyId)}
                                className="px-3 py-1.5 bg-[#7A1824] text-white text-xs font-bold rounded-lg hover:bg-[#4A0F18] transition-colors shrink-0 shadow-xs"
                              >
                                Add Probe
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERVIEW NOTES & SCORECARDS */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#1B1718]">
                  Scorecards & Verbatim Interview Notes ({selectedCandidate.interviewNotes.length})
                </h2>
                <p className="text-xs text-[#625A5B]">
                  Direct logs from panelists submitted following structured interview guides.
                </p>
              </div>
              <button
                onClick={() => setShowAddNoteModal(true)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#7A1824] text-white text-xs font-bold rounded-lg hover:bg-[#4A0F18] transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Scorecard</span>
              </button>
            </div>

            <div className="space-y-3">
              {selectedCandidate.interviewNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E5DFD7]">
                    <div>
                      <span className="font-bold text-sm text-[#1B1718]">{note.interviewerName}</span>
                      <span className="text-xs text-[#625A5B]"> · {note.interviewerRole}</span>
                    </div>
                    <div className="text-[11px] text-[#625A5B] font-mono">{note.date}</div>
                  </div>

                  <div className="text-xs font-bold text-[#7A1824] uppercase tracking-wider">
                    Stage: {note.stage}
                  </div>

                  <p className="text-xs text-[#1B1718] leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-[#E5DFD7]">
                    {note.notes}
                  </p>

                  {note.keyObservations && note.keyObservations.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#625A5B] block">
                        Key Observations:
                      </span>
                      <ul className="list-disc pl-4 text-xs text-[#625A5B] space-y-0.5">
                        {note.keyObservations.map((obs, oIdx) => (
                          <li key={oIdx}>{obs}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AI EVIDENCE SUMMARY */}
        {activeTab === 'ai_summary' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-[#7A1824] shrink-0 mt-0.5" />
              <div className="text-xs text-[#1B1718] leading-relaxed">
                <strong>Transparent Evidence Extraction:</strong> Every point below links directly to verbatim candidate quotes from verified interview notes. Evaluators can confirm, challenge, or flag insights for committee review.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCandidate.aiEvidenceSummary.insights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                        insight.type === 'strength'
                          ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                          : insight.type === 'gap'
                          ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                          : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                      }`}
                    >
                      {insight.type}
                    </span>
                    <span className="text-[10px] font-semibold text-[#625A5B]">
                      Status: {insight.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#1B1718] leading-relaxed font-medium">{insight.text}</p>

                  <div className="pt-2 border-t border-[#E5DFD7] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#625A5B] truncate">
                      Source: {insight.sourceEvidence}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() =>
                          updateAIInsightStatus(
                            selectedCandidate.id,
                            insight.id,
                            insight.status === 'accepted' ? 'dismissed' : 'accepted'
                          )
                        }
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
                          insight.status === 'accepted'
                            ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                            : 'bg-[#FAF8F5] text-[#625A5B] border-[#E5DFD7] hover:text-[#1B1718]'
                        }`}
                      >
                        {insight.status === 'accepted' ? '✓ Accepted' : 'Accept'}
                      </button>
                      <button
                        onClick={() =>
                          updateAIInsightStatus(
                            selectedCandidate.id,
                            insight.id,
                            insight.status === 'flagged' ? 'dismissed' : 'flagged'
                          )
                        }
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
                          insight.status === 'flagged'
                            ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                            : 'bg-[#FAF8F5] text-[#625A5B] border-[#E5DFD7] hover:text-[#1B1718]'
                        }`}
                      >
                        {insight.status === 'flagged' ? 'Flagged' : 'Flag'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DECISION RECORD */}
        {activeTab === 'decision' && (
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
              <div>
                <h2 className="text-lg font-bold text-[#1B1718]">
                  Human Decision Audit Trail
                </h2>
                <p className="text-xs text-[#625A5B] mt-0.5">
                  Mandatory human written rationale for any decision. Automatic candidate rejections or score thresholds are strictly disabled.
                </p>
              </div>
              <button
                onClick={() => setCurrentPage('decisions')}
                className="px-3.5 py-1.5 bg-[#7A1824] text-white text-xs font-bold rounded-lg hover:bg-[#4A0F18] transition-colors shadow-xs"
              >
                Open Decision Desk
              </button>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1B1718]">Current Candidate Status</span>
                <span className="font-mono font-bold text-[#7A1824]">
                  {selectedCandidate.overallSignalStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1B1718]">Active Decision State</span>
                <span className="font-mono font-bold text-[#166534]">
                  {selectedCandidate.decisionState?.decision || 'Deliberation in progress'}
                </span>
              </div>
            </div>

            {selectedCandidate.decisionState && (
              <div className="p-4 bg-white rounded-xl border border-[#E5DFD7] space-y-2 text-xs shadow-xs">
                <span className="text-[10px] uppercase font-bold text-[#7A1824] block">
                  Committed Rationale by {selectedCandidate.decisionState.decidedBy} ({selectedCandidate.decisionState.timestamp})
                </span>
                <p className="text-[#1B1718] italic leading-relaxed">
                  "{selectedCandidate.decisionState.rationale}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal: Add Note */}
      {showAddNoteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E5DFD7] rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
              <h3 className="font-bold text-base text-[#1B1718]">Log Verbatim Interview Scorecard</h3>
              <button onClick={() => setShowAddNoteModal(false)} className="text-[#625A5B] hover:text-[#1B1718] p-1 rounded-md hover:bg-[#FAF8F5]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#1B1718] mb-1">Interview Stage</label>
                <input
                  type="text"
                  value={newNoteStage}
                  onChange={(e) => setNewNoteStage(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-3 py-1.5 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1B1718] mb-1">Interviewer Name</label>
                  <input
                    type="text"
                    value={newNoteInterviewer}
                    onChange={(e) => setNewNoteInterviewer(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-3 py-1.5 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1B1718] mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={newNoteRole}
                    onChange={(e) => setNewNoteRole(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-3 py-1.5 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1B1718] mb-1">Interview Notes & Verbatim Quotes</label>
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Record direct candidate answers and verified observations..."
                  className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg p-2.5 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1B1718] mb-1">Key Observations (1 per line)</label>
                <textarea
                  rows={2}
                  value={newNoteObservations}
                  onChange={(e) => setNewNoteObservations(e.target.value)}
                  placeholder="Strong user empathy in journey map..."
                  className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg p-2.5 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DFD7] flex justify-end space-x-2">
              <button
                onClick={() => setShowAddNoteModal(false)}
                className="px-3.5 py-1.5 border border-[#E5DFD7] rounded-lg text-[#625A5B] hover:text-[#1B1718] hover:bg-[#FAF8F5] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewNote}
                className="px-4 py-1.5 bg-[#7A1824] text-white font-bold rounded-lg hover:bg-[#4A0F18] shadow-xs"
              >
                Save Scorecard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
