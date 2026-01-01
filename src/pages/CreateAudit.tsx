import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Play } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
export function CreateAudit() {
  const navigate = useNavigate();
  const handleStartAudit = () => {
    navigate('/audit/123/checklist');
  };
  return <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <PageHeader title="New Audit" description="Initialize a new inspection record" breadcrumbs={[{
      label: 'Dashboard',
      href: '/dashboard'
    }, {
      label: 'New Audit'
    }]} />

      <div className="space-y-6">
        {/* Inspection Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Inspection Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Type
              </label>
              <select className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option>Pre-Shipment Inspection (PSI)</option>
                <option>During Production Check (DUPRO)</option>
                <option>Initial Production Check (IPC)</option>
                <option>Factory Capacity Audit (FCA)</option>
              </select>
            </div>
            <Input label="Reference Number" placeholder="e.g. INS-2024-001" />
            <Input label="PO Reference" placeholder="e.g. PO-998877" />
            <Input type="date" label="Planned Date" />
            <Input type="date" label="Inspection Date" />
          </div>
        </Card>

        {/* Product Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Product Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Product Name" placeholder="e.g. Men's Denim Jacket" />
            <Input label="Product Code" placeholder="e.g. DJ-5501" />
            <Input label="SKU" placeholder="e.g. SKU-DJ-BL-M" />
            <div className="grid grid-cols-3 gap-4 md:col-span-2">
              <Input type="number" label="Ordered Qty" placeholder="0" />
              <Input type="number" label="Produced Qty" placeholder="0" />
              <Input type="number" label="Packed Qty" placeholder="0" />
            </div>
          </div>
        </Card>

        {/* Factory & Location */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Factory & Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Factory Name" placeholder="e.g. Sunrise Garments Ltd." />
            <Input label="Site Representative" placeholder="Name of contact person" />
            <div className="md:col-span-2">
              <Input label="Inspection Location" placeholder="Full address" />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="secondary" leftIcon={<Save className="h-4 w-4" />}>
            Save Draft
          </Button>
          <Button onClick={handleStartAudit} leftIcon={<Play className="h-4 w-4" />}>
            Start Audit
          </Button>
        </div>
      </div>
    </div>;
}