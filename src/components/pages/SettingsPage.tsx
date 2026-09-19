import React, { useState } from 'react';
import {
  ShieldCheck,
  Settings as SettingsIcon,
  CheckCircle2,
  Sparkles,
  Lock,
  FileText,
  Sliders,
  AlertCircle,
  HelpCircle,
  Info,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsPage: React.FC = () => {
  const [evidenceThreshold, setEvidenceThreshold] = useState(75);
  const [requireMandatoryRationale, setRequireMandatoryRationale] = useState(true);
  const [blockAutonomousRejection, setBlockAutonomousRejection] = useState(true);
  const [flagPanelDivergence, setFlagPanelDivergence] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Governance & Human-in-the-Loop Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
          Governance & Workspace Configuration
        </h1>
        <p className="text-[14px] text-[#625A5B] max-w-3xl leading-normal font-normal">
          Institutional rules governing evidence thresholds, stage gates, and non-delegable human accountability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Principles & Thresholds */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ethical AI Guiding Principles */}
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#7A1824]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#1B1718] tracking-tight">
                Core Product Principles
              </h2>
            </div>
            <p className="text-[13px] text-[#625A5B] leading-relaxed">
              These hardcoded governance guardrails ensure that machine learning accelerates transcription and synthesis without degrading candidate fairness or replacing human judgment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
                <strong className="text-[#1B1718] flex items-center gap-1.5 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                  AI Surfaces Evidence, Humans Decide
                </strong>
                <p className="text-[#625A5B] text-[12px] leading-normal font-normal">
                  The model extracts quotes, highlights gaps, and flags disagreements. It never assigns numerical scores, candidate rankings, or pass/fail labels.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
                <strong className="text-[#1B1718] flex items-center gap-1.5 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                  No Autonomous Hiring Moves
                </strong>
                <p className="text-[#625A5B] text-[12px] leading-normal font-normal">
                  Every stage transition, offer, or rejection requires a verified human signature and documented written rationale.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
                <strong className="text-[#1B1718] flex items-center gap-1.5 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                  Auditable Rubric Grounding
                </strong>
                <p className="text-[#625A5B] text-[12px] leading-normal font-normal">
                  Assessments must point to observable behavior from the role's standardized competency framework.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-xs space-y-1.5 hover:border-[#7A1824] transition-colors">
                <strong className="text-[#1B1718] flex items-center gap-1.5 font-bold text-[13px]">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                  Factual Notes Guarantee
                </strong>
                <p className="text-[#625A5B] text-[12px] leading-normal font-normal">
                  Subjective impressions (e.g. "not a culture fit") are flagged for factual substantiation before debriefs.
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <form
            onSubmit={handleSaveSettings}
            className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-5"
          >
            <div className="flex items-center space-x-2 pb-3 border-b border-[#E5DFD7]">
              <Sliders className="w-4 h-4 text-[#7A1824]" />
              <h3 className="text-xl font-bold text-[#1B1718] tracking-tight">
                Stage Transition Gates & Quality Thresholds
              </h3>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-[#1B1718] text-sm">
                  Evidence Completeness Gate before Offer Review:
                </label>
                <span className="font-mono font-bold text-[#0F766E] text-base px-2.5 py-0.5 bg-[#FAF8F5] rounded border border-[#E5DFD7]">
                  {evidenceThreshold}%
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={evidenceThreshold}
                onChange={(e) => setEvidenceThreshold(Number(e.target.value))}
                className="w-full accent-[#7A1824] cursor-pointer h-2 bg-[#E5DFD7] rounded-lg"
              />
              <p className="text-[12px] text-[#625A5B]">
                Candidates with less than {evidenceThreshold}% verified competency coverage trigger a mandatory validation flag before advancing.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start space-x-3 cursor-pointer text-xs p-3 rounded-lg hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#E5DFD7]">
                <input
                  type="checkbox"
                  checked={requireMandatoryRationale}
                  onChange={(e) => setRequireMandatoryRationale(e.target.checked)}
                  className="mt-0.5 rounded border-[#E5DFD7] text-[#7A1824] focus:ring-[#7A1824]"
                />
                <div>
                  <span className="font-bold text-[#1B1718] text-[13px] block">
                    Require Mandatory Written Rationale
                  </span>
                  <span className="text-[12px] text-[#625A5B]">
                    Hiring managers cannot submit "Advance", "Hold", or "Reject" without at least 40 words explaining competency fit.
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer text-xs p-3 rounded-lg hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#E5DFD7]">
                <input
                  type="checkbox"
                  checked={blockAutonomousRejection}
                  onChange={(e) => setBlockAutonomousRejection(e.target.checked)}
                  className="mt-0.5 rounded border-[#E5DFD7] text-[#7A1824] focus:ring-[#7A1824]"
                />
                <div>
                  <span className="font-bold text-[#1B1718] text-[13px] block">
                    Block Autonomous Batch Rejection
                  </span>
                  <span className="text-[12px] text-[#625A5B]">
                    Prohibits algorithmic mass rejections. An evaluator must explicitly inspect candidate notes.
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer text-xs p-3 rounded-lg hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#E5DFD7]">
                <input
                  type="checkbox"
                  checked={flagPanelDivergence}
                  onChange={(e) => setFlagPanelDivergence(e.target.checked)}
                  className="mt-0.5 rounded border-[#E5DFD7] text-[#7A1824] focus:ring-[#7A1824]"
                />
                <div>
                  <span className="font-bold text-[#1B1718] text-[13px] block">
                    Highlight Inter-Rater Divergence on Candidate Profile
                  </span>
                  <span className="text-[12px] text-[#625A5B]">
                    Automatically surface whenever two panelists rate the same competency more than 1 grade apart.
                  </span>
                </div>
              </label>
            </div>

            {showSavedToast && (
              <div className="p-3 bg-[#E8EFE9] border border-[#C4D9C7] rounded-lg text-xs text-[#065F46] font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Governance settings successfully saved.</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#E5DFD7] flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Save Governance Preferences
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Product Management Portfolio Note */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E5DFD7] rounded-xl p-5 shadow-xs space-y-3.5 text-xs">
            <div className="flex items-center space-x-2 text-[#7A1824]">
              <Info className="w-4 h-4" />
              <h3 className="font-bold text-base text-[#1B1718]">
                Portfolio Prototype Dossier
              </h3>
            </div>

            <p className="text-[#625A5B] leading-relaxed">
              This interactive prototype was designed and architected as a core artifact for a Product Management portfolio.
            </p>

            <div className="p-3.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl space-y-1.5">
              <strong className="text-[#1B1718] text-[11px] block font-mono font-bold uppercase tracking-wider text-[#7A1824]">
                Target User Problem:
              </strong>
              <p className="text-[#625A5B] text-[12px] leading-relaxed">
                Hiring debriefs are frequently derailed by recency bias, charismatic presentations, and subjective arguments. Interviewers forget what candidates actually said, leading to mis-hires and ungrounded rejections.
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl space-y-1.5">
              <strong className="text-[#1B1718] text-[11px] block font-mono font-bold uppercase tracking-wider text-[#7A1824]">
                Product Thesis:
              </strong>
              <p className="text-[#625A5B] text-[12px] leading-relaxed">
                By visually tracing <em>Competency → Question → Verifiable Evidence → Gap → Action</em>, teams shift from "Do I like them?" to "What evidence do we have?"
              </p>
            </div>

            <div className="text-[11px] text-[#8C8384] pt-2 border-t border-[#E5DFD7]">
              Created for web demonstration with fictional candidates & company data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
