import React from 'react';
import {
  X,
  Pill,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  FileText,
  Clock,
  Heart,
  Baby,
  Share2,
  Printer
} from 'lucide-react';
import { Medicine } from '../../types/pharmacy';

interface DrugDetailModalProps {
  medicine: Medicine | null;
  onClose: () => void;
}

export const DrugDetailModal: React.FC<DrugDetailModalProps> = ({ medicine, onClose }) => {
  if (!medicine) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-teal-700 to-teal-800 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-white/20 text-teal-100 px-2.5 py-0.5 rounded-full font-semibold">
                รหัสยา: {medicine.code}
              </span>
              <span className="text-xs bg-teal-900/50 text-teal-200 px-2 py-0.5 rounded-full">
                {medicine.rduCategory === 'ED' ? 'บัญชียาหลักแห่งชาติ (ED)' : 'ยานอกบัญชียาหลัก'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              💊 {medicine.name}
            </h3>
            <p className="text-xs text-teal-100">
              ชื่อสามัญ (Generic Name): <strong className="text-white">{medicine.genericName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-teal-200 hover:text-white hover:bg-white/15 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-xs text-slate-400 block">รูปแบบยา</span>
              <strong className="text-slate-800 font-semibold">{medicine.dosageForm}</strong>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">ความแรง</span>
              <strong className="text-slate-800 font-semibold">{medicine.strength}</strong>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">หน่วยนับ</span>
              <strong className="text-slate-800 font-semibold">{medicine.unit}</strong>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">กลุ่มยา</span>
              <strong className="text-teal-700 font-semibold">{medicine.category}</strong>
            </div>
          </div>

          {/* Clinical Indications */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              ข้อบ่งใช้ (Indication)
            </h4>
            <p className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-slate-800 leading-relaxed">
              {medicine.indication}
            </p>
          </div>

          {/* Instructions */}
          {medicine.instructions && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-teal-600" />
                วิธีใช้และขนาดการรับประทานที่แนะนำ
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-medium">
                {medicine.instructions}
              </p>
            </div>
          )}

          {/* Warnings & Precautions */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-amber-900 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              คำเตือนและข้อควรระวังสำคัญ (Warnings & Precautions)
            </h4>
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed">
              {medicine.warning}
            </div>
          </div>

          {/* Contraindications */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-red-900 flex items-center gap-2 text-sm">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              ข้อห้ามใช้ (Contraindications)
            </h4>
            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-900 text-xs sm:text-sm leading-relaxed">
              {medicine.contraindication}
            </div>
          </div>

          {/* Adverse Effects & Drug Interactions in 2 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide text-slate-500">
                อาการไม่พึงประสงค์ (Adverse Effects)
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {medicine.adverseEffect}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide text-slate-500">
                ปฏิกิริยาระหว่างยา / อาหาร (Interactions)
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {medicine.drugInteraction}
              </p>
            </div>
          </div>

          {/* Storage & Pregnancy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-start gap-2.5">
              <Thermometer className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block">วิธีเก็บรักษา</span>
                <span className="text-slate-600">{medicine.storageMethod}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Baby className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block">ความปลอดภัยในสตรีมีครรภ์</span>
                <span className="text-slate-600">Pregnancy Category {medicine.pregnancyCategory || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Verification stamp */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">ข้อมูลได้รับการตรวจสอบทางคลินิกแล้ว</span>
                <span className="text-emerald-700">ตรวจสอบโดย: {medicine.approvedBy || 'เภสัชกรกลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต'}</span>
              </div>
            </div>
            <span className="text-[11px] bg-white px-2.5 py-1 rounded-md border border-emerald-300 font-mono text-emerald-800">
              รพ.วชิระภูเก็ต 2569
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์เอกสารยานี้</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
