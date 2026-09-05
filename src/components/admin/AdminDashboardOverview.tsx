import React from 'react';
import { Pill, Newspaper, BookOpen, FileText, Users, ArrowUpRight, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { DrugItem, NewsItem, KnowledgeArticle, DocumentDownload, AdminUser } from '../../types';

interface AdminDashboardOverviewProps {
  drugs: DrugItem[];
  news: NewsItem[];
  articles: KnowledgeArticle[];
  documents: DocumentDownload[];
  users: AdminUser[];
  onNavigateSection: (sec: any) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  drugs,
  news,
  articles,
  documents,
  users,
  onNavigateSection,
}) => {
  // Stat values matching prompt #11
  const stats = [
    {
      id: 'stat-drugs',
      label: 'ยาในระบบ',
      count: '1,250',
      realCount: drugs.length,
      icon: '💊',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      action: () => onNavigateSection('drugs'),
      subtext: '+15 รายการเดือนนี้',
    },
    {
      id: 'stat-news',
      label: 'ข่าว / กิจกรรม',
      count: '48',
      realCount: news.length,
      icon: '📰',
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      action: () => onNavigateSection('news'),
      subtext: 'เผยแพร่อยู่ 42 ข่าว',
    },
    {
      id: 'stat-knowledge',
      label: 'บทความความรู้',
      count: '120',
      realCount: articles.length,
      icon: '📚',
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      action: () => onNavigateSection('knowledge'),
      subtext: 'ยอดอ่าน 35,400+ ครั้ง',
    },
    {
      id: 'stat-docs',
      label: 'เอกสารดาวน์โหลด',
      count: '85',
      realCount: documents.length,
      icon: '📄',
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      action: () => onNavigateSection('documents'),
      subtext: 'ดาวน์โหลด 6,800 ครั้ง',
    },
    {
      id: 'stat-users',
      label: 'ผู้ใช้ / เภสัชกร',
      count: '12',
      realCount: users.length,
      icon: '👨‍⚕️',
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      action: () => onNavigateSection('users'),
      subtext: 'ออนไลน์ขณะนี้ 4 ท่าน',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Bar */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            ระบบจัดการสารสนเทศกลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต
          </span>
          <h1 className="text-2xl font-black mt-1">ภาพรวมระบบ (Dashboard Overview)</h1>
          <p className="text-xs text-emerald-100 mt-1 font-light">
            ยินดีต้อนรับ เภสัชกรผู้ดูแลระบบ • อัปเดตข้อมูลล่าสุด {new Date().toLocaleDateString('th-TH')}
          </p>
        </div>
        <button
          onClick={() => onNavigateSection('drugs')}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-colors shrink-0"
        >
          + เพิ่มข้อมูลยาใหม่
        </button>
      </div>

      {/* 5 Stats Cards Grid matching prompt #11 */}
      <div>
        <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>สถิติรวมของระบบ</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s) => (
            <div
              key={s.id}
              onClick={s.action}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl ${s.bg}`}>
                  {s.icon}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </div>

              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {s.count}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">
                {s.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{s.subtext}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Logs & Quick Service Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Dispensing Station Queue Load */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>ปริมาณงานจ่ายยาผู้ป่วยนอกวันนี้ (OPD Workload)</span>
            </h3>
            <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-md">
              เปิดบริการปกติ
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>ช่องจ่ายยา 1-2 (บัตรทอง 30 บาท)</span>
                <span>380 / 450 ใบสั่งยา (84%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>ช่องจ่ายยา 3 (ประกันสังคม)</span>
                <span>210 / 280 ใบสั่งยา (75%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>ช่องจ่ายยา 4 (ข้าราชการ / ชำระเงิน)</span>
                <span>165 / 200 ใบสั่งยา (82%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>บริการเติมยาทางไปรษณีย์ (Vachira Med Post)</span>
                <span>45 กล่องพัสดุจัดส่งแล้ว</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent System Audit Logs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>ประวัติการจัดการข้อมูลล่าสุด</span>
          </h3>

          <div className="mt-4 space-y-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="font-semibold text-slate-800">อัปเดต Infographic ขั้นตอนรับยา</div>
              <div className="text-[11px] text-slate-500">โดย ภก.ดำรงเกียรติ • 10 นาทีที่แล้ว</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="font-semibold text-slate-800">เพิ่มยา Warfarin 3mg ในบัญชียา</div>
              <div className="text-[11px] text-slate-500">โดย ภญ.จันทิมา • 2 ชั่วโมงที่แล้ว</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="font-semibold text-slate-800">เผยแพร่ข่าวสัปดาห์เภสัชกรรม 2568</div>
              <div className="text-[11px] text-slate-500">โดย ผู้ดูแลระบบ • เมื่อวานนี้</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="font-semibold text-slate-800">อัปเดตคู่มือเอกสารส่งยาไปรษณีย์</div>
              <div className="text-[11px] text-slate-500">โดย เจ้าหน้าที่คลังยา • 3 วันที่แล้ว</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
