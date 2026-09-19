import { Role, Candidate, ActivityEvent } from '../types';

export const INITIAL_ROLES: Role[] = [
  {
    id: 'role-apm',
    title: 'Associate Product Manager',
    department: 'Product & Growth',
    hiringManager: 'Priya Sen (VP of Product)',
    location: 'San Francisco, CA (Hybrid)',
    employmentType: 'Full-time',
    status: 'Active',
    openDate: '2 weeks ago',
    candidateCount: 14,
    description: 'We are seeking an analytical, curious Associate Product Manager to join our Growth team. You will lead experimentation, partner closely with engineering and design, and translate customer telemetry into high-impact product enhancements.',
    requiredSkills: ['SQL & Data Analytics', 'A/B Testing Methodology', 'User Journey Mapping', 'Structured Problem Solving', 'Cross-functional Collaboration'],
    preferredSkills: ['B2B SaaS Experience', 'Figma Wireframing', 'API Basics'],
    responsibilities: [
      'Define sprint scopes and write structured user stories for the activation squad',
      'Conduct 5+ weekly customer discovery sessions with early workspace adopters',
      'Synthesize behavioral cohort data to identify drop-offs in the onboarding funnel',
      'Facilitate quarterly prioritization reviews with marketing, success, and engineering'
    ],
    stages: [
      { id: 'stg-1', name: 'Application review', order: 1, candidateCount: 14, completionRate: 100, status: 'completed', pendingActionsCount: 0 },
      { id: 'stg-2', name: 'Recruiter screen', order: 2, candidateCount: 8, completionRate: 88, status: 'completed', pendingActionsCount: 1 },
      { id: 'stg-3', name: 'Product case', order: 3, candidateCount: 4, completionRate: 75, status: 'active', pendingActionsCount: 2 },
      { id: 'stg-4', name: 'Hiring manager interview', order: 4, candidateCount: 3, completionRate: 67, status: 'active', pendingActionsCount: 1 },
      { id: 'stg-5', name: 'Final decision', order: 5, candidateCount: 2, completionRate: 50, status: 'active', pendingActionsCount: 2 }
    ],
    suggestedCriteria: [
      'Evidence of hypothesis-driven product discovery',
      'Demonstrated trade-off reasoning when resources are constrained',
      'Ability to articulate user pain points separately from feature ideas',
      'Clear, empathetic communication with both technical and non-technical stakeholders'
    ],
    competencies: [
      {
        id: 'comp-prod-thinking',
        name: 'Product thinking',
        description: 'Ability to identify core user problems, frame problem statements without jumping to solutions, and conceptualize product solutions.',
        whyItMatters: 'Ensures the candidate solves the root problem rather than building cosmetic feature requests.',
        suggestedQuestion: 'How would you improve a digital product you use every single day? Walk me through how you discovered the underlying user friction.',
        listenFor: ['Starts with problem and target user', 'Distinguishes between user wants and actual needs', 'Considers counter-intuitive trade-offs'],
        followUps: ['What metrics would invalidate your solution?', 'How would you test this without writing code?']
      },
      {
        id: 'comp-user-empathy',
        name: 'User empathy',
        description: 'Deep curiosity about customer pain points, diverse personas, and behavioral friction.',
        whyItMatters: 'Prevents building features based on internal company assumptions rather than customer reality.',
        suggestedQuestion: 'Describe a time when customer interview research completely contradicted your team’s initial hypothesis.',
        listenFor: ['Active listening techniques', 'Openness to being wrong', 'Respectful treatment of diverse user segments'],
        followUps: ['How did you pivot the roadmap after discovering this insight?']
      },
      {
        id: 'comp-analytical',
        name: 'Analytical reasoning',
        description: 'Ability to dissect metrics, design controlled experiments, and interpret ambiguous behavioral data.',
        whyItMatters: 'Essential for running valid growth experiments and defending decisions with data.',
        suggestedQuestion: 'Suppose onboarding drop-off increased by 14% week-over-week. How would you methodically isolate the root cause?',
        listenFor: ['Structured segmentation approach', 'Separating correlation from causation', 'Checks technical errors before behavioral shift'],
        followUps: ['What confounding variables might distort the cohort data?']
      },
      {
        id: 'comp-prioritization',
        name: 'Prioritization',
        description: 'Methodical framework application to decide what to build, what to defer, and what to decline.',
        whyItMatters: 'APMs face constant competing demands from sales, executive team, and engineers.',
        suggestedQuestion: 'Tell me about a time when you had to say no to an influential stakeholder requesting a specific feature.',
        listenFor: ['Explicit decision framework (e.g. RICE, impact vs effort)', 'Clear stakeholder alignment communication', 'Transparent trade-off documentation'],
        followUps: ['What alternative did you offer the stakeholder?', 'What would you do differently now?']
      },
      {
        id: 'comp-comm',
        name: 'Communication',
        description: 'Concise, structured written and verbal articulation; active listening and tailoring context to audience.',
        whyItMatters: 'PMs write specifications and lead meetings where clarity prevents weeks of engineering waste.',
        suggestedQuestion: 'Walk me through a complex technical concept or architecture decision as if I were a non-technical sales partner.',
        listenFor: ['Absence of jargon', 'Pacing and structural signposting', 'Checks for understanding'],
        followUps: ['How do you resolve ambiguous feedback across team channels?']
      },
      {
        id: 'comp-execution',
        name: 'Execution and ownership',
        description: 'Bias for action, unblocking blockers, tracking dependencies, and seeing projects across the finish line.',
        whyItMatters: 'Ideas are worthless without dependable execution in fast-moving sprints.',
        suggestedQuestion: 'Describe a project where an unexpected blocker threatened a launch deadline. How did you regain control?',
        listenFor: ['Proactive unblocking', 'Escalation with proposed options', 'Post-mortem learning'],
        followUps: ['What safeguard did you implement afterwards?']
      },
      {
        id: 'comp-collab',
        name: 'Collaboration',
        description: 'Cross-functional partnership with engineering, UX research, design, and go-to-market teams.',
        whyItMatters: 'PMs hold zero direct authority; influence and psychological safety drive team success.',
        suggestedQuestion: 'Tell me about a disagreement you had with a lead software engineer about scope or technical debt.',
        listenFor: ['Respect for technical judgment', 'Focus on shared business goal', 'Absence of ego'],
        followUps: ['How did the final compromise hold up in production?']
      }
    ]
  },
  {
    id: 'role-sba',
    title: 'Senior Business Analyst',
    department: 'Operations & Analytics',
    hiringManager: 'Marcus Vance (Director of BizOps)',
    location: 'New York, NY (Remote-friendly)',
    employmentType: 'Full-time',
    status: 'Active',
    openDate: '3 weeks ago',
    candidateCount: 9,
    description: 'Seeking an analytical thinker to build data models, executive financial forecasting, and unit economics dashboards supporting our market expansion.',
    requiredSkills: ['Advanced SQL', 'dbt / Snowflake', 'Cohort Financial Modeling', 'Executive Presentations'],
    preferredSkills: ['Python for Data Analysis', 'Tableau / Looker Studio'],
    responsibilities: [
      'Maintain core executive revenue and churn telemetry models in dbt',
      'Partner with operational directors to identify unit margin leaks in fulfillment',
      'Produce board-level scenario models for Series B capital allocation'
    ],
    stages: [
      { id: 'sba-1', name: 'Application review', order: 1, candidateCount: 9, completionRate: 100, status: 'completed', pendingActionsCount: 0 },
      { id: 'sba-2', name: 'Technical take-home', order: 2, candidateCount: 5, completionRate: 80, status: 'completed', pendingActionsCount: 1 },
      { id: 'sba-3', name: 'Case presentation', order: 3, candidateCount: 3, completionRate: 66, status: 'active', pendingActionsCount: 1 },
      { id: 'sba-4', name: 'Final decision', order: 4, candidateCount: 2, completionRate: 50, status: 'active', pendingActionsCount: 2 }
    ],
    suggestedCriteria: ['Demonstrated statistical rigor', 'Clear translation of models into business levers', 'Handling of messy, incomplete enterprise data'],
    competencies: [
      { id: 'c-sba-1', name: 'Data modeling & SQL', description: 'Database schema design, query optimization, and warehouse modeling.', whyItMatters: 'Core technical foundation of business reporting.', suggestedQuestion: 'Describe your approach to designing a star schema for recurring subscription billing.' },
      { id: 'c-sba-2', name: 'Business intuition', description: 'Connecting metric variance to commercial operational drivers.', whyItMatters: 'Analysts must recommend action, not just report numbers.', suggestedQuestion: 'If gross margin dropped 400bps while revenue grew 30%, what operational hypotheses would you test first?' },
      { id: 'c-sba-3', name: 'Executive communication', description: 'Synthesizing complex multi-variable models into 3 actionable takeaways.', whyItMatters: 'Leadership makes capital decisions based on these briefings.', suggestedQuestion: 'Walk me through a 5-minute briefing to a skeptical CFO.' }
    ]
  },
  {
    id: 'role-pos',
    title: 'Product Operations Specialist',
    department: 'Product Operations',
    hiringManager: 'Elena Rostova (Head of Product Operations)',
    location: 'Austin, TX / Remote',
    employmentType: 'Full-time',
    status: 'Active',
    openDate: '1 month ago',
    candidateCount: 8,
    description: 'Connect user feedback loops to product roadmaps and standardize release rituals across 6 distributed squads.',
    requiredSkills: ['Process Optimization', 'Jira / Linear admin', 'Customer Feedback Triage', 'Release Management'],
    preferredSkills: ['SQL queries', 'Notion workspace design'],
    responsibilities: [
      'Manage bug escalation pathways between Tier 3 support and engineering',
      'Run bi-weekly beta testing cohort feedback roundtables',
      'Measure feature adoption benchmarks 30 days post-launch'
    ],
    stages: [
      { id: 'pos-1', name: 'Application review', order: 1, candidateCount: 8, completionRate: 100, status: 'completed', pendingActionsCount: 0 },
      { id: 'pos-2', name: 'Recruiter screen', order: 2, candidateCount: 5, completionRate: 100, status: 'completed', pendingActionsCount: 0 },
      { id: 'pos-3', name: 'Workflow exercise', order: 3, candidateCount: 3, completionRate: 67, status: 'active', pendingActionsCount: 1 },
      { id: 'pos-4', name: 'Team interview', order: 4, candidateCount: 2, completionRate: 50, status: 'active', pendingActionsCount: 1 }
    ],
    suggestedCriteria: ['Systemic thinking', 'Documentation discipline', 'Cross-team consensus building'],
    competencies: [
      { id: 'c-pos-1', name: 'Workflow architecture', description: 'Designing frictionless handover processes between teams.', whyItMatters: 'Eliminates dropped customer tickets and sprint delay.', suggestedQuestion: 'How would you redesign our release notes workflow across 4 teams?' },
      { id: 'c-pos-2', name: 'Stakeholder triage', description: 'Balancing urgent escalations against planned sprint deliverables.', whyItMatters: 'Prevents engineering distraction while safeguarding customer trust.', suggestedQuestion: 'How do you handle a Sev-1 bug report during sprint freeze?' }
    ]
  },
  {
    id: 'role-css',
    title: 'Customer Success Strategy Lead',
    department: 'Customer Experience',
    hiringManager: 'David Chen (VP of Customer Experience)',
    location: 'San Francisco, CA',
    employmentType: 'Full-time',
    status: 'Active',
    openDate: '3 weeks ago',
    candidateCount: 7,
    description: 'Design enterprise onboarding playbooks, reduce net revenue churn, and institutionalize customer health score indicators.',
    requiredSkills: ['Enterprise Renewal Strategy', 'Gainsight / Salesforce', 'Executive Business Reviews', 'Contract Negotiation'],
    preferredSkills: ['Customer Journey Analytics', 'Team Coaching'],
    responsibilities: [
      'Own net revenue retention across Fortune 500 strategic tier',
      'Build scalable health score alerts to flag churn risk 90 days before renewal',
      'Partner with Product to route enterprise enhancement requests'
    ],
    stages: [
      { id: 'css-1', name: 'Application review', order: 1, candidateCount: 7, completionRate: 100, status: 'completed', pendingActionsCount: 0 },
      { id: 'css-2', name: 'Recruiter screen', order: 2, candidateCount: 4, completionRate: 100, status: 'completed', pendingActionsCount: 0 },
      { id: 'css-3', name: 'EBR simulation', order: 3, candidateCount: 2, completionRate: 50, status: 'active', pendingActionsCount: 1 }
    ],
    suggestedCriteria: ['Value realization frameworks', 'Executive presence in tough renewal talks', 'Cross-sell pipeline enablement'],
    competencies: [
      { id: 'c-css-1', name: 'Strategic account retention', description: 'Preventing enterprise churn through proactive business value proof.', whyItMatters: 'Direct impact on ARR.', suggestedQuestion: 'Walk me through rescuing an enterprise account whose champion left the company.' }
    ]
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-ananya',
    name: 'Ananya Rao',
    roleId: 'role-apm',
    roleTitle: 'Associate Product Manager',
    appliedDate: '12 days ago',
    currentStage: 'Final decision',
    avatarInitials: 'AR',
    resumeSummary: 'Former UX Engineer turned Product Analyst with 3 years of experience at a high-growth fintech startup. Led the redesign of mobile deposit workflows, boosting conversion by 18%. Strong SQL skills and proven user interview track record.',
    relevantSkills: ['User Discovery', 'SQL Data Pipelines', 'Wireframing', 'Agile Sprints', 'Metric Telemetry'],
    overallSignalStatus: 'Decision discussion required',
    nextRecommendedHumanAction: 'Discuss prioritization trade-off evidence in hiring committee. Analytical and user empathy evidence is strong; trade-off rigor under constraints remains unverified.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 7, 2026', notes: 'Strong background in UX engineering and product analytics. Portfolio includes structured case study on churn reduction.' },
      { stage: 'Recruiter screen', status: 'completed', date: 'Sept 10, 2026', interviewer: 'Sarah Lin (Lead Talent Partner)', notes: 'Clear communicator, articulate motivations for transitioning from analytics to core PM.' },
      { stage: 'Product case', status: 'completed', date: 'Sept 14, 2026', interviewer: 'Kavita Patel (Staff PM)', notes: 'Presented Spotify playlist sharing problem. Outstanding user journey breakdown; however, did not outline explicit cost/resource trade-offs.' },
      { stage: 'Hiring manager interview', status: 'completed', date: 'Sept 17, 2026', interviewer: 'Priya Sen (VP Product)', notes: 'High emotional intelligence and crisp communication. Handled team conflict scenarios gracefully.' },
      { stage: 'Final decision', status: 'in_progress', date: 'Sept 19, 2026', notes: 'Committee review scheduled.' }
    ],
    competencyEvidence: [
      {
        competencyId: 'comp-prod-thinking',
        competencyName: 'Product thinking',
        status: 'Evidence found',
        evidenceSummary: 'Candidate demonstrated nuanced problem framing during the case interview, focusing on latent friction in playlist collaboration rather than immediate UI redesigns.',
        evidenceQuote: '"Before sketching features, I mapped why users abandoned collaborative playlists: social embarrassment of bad song additions, not button placement."',
        evidenceSource: 'Product Case Interview',
        evidenceStrength: 'High',
        missingEvidence: 'No documented evidence of evaluating competitive counter-moves from rivals (e.g., Apple Music).',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Loved how she refused to accept the initial prompt verbatim and probed the target segment first.', assessment: 'Strong evidence', date: 'Sept 14, 2026' }
        ],
        relatedInterviewQuestion: 'How would you improve a digital product you use every single day? Walk me through how you discovered the underlying user friction.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: ['How would you prioritize this feature against core playback latency improvements?']
      },
      {
        competencyId: 'comp-user-empathy',
        competencyName: 'User empathy',
        status: 'Evidence found',
        evidenceSummary: 'Demonstrated exceptional empathy with non-technical users during previous role, setting up 20+ qualitative shadow sessions.',
        evidenceQuote: '"I sat beside rural merchants in tier-2 cities for 3 days to see why they preferred paper ledgers over our digital app."',
        evidenceSource: 'Recruiter Screen & Hiring Manager Interview',
        evidenceStrength: 'High',
        missingEvidence: 'Minimal discussion on balancing qualitative feedback with statistical significance.',
        interviewerComments: [
          { interviewer: 'Priya Sen', role: 'VP of Product', comment: 'Genuine curiosity and humility. Treats user frustration as a product defect, not user error.', assessment: 'Strong evidence', date: 'Sept 17, 2026' }
        ],
        relatedInterviewQuestion: 'Describe a time when customer interview research completely contradicted your team’s initial hypothesis.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-analytical',
        competencyName: 'Analytical reasoning',
        status: 'Evidence found',
        evidenceSummary: 'Walked through a 4-step statistical triage for onboarding funnel anomalies. Accurately separated browser caching bugs from organic drop-off.',
        evidenceQuote: '"I segmented by client build version and gateway region before assuming a behavioral UX friction."',
        evidenceSource: 'Product Case Interview',
        evidenceStrength: 'High',
        missingEvidence: 'Did not detail sample size calculation formulas for small cohort micro-experiments.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Very crisp diagnostic intuition. Strong SQL intuition demonstrated.', assessment: 'Strong evidence', date: 'Sept 14, 2026' }
        ],
        relatedInterviewQuestion: 'Suppose onboarding drop-off increased by 14% week-over-week. How would you methodically isolate the root cause?',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-prioritization',
        competencyName: 'Prioritization',
        status: 'Partial evidence',
        evidenceSummary: 'Explained using RICE scoring in prior role, but struggled when asked to cut 50% of the roadmap scope under a tight 6-week engineering freeze.',
        evidenceQuote: '"We scored items on reach and effort, but when leadership pushed for an urgent client feature, we adjusted the weights."',
        evidenceSource: 'Product Case & Hiring Manager Interview',
        evidenceStrength: 'Limited',
        missingEvidence: 'Concrete evidence of standing firm with a trade-off framework when confronted with high-pressure executive requests.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Seemed to lean heavily on executive consensus rather than defending a strict prioritization rubric.', assessment: 'Some evidence', date: 'Sept 14, 2026' },
          { interviewer: 'Priya Sen', role: 'VP of Product', comment: 'Acknowledged the difficulty of saying no to founders, but gave a somewhat theoretical answer.', assessment: 'Limited evidence', date: 'Sept 17, 2026' }
        ],
        relatedInterviewQuestion: 'Tell me about a time when you had to say no to an influential stakeholder requesting a specific feature.',
        humanReviewed: true,
        flaggedForDiscussion: true,
        followUpQuestions: ['Provide a specific example where you actively declined a feature requested by a senior executive. What was the fallout and how did you navigate it?']
      },
      {
        competencyId: 'comp-comm',
        competencyName: 'Communication',
        status: 'Evidence found',
        evidenceSummary: 'Structured and concise verbal articulation throughout all interview rounds. Synthesizes complex ideas with clarity.',
        evidenceQuote: '"In summary: three user frictions, one key lever, two invalidation risks."',
        evidenceSource: 'All Rounds',
        evidenceStrength: 'High',
        missingEvidence: 'No direct sample of long-form written Product Requirement Documents (PRDs) reviewed yet.',
        interviewerComments: [
          { interviewer: 'Sarah Lin', role: 'Talent Lead', comment: 'Exceptional communication style. Listens completely before responding.', assessment: 'Strong evidence', date: 'Sept 10, 2026' }
        ],
        relatedInterviewQuestion: 'Walk me through a complex technical concept or architecture decision as if I were a non-technical sales partner.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-execution',
        competencyName: 'Execution and ownership',
        status: 'Evidence found',
        evidenceSummary: 'Delivered an emergency checkout hotfix over a holiday weekend in her previous company by coordinating between engineering and ops.',
        evidenceQuote: '"I stayed online with the on-call engineer until the canary deploy reached 100% stable traffic."',
        evidenceSource: 'Hiring Manager Interview',
        evidenceStrength: 'Moderate',
        missingEvidence: 'Limited evidence on running prolonged multi-quarter cross-squad release dependencies.',
        interviewerComments: [
          { interviewer: 'Priya Sen', role: 'VP of Product', comment: 'Great ownership mindset. Highly reliable.', assessment: 'Strong evidence', date: 'Sept 17, 2026' }
        ],
        relatedInterviewQuestion: 'Describe a project where an unexpected blocker threatened a launch deadline. How did you regain control?',
        humanReviewed: false,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-collab',
        competencyName: 'Collaboration',
        status: 'Evidence found',
        evidenceSummary: 'Positive history working with engineering teams; understands technical constraints and respects engineering architecture concerns.',
        evidenceQuote: '"When the architect explained why technical debt would double our latency, I agreed to delay our feature by two sprints."',
        evidenceSource: 'Hiring Manager Interview',
        evidenceStrength: 'High',
        missingEvidence: 'None noted.',
        interviewerComments: [
          { interviewer: 'Priya Sen', role: 'VP of Product', comment: 'Engineers will appreciate her technical background and willingness to listen.', assessment: 'Strong evidence', date: 'Sept 17, 2026' }
        ],
        relatedInterviewQuestion: 'Tell me about a disagreement you had with a lead software engineer about scope or technical debt.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      }
    ],
    interviewNotes: [
      {
        id: 'note-1',
        stage: 'Recruiter screen',
        interviewerName: 'Sarah Lin',
        interviewerRole: 'Lead Talent Partner',
        date: 'Sept 10, 2026',
        notes: 'Ananya was punctual, extremely well prepared, and showed deep curiosity regarding Northstar’s product roadmap. She clearly articulated why she wants to focus on growth loops rather than purely core UI.',
        keyObservations: ['High energy and clarity', 'Realistic salary alignment', 'Ready to start in 3 weeks'],
        followUpQuestions: ['Probe trade-off discipline during case study.'],
        scorecardStatus: 'Submitted'
      },
      {
        id: 'note-2',
        stage: 'Product case',
        interviewerName: 'Kavita Patel',
        interviewerRole: 'Staff PM',
        date: 'Sept 14, 2026',
        notes: 'Delivered an impressive presentation on collaborative playlist friction. Structured her thinking into 3 primary user jobs-to-be-done. Handled analytics follow-ups with ease. When pressed on scope reduction under a 50% engineering cut, she seemed reluctant to prune features and suggested trying to do all three with smaller scopes instead.',
        keyObservations: ['Exceptional user problem framing', 'Strong metric hygiene', 'Prioritization trade-off conviction is somewhat theoretical'],
        followUpQuestions: ['Ask for concrete real-world example of saying no to leadership.'],
        scorecardStatus: 'Submitted'
      },
      {
        id: 'note-3',
        stage: 'Hiring manager interview',
        interviewerName: 'Priya Sen',
        interviewerRole: 'VP of Product',
        date: 'Sept 17, 2026',
        notes: 'Very strong alignment with Northstar values. Demonstrated deep empathy and technical literacy from her UX engineering past. Discussed how she handled an on-call crisis. When asked about pushback from founders, she gave a reasonable answer but admitted she has not often had to push back directly on executive sponsors.',
        keyObservations: ['High EQ and humility', 'Strong developer empathy', 'Prioritization firmness needs committee alignment'],
        followUpQuestions: ['Committee should evaluate whether mentorship can bridge the trade-off experience gap.'],
        scorecardStatus: 'Submitted'
      }
    ],
    aiEvidenceSummary: {
      supportingFitPoints: [
        'Documented track record of user discovery: 20+ qualitative customer sessions conducted in previous role.',
        'Strong diagnostic analytics: Successfully isolated onboarding funnel variance by client build version.',
        'Technical fluency: Prior background in UX engineering allows seamless partnership with software architects.'
      ],
      strongCompetencies: ['Product thinking', 'User empathy', 'Analytical reasoning', 'Communication', 'Collaboration'],
      partialCompetencies: ['Prioritization', 'Execution and ownership'],
      missingInformation: [
        'Demonstrated track record of defending a prioritization framework against aggressive executive pushback.',
        'Experience managing multi-quarter roadmap dependencies across distributed squads.'
      ],
      interviewerDisagreements: [
        'Kavita noted reluctance to cut scope in the case study, whereas Priya observed strong willingness to adapt sprint timelines based on technical debt.'
      ],
      recommendedHumanValidations: [
        'Discuss whether the candidate’s prioritization approach can be coached within the APM framework.',
        'Request a concrete example of managing conflicting stakeholder priorities during the final hiring committee.'
      ],
      insights: [
        {
          id: 'ins-1',
          text: 'Strong qualitative and analytical synthesis is documented across both Case and Manager interviews.',
          type: 'strength',
          status: 'accepted',
          sourceEvidence: 'Product Case & HM Interview Notes'
        },
        {
          id: 'ins-2',
          text: 'Prioritization under constrained engineering bandwidth remains partially supported; both interviewers flagged theoretical responses.',
          type: 'gap',
          status: 'accepted',
          sourceEvidence: 'Case Study Question 4 & HM Interview Question 3'
        },
        {
          id: 'ins-3',
          text: 'Human review recommended: Evaluate if candidate’s strong collaboration skills compensate for early-career prioritization caution.',
          type: 'recommendation',
          status: 'accepted',
          sourceEvidence: 'Committee Prep Summary'
        }
      ]
    }
  },
  {
    id: 'cand-rohan',
    name: 'Rohan Mehta',
    roleId: 'role-apm',
    roleTitle: 'Associate Product Manager',
    appliedDate: '10 days ago',
    currentStage: 'Product case',
    avatarInitials: 'RM',
    resumeSummary: 'Management consultant with 2 years at MBB focusing on tech sector operations and digital transformations. Extensive financial modeling, market sizing, and executive briefing experience.',
    relevantSkills: ['Market Sizing', 'Financial Modeling', 'Executive Decks', 'Stakeholder Management', 'Framework Thinking'],
    overallSignalStatus: 'Evidence incomplete',
    nextRecommendedHumanAction: 'Collect product discovery notes. Strong analytical and prioritization framework evidence; user empathy and hands-on UX validation evidence is still missing.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 9, 2026', notes: 'Top-tier consulting pedigree. High quantitative rigor.' },
      { stage: 'Recruiter screen', status: 'completed', date: 'Sept 12, 2026', interviewer: 'Sarah Lin', notes: 'Polished communicator, very ambitious. Wants to transition from strategy to hands-on product building.' },
      { stage: 'Product case', status: 'completed', date: 'Sept 16, 2026', interviewer: 'Kavita Patel', notes: 'Exceptional prioritization matrix and market sizing. However, solution felt very top-down and detached from day-to-day user struggles.' },
      { stage: 'Hiring manager interview', status: 'upcoming', date: 'Pending scorecard review' }
    ],
    competencyEvidence: [
      {
        competencyId: 'comp-prod-thinking',
        competencyName: 'Product thinking',
        status: 'Partial evidence',
        evidenceSummary: 'Approached the case study like a market entry deck. Great TAM breakdown, but struggled to describe the specific emotional trigger when a user opens the app.',
        evidenceQuote: '"From an addressable market perspective, capturing 3% of enterprise freelancers yields $4M ARR."',
        evidenceSource: 'Product Case Interview',
        evidenceStrength: 'Moderate',
        missingEvidence: 'Detailed description of user workflow friction or habit loops.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Very sharp on business drivers, but felt like he was treating users as revenue units rather than humans with friction.', assessment: 'Some evidence', date: 'Sept 16, 2026' }
        ],
        relatedInterviewQuestion: 'How would you improve a digital product you use every single day? Walk me through how you discovered the underlying user friction.',
        humanReviewed: true,
        flaggedForDiscussion: true,
        followUpQuestions: ['How would you conduct user research if you had zero budget and only 3 days?']
      },
      {
        competencyId: 'comp-user-empathy',
        competencyName: 'User empathy',
        status: 'Needs validation',
        evidenceSummary: 'Candidate candidly shared that in consulting, user insights were gathered by third-party research vendors rather than direct interviews.',
        evidenceQuote: '"We typically reviewed synthesized survey decks from our consumer research partner."',
        evidenceSource: 'Recruiter & Case Interview',
        evidenceStrength: 'Limited',
        missingEvidence: 'No direct evidence of conducting unmoderated or moderated 1-on-1 user interviews.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Needs significant validation. Has he ever spoken directly with an angry user?', assessment: 'Limited evidence', date: 'Sept 16, 2026' }
        ],
        relatedInterviewQuestion: 'Describe a time when customer interview research completely contradicted your team’s initial hypothesis.',
        humanReviewed: true,
        flaggedForDiscussion: true,
        followUpQuestions: ['Walk us through a real user interview you personally moderated from start to finish.']
      },
      {
        competencyId: 'comp-analytical',
        competencyName: 'Analytical reasoning',
        status: 'Evidence found',
        evidenceSummary: 'Flawless quantitative breakdown of cohort churn and unit margins. Constructed a clean multi-variable sensitivity table in real time.',
        evidenceQuote: '"A 5% drop in activation requires a 12% increase in referral velocity to sustain the baseline payback period."',
        evidenceSource: 'Product Case Interview',
        evidenceStrength: 'High',
        missingEvidence: 'None. Strongest competency.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Masterclass in financial and quantitative reasoning.', assessment: 'Strong evidence', date: 'Sept 16, 2026' }
        ],
        relatedInterviewQuestion: 'Suppose onboarding drop-off increased by 14% week-over-week. How would you methodically isolate the root cause?',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-prioritization',
        competencyName: 'Prioritization',
        status: 'Evidence found',
        evidenceSummary: 'Demonstrated rigorous multi-criteria decision matrices. Clear about ruthless scope pruning and resource allocation.',
        evidenceQuote: '"If an initiative does not contribute to our primary North Star metric within 60 days, it drops below the cut line."',
        evidenceSource: 'Product Case Interview',
        evidenceStrength: 'High',
        missingEvidence: 'How he accounts for qualitative team morale and technical debt in his matrices.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Very decisive and structured. No hesitation in making tough trade-offs.', assessment: 'Strong evidence', date: 'Sept 16, 2026' }
        ],
        relatedInterviewQuestion: 'Tell me about a time when you had to say no to an influential stakeholder requesting a specific feature.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-comm',
        competencyName: 'Communication',
        status: 'Evidence found',
        evidenceSummary: 'Polished executive-ready presentation skills, clean narrative arc, concise slides.',
        evidenceQuote: '"Executive summary up front: 3 options evaluated, option B recommended based on risk-adjusted ROI."',
        evidenceSource: 'Recruiter & Product Case',
        evidenceStrength: 'High',
        missingEvidence: 'Has only presented to executives; how does he communicate informally with engineers in Slack?',
        interviewerComments: [
          { interviewer: 'Sarah Lin', role: 'Talent Lead', comment: 'Extremely articulate. Ready for board-level briefings.', assessment: 'Strong evidence', date: 'Sept 12, 2026' }
        ],
        relatedInterviewQuestion: 'Walk me through a complex technical concept or architecture decision as if I were a non-technical sales partner.',
        humanReviewed: false,
        flaggedForDiscussion: false,
        followUpQuestions: []
      }
    ],
    interviewNotes: [
      {
        id: 'note-rohan-1',
        stage: 'Product case',
        interviewerName: 'Kavita Patel',
        interviewerRole: 'Staff PM',
        date: 'Sept 16, 2026',
        notes: 'Rohan gave the most mathematically rigorous case presentation I have seen all quarter. His prioritization framework was bulletproof. However, when I asked what the user would actually feel while tapping through the onboarding screens, his answer reverted back to conversion percentages rather than user emotions or psychological relief. We need Priya to test hands-on user empathy in the HM round.',
        keyObservations: ['Exceptional quantitative modeling', 'Decisive prioritization', 'User empathy is abstract / outsourced in his past'],
        followUpQuestions: ['Must test direct customer discovery experience in next round.'],
        scorecardStatus: 'Submitted'
      }
    ],
    aiEvidenceSummary: {
      supportingFitPoints: [
        'Top-tier quantitative and financial modeling capability.',
        'Decisive and objective prioritization framework implementation under resource constraints.'
      ],
      strongCompetencies: ['Analytical reasoning', 'Prioritization', 'Communication'],
      partialCompetencies: ['Product thinking'],
      missingInformation: [
        'Direct evidence of running qualitative user research sessions.',
        'Experience collaborating directly with software engineers in daily sprint standups.'
      ],
      interviewerDisagreements: [],
      recommendedHumanValidations: [
        'Hiring Manager round must focus on verifying whether candidate can transition from strategic consulting models to ground-level customer interview discovery.'
      ],
      insights: [
        {
          id: 'ins-r1',
          text: 'High analytical rigor documented; candidate demonstrated superior financial and prioritization frameworks.',
          type: 'strength',
          status: 'accepted',
          sourceEvidence: 'Product Case Evaluation'
        },
        {
          id: 'ins-r2',
          text: 'Direct user empathy and qualitative interview experience has not been evidenced in submitted notes.',
          type: 'gap',
          status: 'accepted',
          sourceEvidence: 'Candidate Self-Report & Case Interview'
        }
      ]
    }
  },
  {
    id: 'cand-meera',
    name: 'Meera Nair',
    roleId: 'role-apm',
    roleTitle: 'Associate Product Manager',
    appliedDate: '15 days ago',
    currentStage: 'Hiring manager interview',
    avatarInitials: 'MN',
    resumeSummary: 'Product Designer and Community Manager who transitioned to Growth PM at an edtech platform. Deep qualitative research background, champions accessibility and inclusive design, self-taught in SQL.',
    relevantSkills: ['User Discovery', 'Prototyping', 'Accessibility (WCAG)', 'Community Feedback Loops', 'Figma'],
    overallSignalStatus: 'Interviewers disagree',
    nextRecommendedHumanAction: 'Schedule debrief between Kavita Patel and Priya Sen. Kavita rated analytical reasoning as limited; Priya noted strong intuitive problem decomposition.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 4, 2026', notes: 'Exceptional portfolio illustrating user research synthesis and community growth loops.' },
      { stage: 'Recruiter screen', status: 'completed', date: 'Sept 8, 2026', interviewer: 'Sarah Lin', notes: 'Warm, mission-driven, highly articulate about student learning challenges.' },
      { stage: 'Product case', status: 'completed', date: 'Sept 13, 2026', interviewer: 'Kavita Patel', notes: 'Deeply empathic user teardown, but struggled with calculating sample sizes and statistical significance on A/B cohorts.' },
      { stage: 'Hiring manager interview', status: 'completed', date: 'Sept 18, 2026', interviewer: 'Priya Sen', notes: 'Strong strategic vision for community-led growth. Felt her qualitative reasoning easily compensated for formal statistics background.' }
    ],
    competencyEvidence: [
      {
        competencyId: 'comp-prod-thinking',
        competencyName: 'Product thinking',
        status: 'Evidence found',
        evidenceSummary: 'Identified community feedback loops as a primary retention mechanic. Proposed high-value social proof features for learning streak accountability.',
        evidenceQuote: '"Retention doesn’t happen from push notifications; it happens when peer accountability makes stopping feel costly."',
        evidenceSource: 'Product Case & HM Interview',
        evidenceStrength: 'High',
        missingEvidence: 'None.',
        interviewerComments: [
          { interviewer: 'Priya Sen', role: 'VP Product', comment: 'Brilliant conceptual grasp of viral loops and community retention.', assessment: 'Strong evidence', date: 'Sept 18, 2026' }
        ],
        relatedInterviewQuestion: 'How would you improve a digital product you use every single day? Walk me through how you discovered the underlying user friction.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-user-empathy',
        competencyName: 'User empathy',
        status: 'Evidence found',
        evidenceSummary: 'Demonstrated exceptional user empathy. Conducted over 40 hours of user interviews with neurodivergent students to design accessible study tools.',
        evidenceQuote: '"If a student with ADHD cannot complete the onboarding flow in 45 seconds, the cognitive load causes abandonment."',
        evidenceSource: 'Case Interview & Portfolio',
        evidenceStrength: 'High',
        missingEvidence: 'None.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'World-class empathy. Her user persona breakdowns are the best I have ever seen.', assessment: 'Strong evidence', date: 'Sept 13, 2026' }
        ],
        relatedInterviewQuestion: 'Describe a time when customer interview research completely contradicted your team’s initial hypothesis.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'comp-analytical',
        competencyName: 'Analytical reasoning',
        status: 'Conflicting evidence',
        evidenceSummary: 'Kavita Patel flagged difficulty with p-value calculations and statistical power in A/B testing. Conversely, Priya Sen found her cohort segmentation logic very sound and practical.',
        evidenceQuote: '"I look at weekly retention curves rather than getting lost in p-hacking tiny button color experiments."',
        evidenceSource: 'Product Case vs. HM Interview',
        evidenceStrength: 'Moderate',
        missingEvidence: 'Objective assessment of whether candidate can independently configure and read growth data dashboards without analyst support.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Struggled with the statistical significance exercise. Might struggle on a pure growth squad.', assessment: 'Limited evidence', date: 'Sept 13, 2026' },
          { interviewer: 'Priya Sen', role: 'VP Product', comment: 'She understands metric directionality and funnel health very well. We have BI analysts to support deep queries.', assessment: 'Some evidence', date: 'Sept 18, 2026' }
        ],
        relatedInterviewQuestion: 'Suppose onboarding drop-off increased by 14% week-over-week. How would you methodically isolate the root cause?',
        humanReviewed: true,
        flaggedForDiscussion: true,
        followUpQuestions: ['Give candidate a standard SQL cohort query exercise to calibrate practical analytical independence.']
      },
      {
        competencyId: 'comp-prioritization',
        competencyName: 'Prioritization',
        status: 'Partial evidence',
        evidenceSummary: 'Tends to prioritize accessibility and delight over short-term conversion gains. Defends this with long-term retention data.',
        evidenceQuote: '"A user who feels respected stays for 3 years; a user tricked by dark patterns churns in 30 days."',
        evidenceSource: 'Hiring Manager Interview',
        evidenceStrength: 'Moderate',
        missingEvidence: 'Evidence of handling high-velocity commercial trade-offs where quarterly revenue targets must be met immediately.',
        interviewerComments: [
          { interviewer: 'Priya Sen', role: 'VP Product', comment: 'Principled prioritization, but need to ensure she won’t over-index on polish at the expense of shipping speed.', assessment: 'Some evidence', date: 'Sept 18, 2026' }
        ],
        relatedInterviewQuestion: 'Tell me about a time when you had to say no to an influential stakeholder requesting a specific feature.',
        humanReviewed: false,
        flaggedForDiscussion: true,
        followUpQuestions: []
      }
    ],
    interviewNotes: [
      {
        id: 'note-meera-1',
        stage: 'Product case',
        interviewerName: 'Kavita Patel',
        interviewerRole: 'Staff PM',
        date: 'Sept 13, 2026',
        notes: 'Meera is one of the most user-centric thinkers I have ever interviewed. Her empathy is genuine. However, I have reservations about her analytical background for our Growth team specifically, where we run 10 multivariate A/B tests per sprint. She seemed uncomfortable when I asked how she would detect statistical noise.',
        keyObservations: ['Extraordinary user empathy', 'High design acumen', 'Statistical modeling weakness'],
        followUpQuestions: ['Test quantitative independence with an analytics exercise.'],
        scorecardStatus: 'Submitted'
      },
      {
        id: 'note-meera-2',
        stage: 'Hiring manager interview',
        interviewerName: 'Priya Sen',
        interviewerRole: 'VP of Product',
        date: 'Sept 18, 2026',
        notes: 'I see why Kavita had reservations about formal statistics, but I was extremely impressed by Meera’s product instincts. She understands that growth is driven by customer value, not just metric hacking. I believe she would be fantastic if paired with a strong data engineer.',
        keyObservations: ['Visionary product instinct', 'Culture add', 'Disagreement with Kavita on analytical requirement threshold'],
        followUpQuestions: ['Convene debrief with Kavita to discuss threshold.'],
        scorecardStatus: 'Submitted'
      }
    ],
    aiEvidenceSummary: {
      supportingFitPoints: [
        'Outstanding qualitative user empathy and user journey problem identification.',
        'Proven ability to build community-driven retention loops in prior edtech role.'
      ],
      strongCompetencies: ['Product thinking', 'User empathy', 'Collaboration'],
      partialCompetencies: ['Prioritization'],
      missingInformation: [
        'Verified independent proficiency in writing complex SQL queries and reading statistical variance.'
      ],
      interviewerDisagreements: [
        'Direct disagreement between Kavita Patel (rated Analytical Reasoning as Limited Evidence) and Priya Sen (rated as Sufficient with strong qualitative intuition).'
      ],
      recommendedHumanValidations: [
        'The hiring committee must explicitly decide whether the APM role requires independent statistical testing or if strong product intuition + BI partner support is acceptable.'
      ],
      insights: [
        {
          id: 'ins-m1',
          text: 'Interviewer disagreement detected: Kavita Patel and Priya Sen hold divergent views on whether candidate meets the quantitative threshold.',
          type: 'disagreement',
          status: 'accepted',
          sourceEvidence: 'Scorecard Comparison: Analytical Reasoning'
        },
        {
          id: 'ins-m2',
          text: 'User empathy evidence is exemplary across multiple interview rounds.',
          type: 'strength',
          status: 'accepted',
          sourceEvidence: 'Case Study & Recruiter Notes'
        }
      ]
    }
  },
  {
    id: 'cand-kabir',
    name: 'Kabir Shah',
    roleId: 'role-sba',
    roleTitle: 'Senior Business Analyst',
    appliedDate: '18 days ago',
    currentStage: 'Final decision',
    avatarInitials: 'KS',
    resumeSummary: 'Quantitative Analyst with 4 years at an enterprise logistics platform. Architected Snowflake data marts, built revenue attribution models, and authored monthly board KPI decks.',
    relevantSkills: ['Snowflake / dbt', 'Advanced SQL', 'Unit Economics', 'Executive Presentation', 'Cohort Analysis'],
    overallSignalStatus: 'Ready for review',
    nextRecommendedHumanAction: 'Review hiring summary with Marcus Vance. Evidence across all 3 core competencies is robust and verified by take-home exercise.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 1, 2026', notes: 'Excellent technical fit; demonstrated experience with modern data stack.' },
      { stage: 'Technical take-home', status: 'completed', date: 'Sept 6, 2026', interviewer: 'Marcus Vance', notes: 'Submitted cleanest SQL submission of any candidate. Documented edge cases meticulously.' },
      { stage: 'Case presentation', status: 'completed', date: 'Sept 11, 2026', interviewer: 'Marcus Vance & Finance Director', notes: 'Presented scenario analysis for market expansion. Balanced technical depth with commercial insight.' },
      { stage: 'Final decision', status: 'in_progress', date: 'Sept 18, 2026', notes: 'Awaiting formal offer sign-off.' }
    ],
    competencyEvidence: [
      {
        competencyId: 'c-sba-1',
        competencyName: 'Data modeling & SQL',
        status: 'Evidence found',
        evidenceSummary: 'Scored 98/100 on take-home case. Optimized recursive CTE queries and anticipated schema partitioning needs.',
        evidenceQuote: '"I decoupled the attribution dimension tables to prevent row multiplication during cross-channel joins."',
        evidenceSource: 'Technical Take-Home Exercise',
        evidenceStrength: 'High',
        missingEvidence: 'None.',
        interviewerComments: [
          { interviewer: 'Marcus Vance', role: 'Director of BizOps', comment: 'His dbt and warehouse modeling is at a senior data engineer standard.', assessment: 'Strong evidence', date: 'Sept 6, 2026' }
        ],
        relatedInterviewQuestion: 'Describe your approach to designing a star schema for recurring subscription billing.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'c-sba-2',
        competencyName: 'Business intuition',
        status: 'Evidence found',
        evidenceSummary: 'Correctly identified that fulfillment unit margin degradation was driven by third-party carrier fuel surcharges, not warehouse labor.',
        evidenceQuote: '"Looking only at warehouse labor obscured the variable carrier rate renegotiation cycle."',
        evidenceSource: 'Case Presentation',
        evidenceStrength: 'High',
        missingEvidence: 'None.',
        interviewerComments: [
          { interviewer: 'Marcus Vance', role: 'Director of BizOps', comment: 'Understands how financial line items translate into real warehouse operations.', assessment: 'Strong evidence', date: 'Sept 11, 2026' }
        ],
        relatedInterviewQuestion: 'If gross margin dropped 400bps while revenue grew 30%, what operational hypotheses would you test first?',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      },
      {
        competencyId: 'c-sba-3',
        competencyName: 'Executive communication',
        status: 'Evidence found',
        evidenceSummary: 'Delivered an 8-slide executive brief with crisp recommendations and explicit risk trade-offs.',
        evidenceQuote: '"CFOs don’t want to see 40 variables; they want to know the 2 sensitivities that will break our EBITDA target."',
        evidenceSource: 'Case Presentation',
        evidenceStrength: 'High',
        missingEvidence: 'None.',
        interviewerComments: [
          { interviewer: 'Marcus Vance', role: 'Director of BizOps', comment: 'Ready to present to our VP of Finance on day one.', assessment: 'Strong evidence', date: 'Sept 11, 2026' }
        ],
        relatedInterviewQuestion: 'Walk me through a 5-minute briefing to a skeptical CFO.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      }
    ],
    interviewNotes: [
      {
        id: 'note-kabir-1',
        stage: 'Case presentation',
        interviewerName: 'Marcus Vance',
        interviewerRole: 'Director of BizOps',
        date: 'Sept 11, 2026',
        notes: 'Kabir is the strongest candidate in this pipeline. Flawless technical take-home, commercial sophistication, and zero arrogance. Highly recommend advancing to offer.',
        keyObservations: ['Mastery of data modeling', 'Commercial pragmatism', 'Clear communicator'],
        followUpQuestions: [],
        scorecardStatus: 'Submitted'
      }
    ],
    aiEvidenceSummary: {
      supportingFitPoints: [
        'Consistently high evidence across all 3 evaluated role competencies.',
        'Technical take-home submission independently verified by Director of BizOps.',
        'Proven track record of board-level executive communication.'
      ],
      strongCompetencies: ['Data modeling & SQL', 'Business intuition', 'Executive communication'],
      partialCompetencies: [],
      missingInformation: [],
      interviewerDisagreements: [],
      recommendedHumanValidations: [
        'Candidate is ready for human decision review. All competency evidence is complete.'
      ],
      insights: [
        {
          id: 'ins-k1',
          text: 'Comprehensive evidence collected across all role competencies with unanimous interviewer consensus.',
          type: 'strength',
          status: 'accepted',
          sourceEvidence: 'Take-home & Presentation Scorecards'
        }
      ]
    }
  },
  {
    id: 'cand-ishita',
    name: 'Ishita Menon',
    roleId: 'role-pos',
    roleTitle: 'Product Operations Specialist',
    appliedDate: '7 days ago',
    currentStage: 'Recruiter screen',
    avatarInitials: 'IM',
    resumeSummary: 'Operations Generalist with 2 years coordinating customer escalation workflows at a health-tech company. Passionate about asynchronous documentation and cross-team knowledge bases.',
    relevantSkills: ['Notion Architecture', 'Jira Workflows', 'Customer Support Triage', 'Release Documentation'],
    overallSignalStatus: 'Feedback pending',
    nextRecommendedHumanAction: 'Awaiting recruiter scorecard submission from David Chen. Interview took place yesterday afternoon.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 12, 2026', notes: 'Strong cover letter explaining passion for systematic product operations.' },
      { stage: 'Recruiter screen', status: 'completed', date: 'Sept 18, 2026', interviewer: 'Sarah Lin', notes: 'Interview conducted; waiting for written notes.' },
      { stage: 'Workflow exercise', status: 'upcoming', date: 'Sept 22, 2026' }
    ],
    competencyEvidence: [
      {
        competencyId: 'c-pos-1',
        competencyName: 'Workflow architecture',
        status: 'Partial evidence',
        evidenceSummary: 'Described restructuring Jira escalation queues to cut response time from 4 hours to 45 minutes.',
        evidenceQuote: '"We built an automated triage bot that tagged tickets by API error code before reaching the on-call engineer."',
        evidenceSource: 'Resume & Initial Phone Call',
        evidenceStrength: 'Moderate',
        missingEvidence: 'Needs formal validation in upcoming workflow exercise.',
        interviewerComments: [],
        relatedInterviewQuestion: 'How would you redesign our release notes workflow across 4 teams?',
        humanReviewed: false,
        flaggedForDiscussion: false,
        followUpQuestions: ['Walk us through how you handled edge-case bugs that crossed squad boundaries.']
      }
    ],
    interviewNotes: [],
    aiEvidenceSummary: {
      supportingFitPoints: ['Relevant experience in incident triage and support-to-engineering escalation.'],
      strongCompetencies: [],
      partialCompetencies: ['Workflow architecture'],
      missingInformation: ['Formal recruiter scorecard submission pending.'],
      interviewerDisagreements: [],
      recommendedHumanValidations: ['Prompt recruiter to log interview notes to complete evidence record.'],
      insights: [
        {
          id: 'ins-i1',
          text: 'Feedback pending: Interview conducted 18 hours ago; written notes have not yet been posted.',
          type: 'gap',
          status: 'accepted',
          sourceEvidence: 'System Event Log'
        }
      ]
    }
  },
  {
    id: 'cand-arjun',
    name: 'Arjun Kapoor',
    roleId: 'role-apm',
    roleTitle: 'Associate Product Manager',
    appliedDate: '14 days ago',
    currentStage: 'Product case',
    avatarInitials: 'AK',
    resumeSummary: 'Former software engineer with 2 years of backend experience who transitioned into APM role at an e-commerce platform. Very strong technical execution, but mixed signals on open-ended user discovery.',
    relevantSkills: ['System Architecture', 'APIs & Microservices', 'Technical Spec Writing', 'Agile Delivery'],
    overallSignalStatus: 'Additional interview recommended',
    nextRecommendedHumanAction: 'Consider scheduling an additional 30-minute discovery session focusing specifically on open-ended customer interviewing techniques.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 5, 2026', notes: 'Strong technical engineering background.' },
      { stage: 'Recruiter screen', status: 'completed', date: 'Sept 9, 2026', interviewer: 'Sarah Lin', notes: 'Enthusiastic and technically articulate.' },
      { stage: 'Product case', status: 'completed', date: 'Sept 15, 2026', interviewer: 'Kavita Patel', notes: 'Solution was technically brilliant, but started with API design rather than user problem exploration.' }
    ],
    competencyEvidence: [
      {
        competencyId: 'comp-prod-thinking',
        competencyName: 'Product thinking',
        status: 'Partial evidence',
        evidenceSummary: 'Jumped straight to database schema and caching layers during the case study without validating whether users cared about the feature.',
        evidenceQuote: '"We can use Redis to cache user recommendations and keep query response under 50ms."',
        evidenceSource: 'Product Case Interview',
        evidenceStrength: 'Limited',
        missingEvidence: 'Needs to demonstrate problem-first thinking rather than technology-first thinking.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Thinks like a staff software engineer. We need to see if he can take off his developer hat and put on a customer hat.', assessment: 'Some evidence', date: 'Sept 15, 2026' }
        ],
        relatedInterviewQuestion: 'How would you improve a digital product you use every single day? Walk me through how you discovered the underlying user friction.',
        humanReviewed: true,
        flaggedForDiscussion: true,
        followUpQuestions: ['Explain why an engineer would be wrong to implement a technologically elegant solution if the user finds it confusing.']
      },
      {
        competencyId: 'comp-execution',
        competencyName: 'Execution and ownership',
        status: 'Evidence found',
        evidenceSummary: 'Deep experience running CI/CD deployment pipelines and unblocking tricky technical sprint dependencies.',
        evidenceQuote: '"I helped the squad debug a flaky test suite that was blocking our bi-weekly release trains."',
        evidenceSource: 'Product Case Interview',
        evidenceStrength: 'High',
        missingEvidence: 'None.',
        interviewerComments: [
          { interviewer: 'Kavita Patel', role: 'Staff PM', comment: 'Engineers would love working with him on execution.', assessment: 'Strong evidence', date: 'Sept 15, 2026' }
        ],
        relatedInterviewQuestion: 'Describe a project where an unexpected blocker threatened a launch deadline. How did you regain control?',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      }
    ],
    interviewNotes: [
      {
        id: 'note-arjun-1',
        stage: 'Product case',
        interviewerName: 'Kavita Patel',
        interviewerRole: 'Staff PM',
        date: 'Sept 15, 2026',
        notes: 'Arjun is an engineer at heart. When given the case prompt, he immediately started whiteboarding database relations. I had to intervene twice to ask: "Who is the user, and why do they care?" He was able to answer once redirected, but his natural default is technical implementation.',
        keyObservations: ['Phenomenal technical fluency', 'Prone to feature-solution bias', 'Needs customer empathy coaching'],
        followUpQuestions: ['Schedule additional focused session on user discovery.'],
        scorecardStatus: 'Submitted'
      }
    ],
    aiEvidenceSummary: {
      supportingFitPoints: ['Outstanding technical execution and engineering empathy.'],
      strongCompetencies: ['Execution and ownership', 'Collaboration'],
      partialCompetencies: ['Product thinking'],
      missingInformation: ['User empathy and qualitative customer discovery methodology.'],
      interviewerDisagreements: [],
      recommendedHumanValidations: [
        'An additional 30-minute discovery conversation is recommended to determine if candidate can systematically unlearn solution-first defaults.'
      ],
      insights: [
        {
          id: 'ins-a1',
          text: 'Technical execution evidence is high, but user-centric problem exploration has incomplete supporting evidence.',
          type: 'gap',
          status: 'accepted',
          sourceEvidence: 'Case Study Transcript'
        }
      ]
    }
  },
  {
    id: 'cand-elena',
    name: 'Elena Vance',
    roleId: 'role-css',
    roleTitle: 'Customer Success Strategy Lead',
    appliedDate: '9 days ago',
    currentStage: 'EBR simulation',
    avatarInitials: 'EV',
    resumeSummary: 'Strategic Account Director with 5 years managing enterprise renewals at an HR-tech company. Maintained 114% Net Revenue Retention across 28 global accounts.',
    relevantSkills: ['Executive Business Reviews', 'Contract Restructuring', 'NRR Growth', 'Customer Journey Mapping'],
    overallSignalStatus: 'Ready for review',
    nextRecommendedHumanAction: 'Review EBR simulation scorecard. Strong executive poise and value realization frameworks noted.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 10, 2026', notes: 'Proven SaaS renewal track record.' },
      { stage: 'Recruiter screen', status: 'completed', date: 'Sept 14, 2026', interviewer: 'Sarah Lin', notes: 'High polish, strong cultural fit.' },
      { stage: 'EBR simulation', status: 'completed', date: 'Sept 18, 2026', interviewer: 'David Chen', notes: 'Handled tough executive pricing objection with poise.' }
    ],
    competencyEvidence: [
      {
        competencyId: 'c-css-1',
        competencyName: 'Strategic account retention',
        status: 'Evidence found',
        evidenceSummary: 'Simulated an executive business review with a churn-risk Fortune 500 client. Reframed software usage into saved engineering payroll hours.',
        evidenceQuote: '"When the client threatened to churn, I mapped their team’s 4,000 automated workflow runs to $1.2M in avoided contractor costs."',
        evidenceSource: 'EBR Simulation',
        evidenceStrength: 'High',
        missingEvidence: 'None.',
        interviewerComments: [
          { interviewer: 'David Chen', role: 'VP Customer Experience', comment: 'Superb commercial instinct. She knows how to speak to CFOs.', assessment: 'Strong evidence', date: 'Sept 18, 2026' }
        ],
        relatedInterviewQuestion: 'Walk me through rescuing an enterprise account whose champion left the company.',
        humanReviewed: true,
        flaggedForDiscussion: false,
        followUpQuestions: []
      }
    ],
    interviewNotes: [
      {
        id: 'note-elena-1',
        stage: 'EBR simulation',
        interviewerName: 'David Chen',
        interviewerRole: 'VP Customer Experience',
        date: 'Sept 18, 2026',
        notes: 'Elena blew us away during the roleplay. She remained completely calm when I pushed back aggressively on our seat pricing. She demonstrated true executive presence.',
        keyObservations: ['High commercial maturity', 'Data-driven value proof', 'Excellent consultative selling'],
        followUpQuestions: [],
        scorecardStatus: 'Submitted'
      }
    ],
    aiEvidenceSummary: {
      supportingFitPoints: ['Consistent evidence of value-based account retention in high-stakes enterprise renewal scenarios.'],
      strongCompetencies: ['Strategic account retention'],
      partialCompetencies: [],
      missingInformation: [],
      interviewerDisagreements: [],
      recommendedHumanValidations: ['Ready for hiring manager final decision.'],
      insights: [
        {
          id: 'ins-e1',
          text: 'Demonstrated high commercial poise and quantified ROI framing during simulation.',
          type: 'strength',
          status: 'accepted',
          sourceEvidence: 'EBR Scorecard'
        }
      ]
    }
  },
  {
    id: 'cand-tariq',
    name: 'Tariq Al-Mansoor',
    roleId: 'role-sba',
    roleTitle: 'Senior Business Analyst',
    appliedDate: '11 days ago',
    currentStage: 'Technical take-home',
    avatarInitials: 'TA',
    resumeSummary: 'Operations Research graduate with 2 years of supply chain analytics experience. Advanced optimization modeling in Python and Linear Programming.',
    relevantSkills: ['Python Analytics', 'Linear Programming', 'Supply Chain Simulation', 'PostgreSQL'],
    overallSignalStatus: 'Evidence incomplete',
    nextRecommendedHumanAction: 'Review submitted take-home case. Python script submitted; SQL documentation requires inspection by Marcus Vance.',
    journey: [
      { stage: 'Application review', status: 'completed', date: 'Sept 8, 2026', notes: 'Academic background in operations research.' },
      { stage: 'Technical take-home', status: 'completed', date: 'Sept 17, 2026', notes: 'Take-home repository submitted; awaiting reviewer evaluation.' }
    ],
    competencyEvidence: [
      {
        competencyId: 'c-sba-1',
        competencyName: 'Data modeling & SQL',
        status: 'Needs validation',
        evidenceSummary: 'Candidate submitted code in Python rather than standard dbt/SQL models requested in prompt.',
        evidenceQuote: '"I utilized Pandas and SciPy for the cohort decay curve instead of pure SQL CTEs."',
        evidenceSource: 'Take-home Code Submission',
        evidenceStrength: 'Limited',
        missingEvidence: 'Needs validation on whether candidate can write production SQL for warehouse analysts.',
        interviewerComments: [],
        relatedInterviewQuestion: 'Describe your approach to designing a star schema for recurring subscription billing.',
        humanReviewed: false,
        flaggedForDiscussion: true,
        followUpQuestions: ['Validate ability to convert Python data pipelines into SQL warehouse transformations.']
      }
    ],
    interviewNotes: [],
    aiEvidenceSummary: {
      supportingFitPoints: ['Strong quantitative mathematics and scientific computing background.'],
      strongCompetencies: [],
      partialCompetencies: [],
      missingInformation: ['Evaluation of SQL warehouse proficiency from take-home assignment.'],
      interviewerDisagreements: [],
      recommendedHumanValidations: ['BizOps team must evaluate whether Python-heavy workflow fits team’s dbt-first warehouse.'],
      insights: [
        {
          id: 'ins-t1',
          text: 'Submitted code in Python instead of specified SQL warehouse framework; technical validation required.',
          type: 'gap',
          status: 'accepted',
          sourceEvidence: 'Repository Review'
        }
      ]
    }
  }
];

export const INITIAL_ACTIVITY: ActivityEvent[] = [
  {
    id: 'act-1',
    type: 'evidence_reviewed',
    title: 'Evidence Flagged for Discussion',
    description: 'Ananya Rao’s prioritization trade-off evidence flagged for committee review by Kavita Patel.',
    timestamp: '25 minutes ago',
    candidateName: 'Ananya Rao',
    roleTitle: 'Associate Product Manager'
  },
  {
    id: 'act-2',
    type: 'scorecard_submitted',
    title: 'Scorecard Submitted',
    description: 'Priya Sen submitted HM Interview notes for Meera Nair with high user empathy rating.',
    timestamp: '2 hours ago',
    candidateName: 'Meera Nair',
    roleTitle: 'Associate Product Manager'
  },
  {
    id: 'act-3',
    type: 'gap_detected',
    title: 'Evidence Gap Detected',
    description: 'Rohan Mehta has no documented direct qualitative user discovery sessions.',
    timestamp: '5 hours ago',
    candidateName: 'Rohan Mehta',
    roleTitle: 'Associate Product Manager'
  },
  {
    id: 'act-4',
    type: 'interview_completed',
    title: 'EBR Simulation Completed',
    description: 'Elena Vance completed Customer Success EBR simulation with David Chen.',
    timestamp: 'Yesterday at 4:30 PM',
    candidateName: 'Elena Vance',
    roleTitle: 'Customer Success Strategy Lead'
  },
  {
    id: 'act-5',
    type: 'candidate_added',
    title: 'New Candidate Added to Pipeline',
    description: 'Ishita Menon added to Product Operations Specialist pipeline by Sarah Lin.',
    timestamp: '2 days ago',
    candidateName: 'Ishita Menon',
    roleTitle: 'Product Operations Specialist'
  }
];
