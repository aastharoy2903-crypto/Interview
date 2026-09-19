import React, { useState } from 'react';
import {
  Search,
  Plus,
  GitCompare,
  Briefcase,
  ChevronRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onOpenNewRoleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNewRoleModal }) => {
  const {
    currentPage,
    setCurrentPage,
    roles,
    selectedRoleId,
    setSelectedRoleId,
    selectedRole,
    selectedCandidate,
    comparedCandidateIds,
    navigateToComparison,
    candidates,
    navigateToCandidate,
    navigateToRole
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Search filtering
  const matchingCandidates = searchQuery.trim()
    ? candidates.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.relevantSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const matchingRoles = searchQuery.trim()
    ? roles.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Breadcrumb generator
  const renderBreadcrumb = () => {
    switch (currentPage) {
      case 'overview':
        return <span className="font-bold text-[14px] text-[#1B1718]">Executive Hiring Signals</span>;
      case 'roles':
        return <span className="font-bold text-[14px] text-[#1B1718]">Open Roles & Frameworks</span>;
      case 'role_detail':
        return (
          <div className="flex items-center space-x-1.5 text-xs">
            <button
              onClick={() => setCurrentPage('roles')}
              className="text-[#625A5B] hover:text-[#1B1718] hover:underline font-medium"
            >
              Roles
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#625A5B]" />
            <span className="font-bold text-[#1B1718] truncate">{selectedRole?.title}</span>
          </div>
        );
      case 'candidates':
        return <span className="font-bold text-[14px] text-[#1B1718]">Candidate Evidence Pipeline</span>;
      case 'candidate_profile':
        return (
          <div className="flex items-center space-x-1.5 text-xs">
            <button
              onClick={() => setCurrentPage('candidates')}
              className="text-[#625A5B] hover:text-[#1B1718] hover:underline font-medium"
            >
              Candidates
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#625A5B]" />
            <span className="font-bold text-[#1B1718]">{selectedCandidate?.name}</span>
            <span className="text-[11px] text-[#625A5B] px-2 py-0.5 bg-[#F0EBE3] rounded font-medium">
              {selectedCandidate?.roleTitle}
            </span>
          </div>
        );
      case 'interview_workspace':
        return <span className="font-bold text-[14px] text-[#1B1718]">Interviewer Guide & Evidence Intake</span>;
      case 'evidence_board':
        return (
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[14px] text-[#1B1718]">Evidence Board</span>
            <span className="text-[11px] uppercase tracking-wider font-bold bg-[#F0EBE3] text-[#7A1824] px-2.5 py-0.5 rounded-full border border-[#E5DFD7]">
              Competency → Evidence → Gaps
            </span>
          </div>
        );
      case 'candidate_comparison':
        return <span className="font-bold text-[14px] text-[#1B1718]">Candidate Competency Comparison</span>;
      case 'decisions':
        return <span className="font-bold text-[14px] text-[#1B1718]">Human-Led Hiring Decisions</span>;
      case 'insights':
        return <span className="font-bold text-[14px] text-[#1B1718]">Process Quality & Agreement Metrics</span>;
      case 'settings':
        return <span className="font-bold text-[14px] text-[#1B1718]">Workspace Guidelines & Ethics</span>;
      default:
        return <span className="font-bold text-[14px] text-[#1B1718]">Workspace</span>;
    }
  };

  return (
    <header className="h-14 bg-[#FAF8F5] border-b border-[#E5DFD7] px-6 flex items-center justify-between shrink-0 sticky top-0 z-10">
      {/* Left: Breadcrumbs & Active Role Pill */}
      <div className="flex items-center space-x-4">
        <div>{renderBreadcrumb()}</div>

        {/* Quick Role Context Filter */}
        {(currentPage === 'candidates' ||
          currentPage === 'evidence_board' ||
          currentPage === 'candidate_comparison' ||
          currentPage === 'interview_workspace') && (
          <div className="hidden md:flex items-center space-x-1.5 pl-3 border-l border-[#E5DFD7]">
            <Briefcase className="w-3.5 h-3.5 text-[#625A5B]" />
            <select
              value={selectedRoleId || ''}
              onChange={(e) => setSelectedRoleId(e.target.value || null)}
              className="text-xs bg-[#F0EBE3] border border-[#E5DFD7] text-[#1B1718] font-medium py-1 px-2.5 rounded-lg focus:ring-1 focus:ring-[#7A1824] cursor-pointer"
            >
              <option value="">All Open Roles (4)</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Quick Search & Primary Actions */}
      <div className="flex items-center space-x-3">
        {/* Search Input with live dropdown */}
        <div className="relative">
          <div className="flex items-center bg-[#F0EBE3] hover:bg-[#E5DFD7] transition-colors rounded-lg px-3 py-1.5 w-48 sm:w-64 border border-[#E5DFD7] focus-within:border-[#7A1824] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#7A1824]">
            <Search className="w-3.5 h-3.5 text-[#625A5B] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search candidate, skill, role..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="bg-transparent border-none text-[13px] text-[#1B1718] placeholder-[#8C8384] focus:outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-[#625A5B] hover:text-[#1B1718]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute top-10 right-0 w-80 bg-white border border-[#E5DFD7] rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-[#625A5B]">
                Candidates ({matchingCandidates.length})
              </div>
              {matchingCandidates.length > 0 ? (
                matchingCandidates.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigateToCandidate(c.id);
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-3 py-1.5 hover:bg-[#FAF8F5] flex items-center justify-between text-left"
                  >
                    <div>
                      <div className="font-semibold text-[#1B1718]">{c.name}</div>
                      <div className="text-[11px] text-[#625A5B]">{c.roleTitle} · {c.currentStage}</div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F0EBE3] text-[#1B1718]">
                      {c.overallSignalStatus}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-1 text-[11px] text-[#625A5B]">No candidates found</div>
              )}

              <div className="px-3 pt-2 pb-1 border-t border-[#E5DFD7] mt-1 text-[10px] uppercase tracking-wider font-bold text-[#625A5B]">
                Roles ({matchingRoles.length})
              </div>
              {matchingRoles.length > 0 ? (
                matchingRoles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      navigateToRole(r.id);
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-3 py-1.5 hover:bg-[#FAF8F5] flex items-center justify-between text-left"
                  >
                    <div className="font-medium text-[#1B1718]">{r.title}</div>
                    <span className="text-[11px] text-[#625A5B]">{r.department}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-1 text-[11px] text-[#625A5B]">No roles found</div>
              )}
            </div>
          )}
        </div>

        {/* Candidate comparison button shortcut */}
        {comparedCandidateIds.length > 0 && (
          <button
            onClick={() => navigateToComparison()}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#F0EBE3] hover:bg-[#E5DFD7] text-[#1B1718] text-[13px] font-semibold rounded-lg border border-[#E5DFD7] transition-colors"
          >
            <GitCompare className="w-3.5 h-3.5 text-[#7A1824]" />
            <span>Compare ({comparedCandidateIds.length})</span>
          </button>
        )}

        {/* Primary Action Button */}
        <button
          onClick={onOpenNewRoleModal}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-[13px] font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Role</span>
        </button>
      </div>
    </header>
  );
};
