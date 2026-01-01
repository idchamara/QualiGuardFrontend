import { Audit, DashboardMetrics, Section } from '../types/audit';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Dashboard
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return this.request<DashboardMetrics>('/dashboard/metrics');
  }

  // Audits
  async getAudits(): Promise<Audit[]> {
    return this.request<Audit[]>('/audits');
  }

  async getAudit(id: string): Promise<Audit> {
    return this.request<Audit>(`/audits/${id}`);
  }

  async createAudit(audit: Partial<Audit>): Promise<Audit> {
    return this.request<Audit>('/audits', {
      method: 'POST',
      body: JSON.stringify(audit),
    });
  }

  async updateAudit(id: string, audit: Partial<Audit>): Promise<Audit> {
    return this.request<Audit>(`/audits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(audit),
    });
  }

  // Questions/Sections
  async getQuestions(): Promise<Section[]> {
    return this.request<Section[]>('/questions');
  }

  // Sites
  async getSites(): Promise<any[]> {
    return this.request<any[]>('/sites');
  }

  // Products
  async getProducts(): Promise<any[]> {
    return this.request<any[]>('/products');
  }
}

export const apiService = new ApiService();