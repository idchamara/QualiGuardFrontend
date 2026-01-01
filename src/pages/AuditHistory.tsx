import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Copy } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MOCK_AUDITS } from '../utils/mockData';
export function AuditHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  return <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <PageHeader title="Audit History" description="View and manage all past inspections" breadcrumbs={[{
      label: 'Dashboard',
      href: '/dashboard'
    }, {
      label: 'Audit History'
    }]} />

      <Card className="mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search by reference, factory, or product..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="secondary" leftIcon={<Filter className="h-4 w-4" />}>
              Filters
            </Button>
            <Button variant="secondary">Export CSV</Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Factory</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Inspector</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Result</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_AUDITS.map(audit => <tr key={audit.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {audit.referenceNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{audit.type}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {audit.factoryName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">
                        {audit.productCode}
                      </span>
                      <span className="text-xs text-gray-500">{audit.sku}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {audit.inspectorName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{audit.date}</td>
                  <td className="px-6 py-4">
                    <Badge variant={audit.result === 'Pass' ? 'success' : audit.result === 'Fail' ? 'danger' : 'warning'}>
                      {audit.result}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Report">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Audit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Clone">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
          <span>Showing 1-3 of 3 results</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled>
              Previous
            </Button>
            <Button variant="secondary" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>;
}