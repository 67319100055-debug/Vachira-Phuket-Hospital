import React, { useState } from 'react';
import {
  Pill,
  ShieldAlert,
  Search,
  MessageCircleQuestion,
  Package,
  Building2,
  Bed,
  ClipboardList,
  FileText,
  Phone,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Medicine, NewsItem, KnowledgeArticle } from '../../types/pharmacy';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  medicines?: Medicine[];
  news?: NewsItem[];
  knowledge?: KnowledgeArticle[];
  onSelectMedicine?: (med: Medicine) => void;
  onSelectDrug?: (med: Medicine) => void;
  onOpenQuickSearch?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  medicines = [],
  news = [],
  knowledge = [],
  onSelectMedicine,
  onSelectDrug,
  onOpenQuickSearch
}) => {
  const [quickSearchInput, setQuickSearchInput] = useState('');

  const handleSelectMed = (med: Medicine) => {
    if (onSelectMedicine) onSelectMedicine(med);
    else if (onSelectDrug) onSelectDrug(med);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchInput.trim()) {
      setCurrentTab('medicines');
    } else {
      if (onOpenQuickSearch) onOpenQuickSearch();
      else setCurrentTab('medicines');
    }
  };

  // 10 Quick Menu Services as specified in Prompt section 2
  const quickServices = [
    {
      id: 'knowledge',
      title: 'ความรู้เรื่องยา',
      icon: '💊',
      desc: 'คลังความรู้การใช้ยากลุ่มต่างๆ อย่างถูกต้อง',
      color: 'from-teal-500/10 to-teal-600/20 text-teal-700 border-teal-200',
      tab: 'knowledge'
    },
    {
      id: 'safety',
      title: 'การใช้ยาอย่างปลอดภัย',
      icon: '⚠️',
      desc: 'หลักการใช้ยา RDU, ลืมกินยา, ยาตีกัน และอาหาร',
      color: 'from-amber-500/10 to-amber-600/20 text-amber-800 border-amber-200',
      tab: 'safety'
    },
    {
      id: 'medicines',
      title: 'ค้นหาข้อมูลยา',
      icon: '🔎',
      desc: 'ค้นหาชื่อยา บัญชียาโรงพยาบาล และข้อบ่งใช้',
      color: 'from-blue-500/10 to-blue-600/20 text-blue-700 border-blue-200',
      tab: 'medicines'
    },
    {
      id: 'consult',
      title: 'ปรึกษาเภสัชกร',
      icon: '👨‍⚕️',
      desc: 'ส่งคำถามเรื่องยากับเภสัชกร รพ.วชิระภูเก็ต',
      color: 'from-cyan-500/10 to-cyan-600/20 text-cyan-800 border-cyan-200',
      tab: 'consult'
    },
    {
      id: 'refill',
      title: 'ตรวจสอบการเติมยา',
      icon: '📦',
      desc: 'โครงการเติมยา รับยาทางไปรษณีย์ และร้านยาใกล้บ้าน',
      color: 'from-emerald-500/10 to-emerald-600/20 text-emerald-800 border-emerald-200',
      tab: 'refill'
    },
    {
      id: 'services-opd',
      title: 'บริการผู้ป่วยนอก',
      icon: '🏥',
      desc: 'ห้องจ่ายยาผู้ป่วยนอก 1-2 และระบบคิวอัจฉริยะ',
      color: 'from-sky-500/10 to-sky-600/20 text-sky-800 border-sky-200',
      tab: 'services'
    },
    {
      id: 'services-ipd',
      title: 'บริการผู้ป่วยใน',
      icon: '🛏️',
      desc: 'บริบาลเภสัชกรรมผู้ป่วยใน และเภสัชกรประจำวอร์ด',
      color: 'from-indigo-500/10 to-indigo-600/20 text-indigo-800 border-indigo-200',
      tab: 'services'
    },
    {
      id: 'med-rec',
      title: 'Medication Reconciliation',
      icon: '📋',
      desc: 'ระบบประสานรายการยาเพื่อความปลอดภัยของผู้ป่วย',
      color: 'from-violet-500/10 to-violet-600/20 text-violet-800 border-violet-200',
      tab: 'med-rec'
    },
    {
      id: 'documents',
      title: 'ดาวน์โหลดเอกสาร',
      icon: '📄',
      desc: 'แบบฟอร์ม คู่มือการใช้ยา SOP และแนวทางปฏิบัติ',
      color: 'from-slate-500/10 to-slate-600/20 text-slate-800 border-slate-200',
      tab: 'documents'
    },
    {
      id: 'contact',
      title: 'ติดต่อกลุ่มงานเภสัชกรรม',
      icon: '📞',
      desc: 'เบอร์โทรศัพท์สายตรงและเบอร์ต่อภายใน รพ.วชิระภูเก็ต',
      color: 'from-rose-500/10 to-rose-600/20 text-rose-800 border-rose-200',
      tab: 'contact'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          {/* Banner Hospital Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-teal-100 text-xs sm:text-sm font-medium">
            <span>🏥 โรงพยาบาลวชิระภูเก็ต</span>
            <span className="text-teal-300">•</span>
            <span>Vachira Phuket Hospital</span>
          </div>

          {/* Department Main Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              💊 กลุ่มงานเภสัชกรรม
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-teal-200 font-light italic">
              "ใช้ยาอย่างถูกต้อง ปลอดภัย และสมเหตุผล"
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            ศูนย์รวมข้อมูลยา ความรู้เรื่องยา การดูแลผู้ป่วยรายบุคคล โครงการเติมยาส่งตรงถึงบ้าน
            และการประสานรายการยาเพื่อความปลอดภัยสูงสุดของประชาชน
          </p>

          {/* Quick Search in Banner */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-200"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="home-banner-drug-search-input"
                  value={quickSearchInput}
                  onChange={(e) => setQuickSearchInput(e.target.value)}
                  placeholder="พิมพ์ค้นหายา เช่น Paracetamol, Amoxicillin, รหัสยา 1001542..."
                  className="w-full pl-11 pr-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 rounded-xl focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                id="home-banner-search-submit-btn"
                className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
              >
                <span>ค้นหายา</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-teal-200/90">
              <span className="text-teal-300">ตัวอย่างยายอดนิยม:</span>
              {['Paracetamol', 'Amoxicillin', 'Amlodipine', 'Metformin', 'Warfarin'].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    const match = medicines.find((m) => m.name.toLowerCase().includes(name.toLowerCase()));
                    if (match) handleSelectMed(match);
                  }}
                  className="bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-md text-[11px] text-white transition-colors cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="banner-view-services-btn"
              onClick={() => setCurrentTab('services')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-teal-500/25 flex items-center gap-2 cursor-pointer"
            >
              <span>ดูข้อมูลบริการเภสัชกรรม</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="banner-refill-btn"
              onClick={() => setCurrentTab('refill')}
              className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-amber-300" />
              <span>บริการเติมยา (ส่งถึงบ้าน / ร้านยา)</span>
            </button>
            <button
              id="banner-consult-btn"
              onClick={() => setCurrentTab('consult')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-teal-100 font-semibold text-sm rounded-xl border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircleQuestion className="w-4 h-4 text-cyan-300" />
              <span>ปรึกษาเภสัชกร</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. EMERGENCY & DRUG ALLERGY SPOTLIGHT (Critical Safety Callout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl shadow-xl p-5 sm:p-6 border border-red-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white text-red-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ⚠️ ความปลอดภัยเร่งด่วน
                </span>
                <span className="text-xs text-red-100">Drug Allergy Red Flags</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold">
                พบสัญญาณเตือนแพ้ยารุนแรง? หายใจไม่ออก ปากบวม ตาบวม ผื่นลอกทั้งตัว
              </h3>
              <p className="text-xs sm:text-sm text-red-100 leading-relaxed max-w-3xl">
                ให้หยุดยาที่ต้องสงสัยทันที และรีบนำตัวส่งห้องฉุกเฉิน โรงพยาบาลวชิระภูเก็ต หรือโทร <strong className="text-white font-bold underline">1669</strong> ตลอด 24 ชั่วโมง พร้อมนำซองยาทั้งหมดมาด้วย
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              id="home-allergy-info-btn"
              onClick={() => setCurrentTab('allergy')}
              className="w-full md:w-auto px-4 py-2.5 bg-white text-red-700 hover:bg-red-50 font-bold text-xs rounded-xl shadow-sm transition-all text-center cursor-pointer"
            >
              ดูแนวทางการป้องกันการแพ้ยา
            </button>
          </div>
        </div>
      </section>

      {/* 3. QUICK SERVICES MENU (Card Grid as specified in Prompt Section 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              ⭐ บริการด่วน
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              เมนูบริการกลุ่มงานเภสัชกรรม
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            เข้าถึงบริการและข้อมูลสำคัญได้อย่างรวดเร็ว
          </p>
        </div>

        {/* The 10 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickServices.map((srv) => (
            <div
              key={srv.id}
              id={`quick-card-${srv.id}`}
              onClick={() => setCurrentTab(srv.tab)}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-teal-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-teal-50 border border-slate-100 group-hover:border-teal-200 flex items-center justify-center text-2xl transition-all group-hover:scale-105">
                  {srv.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-teal-600 transition-colors">
                <span className="font-medium">เข้าสู่บริการ</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOSPITAL PHARMACY KEY METRICS HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border border-teal-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-800 font-heading">
                1,250+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">รายการยาในบัญชีโรงพยาบาล</p>
              <p className="text-[11px] text-slate-500">ผ่านการรับรองความปลอดภัย PTC</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-800 font-heading">
                45 แห่ง
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">ร้านยาคุณภาพเครือข่าย</p>
              <p className="text-[11px] text-slate-500">รับยาใกล้บ้านทั่วเกาะภูเก็ต</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-800 font-heading">
                -12%
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Medication Error ลดลง</p>
              <p className="text-[11px] text-slate-500">ด้วยระบบ Med Rec บูรณาการ</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-800 font-heading">
                24 ชม.
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">บริการบริบาลผู้ป่วยใน</p>
              <p className="text-[11px] text-slate-500">เภสัชกรคลินิกประจำหอผู้ป่วย</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DRUG REFILL & SAFE MEDICATION USE 2-COLUMN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box 1: โครงการเติมยา โรงพยาบาลวชิระภูเก็ต */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                📦
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  โครงการรับยาใกล้บ้าน & ไปรษณีย์
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  บริการเติมยาต่อเนื่อง โรงพยาบาลวชิระภูเก็ต
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              สำหรับผู้ป่วยโรคเรื้อรัง (เบาหวาน ความดัน ไขมัน) ที่มีอาการคงที่ นัดรับยาเดิม
              สามารถลงทะเบียนล่วงหน้าได้ <strong>ไม่เกิน 1 วัน</strong> ก่อนวันนัด เพื่อความสะดวก
              ลดความแออัดในโรงพยาบาล
            </p>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>รับยาที่โรงพยาบาล (ช่องทางด่วน ไม่ต้องรอคิวปกติ)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ส่งพัสดุด่วน EMS ทางไปรษณีย์ตรงถึงหน้าบ้าน</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>รับยาที่ร้านยาคุณภาพใกล้บ้าน (เครือข่าย รพ.วชิระภูเก็ต)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500">
                <span>โทรสอบถาม: </span>
                <strong className="text-slate-800 font-semibold">076-361234 ต่อ 1183–1184</strong>
              </div>
              <button
                id="home-open-refill-btn"
                onClick={() => setCurrentTab('refill')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>ลงทะเบียน / เช็กสถานะ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Box 2: การใช้ยาอย่างปลอดภัย & RDU Hospital */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl">
                🛡️
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  RDU Hospital นโยบายการใช้ยาอย่างสมเหตุผล
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  การใช้ยาอย่างปลอดภัยสำหรับประชาชน
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              การใช้ยาให้ได้ผลการรักษาสูงสุดและปลอดภัย ต้องคำนึงถึง <strong>หลัก 5 ถูก</strong>
              (ถูกคน ถูกยา ถูกขนาด ถูกเวลา และถูกวิธี) รวมทั้งการสังเกตวันหมดอายุและการปฏิบัติตนเมื่อลืมทานยา
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div
                onClick={() => setCurrentTab('safety')}
                className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 hover:bg-teal-100/60 cursor-pointer transition-colors"
              >
                <strong className="text-teal-900 block font-semibold">⏰ เมื่อลืมรับประทานยา</strong>
                <span className="text-slate-500 text-[11px]">ห้ามกินเบิ้ล 2 เท่าเด็ดขาด</span>
              </div>
              <div
                onClick={() => setCurrentTab('safety')}
                className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 hover:bg-teal-100/60 cursor-pointer transition-colors"
              >
                <strong className="text-teal-900 block font-semibold">❄️ วิธีเก็บรักษายา</strong>
                <span className="text-slate-500 text-[11px]">ตู้เย็น vs อุณหภูมิห้อง</span>
              </div>
              <div
                onClick={() => setCurrentTab('safety')}
                className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 hover:bg-teal-100/60 cursor-pointer transition-colors"
              >
                <strong className="text-teal-900 block font-semibold">⚠️ ยาที่ไม่ควรใช้ร่วมกัน</strong>
                <span className="text-slate-500 text-[11px]">ปฏิกิริยากับสมุนไพร/อาหาร</span>
              </div>
              <div
                onClick={() => setCurrentTab('safety')}
                className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 hover:bg-teal-100/60 cursor-pointer transition-colors"
              >
                <strong className="text-teal-900 block font-semibold">👶 กลุ่มผู้ป่วยพิเศษ</strong>
                <span className="text-slate-500 text-[11px]">เด็ก ผู้สูงอายุ สตรีมีครรภ์</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">เรียนรู้หลักการใช้ยา RDU เพิ่มเติม</span>
              <button
                id="home-open-safety-btn"
                onClick={() => setCurrentTab('safety')}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>อ่านแนวทางความปลอดภัย</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED NEWS & ACTIVITIES (ข่าวสารกลุ่มงานเภสัชกรรม) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              📰 ข่าวสารและกิจกรรม
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              ข่าวสารกลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('news')}
            className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
          >
            <span>ดูข่าวทั้งหมด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(news || []).slice(0, 3).map((item) => (
            <article
              key={item.id}
              onClick={() => setCurrentTab('news')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              {item.imageUrl && (
                <div className="h-44 overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-teal-700/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              )}

              <div className="p-5 space-y-2.5 flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="px-5 pb-4 pt-1 flex items-center text-xs font-semibold text-teal-600 group-hover:text-teal-800">
                <span>อ่านรายละเอียด</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. KNOWLEDGE BASE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
              📚 คลังความรู้เรื่องยา
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              ความรู้เรื่องยาที่พบบ่อย
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('knowledge')}
            className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
          >
            <span>ดูบทความทั้งหมด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(knowledge || []).slice(0, 4).map((art) => (
            <div
              key={art.id}
              onClick={() => setCurrentTab('knowledge')}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/30 transition-all flex items-start gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg shrink-0 mt-0.5">
                📖
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {art.category}
                </span>
                <h4 className="text-sm font-bold text-slate-800 hover:text-teal-700 transition-colors">
                  {art.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {art.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
