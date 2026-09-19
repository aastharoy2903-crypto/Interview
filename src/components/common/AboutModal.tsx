import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Briefcase,
  Layers,
  CheckCircle2,
  ExternalLink,
  Code2,
  GitBranch
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-[#E5E3DC] shadow-2xl p-6 md:p-7 text-xs text-[#191919] space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between pb-3 border-b border-[#ECEAE3]">
          <div>
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#0F5132] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Portfolio Prototype Dossier</span>
            </div>
            <h2 className="text-lg font-bold text-[#191919]">
              Hiring Signal Board · Evidence-First Intelligence
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C887E] hover:text-[#191919] text-base p-1"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3.5 text-[#4A473F] leading-relaxed">
          <p>
            <strong className="text-[#191919]">Product Philosophy:</strong> Conventional Applicant Tracking Systems rely on high-volume keyword matching, arbitrary star ratings, and subjective "gut feeling" debriefs. Hiring Signal Board restructures the evaluation journey around <em>verifiable evidence</em>.
          </p>

          <div className="p-3.5 bg-[#FAF9F5] border border-[#ECEAE3] rounded-xl space-y-2">
            <h3 className="font-bold text-[#191919] text-xs uppercase tracking-wider">
              Core Architectural Pillars
            </h3>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5132] shrink-0 mt-0.5" />
                <span>
                  <strong>Evidence Tracing:</strong> Competency → Standardized Question → Verifiable Observation → Gap → Human Follow-up.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5132] shrink-0 mt-0.5" />
                <span>
                  <strong>AI Assistance, Human Authority:</strong> AI synthesizes structured transcripts and highlights missing validation points, but never issues autonomous hire/reject decisions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5132] shrink-0 mt-0.5" />
                <span>
                  <strong>Accountability Memos:</strong> Final hiring moves require documented rationale and explicit review of evidence artifacts.
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
            <div className="p-3 bg-white border border-[#E5E3DC] rounded-lg">
              <span className="text-[#8C887E] block text-[10px] uppercase font-bold">Prototype Target</span>
              <span className="font-semibold text-[#191919]">Product Management Portfolio</span>
            </div>
            <div className="p-3 bg-white border border-[#E5E3DC] rounded-lg">
              <span className="text-[#8C887E] block text-[10px] uppercase font-bold">Persona Simulation</span>
              <span className="font-semibold text-[#191919]">Hiring Manager, Recruiter, Interviewer</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#ECEAE3] flex justify-between items-center text-xs">
          <span className="text-[11px] text-[#76736A] font-mono">
            Interactive Prototype · Ready to Explore
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1E293B] text-white font-semibold rounded-xl hover:bg-[#334155] transition-colors"
          >
            Explore Prototype
          </button>
        </div>
      </div>
    </div>
  );
};
