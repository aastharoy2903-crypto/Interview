export type UserRole = 'recruiter' | 'hiring_manager' | 'interviewer';

export type SignalStatus =
  | 'Ready for review'
  | 'Evidence incomplete'
  | 'Feedback pending'
  | 'Interviewers disagree'
  | 'Strong evidence across competencies'
  | 'Additional validation recommended'
  | 'Additional interview recommended'
  | 'Decision discussion required';

export type DecisionAction = 'Advance' | 'Hold' | 'Request more evidence' | 'Reject';

export type EvidenceStatus =
  | 'Evidence found'
  | 'Partial evidence'
  | 'No evidence yet'
  | 'Conflicting evidence'
  | 'Needs validation';

export type CompetencyAssessmentRating =
  | 'Strong evidence'
  | 'Some evidence'
  | 'Limited evidence'
  | 'Not assessed';

export interface Competency {
  id: string;
  name: string;
  description: string;
  whyItMatters: string;
  suggestedQuestion: string;
  listenFor?: string[];
  followUps?: string[];
}

export interface StageInfo {
  id: string;
  name: string;
  order: number;
  candidateCount: number;
  completionRate: number; // percentage
  status: 'active' | 'completed' | 'paused';
  pendingActionsCount: number;
}

export interface Role {
  id: string;
  title: string;
  department: string;
  hiringManager: string;
  location: string;
  employmentType: string;
  status: 'Open' | 'Active' | 'Under Review' | 'Closed';
  openDate: string;
  candidateCount: number;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  competencies: Competency[];
  stages: StageInfo[];
  suggestedCriteria: string[];
}

export interface CandidateJourneyEvent {
  stage: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  date: string;
  interviewer?: string;
  notes?: string;
}

export interface InterviewerComment {
  interviewer: string;
  role: string;
  comment: string;
  assessment: CompetencyAssessmentRating;
  date: string;
}

export interface CandidateCompetencyEvidence {
  competencyId: string;
  competencyName: string;
  status: EvidenceStatus;
  evidenceSummary: string;
  evidenceQuote: string;
  evidenceSource: string;
  evidenceStrength: 'High' | 'Moderate' | 'Limited';
  missingEvidence: string;
  interviewerComments: InterviewerComment[];
  relatedInterviewQuestion: string;
  humanReviewed: boolean;
  flaggedForDiscussion: boolean;
  followUpQuestions: string[];
}

export interface InterviewNoteRecord {
  id: string;
  stage: string;
  interviewerName: string;
  interviewerRole: string;
  date: string;
  notes: string;
  keyObservations: string[];
  followUpQuestions: string[];
  scorecardStatus: 'Submitted' | 'Draft' | 'Pending';
  competencyRatings?: Record<string, CompetencyAssessmentRating>;
}

export interface AIInsightItem {
  id: string;
  text: string;
  type: 'strength' | 'gap' | 'disagreement' | 'recommendation';
  status: 'accepted' | 'edited' | 'flagged' | 'dismissed';
  sourceEvidence: string;
}

export interface CandidateDecision {
  decision: 'Advance' | 'Hold' | 'Request more evidence' | 'Reject';
  decidedBy: string;
  userRole: string;
  timestamp: string;
  rationale: string;
  evidenceReviewed: string[];
  additionalEvidenceRequested?: string;
}

export interface Candidate {
  id: string;
  name: string;
  roleId: string;
  roleTitle: string;
  appliedDate: string;
  currentStage: string;
  avatarInitials: string;
  resumeSummary: string;
  relevantSkills: string[];
  overallSignalStatus: SignalStatus;
  nextRecommendedHumanAction: string;
  journey: CandidateJourneyEvent[];
  competencyEvidence: CandidateCompetencyEvidence[];
  interviewNotes: InterviewNoteRecord[];
  aiEvidenceSummary: {
    supportingFitPoints: string[];
    strongCompetencies: string[];
    partialCompetencies: string[];
    missingInformation: string[];
    interviewerDisagreements: string[];
    recommendedHumanValidations: string[];
    insights: AIInsightItem[];
  };
  decisionState?: CandidateDecision;
}

export interface ActivityEvent {
  id: string;
  type: 'candidate_added' | 'interview_completed' | 'scorecard_submitted' | 'gap_detected' | 'decision_recorded' | 'evidence_reviewed';
  title: string;
  description: string;
  timestamp: string;
  candidateName?: string;
  roleTitle?: string;
}
