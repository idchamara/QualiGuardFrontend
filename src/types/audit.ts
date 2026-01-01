export type UserRole = 'Inspector' | 'QA Manager' | 'Factory Admin';
export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
export type InspectionType = 'PSI' | 'FCA' | 'Internal Audit';
export type AuditStatus = 'Draft' | 'In Progress' | 'Completed' | 'Report Generated';
export type QuestionResult = 'Pass' | 'Fail' | 'N/A' | null;
export type CAPStatus = 'Open' | 'In Progress' | 'Closed';
export interface CAP {
  id: string;
  questionId: string;
  issueDescription: string;
  rootCause: string;
  actionPlan: string;
  responsiblePerson: string;
  targetDate: string;
  status: CAPStatus;
}
export interface Question {
  id: string;
  text: string;
  description?: string;
  weight: number;
  result: QuestionResult;
  comment?: string;
  images: string[];
  cap?: CAP;
}
export interface Section {
  id: string;
  title: string;
  questions: Question[];
  score: number;
  totalWeight: number;
  isExpanded?: boolean;
}
export interface Audit {
  id: string;
  referenceNumber: string;
  type: InspectionType;
  date: string;
  plannedDate: string;

  // Product Info
  productName: string;
  productCode: string;
  poReference: string;
  sku: string;
  orderedQuantity: number;
  producedQuantity: number;
  packedQuantity: number;

  // Location Info
  factoryName: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // People
  inspectorId: string;
  inspectorName: string;
  siteRepresentative: string;

  // Audit Data
  status: AuditStatus;
  sections: Section[];
  overallScore: number;
  compliancePercentage: number;
  result: 'Pass' | 'Fail' | 'Pending';

  // Remarks
  inspectorRemarks?: string;
  keyFindings?: string[];
  createdAt: string;
  updatedAt: string;
}
export interface DashboardMetrics {
  totalAudits: number;
  passedAudits: number;
  failedAudits: number;
  pendingCAPs: number;
  complianceTrend: {
    date: string;
    score: number;
  }[];
  sectionFailures: {
    name: string;
    count: number;
  }[];
}