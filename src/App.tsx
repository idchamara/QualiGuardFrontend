import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { AuditHistory } from './pages/AuditHistory';
import { CreateAudit } from './pages/CreateAudit';
import { AuditChecklist } from './pages/AuditChecklist';
import { ReportPreview } from './pages/ReportPreview';
function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {children}
      </main>
    </div>;
}
function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  if (isLoginPage) {
    return <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>;
  }
  return <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audits" element={<AuditHistory />} />
        <Route path="/audit/new" element={<CreateAudit />} />
        <Route path="/audit/:id/checklist" element={<AuditChecklist />} />
        <Route path="/audit/:id/report" element={<ReportPreview />} />
      </Routes>
    </Layout>;
}
export function App() {
  return <Router>
      <AppRoutes />
    </Router>;
}