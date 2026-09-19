import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Candidate,
  ActivityEvent,
  UserRole,
  CandidateDecision,
  Competency,
  CompetencyAssessmentRating,
  AIInsightItem
} from '../types';
import { INITIAL_ROLES, INITIAL_CANDIDATES, INITIAL_ACTIVITY } from '../data/mockData';

export type NavigationPage =
  | 'overview'
  | 'roles'
  | 'role_detail'
  | 'candidates'
  | 'candidate_profile'
  | 'interview_workspace'
  | 'evidence_board'
  | 'candidate_comparison'
  | 'decisions'
  | 'insights'
  | 'settings';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  roles: Role[];
  selectedRoleId: string | null;
  setSelectedRoleId: (id: string | null) => void;
  selectedRole: Role | undefined;
  candidates: Candidate[];
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
  selectedCandidate: Candidate | undefined;
  comparedCandidateIds: string[];
  toggleCandidateComparison: (id: string) => void;
  clearComparison: () => void;
  setComparedCandidateIds: (ids: string[]) => void;
  activity: ActivityEvent[];
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  // Actions
  addNewRole: (newRole: Role) => void;
  updateRoleCompetencies: (roleId: string, competencies: Competency[]) => void;
  addCandidateNote: (candidateId: string, note: {
    stage: string;
    interviewerName: string;
    interviewerRole: string;
    notes: string;
    keyObservations: string[];
    followUpQuestions: string[];
    competencyRatings?: Record<string, CompetencyAssessmentRating>;
  }) => void;
  updateCompetencyEvidence: (
    candidateId: string,
    competencyId: string,
    updates: {
      humanReviewed?: boolean;
      flaggedForDiscussion?: boolean;
      newFollowUpQuestion?: string;
    }
  ) => void;
  recordCandidateDecision: (
    candidateId: string,
    decision: 'Advance' | 'Hold' | 'Request more evidence' | 'Reject',
    rationale: string,
    evidenceReviewed: string[],
    additionalEvidenceRequested?: string
  ) => void;
  updateAIInsightStatus: (
    candidateId: string,
    insightId: string,
    status: AIInsightItem['status']
  ) => void;
  // Navigation helpers
  navigateToCandidate: (candidateId: string) => void;
  navigateToRole: (roleId: string) => void;
  navigateToEvidenceBoard: (candidateId?: string) => void;
  navigateToInterviewWorkspace: (candidateId?: string) => void;
  navigateToComparison: (candidateIds?: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('hiring_manager');
  const [currentPage, setCurrentPage] = useState<NavigationPage>('overview');
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>('role-apm');
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>('cand-ananya');
  const [comparedCandidateIds, setComparedCandidateIds] = useState<string[]>(['cand-ananya', 'cand-rohan', 'cand-meera']);
  const [activity, setActivity] = useState<ActivityEvent[]>(INITIAL_ACTIVITY);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const selectedRole = roles.find((r) => r.id === selectedRoleId) || roles[0];
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCandidateComparison = (id: string) => {
    setComparedCandidateIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((candId) => candId !== id);
      } else {
        if (prev.length >= 4) {
          addToast({
            type: 'info',
            title: 'Comparison limit reached',
            message: 'You can compare up to 4 candidates simultaneously for clear competency mapping.'
          });
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const clearComparison = () => {
    setComparedCandidateIds([]);
  };

  const addNewRole = (newRole: Role) => {
    setRoles((prev) => [newRole, ...prev]);
    setSelectedRoleId(newRole.id);
    setActivity((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'candidate_added',
        title: 'New Role Created',
        description: `${newRole.title} opened with AI-structured competency framework.`,
        timestamp: 'Just now',
        roleTitle: newRole.title
      },
      ...prev
    ]);
    addToast({
      type: 'success',
      title: 'Role Created',
      message: `"${newRole.title}" has been created with structured interview stages.`
    });
  };

  const updateRoleCompetencies = (roleId: string, competencies: Competency[]) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === roleId ? { ...r, competencies } : r))
    );
    addToast({
      type: 'success',
      title: 'Competency Framework Updated',
      message: 'Role evaluation criteria updated successfully.'
    });
  };

  const addCandidateNote = (
    candidateId: string,
    noteData: {
      stage: string;
      interviewerName: string;
      interviewerRole: string;
      notes: string;
      keyObservations: string[];
      followUpQuestions: string[];
      competencyRatings?: Record<string, CompetencyAssessmentRating>;
    }
  ) => {
    const newNote = {
      id: 'note-' + Date.now(),
      stage: noteData.stage,
      interviewerName: noteData.interviewerName,
      interviewerRole: noteData.interviewerRole,
      date: 'Today',
      notes: noteData.notes,
      keyObservations: noteData.keyObservations,
      followUpQuestions: noteData.followUpQuestions,
      scorecardStatus: 'Submitted' as const,
      competencyRatings: noteData.competencyRatings
    };

    setCandidates((prev) =>
      prev.map((cand) => {
        if (cand.id !== candidateId) return cand;

        // If ratings were provided, also augment candidate competency evidence
        const updatedEvidence = [...cand.competencyEvidence];
        if (noteData.competencyRatings) {
          Object.entries(noteData.competencyRatings).forEach(([compId, rating]) => {
            const evIdx = updatedEvidence.findIndex((e) => e.competencyId === compId);
            if (evIdx >= 0) {
              const prevItem = updatedEvidence[evIdx];
              updatedEvidence[evIdx] = {
                ...prevItem,
                interviewerComments: [
                  ...prevItem.interviewerComments,
                  {
                    interviewer: noteData.interviewerName,
                    role: noteData.interviewerRole,
                    comment: noteData.notes.slice(0, 140) + '...',
                    assessment: rating,
                    date: 'Today'
                  }
                ],
                humanReviewed: true,
                status:
                  rating === 'Strong evidence'
                    ? 'Evidence found'
                    : rating === 'Some evidence'
                    ? 'Partial evidence'
                    : rating === 'Limited evidence'
                    ? 'Conflicting evidence'
                    : prevItem.status
              };
            }
          });
        }

        return {
          ...cand,
          interviewNotes: [newNote, ...cand.interviewNotes],
          competencyEvidence: updatedEvidence,
          overallSignalStatus: 'Ready for review'
        };
      })
    );

    const candName = candidates.find((c) => c.id === candidateId)?.name || 'Candidate';
    setActivity((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'scorecard_submitted',
        title: 'Interview Feedback Submitted',
        description: `${noteData.interviewerName} logged structured evidence notes for ${candName}.`,
        timestamp: 'Just now',
        candidateName: candName
      },
      ...prev
    ]);

    addToast({
      type: 'success',
      title: 'Feedback Recorded',
      message: `Structured interview notes submitted for ${candName}. Candidate evidence updated.`
    });
  };

  const updateCompetencyEvidence = (
    candidateId: string,
    competencyId: string,
    updates: {
      humanReviewed?: boolean;
      flaggedForDiscussion?: boolean;
      newFollowUpQuestion?: string;
    }
  ) => {
    setCandidates((prev) =>
      prev.map((cand) => {
        if (cand.id !== candidateId) return cand;
        return {
          ...cand,
          competencyEvidence: cand.competencyEvidence.map((ev) => {
            if (ev.competencyId !== competencyId) return ev;
            return {
              ...ev,
              humanReviewed: updates.humanReviewed !== undefined ? updates.humanReviewed : ev.humanReviewed,
              flaggedForDiscussion:
                updates.flaggedForDiscussion !== undefined
                  ? updates.flaggedForDiscussion
                  : ev.flaggedForDiscussion,
              followUpQuestions: updates.newFollowUpQuestion
                ? [...ev.followUpQuestions, updates.newFollowUpQuestion]
                : ev.followUpQuestions
            };
          })
        };
      })
    );

    if (updates.flaggedForDiscussion) {
      addToast({
        type: 'info',
        title: 'Evidence Flagged',
        message: 'This competency has been added to the hiring committee discussion agenda.'
      });
    } else if (updates.newFollowUpQuestion) {
      addToast({
        type: 'success',
        title: 'Follow-up Question Added',
        message: 'Question routed to next interviewer guide.'
      });
    } else if (updates.humanReviewed) {
      addToast({
        type: 'success',
        title: 'Evidence Verified',
        message: 'Marked as reviewed by hiring manager.'
      });
    }
  };

  const recordCandidateDecision = (
    candidateId: string,
    decision: 'Advance' | 'Hold' | 'Request more evidence' | 'Reject',
    rationale: string,
    evidenceReviewed: string[],
    additionalEvidenceRequested?: string
  ) => {
    const userRoleLabels: Record<UserRole, string> = {
      hiring_manager: 'Priya Sen (Hiring Manager)',
      recruiter: 'Sarah Lin (Lead Talent Partner)',
      interviewer: 'Kavita Patel (Interview Panelist)'
    };

    const newDecision: CandidateDecision = {
      decision,
      decidedBy: userRoleLabels[userRole],
      userRole,
      timestamp: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rationale,
      evidenceReviewed,
      additionalEvidenceRequested
    };

    setCandidates((prev) =>
      prev.map((cand) => {
        if (cand.id !== candidateId) return cand;
        return {
          ...cand,
          decisionState: newDecision,
          overallSignalStatus:
            decision === 'Advance'
              ? 'Strong evidence across competencies'
              : decision === 'Request more evidence'
              ? 'Evidence incomplete'
              : 'Decision discussion required'
        };
      })
    );

    const cand = candidates.find((c) => c.id === candidateId);
    setActivity((prev) => [
      {
        id: 'act-' + Date.now(),
        type: 'decision_recorded',
        title: `Human Decision: ${decision}`,
        description: `${newDecision.decidedBy} recorded a decision for ${cand?.name || 'candidate'} with rationale.`,
        timestamp: 'Just now',
        candidateName: cand?.name,
        roleTitle: cand?.roleTitle
      },
      ...prev
    ]);

    addToast({
      type: 'success',
      title: 'Decision Recorded',
      message: `Decision "${decision}" saved with required human rationale.`
    });
  };

  const updateAIInsightStatus = (
    candidateId: string,
    insightId: string,
    status: AIInsightItem['status']
  ) => {
    setCandidates((prev) =>
      prev.map((cand) => {
        if (cand.id !== candidateId) return cand;
        return {
          ...cand,
          aiEvidenceSummary: {
            ...cand.aiEvidenceSummary,
            insights: cand.aiEvidenceSummary.insights.map((ins) =>
              ins.id === insightId ? { ...ins, status } : ins
            )
          }
        };
      })
    );
    addToast({
      type: 'info',
      title: 'Insight Updated',
      message: `AI recommendation status set to "${status}".`
    });
  };

  // Navigations
  const navigateToCandidate = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    setCurrentPage('candidate_profile');
  };

  const navigateToRole = (roleId: string) => {
    setSelectedRoleId(roleId);
    setCurrentPage('role_detail');
  };

  const navigateToEvidenceBoard = (candidateId?: string) => {
    if (candidateId) setSelectedCandidateId(candidateId);
    setCurrentPage('evidence_board');
  };

  const navigateToInterviewWorkspace = (candidateId?: string) => {
    if (candidateId) setSelectedCandidateId(candidateId);
    setCurrentPage('interview_workspace');
  };

  const navigateToComparison = (candidateIds?: string[]) => {
    if (candidateIds && candidateIds.length > 0) {
      setComparedCandidateIds(candidateIds);
    }
    setCurrentPage('candidate_comparison');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentPage,
        setCurrentPage,
        roles,
        selectedRoleId,
        setSelectedRoleId,
        selectedRole,
        candidates,
        selectedCandidateId,
        setSelectedCandidateId,
        selectedCandidate,
        comparedCandidateIds,
        toggleCandidateComparison,
        clearComparison,
        setComparedCandidateIds,
        activity,
        toasts,
        addToast,
        removeToast,
        addNewRole,
        updateRoleCompetencies,
        addCandidateNote,
        updateCompetencyEvidence,
        recordCandidateDecision,
        updateAIInsightStatus,
        navigateToCandidate,
        navigateToRole,
        navigateToEvidenceBoard,
        navigateToInterviewWorkspace,
        navigateToComparison
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
