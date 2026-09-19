import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { CreateRoleModal } from './components/roles/CreateRoleModal';

// Pages
import { OverviewPage } from './components/pages/OverviewPage';
import { RolesPage } from './components/pages/RolesPage';
import { RoleDetailPage } from './components/pages/RoleDetailPage';
import { CandidatesPage } from './components/pages/CandidatesPage';
import { CandidateProfilePage } from './components/pages/CandidateProfilePage';
import { InterviewWorkspacePage } from './components/pages/InterviewWorkspacePage';
import { EvidenceBoardPage } from './components/pages/EvidenceBoardPage';
import { CandidateComparisonPage } from './components/pages/CandidateComparisonPage';
import { DecisionsPage } from './components/pages/DecisionsPage';
import { InsightsPage } from './components/pages/InsightsPage';
import { SettingsPage } from './components/pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'roles':
        return <RolesPage onOpenNewRoleModal={() => setIsCreateRoleModalOpen(true)} />;
      case 'role_detail':
        return <RoleDetailPage />;
      case 'candidates':
        return <CandidatesPage />;
      case 'candidate_profile':
        return <CandidateProfilePage />;
      case 'interview_workspace':
        return <InterviewWorkspacePage />;
      case 'evidence_board':
        return <EvidenceBoardPage />;
      case 'candidate_comparison':
        return <CandidateComparisonPage />;
      case 'decisions':
        return <DecisionsPage />;
      case 'insights':
        return <InsightsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#FAF8F5] text-[#1B1718] font-sans antialiased overflow-hidden selection:bg-[#F0EBE3] selection:text-[#4A0F18]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Global Header */}
        <Header onOpenNewRoleModal={() => setIsCreateRoleModalOpen(true)} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto bg-[#FAF8F5]">
          {renderActivePage()}
        </main>
      </div>

      {/* Role Creation Modal */}
      <CreateRoleModal
        isOpen={isCreateRoleModalOpen}
        onClose={() => setIsCreateRoleModalOpen(false)}
      />

      {/* Global Notifications Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
