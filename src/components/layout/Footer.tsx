import React from 'react';
import { Phone, MapPin, Mail, ShieldAlert, Heart } from 'lucide-react';
import { HOSPITAL_CONTACT_INFO } from '../../data/mockPharmacyData';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Hospital Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                💊
              </div>
              <div className="font-bold text-white text-sm font-heading">
                กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              มุ่งมั่นสู่มาตรฐานการบริบาลทางเภสัชกรรมระดับสากล เพื่อความปลอดภัยด้านยาของผู้ป่วยและประชาชนในจังหวัดภูเก็ต
            </p>
            <div className="text-[11px] text-teal-400 font-semibold">
              Vachira Phuket Hospital Pharmacy Quality System
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">บริการสำคัญ</h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <button
                  onClick={() => setCurrentTab('medicines')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  สืบค้นบัญชียาโรงพยาบาล
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('drug-safety')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  คู่มือการใช้ยาอย่างสมเหตุผล (RDU)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('refill')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  ลงทะเบียนโครงการเติมยา (Refill)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('consult')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  ปรึกษาเภสัชกรออนไลน์
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('allergies')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  ประวัติแพ้ยาและบัตรแพ้ยา
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Internal Systems */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">ระบบงานคลินิกและบริหาร</h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>
                <button
                  onClick={() => setCurrentTab('medrec')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Medication Reconciliation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('safety-reporting')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  ระบบรายงาน ADR & Med Error
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('inventory')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  คลังยาและเตือนยาใกล้หมดอายุ (FEFO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  แดชบอร์ดสรุปผลการดำเนินงาน
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('documents')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  ดาวน์โหลดแบบฟอร์มและ SOP
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">ติดต่อโรงพยาบาล</h4>
            <div className="space-y-2 text-slate-400 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{HOSPITAL_CONTACT_INFO.phoneMain} (ต่อ 1181-1185)</span>
              </div>
              <div className="p-3 bg-red-950/60 rounded-xl border border-red-800/80 text-red-200 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1 text-red-300">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>กรณีฉุกเฉินทางการแพทย์:</span>
                </div>
                <span>โทร 1669 ตลอด 24 ชั่วโมง</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต (Vachira Phuket Hospital). สงวนลิขสิทธิ์ทุกประการ
          </p>
          <p className="text-slate-400">
            ข้อมูลบนเว็บไซต์นี้มีวัตถุประสงค์เพื่อการศึกษา ไม่สามารถใช้ทดแทนการตรวจวินิจฉัยและคำสั่งแพทย์โดยตรงได้
          </p>
        </div>
      </div>
    </footer>
  );
};
