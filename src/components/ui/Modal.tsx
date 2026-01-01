import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md'
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4'
  };
  return <AnimatePresence>
      {isOpen && <>
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} className={`bg-white rounded-xl shadow-xl w-full ${maxWidthClasses[maxWidth]} pointer-events-auto flex flex-col max-h-[90vh]`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        </>}
    </AnimatePresence>;
}