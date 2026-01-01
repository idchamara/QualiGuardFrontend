import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardCheck, History, FileText, Settings, LogOut, Menu, X, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navItems = [{
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard'
  }, {
    icon: PlusCircle,
    label: 'New Audit',
    path: '/audit/new'
  }, {
    icon: History,
    label: 'Audit History',
    path: '/audits'
  }, {
    icon: FileText,
    label: 'Reports',
    path: '/reports'
  }, {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  }];
  const SidebarContent = () => <div className="flex flex-col h-full bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ClipboardCheck className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">QualiGuard</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">Audit Management System</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
        const isActive = location.pathname === item.path;
        return <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="font-medium">{item.label}</span>
            </NavLink>;
      })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>;
  return <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ClipboardCheck className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">QualiGuard</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={toggleSidebar} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
            <motion.div initial={{
          x: '-100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '-100%'
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden">
              <SidebarContent />
            </motion.div>
          </>}
      </AnimatePresence>
    </>;
}