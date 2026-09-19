import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  ClipboardCheck,
  Network,
  GitCompare,
  CheckCircle2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  Info,
  UserCheck
} from 'lucide-react';
import { useApp, NavigationPage } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    userRole,
    setUserRole,
    comparedCandidateIds,
    candidates
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Counts for badges
  const pendingDecisionsCount = candidates.filter(
    (c) => c.overallSignalStatus === 'Decision discussion required' || c.overallSignalStatus === 'Ready for review'
  ).length;

  const incompleteEvidenceCount = candidates.filter(
    (c) => c.overallSignalStatus === 'Evidence incomplete'
  ).length;

  const navItems: {
    id: NavigationPage;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    isCore?: boolean;
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'roles', label: 'Roles', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users, badge: candidates.length },
    { id: 'interview_workspace', label: 'Interview Guide', icon: ClipboardCheck },
    { id: 'evidence_board', label: 'Evidence Board', icon: Network, isCore: true, badge: incompleteEvidenceCount > 0 ? `${incompleteEvidenceCount} gaps` : undefined },
    { id: 'candidate_comparison', label: 'Comparison', icon: GitCompare, badge: comparedCandidateIds.length > 0 ? comparedCandidateIds.length : undefined },
    { id: 'decisions', label: 'Decisions', icon: CheckCircle2, badge: pendingDecisionsCount },
    { id: 'insights', label: 'Process Insights', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Ethic', icon: Settings },
  ];

  return (
    <>
      <aside
        className={`bg-[#FAF8F5] border-r border-[#E5DFD7] flex flex-col transition-all duration-300 select-none z-20 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Workspace Brand Header */}
        <div className="p-4 border-b border-[#E5DFD7] flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#7A1824] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              <Sparkles className="w-4 h-4 text-[#FAF8F5]" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="font-bold text-[14px] text-[#1B1718] tracking-tight leading-snug">
                  Hiring Signal Board
                </div>
                <div className="text-[12px] text-[#625A5B] font-medium truncate">
                  Evidence-First Workspace
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#625A5B] hover:text-[#1B1718] p-1 rounded-md hover:bg-[#F0EBE3] transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Role Switcher (Recruiter / Hiring Manager / Interviewer) */}
        {!collapsed ? (
          <div className="p-3 mx-3 my-2 bg-[#F0EBE3] rounded-lg border border-[#E5DFD7]">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#625A5B] mb-1.5 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-[#7A1824]" /> Simulated Persona
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-[#E5DFD7] rounded-md text-[11px] font-medium">
              <button
                onClick={() => setUserRole('hiring_manager')}
                className={`py-1 rounded text-center transition-all ${
                  userRole === 'hiring_manager'
                    ? 'bg-white text-[#1B1718] shadow-xs font-semibold'
                    : 'text-[#625A5B] hover:text-[#1B1718]'
                }`}
                title="Hiring Manager: reviews evidence, compares competencies, makes decisions"
              >
                HM
              </button>
              <button
                onClick={() => setUserRole('recruiter')}
                className={`py-1 rounded text-center transition-all ${
                  userRole === 'recruiter'
                    ? 'bg-white text-[#1B1718] shadow-xs font-semibold'
                    : 'text-[#625A5B] hover:text-[#1B1718]'
                }`}
                title="Recruiter: manages pipelines, creates roles, tracks feedback"
              >
                Recruiter
              </button>
              <button
                onClick={() => setUserRole('interviewer')}
                className={`py-1 rounded text-center transition-all ${
                  userRole === 'interviewer'
                    ? 'bg-white text-[#1B1718] shadow-xs font-semibold'
                    : 'text-[#625A5B] hover:text-[#1B1718]'
                }`}
                title="Interviewer: uses structured guide, evaluates competencies, logs evidence"
              >
                Panelist
              </button>
            </div>
            <div className="text-[11px] text-[#625A5B] mt-1.5 leading-tight">
              {userRole === 'hiring_manager' && 'Priya Sen — VP Product (Decision Authority)'}
              {userRole === 'recruiter' && 'Sarah Lin — Lead Talent Partner (Pipeline)'}
              {userRole === 'interviewer' && 'Kavita Patel — Staff PM (Interview Guide)'}
            </div>
          </div>
        ) : (
          <div className="p-2 flex justify-center border-b border-[#E5DFD7]">
            <div
              className="w-8 h-8 rounded bg-[#F0EBE3] text-[11px] font-bold flex items-center justify-center text-[#7A1824]"
              title={`Simulated: ${userRole}`}
            >
              {userRole === 'hiring_manager' ? 'HM' : userRole === 'recruiter' ? 'REC' : 'INT'}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentPage === item.id ||
              (item.id === 'roles' && currentPage === 'role_detail') ||
              (item.id === 'candidates' && currentPage === 'candidate_profile');

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center px-3 py-2 text-[14px] font-medium rounded-lg transition-all text-left group relative ${
                  isActive
                    ? 'bg-[#7A1824] text-white shadow-xs font-semibold'
                    : 'text-[#1B1718] hover:bg-[#F0EBE3] hover:text-[#1B1718]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 mr-2.5 transition-colors ${
                    isActive
                      ? 'text-white'
                      : item.isCore
                      ? 'text-[#7A1824]'
                      : 'text-[#625A5B] group-hover:text-[#1B1718]'
                  }`}
                />
                {!collapsed && (
                  <span className="flex-1 truncate flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.isCore && !item.badge && (
                      <span
                        className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                          isActive
                            ? 'bg-[#4A0F18] text-[#FAF8F5]'
                            : 'bg-[#F0EBE3] text-[#7A1824]'
                        }`}
                      >
                        Core
                      </span>
                    )}
                    {item.badge !== undefined && (
                      <span
                        className={`text-[11px] px-2 py-0.2 rounded-full font-bold ${
                          isActive
                            ? 'bg-[#4A0F18] text-white'
                            : typeof item.badge === 'string'
                            ? 'bg-[#FDF2F2] text-[#7A1824]'
                            : 'bg-[#E5DFD7] text-[#1B1718]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Ethical / AI Notice & Portfolio Footer */}
        <div className="p-3 border-t border-[#E5DFD7] text-[12px] text-[#625A5B] space-y-2">
          {!collapsed ? (
            <>
              <div className="flex items-start space-x-1.5 bg-[#F0EBE3] p-2.5 rounded-lg border border-[#E5DFD7]">
                <Shield className="w-4 h-4 text-[#7A1824] shrink-0 mt-0.5" />
                <div className="text-[11px] leading-snug">
                  <span className="font-bold text-[#1B1718]">Governance Principle:</span> AI surfaces evidence & gaps. Humans hold sole hiring authority.
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setShowAboutModal(true)}
                  className="text-[11px] text-[#625A5B] hover:text-[#7A1824] hover:underline flex items-center gap-1 font-medium"
                >
                  <Info className="w-3.5 h-3.5" /> Portfolio prototype info
                </button>
                <span className="text-[11px] text-[#8C8384] font-mono">v2.1</span>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAboutModal(true)}
                className="text-[#625A5B] hover:text-[#7A1824]"
                title="Portfolio prototype info"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Portfolio Info Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full border border-[#E5DFD7] shadow-xl p-6 text-[#1B1718] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#7A1824] text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1B1718]">Hiring Signal Board</h3>
                  <p className="text-[11px] text-[#625A5B]">Product Management Portfolio Demonstration</p>
                </div>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="text-[#625A5B] hover:text-[#1B1718] text-sm font-semibold p-1.5 rounded-lg hover:bg-[#FAF8F5]"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-xs space-y-3 leading-relaxed text-[#1B1718]">
              <p className="p-3 bg-[#FAF8F5] border border-[#E5DFD7] rounded-xl text-[#1B1718]">
                <strong>Evidence-first hiring intelligence prototype.</strong> Designed to replace subjective impressions with verifiable competency evidence, structured follow-ups, and clear human accountability.
              </p>
              <div>
                <h4 className="font-bold text-[#1B1718] mb-1.5">Core Product Principles:</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-[#625A5B]">
                  <li><strong className="text-[#1B1718]">Evidence-First:</strong> Assessments point directly to verbatim candidate quotes and observable behaviors.</li>
                  <li><strong className="text-[#1B1718]">Visual Completeness:</strong> Evidence coverage measures process completeness, never automated candidate rankings.</li>
                  <li><strong className="text-[#1B1718]">Human Authority:</strong> No automated rejections or scores. Final decisions require recorded written rationale.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DFD7] flex justify-end">
              <button
                onClick={() => setShowAboutModal(false)}
                className="px-4 py-2 bg-[#7A1824] text-white rounded-lg text-xs font-bold hover:bg-[#4A0F18] transition-colors shadow-xs"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
