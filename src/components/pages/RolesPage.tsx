import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Search,
  Plus,
  ChevronRight,
  Layers,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RolesPageProps {
  onOpenNewRoleModal: () => void;
}

export const RolesPage: React.FC<RolesPageProps> = ({ onOpenNewRoleModal }) => {
  const { roles, navigateToRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Under Review'>('All');

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.hiringManager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || role.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper to derive simulated stage counts for each role to render visual pipelines
  const getRolePipelineCounts = (total: number) => {
    const applied = Math.max(12, total * 3);
    const screen = Math.max(6, Math.round(total * 1.8));
    const interview = total;
    const finalReview = Math.max(1, Math.round(total * 0.4));
    return { applied, screen, interview, finalReview };
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <div className="bg-white border border-[#E5DFD7] rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-wider uppercase text-[#7A1824] mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7A1824]" />
            <span>Structured Hiring Rubrics</span>
          </div>
          <h1 className="text-3xl sm:text-[36px] font-bold text-[#1B1718] tracking-tight leading-[1.15]">
            Open Roles & Frameworks
          </h1>
          <p className="text-[14px] text-[#625A5B] mt-2 max-w-2xl leading-normal font-normal">
            Every active requisition is grounded in an explicit competency framework, standardized interview guide, and verifiable candidate evidence pipeline.
          </p>
        </div>

        <button
          onClick={onOpenNewRoleModal}
          className="flex items-center space-x-2 px-4 py-2 bg-[#7A1824] hover:bg-[#4A0F18] text-white text-[13px] font-semibold rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Role</span>
        </button>
      </div>

      {/* 2. Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E5DFD7] shadow-xs">
        <div className="flex items-center bg-[#FAF8F5] border border-[#E5DFD7] rounded-lg px-3 py-1.5 w-full sm:w-80 focus-within:border-[#7A1824] focus-within:ring-1 focus-within:ring-[#7A1824]">
          <Search className="w-3.5 h-3.5 text-[#625A5B] mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Filter roles, department, or hiring manager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-[13px] text-[#1B1718] placeholder-[#8C8384] focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[11px] text-[#625A5B] font-bold uppercase tracking-wider mr-1">Status:</span>
          {(['All', 'Active', 'Under Review'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold text-xs ${
                statusFilter === filter
                  ? 'bg-[#7A1824] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#1B1718] hover:bg-[#F0EBE3] border border-[#E5DFD7]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Structured Roles Display with Visual Pipelines */}
      <div className="space-y-4">
        {filteredRoles.map((role) => {
          const counts = getRolePipelineCounts(role.candidateCount);
          return (
            <div
              key={role.id}
              onClick={() => navigateToRole(role.id)}
              className="bg-white border border-[#E5DFD7] hover:border-[#7A1824] rounded-xl p-5 sm:p-6 transition-all shadow-xs hover:shadow-sm cursor-pointer group space-y-4"
            >
              {/* Top Row: Title, Department, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DFD7]">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#7A1824]">
                      {role.department}
                    </span>
                    <span className="text-[#E5DFD7]">·</span>
                    <span className="text-[12px] text-[#625A5B]">
                      Hiring Manager: <strong className="text-[#1B1718] font-semibold">{role.hiringManager}</strong>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1B1718] group-hover:text-[#7A1824] transition-colors leading-tight">
                    {role.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#FAF8F5] text-[#1B1718] border border-[#E5DFD7]">
                    {role.competencies.length} Competencies Defined
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      role.status === 'Active'
                        ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                        : 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
                    }`}
                  >
                    {role.status}
                  </span>
                </div>
              </div>

              {/* Middle Section: Visual Hiring Pipeline */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#625A5B]">
                    Visual Hiring Pipeline
                  </span>
                  <span className="text-[11px] text-[#625A5B] font-mono font-medium">
                    {counts.applied} Total in Flow
                  </span>
                </div>

                {/* Horizontal Segmented Pipeline Flow */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
                    <div className="flex items-center justify-between text-[11px] text-[#625A5B] uppercase font-bold">
                      <span>Applied</span>
                      <span className="font-mono text-[#1B1718] font-bold text-sm">{counts.applied}</span>
                    </div>
                    <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#7A1824] h-full rounded-full w-full" />
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
                    <div className="flex items-center justify-between text-[11px] text-[#625A5B] uppercase font-bold">
                      <span>Screen</span>
                      <span className="font-mono text-[#1B1718] font-bold text-sm">{counts.screen}</span>
                    </div>
                    <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#7A1824] h-full rounded-full"
                        style={{ width: `${(counts.screen / counts.applied) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
                    <div className="flex items-center justify-between text-[11px] text-[#625A5B] uppercase font-bold">
                      <span>Panel</span>
                      <span className="font-mono text-[#1B1718] font-bold text-sm">{counts.interview}</span>
                    </div>
                    <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#7A1824] h-full rounded-full"
                        style={{ width: `${(counts.interview / counts.applied) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD7]">
                    <div className="flex items-center justify-between text-[11px] text-[#625A5B] uppercase font-bold">
                      <span>Decision</span>
                      <span className="font-mono text-[#1B1718] font-bold text-sm">{counts.finalReview}</span>
                    </div>
                    <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#7A1824] h-full rounded-full"
                        style={{ width: `${(counts.finalReview / counts.applied) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Competencies chips & Link */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#625A5B] mr-1">
                    Evaluated Competencies:
                  </span>
                  {role.competencies.map((c) => (
                    <span
                      key={c.id}
                      className="px-2.5 py-0.5 bg-[#FAF8F5] border border-[#E5DFD7] text-[#1B1718] text-[11px] rounded-md font-medium"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-1 font-semibold text-[13px] text-[#7A1824] group-hover:translate-x-1 transition-transform shrink-0">
                  <span>View Competency Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
