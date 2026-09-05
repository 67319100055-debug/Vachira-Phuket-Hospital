import React, { useState } from 'react';
import {
  Menu,
  X,
  Pill,
  ShieldAlert,
  HelpCircle,
  Package,
  Calendar,
  Layers,
  FileText,
  Phone,
  BarChart2,
  Settings,
  User,
  ChevronDown,
  Building2,
  ClipboardList,
  AlertOctagon,
  Clock,
  BookOpen
} from 'lucide-react';
import { UserRole } from '../../types/pharmacy';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenDrugDetail?: (drugId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'หน้าหลัก' },
    { id: 'medicines', label: 'ข้อมูลยา' },
    { id: 'drug-safety', label: 'ความปลอดภัย' },
    { id: 'allergies', label: 'บัตรแพ้ยา' },
    { id: 'consult', label: 'ปรึกษาเภสัชกร' },
    { id: 'refill', label: 'ขอเติมยา' },
    { id: 'services', label: 'บริการเภสัชกรรม' },
    { id: 'medrec', label: 'Med Rec' },
    { id: 'safety-reporting', label: 'รายงานความปลอดภัย' },
    { id: 'inventory', label: 'คลังยา/จัดซื้อ' },
    { id: 'dashboard', label: 'แดชบอร์ด' },
    { id: 'news', label: 'ข่าวสาร' },
    { id: 'knowledge', label: 'คลังความรู้' },
    { id: 'documents', label: 'เอกสาร' },
    { id: 'contact', label: 'ติดต่อเรา' },
    { id: 'admin', label: 'จัดการระบบ' }
  ];

  const roleLabels: Record<string, { label: string; color: string }> = {
    public: { label: 'ประชาชนทั่วไป', color: 'bg-slate-100 text-slate-800' },
    pharmacist: { label: 'เภสัชกร', color: 'bg-teal-100 text-teal-800' },
    inventory_staff: { label: 'เจ้าหน้าที่คลังยา', color: 'bg-amber-100 text-amber-800' },
    admin: { label: 'ผู้ดูแลระบบ', color: 'bg-purple-100 text-purple-800' },
    pharmacy_admin: { label: 'หัวหน้ากลุ่มงาน', color: 'bg-purple-100 text-purple-800' },
    staff: { label: 'เจ้าหน้าที่', color: 'bg-blue-100 text-blue-800' },
    super_admin: { label: 'Super Admin', color: 'bg-red-100 text-red-800' }
  };

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top emergency & hospital bar */}
      <div className="bg-teal-900 text-white text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            โรงพยาบาลวชิระภูเก็ต (Vachira Phuket Hospital)
          </span>
          <span className="hidden md:inline text-teal-300">|</span>
          <span className="hidden md:inline text-teal-200">
            บริการเภสัชกรรมเพื่อประชาชนตลอด 24 ชั่วโมง
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:1669"
            className="flex items-center gap-1 text-rose-300 hover:text-white font-bold transition-colors"
          >
            <span>ฉุกเฉิน 1669</span>
          </a>
          <span className="text-teal-400">|</span>
          <span className="text-teal-200">โทร: 076-361234</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-teal-800 transition-colors">
              💊
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-teal-800 tracking-wide">
                  โรงพยาบาลวชิระภูเก็ต
                </span>
              </div>
              <div className="text-base sm:text-lg font-extrabold text-slate-900 font-heading leading-tight group-hover:text-teal-700 transition-colors">
                กลุ่มงานเภสัชกรรม
              </div>
            </div>
          </div>

          {/* Desktop Nav - Primary Quick Tabs */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-600">
            {navItems.slice(0, 9).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentTab === item.id
                    ? 'bg-teal-700 text-white font-bold shadow-2xs'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* More dropdown for remaining items */}
            <div className="relative group">
              <button className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 flex items-center gap-1 cursor-pointer">
                <span>เพิ่มเติม</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 hidden group-hover:block text-xs z-50">
                {navItems.slice(9).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2 transition-colors cursor-pointer ${
                      currentTab === item.id
                        ? 'bg-teal-50 text-teal-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* User Role Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                title="สลับบทบาทผู้ใช้งาน (Role RBAC)"
              >
                <User className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden sm:inline">สิทธิ์:</span>
                <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${roleLabels[userRole].color}`}>
                  {roleLabels[userRole].label}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    เลือกบทบาทการเข้าถึง (RBAC)
                  </div>
                  {(['public', 'pharmacist', 'inventory_staff', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setUserRole(r);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        userRole === r ? 'font-bold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{roleLabels[r].label}</span>
                      {userRole === r && <span className="text-teal-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="เปิดเมนูนำทาง"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-2.5 rounded-lg text-left font-semibold transition-colors cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-teal-700 text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
