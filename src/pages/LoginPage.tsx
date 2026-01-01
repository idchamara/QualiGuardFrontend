import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ShieldCheck, UserCog, HardHat } from 'lucide-react';
import { Card } from '../components/ui/Card';
export function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = (role: string) => {
    // In a real app, this would handle auth
    navigate('/dashboard');
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
          <ClipboardCheck className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          QualiGuard
        </h1>
        <p className="text-gray-500 mt-2">
          Audit & Inspection Management System
        </p>
      </div>

      <Card className="w-full max-w-md p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Select your role to continue
        </h2>

        <div className="space-y-4">
          <button onClick={() => handleLogin('Inspector')} className="w-full group relative flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <HardHat className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4 text-left">
              <p className="text-base font-semibold text-gray-900 group-hover:text-blue-700">
                Inspector
              </p>
              <p className="text-sm text-gray-500">
                Conduct audits and report findings
              </p>
            </div>
          </button>

          <button onClick={() => handleLogin('QA Manager')} className="w-full group relative flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4 text-left">
              <p className="text-base font-semibold text-gray-900 group-hover:text-purple-700">
                QA Manager
              </p>
              <p className="text-sm text-gray-500">
                Review reports and manage CAPs
              </p>
            </div>
          </button>

          <button onClick={() => handleLogin('Factory Admin')} className="w-full group relative flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <UserCog className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4 text-left">
              <p className="text-base font-semibold text-gray-900 group-hover:text-green-700">
                Factory Admin
              </p>
              <p className="text-sm text-gray-500">
                View results and update CAP status
              </p>
            </div>
          </button>
        </div>
      </Card>

      <p className="mt-8 text-sm text-gray-400">
        © 2024 QualiGuard System. All rights reserved.
      </p>
    </div>;
}