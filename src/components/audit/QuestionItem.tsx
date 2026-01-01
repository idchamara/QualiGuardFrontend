import React, { useState } from 'react';
import { Camera, MessageSquare, AlertTriangle } from 'lucide-react';
import { Question } from '../../types/audit';
import { Button } from '../ui/Button';
import { CAPPanel } from './CAPPanel';
import { motion } from 'framer-motion';
interface QuestionItemProps {
  question: Question;
  onUpdate: (id: string, updates: Partial<Question>) => void;
}
export function QuestionItem({
  question,
  onUpdate
}: QuestionItemProps) {
  const [isCapOpen, setIsCapOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const handleResultChange = (result: 'Pass' | 'Fail' | 'N/A') => {
    onUpdate(question.id, {
      result
    });
    if (result === 'Fail') {
      setIsCapOpen(true);
    }
  };
  return <div className="p-4 md:p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-medium text-gray-600 flex-shrink-0 mt-0.5">
              {question.weight}
            </span>
            <div>
              <p className="text-gray-900 font-medium">{question.text}</p>
              {question.description && <p className="text-sm text-gray-500 mt-1">
                  {question.description}
                </p>}
            </div>
          </div>

          {/* CAP Indicator */}
          {question.result === 'Fail' && question.cap && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} className="mt-3 bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">CAP Required</p>
                <p className="text-xs text-red-600 mt-0.5">
                  {question.cap.issueDescription}
                </p>
                <button onClick={() => setIsCapOpen(true)} className="text-xs font-medium text-red-700 underline mt-1 hover:text-red-800">
                  Edit CAP Details
                </button>
              </div>
            </motion.div>}
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          {/* Radio Group */}
          <div className="flex rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button onClick={() => handleResultChange('Pass')} className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${question.result === 'Pass' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              Yes
            </button>
            <div className="w-px bg-gray-200" />
            <button onClick={() => handleResultChange('Fail')} className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${question.result === 'Fail' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              No
            </button>
            <div className="w-px bg-gray-200" />
            <button onClick={() => handleResultChange('N/A')} className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${question.result === 'N/A' ? 'bg-gray-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              N/A
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setShowComment(!showComment)} className={`p-2 rounded-lg transition-colors ${question.comment ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:bg-gray-100'}`}>
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comment Field */}
      {showComment && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} className="mt-3">
          <textarea value={question.comment || ''} onChange={e => onUpdate(question.id, {
        comment: e.target.value
      })} placeholder="Add observation..." className="w-full text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" rows={2} />
        </motion.div>}

      <CAPPanel isOpen={isCapOpen} onClose={() => setIsCapOpen(false)} onSave={capData => onUpdate(question.id, {
      cap: {
        ...capData,
        id: Date.now().toString(),
        questionId: question.id,
        status: 'Open'
      } as any
    })} questionText={question.text} />
    </div>;
}