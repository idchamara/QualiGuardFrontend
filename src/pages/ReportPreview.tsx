import React from 'react';
import { Share2, Download, Printer, CheckCircle, XCircle } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_AUDITS } from '../utils/mockData';
export function ReportPreview() {
  const audit = MOCK_AUDITS[0]; // Using mock data for preview
  return <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      <PageHeader title="Audit Report" description={`Reference: ${audit.referenceNumber}`} breadcrumbs={[{
      label: 'Dashboard',
      href: '/dashboard'
    }, {
      label: 'Audit',
      href: '/audits'
    }, {
      label: 'Report'
    }]} actions={<div className="flex gap-3">
            <Button variant="secondary" leftIcon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
            <Button variant="secondary" leftIcon={<Printer className="h-4 w-4" />}>
              Print
            </Button>
            <Button leftIcon={<Download className="h-4 w-4" />}>
              Download PDF
            </Button>
          </div>} />

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200" id="report-content">
        {/* Report Header */}
        <div className="bg-slate-900 text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Inspection Report</h1>
              <p className="text-slate-400">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className={`px-6 py-3 rounded-lg flex items-center gap-2 ${audit.result === 'Pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {audit.result === 'Pass' ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
              <span className="text-2xl font-bold uppercase">
                {audit.result}
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Executive Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Overall Score</p>
              <p className={`text-3xl font-bold ${audit.overallScore >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                {audit.overallScore}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Factory</p>
              <p className="text-lg font-medium text-gray-900">
                {audit.factoryName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Product</p>
              <p className="text-lg font-medium text-gray-900">
                {audit.productCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Inspection Date</p>
              <p className="text-lg font-medium text-gray-900">{audit.date}</p>
            </div>
          </div>
        </div>

        {/* Section Results */}
        <div className="p-8 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Section Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audit.sections.map((section, idx) => <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                <span className="font-medium text-gray-700">
                  {section.title}
                </span>
                <Badge variant="success">Pass</Badge>
              </div>)}
          </div>
        </div>

        {/* Non-Compliance Summary */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Non-Compliance & CAPs
          </h2>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">
                    Sewing - Critical Defect
                  </h4>
                  <p className="text-red-700 mt-1 text-sm">
                    Found 3 skipped stitches on main seam.
                  </p>
                  <div className="mt-3 bg-white p-3 rounded border border-red-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Corrective Action Plan
                    </p>
                    <p className="text-sm text-gray-900 mt-1">
                      Machine tension to be recalibrated. 100% re-check of lot
                      required.
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>Responsible: Production Manager</span>
                      <span>Target: 2023-10-20</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspector Remarks */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Inspector Remarks
          </h2>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>
              Overall quality is acceptable. However, the sewing section needs
              immediate attention regarding the tension settings on Machine #4.
              Packing method was consistent with requirements. Factory
              cooperation was good.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-500">Inspector Signature</p>
              <div className="h-12 w-32 border-b border-gray-300 mt-2"></div>
              <p className="font-medium text-gray-900 mt-2">
                {audit.inspectorName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Factory Representative</p>
              <div className="h-12 w-32 border-b border-gray-300 mt-2"></div>
              <p className="font-medium text-gray-900 mt-2">
                {audit.siteRepresentative}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}