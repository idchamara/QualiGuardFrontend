import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}
export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm'
  };
  return <span className={`inline-flex items-center rounded-full border font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>;
}