import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/audit/ProgressBar';
import { QuestionItem } from '../components/audit/QuestionItem';
import { MOCK_SECTIONS } from '../utils/mockData';
import { Section, Question } from '../types/audit';
export function AuditChecklist() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>(MOCK_SECTIONS.map((s, i) => ({
    ...s,
    isExpanded: i === 0
  })));
  const completedSections = sections.filter(s => s.questions.every(q => q.result !== null)).length;
  const progressPercentage = completedSections / sections.length * 100;
  const toggleSection = (id: string) => {
    setSections(sections.map(s => s.id === id ? {
      ...s,
      isExpanded: !s.isExpanded
    } : s));
  };
  const updateQuestion = (sectionId: string, questionId: string, updates: Partial<Question>) => {
    setSections(sections.map(s => {
      if (s.id !== sectionId) return s;
      return {
        ...s,
        questions: s.questions.map(q => q.id === questionId ? {
          ...q,
          ...updates
        } : q)
      };
    }));
  };
  const handleFinish = () => {
    navigate('/audit/123/report');
  };
  return <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
        <PageHeader title="Audit Checklist" description="INS-2023-001 • Men's Denim Jacket" breadcrumbs={[{
        label: 'Dashboard',
        href: '/dashboard'
      }, {
        label: 'Audit',
        href: '/audits'
      }, {
        label: 'Checklist'
      }]} actions={<Button variant="secondary" onClick={() => navigate('/audit/123/report')}>
              Preview Report
            </Button>} />
      </div>

      <ProgressBar current={completedSections} total={sections.length} percentage={progressPercentage} />

      <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
        {sections.map(section => {
        const isComplete = section.questions.every(q => q.result !== null);
        const hasFailures = section.questions.some(q => q.result === 'Fail');
        return <Card key={section.id} className="overflow-hidden">
              <button onClick={() => toggleSection(section.id)} className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`
                    h-8 w-8 rounded-full flex items-center justify-center border-2
                    ${isComplete ? hasFailures ? 'border-red-500 bg-red-50 text-red-600' : 'border-green-500 bg-green-50 text-green-600' : 'border-gray-300 text-gray-400'}
                  `}>
                    {isComplete ? hasFailures ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-bold">
                        {sections.indexOf(section) + 1}
                      </span>}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {section.questions.filter(q => q.result !== null).length}
                      /{section.questions.length} questions answered
                    </p>
                  </div>
                </div>
                {section.isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </button>

              <AnimatePresence>
                {section.isExpanded && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} className="border-t border-gray-100">
                    {section.questions.map(question => <QuestionItem key={question.id} question={question} onUpdate={(id, updates) => updateQuestion(section.id, id, updates)} />)}
                  </motion.div>}
              </AnimatePresence>
            </Card>;
      })}

        <div className="flex justify-end pt-8 pb-20">
          <Button size="lg" onClick={handleFinish}>
            Complete Audit & Generate Report
          </Button>
        </div>
      </div>
    </div>;
}