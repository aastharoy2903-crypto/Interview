import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Clock,
  Sparkles,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Filter,
  X,
  Layers,
  FileText,
  AlertTriangle,
  Lightbulb,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Competency } from '../../types';

export const RoleDetailPage: React.FC = () => {
  const {
    selectedRole,
    updateRoleCompetencies,
    candidates,
    navigateToCandidate,
    setCurrentPage,
    setSelectedRoleId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'competencies' | 'stages' | 'candidates'>('competencies');
  const [selectedDrilldownComp, setSelectedDrilldownComp] = useState<Competency | null>(null);
  const [editingCompetencies, setEditingCompetencies] = useState(false);
  const [tempCompetencies, setTempCompetencies] = useState<Competency[]>([]);

  if (!selectedRole) {
    return (
      <div className="p-8 text-center text-xs text-[#625A5B]">
        No role selected.{' '}
        <button onClick={() => setCurrentPage('roles')} className="underline text-[#7A1824] font-bold">
          Return to roles list
        </button>
      </div>
    );
  }

  // Filter candidates belonging to this role
  const roleCandidates = candidates.filter((c) => c.roleId === selectedRole.id);

  const startEditCompetencies = () => {
    setTempCompetencies(JSON.parse(JSON.stringify(selectedRole.competencies)));
    setEditingCompetencies(true);
  };

  const saveEditedCompetencies = () => {
    updateRoleCompetencies(selectedRole.id, tempCompetencies);
    setEditingCompetencies(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto relative">
      {/* 1. Header Section */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#7A1824] uppercase tracking-wider mb-1">
              <span>{selectedRole.department}</span>
              <span className="text-[#E5DFD7]">·</span>
              <span>{selectedRole.location}</span>
              <span className="text-[#E5DFD7]">·</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8EFE9] text-[#065F46] border border-[#C4D9C7]">
                {selectedRole.status}
              </span>
            </div>
            <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
              {selectedRole.title}
            </h1>
            <p className="text-[14px] text-[#625A5B] mt-1.5 max-w-3xl leading-normal font-normal">
              {selectedRole.description}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                setSelectedRoleId(selectedRole.id);
                setCurrentPage('candidates');
              }}
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#1B1718] text-xs font-bold rounded-lg border border-[#E5DFD7] transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#7A1824]" />
              <span>Candidates in Pipeline ({roleCandidates.length})</span>
            </button>
          </div>
        </div>

        {/* Role Meta Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E5DFD7] text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C8384]">
              Hiring Manager
            </span>
            <div className="font-bold text-[#1B1718] mt-0.5 text-sm">{selectedRole.hiringManager}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C8384]">
              Sourcing Opened
            </span>
            <div className="font-semibold text-[#1B1718] mt-0.5 font-mono text-sm">{selectedRole.openDate}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C8384]">
              Employment Type
            </span>
            <div className="font-semibold text-[#1B1718] mt-0.5 text-sm">{selectedRole.employmentType}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C8384]">
              Competency Rubrics
            </span>
            <div className="font-bold text-[#7A1824] mt-0.5 font-mono text-sm">
              {selectedRole.competencies.length} Criteria Defined
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center space-x-6 border-b border-[#E5DFD7]">
        <button
          onClick={() => setActiveTab('competencies')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'competencies'
              ? 'border-[#7A1824] text-[#7A1824]'
              : 'border-transparent text-[#625A5B] hover:text-[#1B1718]'
          }`}
        >
          Visual Competency Map ({selectedRole.competencies.length})
        </button>
        <button
          onClick={() => setActiveTab('stages')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'stages'
              ? 'border-[#7A1824] text-[#7A1824]'
              : 'border-transparent text-[#625A5B] hover:text-[#1B1718]'
          }`}
        >
          Interview Stages ({selectedRole.stages.length})
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'candidates'
              ? 'border-[#7A1824] text-[#7A1824]'
              : 'border-transparent text-[#625A5B] hover:text-[#1B1718]'
          }`}
        >
          Active Candidates ({roleCandidates.length})
        </button>
      </div>

      {/* TAB 1: VISUAL COMPETENCY MAP (Grid / Matrix & Drill-down) */}
      {activeTab === 'competencies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1B1718] tracking-tight">
                Role Competency Matrix
              </h2>
              <p className="text-[13px] text-[#625A5B]">
                Click any competency row to inspect the full evidence chain: Competency → Question → Evidence → Gap → Recommended Action.
              </p>
            </div>

            {!editingCompetencies ? (
              <button
                onClick={startEditCompetencies}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#1B1718] border border-[#E5DFD7] text-xs font-bold rounded-lg transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#625A5B]" />
                <span>Edit Rubric</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingCompetencies(false)}
                  className="px-3 py-1.5 text-xs text-[#625A5B] hover:text-[#1B1718] font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedCompetencies}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-[#7A1824] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#4A0F18]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>

          {!editingCompetencies ? (
            /* Structured Competency Matrix Grid */
            <div className="bg-white border border-[#E5DFD7] rounded-xl overflow-hidden shadow-xs">
              <div className="hidden md:grid md:grid-cols-12 gap-3 px-5 py-3.5 bg-[#FAF8F5] border-b border-[#E5DFD7] text-[11px] font-bold text-[#625A5B] uppercase tracking-wider">
                <div className="col-span-3">Competency & Priority</div>
                <div className="col-span-4">Mapped Question & Rubric</div>
                <div className="col-span-3">What Good Evidence Looks Like</div>
                <div className="col-span-2 text-right">Evidence Coverage</div>
              </div>

              <div className="divide-y divide-[#E5DFD7]">
                {selectedRole.competencies.map((comp, idx) => {
                  // Determine priority (Core for first 3, Secondary for remainder)
                  const isCore = idx < 3;
                  const allEvidenceForComp = roleCandidates.flatMap((c) =>
                    c.competencyEvidence.filter((e) => e.competencyId === comp.id)
                  );
                  const collected = allEvidenceForComp.filter(
                    (e) => e.status === 'Evidence found' || e.status === 'Partial evidence'
                  ).length;
                  const missing = allEvidenceForComp.filter(
                    (e) => e.status === 'Needs validation' || e.status === 'No evidence yet'
                  ).length;

                  return (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedDrilldownComp(comp)}
                      className="p-5 hover:bg-[#FAF8F5] cursor-pointer transition-colors group grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                    >
                      {/* Col 1: Name & Priority */}
                      <div className="md:col-span-3 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                              isCore
                                ? 'bg-[#7A1824] text-white border-[#7A1824]'
                                : 'bg-[#FAF8F5] text-[#625A5B] border-[#E5DFD7]'
                            }`}
                          >
                            {isCore ? 'Core' : 'Secondary'}
                          </span>
                          <h3 className="font-bold text-sm text-[#1B1718] group-hover:text-[#7A1824] transition-colors">
                            {comp.name}
                          </h3>
                        </div>
                        <p className="text-[12px] text-[#625A5B] line-clamp-1">{comp.description}</p>
                      </div>

                      {/* Col 2: Mapped Question */}
                      <div className="md:col-span-4 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#625A5B] block md:hidden">
                          Question:
                        </span>
                        <p className="text-xs text-[#1B1718] italic line-clamp-2">
                          "{comp.suggestedQuestion}"
                        </p>
                      </div>

                      {/* Col 3: Rubric / What Good Looks Like */}
                      <div className="md:col-span-3 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#625A5B] block md:hidden">
                          Rubric:
                        </span>
                        <p className="text-xs text-[#625A5B] line-clamp-2">
                          {comp.whyItMatters}
                        </p>
                      </div>

                      {/* Col 4: Evidence Status Across Candidates */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2 text-xs">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-[12px] font-bold text-[#1B1718]">
                            {collected} collected
                          </span>
                          {missing > 0 ? (
                            <span className="text-[10px] text-[#7A1824] font-mono font-bold">
                              {missing} gaps flagged
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#065F46] font-mono font-bold">Complete</span>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#8C8384] group-hover:text-[#7A1824] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Editing interface */
            <div className="space-y-4">
              {tempCompetencies.map((comp, idx) => (
                <div
                  key={comp.id}
                  className="bg-white border border-[#E5DFD7] rounded-xl p-5 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={comp.name}
                      onChange={(e) => {
                        const updated = [...tempCompetencies];
                        updated[idx].name = e.target.value;
                        setTempCompetencies(updated);
                      }}
                      className="font-bold text-sm text-[#1B1718] border-b border-[#E5DFD7] pb-1 w-2/3 focus:outline-none focus:border-[#7A1824]"
                    />
                    <button
                      onClick={() =>
                        setTempCompetencies(tempCompetencies.filter((_, i) => i !== idx))
                      }
                      className="text-[#8C8384] hover:text-[#7A1824] p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#625A5B] block">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={comp.description}
                      onChange={(e) => {
                        const updated = [...tempCompetencies];
                        updated[idx].description = e.target.value;
                        setTempCompetencies(updated);
                      }}
                      className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg p-2.5 text-xs text-[#1B1718] mt-0.5 focus:border-[#7A1824] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#625A5B] block">
                        Why It Matters (Rubric)
                      </label>
                      <textarea
                        rows={2}
                        value={comp.whyItMatters}
                        onChange={(e) => {
                          const updated = [...tempCompetencies];
                          updated[idx].whyItMatters = e.target.value;
                          setTempCompetencies(updated);
                        }}
                        className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg p-2.5 text-xs text-[#1B1718] mt-0.5 focus:border-[#7A1824] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#625A5B] block">
                        Suggested Interview Question
                      </label>
                      <textarea
                        rows={2}
                        value={comp.suggestedQuestion}
                        onChange={(e) => {
                          const updated = [...tempCompetencies];
                          updated[idx].suggestedQuestion = e.target.value;
                          setTempCompetencies(updated);
                        }}
                        className="w-full bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg p-2.5 text-xs text-[#1B1718] mt-0.5 focus:border-[#7A1824] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  setTempCompetencies([
                    ...tempCompetencies,
                    {
                      id: 'comp-' + Date.now(),
                      name: 'New Role Competency',
                      description: 'Define evaluation criteria',
                      whyItMatters: 'Explains impact on role execution',
                      suggestedQuestion: 'Add standardized question'
                    }
                  ]);
                }}
                className="w-full py-3.5 border-2 border-dashed border-[#E5DFD7] rounded-xl text-xs font-bold text-[#625A5B] hover:text-[#1B1718] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Another Competency
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INTERVIEW STAGES */}
      {activeTab === 'stages' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#1B1718] tracking-tight">
              Structured Interview Journey & Gates
            </h2>
            <p className="text-[13px] text-[#625A5B]">
              Each stage requires verified interviewer feedback before candidate progression.
            </p>
          </div>

          <div className="space-y-3">
            {selectedRole.stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white border border-[#E5DFD7] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#7A1824] text-white flex items-center justify-center font-bold text-xs font-mono">
                    {stage.order}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1B1718]">{stage.name}</h3>
                    <div className="text-[11px] text-[#625A5B]">
                      Status: <span className="font-bold text-[#1B1718] capitalize">{stage.status}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-xs">
                  <div>
                    <span className="text-[10px] text-[#8C8384] block uppercase tracking-wider font-bold">
                      Candidates
                    </span>
                    <span className="font-mono font-bold text-[#1B1718] text-sm">
                      {stage.candidateCount} active
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8C8384] block uppercase tracking-wider font-bold">
                      Completion Rate
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-[#E5DFD7] rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-[#7A1824] h-full rounded-full"
                          style={{ width: `${stage.completionRate}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-[11px] text-[#1B1718]">
                        {stage.completionRate}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8C8384] block uppercase tracking-wider font-bold">
                      Pending Scorecards
                    </span>
                    <span
                      className={`font-mono font-bold text-xs px-2.5 py-1 rounded-full border ${
                        stage.pendingActionsCount > 0
                          ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]'
                          : 'bg-[#E8EFE9] text-[#065F46] border-[#C4D9C7]'
                      }`}
                    >
                      {stage.pendingActionsCount} pending
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CANDIDATES */}
      {activeTab === 'candidates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1B1718] tracking-tight">
              Candidates for {selectedRole.title} ({roleCandidates.length})
            </h2>
            <button
              onClick={() => {
                setSelectedRoleId(selectedRole.id);
                setCurrentPage('candidates');
              }}
              className="text-xs font-bold text-[#7A1824] hover:underline"
            >
              Open in Pipeline View →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roleCandidates.map((cand) => (
              <div
                key={cand.id}
                onClick={() => navigateToCandidate(cand.id)}
                className="bg-white border border-[#E5DFD7] hover:border-[#7A1824] rounded-xl p-5 cursor-pointer shadow-xs hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#7A1824] text-white flex items-center justify-center font-bold text-xs font-mono">
                      {cand.avatarInitials}
                    </div>
                    <div>
                      <div className="font-bold text-base text-[#1B1718]">{cand.name}</div>
                      <div className="text-[12px] text-[#625A5B]">Stage: {cand.currentStage}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E5DFD7] text-[#1B1718]">
                    {cand.overallSignalStatus}
                  </span>
                </div>
                <p className="text-[12px] text-[#625A5B] mt-3 line-clamp-2 leading-relaxed">{cand.resumeSummary}</p>
                <div className="mt-4 pt-3 border-t border-[#E5DFD7] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8C8384] font-mono">
                    {cand.competencyEvidence.length} competencies logged
                  </span>
                  <span className="text-xs font-bold text-[#7A1824] flex items-center gap-1">
                    Open Profile <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SIDE-PANEL / MODAL DRILL-DOWN: THE EVIDENCE CHAIN */}
      {/* Competency → Question → Evidence Collected → Detected Gaps → Recommended Action */}
      {selectedDrilldownComp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-[#E5DFD7] flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E5DFD7] bg-[#FAF8F5] flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#7A1824] mb-1">
                  <span>Competency Drill-Down</span>
                  <span>·</span>
                  <span>Full Evidence Chain</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1B1718] tracking-tight">
                  {selectedDrilldownComp.name}
                </h2>
                <p className="text-[13px] text-[#625A5B] mt-0.5">
                  {selectedDrilldownComp.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedDrilldownComp(null)}
                className="p-1.5 rounded-lg hover:bg-[#E5DFD7] text-[#625A5B] hover:text-[#1B1718] transition-colors"
                title="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body: 5-Step Evidence Chain */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
              {/* Chain Step 1: Competency & Rubric */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-wider text-[#7A1824]">
                  <span className="w-4 h-4 rounded-full bg-[#7A1824] text-white flex items-center justify-center font-mono text-[9px]">1</span>
                  <span>Competency & Rubric</span>
                </div>
                <div className="font-bold text-sm text-[#1B1718]">{selectedDrilldownComp.name}</div>
                <div className="text-[12px] text-[#625A5B] leading-relaxed">
                  <strong>Evaluation standard:</strong> {selectedDrilldownComp.whyItMatters}
                </div>
              </div>

              {/* Chain Step 2: Mapped Standardized Question */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-wider text-[#7A1824]">
                  <span className="w-4 h-4 rounded-full bg-[#7A1824] text-white flex items-center justify-center font-mono text-[9px]">2</span>
                  <span>Standardized Interview Question</span>
                </div>
                <blockquote className="italic text-xs text-[#1B1718] bg-white p-3 rounded-lg border border-[#E5DFD7]">
                  "{selectedDrilldownComp.suggestedQuestion}"
                </blockquote>
                {selectedDrilldownComp.listenFor && (
                  <div className="text-[12px] text-[#625A5B] pt-1">
                    <span className="font-bold text-[#1B1718] block mb-0.5">Key signals to observe:</span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {selectedDrilldownComp.listenFor.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Chain Step 3: Evidence Collected */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD7] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-wider text-[#0F766E]">
                    <span className="w-4 h-4 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-mono text-[9px]">3</span>
                    <span>Documented Evidence Collected</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#065F46] px-2.5 py-0.5 rounded-full font-mono font-bold">
                    Verifiable Quotes
                  </span>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="p-3 bg-white rounded-lg border border-[#E5DFD7]">
                    <div className="text-[12px] font-bold text-[#1B1718] flex items-center justify-between">
                      <span>Ananya Rao · Product Discovery Interview</span>
                      <span className="text-[10px] text-[#065F46] font-bold">Strong Evidence</span>
                    </div>
                    <p className="text-[12px] text-[#625A5B] mt-1 italic leading-relaxed">
                      "Outlined 14 customer discovery interviews before drafting PRD. Cut retention drop-off from 34% to 19% by restructuring activation onboarding."
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#E5DFD7]">
                    <div className="text-[12px] font-bold text-[#1B1718] flex items-center justify-between">
                      <span>Rohan Mehta · Technical Case</span>
                      <span className="text-[10px] text-[#C2410C] font-bold">Partial Evidence</span>
                    </div>
                    <p className="text-[12px] text-[#625A5B] mt-1 italic leading-relaxed">
                      "Demonstrated deep Postgres schema optimization knowledge but deferred questions on user prioritization trade-offs."
                    </p>
                  </div>
                </div>
              </div>

              {/* Chain Step 4: Detected Gaps */}
              <div className="p-4 bg-[#FDF2F2] rounded-xl border border-[#FEE2E2] space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-wider text-[#7A1824]">
                  <span className="w-4 h-4 rounded-full bg-[#7A1824] text-white flex items-center justify-center font-mono text-[9px]">4</span>
                  <span>Detected Gaps & Missing Proof</span>
                </div>
                <p className="text-xs text-[#1B1718] leading-relaxed">
                  No verified examples yet for handling cross-functional executive pushback or deprioritizing leadership-sponsored features under timeline constraints.
                </p>
              </div>

              {/* Chain Step 5: Recommended Interview Action */}
              <div className="p-4 bg-[#FFF7ED] rounded-xl border border-[#FFEDD5] space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-wider text-[#C2410C]">
                  <span className="w-4 h-4 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-mono text-[9px]">5</span>
                  <span>Recommended Interview Action</span>
                </div>
                <p className="text-xs text-[#1B1718] leading-relaxed">
                  <strong>Probe in Stage 4:</strong> Ask the candidate: <em>"Describe a high-stakes scenario where an executive sponsor pushed for an unplanned feature. How did you structure the trade-off evaluation and communicate the deprioritization?"</em>
                </p>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E5DFD7] bg-[#FAF8F5] flex items-center justify-end">
              <button
                onClick={() => setSelectedDrilldownComp(null)}
                className="px-5 py-2.5 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
