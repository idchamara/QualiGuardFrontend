import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Inspection {
  id?: number;
  inspectionReference: string;
  inspectionType: string;
  inspectionDate: string;
  plannedDate?: string;
  overallResult?: string;
  inspectorRemark?: string;
  inspectorName?: string;
  inspectorOrganization?: string;
  fcaTotalScore?: number;
  fcaScoreExcluded?: number;
  timeline?: string;
  timeCost?: string;
  yesCount?: number;
  naCount?: number;
  isSafetyFailed?: boolean;
  productSafetyFailCount?: number;
  isReaudit?: boolean;
  lastFcaRcloudNumber?: string;
  lastFcaTotalScore?: number;
  generatedBy?: string;
  generatedDate?: string;
  products?: Product[];
  testChecklists?: TestChecklist[];
  questions?: Question[];
  site?: Site;
}

export interface Product {
  id?: number;
  inspectionId?: number;
  poRef?: string;
  name: string;
  sku?: string;
  description?: string;
  shipmentDate?: string;
  orderedQuantity?: number;
  orderedUnit?: string;
  producedQuantity?: number;
  producedPercentage?: number;
  packedQuantity?: number;
  packedPercentage?: number;
  entityResponsible?: string;
  productionSite?: string;
}

export interface TestChecklist {
  id?: number;
  inspectionId?: number;
  checklistName: string;
  result?: string;
  fcaForm?: string;
  form25Result?: string;
  form25Conductor?: string;
  mcoIssuedDate?: string;
  form25CompletedDate?: string;
  hasClosedMeeting?: boolean;
  findingsShared?: boolean;
}

export interface Question {
  id?: number;
  inspectionId?: number;
  questionNumber: string;
  section: string;
  sectionType?: string;
  maxScore?: number;
  questionText: string;
  answer?: string;
  status?: string;
  remarks?: string;
  issues?: string;
  images?: InspectionImage[];
}

export interface InspectionImage {
  id?: number;
  inspectionId?: number;
  questionId?: number;
  questionNumber?: string;
  imagePath?: string;
  imageUrl?: string;
  caption?: string;
  imageType?: string;
}

export interface Site {
  id?: number;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  siteRepresentative?: string;
}

export interface InspectionCreatePayload {
  inspection: Inspection;
  products?: Product[];
  testChecklists?: TestChecklist[];
  questions?: Question[];
  images?: InspectionImage[];
  site?: Site;
}

// API Methods
export const inspectionAPI = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; fromDate?: string; toDate?: string }) => {
    const response = await api.get('/inspections', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/inspections/${id}`);
    return response.data;
  },

  create: async (data: InspectionCreatePayload) => {
    const response = await api.post('/inspections', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Inspection>) => {
    const response = await api.put(`/inspections/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/inspections/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/inspections/stats/summary');
    return response.data;
  },
};

export const siteAPI = {
  getAll: async () => {
    const response = await api.get('/sites');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/sites/${id}`);
    return response.data;
  },

  create: async (data: Site) => {
    const response = await api.post('/sites', data);
    return response.data;
  },
};

export const questionAPI = {
  getByInspection: async (inspectionId: number) => {
    const response = await api.get(`/questions/inspection/${inspectionId}`);
    return response.data;
  },
};

export default api;