import React, { useState } from 'react';
import {
  Home,
  Pill,
  AlertTriangle,
  ClipboardList,
  BookOpen,
  Newspaper,
  FileText,
  PhoneCall,
  ChevronDown,
  ChevronRight,
  Lock,
  X,
  Hospital,
  Sparkles
} from 'lucide-react';
import { PublicNavSection } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: PublicNavSection;
  onNavigate: (section: PublicNavSection) => void;
  onOpenAdminLogin: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  onOpenAdminLogin,
}) => {
  // Accordion state
  const [openDrugMenu, setOpenDrugMenu] = useState(true);
  const [openSafetyMenu, setOpenSafetyMenu] = useState(false);
  const [openServiceMenu, setOpenServiceMenu] = useState(false);

  const handleSelect = (section: PublicNavSection) => {
    onNavigate(section);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          id="sidebar-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 transition-opacity animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-white border-r border-slate-200 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
              🏥
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-tight leading-tight">
                โรงพยาบาลวชิระภูเก็ต
              </h2>
              <p className="text-xs text-emerald-200 font-medium mt-0.5">
                กลุ่มงานเภสัชกรรม
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:bg-white/10"
            aria-label="ปิดเมนู"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 text-sm scrollbar-thin">
          {/* 🏠 หน้าแรก */}
          <button
            id="nav-home"
            onClick={() => handleSelect('home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
              activeSection === 'home'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border-l-4 border-emerald-600 shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Home className="w-5 h-5 text-emerald-600" />
            <span>หน้าแรก</span>
          </button>

          {/* 💊 ข้อมูลยา (Accordion) */}
          <div className="pt-1">
            <button
              id="menu-toggle-drugs"
              onClick={() => setOpenDrugMenu(!openDrugMenu)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Pill className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-slate-800">ข้อมูลยา</span>
              </div>
              {openDrugMenu ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openDrugMenu && (
              <div className="ml-5 pl-3 border-l-2 border-emerald-100 mt-1 space-y-1">
                <button
                  id="nav-drugs-all"
                  onClick={() => handleSelect('drugs_all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'drugs_all'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ รายการยา (บัญชียา)
                </button>
                <button
                  id="nav-drugs-search"
                  onClick={() => handleSelect('drugs_search')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'drugs_search'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ ค้นหาข้อมูลยา
                </button>
                <button
                  id="nav-drugs-usage"
                  onClick={() => handleSelect('drugs_usage')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'drugs_usage'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ วิธีใช้ยา
                </button>
                <button
                  id="nav-drugs-warning"
                  onClick={() => handleSelect('drugs_warning')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'drugs_warning'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ คำเตือนและข้อควรระวัง
                </button>
                <button
                  id="nav-drugs-interactions"
                  onClick={() => handleSelect('drugs_interactions')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'drugs_interactions'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  └─ ปฏิกิริยาระหว่างยา
                </button>
              </div>
            )}
          </div>

          {/* ⚠️ การใช้ยาอย่างปลอดภัย (Accordion) */}
          <div>
            <button
              id="menu-toggle-safety"
              onClick={() => setOpenSafetyMenu(!openSafetyMenu)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="font-semibold text-slate-800">การใช้ยาอย่างปลอดภัย</span>
              </div>
              {openSafetyMenu ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSafetyMenu && (
              <div className="ml-5 pl-3 border-l-2 border-amber-100 mt-1 space-y-1">
                <button
                  id="nav-safe-rdu"
                  onClick={() => handleSelect('safe_rdu')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'safe_rdu'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ การใช้ยาอย่างสมเหตุผล (RDU)
                </button>
                <button
                  id="nav-safe-allergy"
                  onClick={() => handleSelect('safe_allergy')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'safe_allergy'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ การแพ้ยา (Drug Allergy)
                </button>
                <button
                  id="nav-safe-adr"
                  onClick={() => handleSelect('safe_adr')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'safe_adr'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  └─ อาการไม่พึงประสงค์จากยา (ADR)
                </button>
              </div>
            )}
          </div>

          {/* 📋 บริการเภสัชกรรม (Accordion) */}
          <div>
            <button
              id="menu-toggle-services"
              onClick={() => setOpenServiceMenu(!openServiceMenu)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-slate-800">บริการเภสัชกรรม</span>
              </div>
              {openServiceMenu ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openServiceMenu && (
              <div className="ml-5 pl-3 border-l-2 border-teal-100 mt-1 space-y-1">
                <button
                  id="nav-services-opd"
                  onClick={() => handleSelect('services_opd')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'services_opd'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ บริการผู้ป่วยนอก (OPD)
                </button>
                <button
                  id="nav-services-ipd"
                  onClick={() => handleSelect('services_ipd')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'services_ipd'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ บริการผู้ป่วยใน (IPD)
                </button>
                <button
                  id="nav-services-care"
                  onClick={() => handleSelect('services_care')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'services_care'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  ├─ บริบาลเภสัชกรรม (คลินิกเฉพาะทาง)
                </button>
                <button
                  id="nav-services-refill"
                  onClick={() => handleSelect('services_refill')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === 'services_refill'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  └─ บริการเติมยา (ส่งยาทางไปรษณีย์)
                </button>
              </div>
            )}
          </div>

          {/* 📚 ความรู้เรื่องยา */}
          <button
            id="nav-knowledge"
            onClick={() => handleSelect('knowledge')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
              activeSection === 'knowledge'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border-l-4 border-emerald-600 shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>ความรู้เรื่องยา</span>
          </button>

          {/* 📰 ข่าวสารกิจกรรม */}
          <button
            id="nav-news"
            onClick={() => handleSelect('news')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
              activeSection === 'news'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border-l-4 border-emerald-600 shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-5 h-5 text-blue-600" />
            <span>ข่าวสารกิจกรรม</span>
          </button>

          {/* 📄 เอกสารดาวน์โหลด */}
          <button
            id="nav-documents"
            onClick={() => handleSelect('documents')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
              activeSection === 'documents'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border-l-4 border-emerald-600 shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>เอกสารดาวน์โหลด</span>
          </button>

          {/* 📞 ติดต่อเรา */}
          <button
            id="nav-contact"
            onClick={() => handleSelect('contact')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
              activeSection === 'contact'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border-l-4 border-emerald-600 shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PhoneCall className="w-5 h-5 text-amber-600" />
            <span>ติดต่อเรา</span>
          </button>
        </div>

        {/* 🔐 Footer ปุ่ม Admin ตามคำแนะนำข้อ 9 (ปุ่มเล็กเรียบร้อยด้านล่าง ไม่เกะกะสายตาประชาชน) */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70">
          <div className="text-[11px] text-slate-400 px-2 pb-1.5 flex items-center justify-between">
            <span>สำหรับบุคลากร</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <button
            id="admin-login-sidebar-btn"
            onClick={onOpenAdminLogin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-all shadow-2xs"
            title="เข้าสู่ระบบจัดการข้อมูลเจ้าหน้าที่ (Admin Login)"
          >
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>🔐 เข้าสู่ระบบเจ้าหน้าที่ (Admin)</span>
          </button>
        </div>
      </aside>
    </>
  );
};
