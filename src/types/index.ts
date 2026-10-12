// Types for INSURON AI Platform

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type ClaimStatus = 
  | 'IN_REVIEW' 
  | 'REQUIRES_VERIFICATION' 
  | 'FLAGGED_INCONSISTENCY' 
  | 'RESOLVED' 
  | 'CLOSED';

export type FindingStatus = 
  | 'PENDING_REVIEW'
  | 'UNDER_INVESTIGATION'
  | 'EVIDENCE_REQUESTED'
  | 'REVIEWED_CONFIRMED'
  | 'DISMISSED'
  | 'RESOLVED';

export type FindingCategory = 
  | 'NUMERICAL_DISCREPANCY'
  | 'TEMPORAL_CONFLICT'
  | 'MISSING_MANDATORY_EVIDENCE'
  | 'EXCLUSION_CLAUSE_CONTRADICTION'
  | 'CROSS_DOCUMENT_DISCORDANCE';

export interface Policyholder {
  id: string;
  name: string;
  registrationNumber: string;
  taxId: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  riskTier: 'LOW' | 'STANDARD' | 'ELEVATED';
  businessType: string;
}

export interface PolicyClause {
  id: string;
  policyId: string;
  clauseCode: string; // e.g. "SEC-4.2"
  title: string;
  fullText: string;
  category: 'Coverage Scope' | 'Exclusions' | 'Mandatory Warranty' | 'Proof of Loss Requirements';
  isExclusion: boolean;
  importance: 'CRITICAL' | 'STANDARD';
}

export interface Policy {
  id: string;
  policyNumber: string;
  policyholderId: string;
  policyholderName: string;
  policyType: 'Commercial Property & Casualty' | 'Corporate Auto Fleet' | 'Comprehensive Healthcare';
  effectiveDate: string;
  expiryDate: string;
  deductible: number;
  coverageLimit: number;
  underwritingStatus: 'ACTIVE' | 'AUDITED' | 'RENEWAL_PENDING';
  clauses: PolicyClause[];
}

export interface EvidencePassage {
  id: string;
  documentId: string;
  docTitle: string;
  pageNumber: number;
  section: string;
  exactText: string;
  extractedFact: string;
  confidenceScore: number; // 0 to 1
  provenanceHash: string;
  timestamp: string;
}

export interface ClaimDocument {
  id: string;
  claimId: string;
  title: string;
  docType: 
    | 'First Notice of Loss (FNOL)'
    | 'Municipal Fire Dispatch Log'
    | 'Contractor Restoration Estimate'
    | 'Fire Suppression Maintenance Certificate'
    | 'Police First Information Report'
    | 'Telematics Speed & GPS Log'
    | 'Hospital Discharge Summary'
    | 'Diagnostic Lab & Pathology Report'
    | 'Policy Schedule & Declaration';
  fileName: string;
  fileSizeBytes: number;
  uploadDate: string;
  version: string;
  hashSHA256: string;
  authorAgency: string;
  passages: EvidencePassage[];
}

export interface InsuranceRule {
  id: string;
  ruleCode: string;
  title: string;
  description: string;
  ruleType: 'Deterministic Rule' | 'Semantic Alignment' | 'Temporal Chronology' | 'Threshold Limit';
  severity: SeverityLevel;
  automatedCheckLogic: string;
}

export interface ReviewAction {
  id: string;
  findingId: string;
  actionType: 
    | 'MARK_REVIEWED'
    | 'REQUEST_EVIDENCE'
    | 'REQUEST_FURTHER_INVESTIGATION'
    | 'DISMISS'
    | 'RESOLVE'
    | 'NOTE_ADDED';
  timestamp: string;
  reviewerName: string;
  reviewerRole: string;
  noteContent: string;
  newStatus?: FindingStatus;
}

export interface Finding {
  id: string;
  claimId: string;
  title: string;
  category: FindingCategory;
  severity: SeverityLevel;
  status: FindingStatus;
  summary: string;
  discrepancyExplanation: string;
  missingInformation?: string;
  recommendedNextStep: string;
  supportingEvidenceIds: string[];
  conflictingEvidenceIds: string[];
  relatedClauseIds: string[];
  relatedRuleIds: string[];
  confidenceNote: string;
  reviewerNotes: string;
  actionsHistory: ReviewAction[];
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyholderId: string;
  policyholderName: string;
  claimDate: string;
  incidentDate: string;
  claimedAmount: number;
  reportedDescription: string;
  incidentLocation: string;
  status: ClaimStatus;
  priority: SeverityLevel;
  category: string;
  investigationProgress: number; // 0 to 100
  assignedInvestigator: string;
  documents: ClaimDocument[];
  findings: Finding[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  claimId: string;
  eventType: 
    | 'INVESTIGATION_INITIATED'
    | 'DOCUMENT_INGESTED'
    | 'KNOWLEDGE_GRAPH_BUILT'
    | 'RULE_EVALUATED'
    | 'INCONSISTENCY_FLAGGED'
    | 'AGENT_DISPATCHED'
    | 'EVIDENCE_RETRIEVED'
    | 'REVIEWER_ACTION'
    | 'REPORT_GENERATED';
  actor: string;
  description: string;
  details?: Record<string, any>;
}

export type NavigationTab = 
  | 'landing'
  | 'dashboard'
  | 'graph'
  | 'workspace'
  | 'findings'
  | 'evidence'
  | 'architecture'
  | 'review'
  | 'upload'
  | 'report'
  | 'audit'
  | 'roadmap';
