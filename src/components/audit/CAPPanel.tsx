import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CAP } from '../../types/audit';
interface CAPPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cap: Partial<CAP>) => void;
  questionText: string;
}
export function CAPPanel({
  isOpen,
  onClose,
  onSave,
  questionText
}: CAPPanelProps) {
  const [formData, setFormData] = useState({
    issueDescription: '',
    rootCause: '',
    actionPlan: '',
    responsiblePerson: '',
    targetDate: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Corrective Action Plan (CAP)" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-red-50 border border-red-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-red-800 font-medium">
            Non-Compliance Detected
          </p>
          <p className="text-sm text-red-600 mt-1">{questionText}</p>
        </div>

        <Input label="Issue Description" value={formData.issueDescription} onChange={e => setFormData({
        ...formData,
        issueDescription: e.target.value
      })} required placeholder="Describe the non-compliance in detail" />

        <Input label="Root Cause" value={formData.rootCause} onChange={e => setFormData({
        ...formData,
        rootCause: e.target.value
      })} required placeholder="Why did this issue occur?" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Corrective Action Plan
          </label>
          <textarea className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" rows={3} value={formData.actionPlan} onChange={e => setFormData({
          ...formData,
          actionPlan: e.target.value
        })} required placeholder="Steps to rectify the issue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Responsible Person" value={formData.responsiblePerson} onChange={e => setFormData({
          ...formData,
          responsiblePerson: e.target.value
        })} required placeholder="Name" />
          <Input type="date" label="Target Date" value={formData.targetDate} onChange={e => setFormData({
          ...formData,
          targetDate: e.target.value
        })} required />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="danger">
            Save CAP
          </Button>
        </div>
      </form>
    </Modal>;
}