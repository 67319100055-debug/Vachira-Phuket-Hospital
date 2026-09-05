import React, { useState } from 'react';
import {
  LayoutDashboard,
  Pill,
  ClipboardList,
  BookOpen,
  Newspaper,
  FileText,
  Sliders,
  Image,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  UserCheck
} from 'lucide-react';
import { AdminSection } from '../../types';

interface AdminLayoutProps {
  currentSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  currentUser: string;
  onLogout: () => void;
  onViewPublicSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentSection,
  onSelectSection,
  currentUser,
  onLogout,
  onViewPublicSite,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems: {
    id: AdminSection;
    label: string;
    icon: any;
    badge?: string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard ภาพรวม', icon: LayoutDashboard },
    { id: 'drugs', label: 'จัดการข้อมูลยา', icon: Pill },
    { id: 'infographics', label: 'จัดการขั้นตอนรับยา (3 รูป)', icon: Image },
    { id: 'banner', label: 'จัดการ Banner หน้าแรก', icon: Sliders },
    { id: 'news', label: 'จัดการข่าวสาร', icon: Newspaper },
    { id: 'knowledge', label: 'จัดการคลังความรู้', icon: BookOpen },
    { id: 'documents', label: 'จัดการเอกสารดาวน์โหลด', icon: FileText },
    { id: 'users', label: 'จัดการผู้ใช้งาน', icon: Users },
    { id: 'stats', label: 'สถิติระบบ', icon: BarChart3 },
    { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Admin Topbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <span className="text-xl">💊</span>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wide text-emerald-400">
                กลุ่มงานเภสัชกรรม • รพ.วชิระภูเก็ต
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>ระบบจัดการหลังบ้าน (Admin Console)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Switch to Public View */}
          <button
            onClick={onViewPublicSite}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>ดูหน้าเว็บประชาชน</span>
          </button>

          {/* User Profile matching item 11 */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              👤
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-200">
                {currentUser || 'Admin'}
              </div>
              <div className="text-[10px] text-emerald-400">ผู้ดูแลระบบ</div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="ออกจากระบบ"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col justify-between transition-transform duration-200 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-4 overflow-y-auto space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              เมนูจัดการระบบ
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Admin Sidebar Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50 text-xs space-y-2">
            <button
              onClick={onViewPublicSite}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>เปิดหน้าประชาชน</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-red-700 hover:bg-red-50 font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ออกจากระบบ (Logout)</span>
            </button>
          </div>
        </aside>

        {/* Admin Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
