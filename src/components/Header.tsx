import React from 'react';
import { Menu, Phone, Clock, Search, ShieldCheck } from 'lucide-react';
import { PublicNavSection } from '../types';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  activeSection: PublicNavSection;
  onNavigate: (section: PublicNavSection) => void;
  onOpenQueueModal: () => void;
  onOpenSearchModal: () => void;
  onOpenConsultModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen,
  onNavigate,
  onOpenQueueModal,
  onOpenSearchModal,
  onOpenConsultModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger & Brand Info */}
          <div className="flex items-center gap-3">
            <button
              id="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-colors"
              aria-label={isSidebarOpen ? 'หุบเมนูด้านซ้าย' : 'ขยายเมนูด้านซ้าย'}
              title="เปิด/ปิด แถบเมนูด้านข้าง"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-xs">
                🏥
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-slate-800 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
                  โรงพยาบาลวชิระภูเก็ต
                </div>
                <div className="text-xs text-emerald-700 font-medium">
                  กลุ่มงานเภสัชกรรม
                </div>
              </div>
            </button>
          </div>

          {/* Center/Right: Action Buttons & Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              id="header-nav-home"
              onClick={() => onNavigate('home')}
              className="hidden md:inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              หน้าแรก
            </button>

            <button
              id="header-quick-search-btn"
              onClick={onOpenSearchModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>ค้นหายา</span>
            </button>

            <button
              id="header-quick-queue-btn"
              onClick={onOpenQueueModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>เช็กคิวรับยา</span>
            </button>

            <button
              id="header-nav-contact"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>ติดต่อเจ้าหน้าที่</span>
            </button>

            <button
              id="header-consult-btn"
              onClick={onOpenConsultModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>ปรึกษาเภสัชกร</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
