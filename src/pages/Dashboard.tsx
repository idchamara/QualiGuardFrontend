import React from 'react';
import { ClipboardList, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PageHeader } from '../components/layout/PageHeader';
import { MetricCard } from '../components/dashboard/MetricCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_METRICS, MOCK_AUDITS } from '../utils/mockData';
export function Dashboard() {
  return <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <PageHeader title="Dashboard" description="Overview of audit performance and recent activities" actions={<Link to="/audit/new">
            <Button>Create New Audit</Button>
          </Link>} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Audits" value={MOCK_METRICS.totalAudits} icon={ClipboardList} color="blue" trend={{
        value: 12,
        isPositive: true
      }} />
        <MetricCard title="Passed" value={MOCK_METRICS.passedAudits} icon={CheckCircle2} color="green" trend={{
        value: 8,
        isPositive: true
      }} />
        <MetricCard title="Failed" value={MOCK_METRICS.failedAudits} icon={XCircle} color="red" trend={{
        value: 2,
        isPositive: false
      }} />
        <MetricCard title="Pending CAPs" value={MOCK_METRICS.pendingCAPs} icon={AlertTriangle} color="amber" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Compliance Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_METRICS.complianceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{
                fill: '#6B7280'
              }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{
                fill: '#6B7280'
              }} />
                <Tooltip contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }} />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} dot={{
                fill: '#2563EB',
                strokeWidth: 2,
                r: 4,
                stroke: '#fff'
              }} activeDot={{
                r: 6
              }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Failures by Section
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_METRICS.sectionFailures} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{
                fill: '#6B7280'
              }} width={100} />
                <Tooltip cursor={{
                fill: '#F3F4F6'
              }} contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }} />
                <Bar dataKey="count" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Audits Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Audits</h3>
          <Link to="/audits" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Factory</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_AUDITS.map(audit => <tr key={audit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {audit.referenceNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {audit.factoryName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {audit.productCode}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{audit.date}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${audit.overallScore >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                      {audit.overallScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={audit.result === 'Pass' ? 'success' : audit.result === 'Fail' ? 'danger' : 'warning'}>
                      {audit.result}
                    </Badge>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>;
}