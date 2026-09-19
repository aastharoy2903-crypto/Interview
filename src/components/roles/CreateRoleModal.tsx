import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Competency, Role, StageInfo } from '../../types';

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ isOpen, onClose }) => {
  const { addNewRole, navigateToRole } = useApp();

  const [step, setStep] = useState<'input' | 'review'>('input');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Form State
  const [title, setTitle] = useState('Growth Product Manager');
  const [department, setDepartment] = useState('Product');
  const [hiringManager, setHiringManager] = useState('Priya Sen (VP of Product)');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [jobDescription, setJobDescription] = useState(
    `We are looking for a Growth Product Manager to supercharge our user onboarding loops, run high-velocity multivariate experiments, and turn product telemetry into scalable activation playbooks. You will collaborate daily with design and full-stack engineering squads, conduct qualitative user discovery interviews, and build rigorous cohort models to eliminate retention friction.`
  );

  // AI Extracted Review State
  const [extractedCompetencies, setExtractedCompetencies] = useState<Competency[]>([]);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [suggestedCriteria, setSuggestedCriteria] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleAnalyzeWithAI = () => {
    setIsAnalyzing(true);

    // Realistic deterministic extraction simulated after 900ms
    setTimeout(() => {
      setExtractedCompetencies([
        {
          id: 'c-gpm-1',
          name: 'Experimentation & Hypothesis Rigor',
          description: 'Ability to formulate falsifiable product hypotheses and structure high-velocity A/B testing loops.',
          whyItMatters: 'Essential to drive statistically valid user activation without compromising platform stability.',
          suggestedQuestion: 'Describe a growth experiment where early data looked promising but underlying retention curves told a different story.',
          listenFor: ['Falsifiable hypothesis statements', 'Power calculation awareness', 'Checks for cannibalization']
        },
        {
          id: 'c-gpm-2',
          name: 'Funnel Telemetry & SQL',
          description: 'Comfort diagnosing drop-off across multi-step onboarding funnels using cohort analytics.',
          whyItMatters: 'Growth PMs must independently interrogate telemetry without waiting weeks for BI queues.',
          suggestedQuestion: 'How do you distinguish between seasonal traffic spikes and genuine product-led viral loops?',
          listenFor: ['Cohort retention decay understanding', 'Multi-touch attribution limits', 'Leading vs lagging metrics']
        },
        {
          id: 'c-gpm-3',
          name: 'User Empathy Under Conversion Pressure',
          description: 'Balancing aggressive short-term conversion targets against long-term customer trust and brand ethics.',
          whyItMatters: 'Prevents the team from relying on manipulative dark patterns that destroy customer loyalty.',
          suggestedQuestion: 'Tell me about a time you refused to ship a high-converting growth feature due to customer trust concerns.',
          listenFor: ['Customer advocacy', 'Awareness of dark patterns', 'Long-term customer lifetime value focus']
        },
        {
          id: 'c-gpm-4',
          name: 'Cross-functional Velocity & Engineering Partnership',
          description: 'Maintaining rapid test iteration while respecting engineering architecture, security, and technical debt.',
          whyItMatters: 'Engineers burn out when growth PMs treat code as disposable throwaway prototypes.',
          suggestedQuestion: 'How do you keep engineering morale high when 70% of growth experiments fail to beat the control?',
          listenFor: ['Shared learning culture', 'Clean test teardown habits', 'Respect for technical debt']
        }
      ]);

      setRequiredSkills([
        'A/B Testing & Hypothesis Design',
        'Cohort Funnel Analysis',
        'SQL & Amplitude/Mixpanel',
        'Cross-functional Sprint Facilitation'
      ]);

      setPreferredSkills(['Experience in B2B SaaS Activation', 'Figma Wireframing', 'Segment / Telemetry Instrumentation']);

      setResponsibilities([
        'Own the 14-day user activation and workspace creation conversion rates',
        'Run 3-5 growth experiments per sprint with engineering and product design',
        'Synthesize qualitative feedback from 5+ customer discovery calls per week',
        'Report monthly executive growth memos to VP of Product and CEO'
      ]);

      setStages([
        { id: 'stg-1', name: 'Application review', order: 1, candidateCount: 0, completionRate: 100, status: 'completed', pendingActionsCount: 0 },
        { id: 'stg-2', name: 'Recruiter screen', order: 2, candidateCount: 0, completionRate: 0, status: 'active', pendingActionsCount: 0 },
        { id: 'stg-3', name: 'Growth case study', order: 3, candidateCount: 0, completionRate: 0, status: 'active', pendingActionsCount: 0 },
        { id: 'stg-4', name: 'Hiring manager interview', order: 4, candidateCount: 0, completionRate: 0, status: 'active', pendingActionsCount: 0 },
        { id: 'stg-5', name: 'Final decision committee', order: 5, candidateCount: 0, completionRate: 0, status: 'active', pendingActionsCount: 0 }
      ]);

      setSuggestedCriteria([
        'Evidence of hypothesis-driven experimentation rather than random idea testing',
        'Demonstrated restraint against dark UX patterns under target pressure',
        'Verifiable experience in cross-functional engineering alignment'
      ]);

      setIsAnalyzing(false);
      setStep('review');
    }, 900);
  };

  const handleSaveRole = () => {
    const roleId = 'role-' + Date.now();
    const newRole: Role = {
      id: roleId,
      title,
      department,
      hiringManager,
      location,
      employmentType,
      status: 'Active',
      openDate: 'Just now',
      candidateCount: 0,
      description: jobDescription,
      requiredSkills,
      preferredSkills,
      responsibilities,
      stages,
      competencies: extractedCompetencies,
      suggestedCriteria
    };

    addNewRole(newRole);
    onClose();
    navigateToRole(roleId);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#E5DFD7] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1B1718]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5DFD7] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#7A1824] text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#1B1718]">
                {step === 'input' ? 'Create New Role & Extract Criteria' : 'Review & Approve Competency Framework'}
              </h2>
              <p className="text-xs text-[#625A5B]">
                {step === 'input'
                  ? 'Paste a job description; AI will extract structured competencies and rubric questions.'
                  : 'Verify extracted criteria. Humans retain full editing control before publishing.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8384] hover:text-[#1B1718] p-1.5 rounded-lg hover:bg-[#F0EBE3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {step === 'input' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#625A5B] mb-1">Role Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-[#E5DFD7] rounded-lg px-3 py-2 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#625A5B] mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white border border-[#E5DFD7] rounded-lg px-3 py-2 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#625A5B] mb-1">Hiring Manager</label>
                  <input
                    type="text"
                    value={hiringManager}
                    onChange={(e) => setHiringManager(e.target.value)}
                    className="w-full bg-white border border-[#E5DFD7] rounded-lg px-3 py-2 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#625A5B] mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-[#E5DFD7] rounded-lg px-3 py-2 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#625A5B] mb-1">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full bg-white border border-[#E5DFD7] rounded-lg px-3 py-2 text-xs text-[#1B1718] focus:outline-none focus:border-[#7A1824]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#625A5B]">
                    Job Description (Raw Text)
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-[#8C8384]">Quick preset:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setTitle('Data Product Manager');
                        setDepartment('Data Platform');
                        setJobDescription(
                          'We are seeking a Data Product Manager to build enterprise data contract systems, partner with machine learning researchers, and standardize ETL observability across 20 distributed microservices.'
                        );
                      }}
                      className="text-[10px] bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#1B1718] border border-[#E5DFD7] px-2 py-0.5 rounded font-bold"
                    >
                      Data PM
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTitle('Senior UX Researcher');
                        setDepartment('Design & Insights');
                        setJobDescription(
                          'Seeking a Senior UX Researcher to lead mixed-methods generative studies, build our user panel repository, and ensure customer mental models directly inform quarterly roadmaps.'
                        );
                      }}
                      className="text-[10px] bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#1B1718] border border-[#E5DFD7] px-2 py-0.5 rounded font-bold"
                    >
                      UX Researcher
                    </button>
                  </div>
                </div>
                <textarea
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full bg-white border border-[#E5DFD7] rounded-lg p-3 text-xs text-[#1B1718] leading-relaxed focus:outline-none focus:border-[#7A1824]"
                  placeholder="Paste job description here..."
                />
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#E5DFD7] flex items-start space-x-2.5 text-xs text-[#625A5B]">
                <Sparkles className="w-4 h-4 text-[#7A1824] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1B1718]">What AI extracts:</span> Core competencies, what to listen for in interviews, suggested rubric questions, and recommended stages. You can edit everything before finalizing.
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Review Step */}
              <div className="p-3.5 bg-white border border-[#E5DFD7] rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1B1718] text-sm">{title}</span> · {department} · {hiringManager}
                </div>
                <button
                  onClick={() => setStep('input')}
                  className="text-xs text-[#7A1824] hover:underline font-bold"
                >
                  Edit Job Info
                </button>
              </div>

              {/* Extracted Competencies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#625A5B]">
                    Extracted Competencies ({extractedCompetencies.length})
                  </h3>
                  <button
                    onClick={() => {
                      setExtractedCompetencies([
                        ...extractedCompetencies,
                        {
                          id: 'c-custom-' + Date.now(),
                          name: 'New Custom Competency',
                          description: 'Define evaluation criteria here',
                          whyItMatters: 'Explains role impact',
                          suggestedQuestion: 'Add structured question'
                        }
                      ]);
                    }}
                    className="text-xs font-bold text-[#7A1824] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Competency
                  </button>
                </div>

                <div className="space-y-3">
                  {extractedCompetencies.map((comp, idx) => (
                    <div
                      key={comp.id}
                      className="bg-white border border-[#E5DFD7] rounded-xl p-4 text-xs space-y-2 relative group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={comp.name}
                          onChange={(e) => {
                            const updated = [...extractedCompetencies];
                            updated[idx].name = e.target.value;
                            setExtractedCompetencies(updated);
                          }}
                          className="font-bold text-[#1B1718] text-sm bg-transparent border-b border-transparent hover:border-[#E5DFD7] focus:border-[#7A1824] focus:outline-none w-2/3"
                        />
                        <button
                          onClick={() => {
                            setExtractedCompetencies(
                              extractedCompetencies.filter((_, i) => i !== idx)
                            );
                          }}
                          className="text-[#8C8384] hover:text-[#7A1824] p-1 rounded"
                          title="Remove competency"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <span className="font-bold text-[#625A5B]">Why It Matters:</span>
                          <textarea
                            rows={2}
                            value={comp.whyItMatters}
                            onChange={(e) => {
                              const updated = [...extractedCompetencies];
                              updated[idx].whyItMatters = e.target.value;
                              setExtractedCompetencies(updated);
                            }}
                            className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded p-2 mt-0.5 text-[11px] text-[#1B1718] focus:border-[#7A1824] focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-[#625A5B]">Suggested Interview Question:</span>
                          <textarea
                            rows={2}
                            value={comp.suggestedQuestion}
                            onChange={(e) => {
                              const updated = [...extractedCompetencies];
                              updated[idx].suggestedQuestion = e.target.value;
                              setExtractedCompetencies(updated);
                            }}
                            className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded p-2 mt-0.5 text-[11px] text-[#1B1718] focus:border-[#7A1824] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Stages Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-[#E5DFD7] p-4 rounded-xl shadow-xs">
                  <div className="text-xs font-bold text-[#625A5B] mb-2 uppercase tracking-wider">
                    Required Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {requiredSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5DFD7] text-[#1B1718] text-[11px] rounded-full font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#E5DFD7] p-4 rounded-xl shadow-xs">
                  <div className="text-xs font-bold text-[#625A5B] mb-2 uppercase tracking-wider">
                    Suggested Stages ({stages.length})
                  </div>
                  <div className="space-y-1.5 text-xs text-[#1B1718]">
                    {stages.map((stg, i) => (
                      <div key={stg.id} className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#7A1824] text-white text-[10px] flex items-center justify-center font-bold font-mono">
                          {i + 1}
                        </span>
                        <span className="font-medium">{stg.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#E5DFD7] flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-[#625A5B] hover:text-[#1B1718] font-bold"
          >
            Cancel
          </button>

          {step === 'input' ? (
            <button
              onClick={handleAnalyzeWithAI}
              disabled={isAnalyzing || !title.trim() || !jobDescription.trim()}
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#7A1824] hover:bg-[#4A0F18] disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-xs transition-all"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Extracting Competencies...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Analyze Job Description with AI</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setStep('input')}
                className="px-4 py-2 text-xs border border-[#E5DFD7] text-[#1B1718] rounded-lg hover:bg-[#FAF8F5] font-bold"
              >
                Back to Edit
              </button>
              <button
                onClick={handleSaveRole}
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-[#065F46] hover:bg-[#044E38] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve Framework & Create Role</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
