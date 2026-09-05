import React from 'react';
import {
  Search,
  Clock,
  Heart,
  Package,
  UserCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { PublicNavSection } from '../types';

interface QuickCardsProps {
  onOpenSearch: () => void;
  onOpenQueue: () => void;
  onOpenConsult: () => void;
  onNavigate: (section: PublicNavSection) => void;
}

export const QuickCards: React.FC<QuickCardsProps> = ({
  onOpenSearch,
  onOpenQueue,
  onOpenConsult,
  onNavigate,
}) => {
  const cards = [
    {
      id: 'card-drug-search',
      icon: Search,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      title: 'ค้นหาข้อมูลยา',
      desc: 'ตรวจสอบวิธีใช้ คำเตือน และคำแนะนำการใช้ยาเบื้องต้น',
      badge: 'ค้นหาทันที',
      action: onOpenSearch,
    },
    {
      id: 'card-queue-check',
      icon: Clock,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      hoverBorder: 'hover:border-emerald-300',
      title: 'ตรวจสอบคิวรับยา',
      desc: 'ติดตามสถานะการจัดยาและเรียกคิวของผู้ป่วยแบบ Real-time',
      badge: 'ระบบคิวดิจิทัล',
      action: onOpenQueue,
    },
    {
      id: 'card-specialty-clinic',
      icon: Heart,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
      hoverBorder: 'hover:border-rose-300',
      title: 'คลินิกเฉพาะทาง',
      desc: 'บริการบริบาลเภสัชกรรมเฉพาะโรค วาร์ฟาริน เบาหวาน หอบหืด',
      badge: 'นัดปรึกษา',
      action: () => onNavigate('services_care'),
    },
    {
      id: 'card-refill-service',
      icon: Package,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      hoverBorder: 'hover:border-amber-300',
      title: 'บริการเติมยา',
      desc: 'ข้อมูลขั้นตอนการรับยาต่อเนื่อง ส่งพัสดุไปรษณีย์ถึงบ้าน',
      badge: 'ลดเวลารอ',
      action: () => onNavigate('services_refill'),
    },
    {
      id: 'card-pharmacist-consult',
      icon: UserCheck,
      iconBg: 'bg-teal-50 text-teal-600 border-teal-200',
      hoverBorder: 'hover:border-teal-300',
      title: 'ปรึกษาเภสัชกร',
      desc: 'ช่องทางติดต่อและขอรับคำปรึกษาปัญหายากับเภสัชกรโดยตรง',
      badge: 'สายด่วน & แชท',
      action: onOpenConsult,
    },
    {
      id: 'card-drug-safety',
      icon: AlertTriangle,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
      hoverBorder: 'hover:border-purple-300',
      title: 'การใช้ยาอย่างปลอดภัย',
      desc: 'ความรู้เรื่องยา การแพ้ยา อาการไม่พึงประสงค์ และการใช้ยาอย่างสมเหตุผล',
      badge: 'คู่มือความปลอดภัย',
      action: () => onNavigate('safe_rdu'),
    },
  ];

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>⚡ เมนูด่วนบริการประชาชน</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            เข้าถึงบริการทางเภสัชกรรมและข้อมูลสำคัญได้อย่างสะดวกรวดเร็ว
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              id={card.id}
              onClick={card.action}
              className={`group text-left p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${card.hoverBorder} hover:-translate-y-0.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-2xs ${card.iconBg} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1.5 flex items-center justify-between">
                  <span>{card.title}</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                <span>เข้าสู่บริการ</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
