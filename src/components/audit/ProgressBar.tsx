import React from 'react';
import { motion } from 'framer-motion';
interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}
export function ProgressBar({
  current,
  total,
  percentage
}: ProgressBarProps) {
  return <div className="sticky top-16 lg:top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 py-3 px-4 lg:px-8 mb-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            Audit Progress
          </span>
          <span className="text-xs text-gray-500">
            {current} of {total} sections completed
          </span>
        </div>
        <div className="flex-1 max-w-md">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div initial={{
            width: 0
          }} animate={{
            width: `${percentage}%`
          }} transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }} className={`h-full rounded-full ${percentage === 100 ? 'bg-green-500' : 'bg-blue-600'}`} />
          </div>
        </div>
        <span className="text-sm font-bold text-blue-600 min-w-[3rem] text-right">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>;
}