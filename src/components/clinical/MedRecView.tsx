import React, { useState } from 'react';
import {
  ClipboardList,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  User,
  Plus,
  ArrowRightLeft,
  XCircle
} from 'lucide-react';
import { MedReconciliationRecord, MedRecDrugItem, UserRole } from '../../types/pharmacy';
import { SAMPLE_MED_REC } from '../../data/mockPharmacyData';

interface MedRecViewProps {
  userRole: UserRole;
}

export const MedRecView: React.FC<MedRecViewProps> = ({ userRole }) => {
  const [records, setRecords] = useState<MedReconciliationRecord[]>([SAMPLE_MED_REC]);
  const [selectedRecord, setSelectedRecord] = useState<MedReconciliationRecord>(SAMPLE_MED_REC);
  const [searchHn, setSearchHn] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // New drug discrepancy simulation
  const [newDiscrepancyStatus, setNewDiscrepancyStatus] = useState<string>('Discrepancy - Omission');

  const isStaff = userRole !== 'public';

  const handleResolve = (index: number) => {
    const updatedItems = [...selectedRecord.items];
    updatedItems[index].status = 'Agreed / Intentional change';
    const updatedRecord = { ...selectedRecord, items: updatedItems };
    setSelectedRecord(updatedRecord);
    setRecords(records.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-violet-100 text-violet-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ClipboardList className="w-3.5 h-3.5 text-violet-700" />
            Clinical Pharmacy Quality System
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📋 ระบบประสานรายการยา (Medication Reconciliation)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          กระบวนการตรวจสอบและเปรียบเทียบรายการยาเดิมของผู้ป่วยกับยาที่แพทย์สั่งใช้ใหม่ ณ จุดเปลี่ยนผ่านการดูแล (แรกรับ ย้ายหอผู้ป่วย จำหน่าย)
        </p>
      </div>

      {/* Concept Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200 space-y-1">
          <span className="text-xs font-bold text-violet-900 block">1. สัมภาษณ์ประวัติยาเดิม (BPMH)</span>
          <p className="text-slate-600">รวบรวมยาเดิมทุกชนิดที่ผู้ป่วยใช้อยู่จริง รวมยาคลินิก ยาซื้อเอง และสมุนไพร</p>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
          <span className="text-xs font-bold text-blue-900 block">2. เปรียบเทียบกับคำสั่งใหม่</span>
          <p className="text-slate-600">เทียบรายการยา ขนาด วิธีใช้ กับคำสั่งการรักษาล่าสุดของแพทย์</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
          <span className="text-xs font-bold text-amber-900 block">3. คัดกรองความคลาดเคลื่อน</span>
          <p className="text-slate-600">จำแนกว่าเป็นการตั้งใจเปลี่ยนยา หรือเป็นความคลาดเคลื่อนที่ไม่ได้ตั้งใจ</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
          <span className="text-xs font-bold text-emerald-900 block">4. ประสานงานและปรับปรุง</span>
          <p className="text-slate-600">แจ้งแพทย์เพื่อปรับคำสั่งใช้ยาให้ถูกต้อง ก่อนส่งผลกระทบถึงผู้ป่วย</p>
        </div>
      </div>

      {/* Patient Record Information Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xl">
              👤
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{selectedRecord.patientName}</h3>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                  HN: {selectedRecord.hn}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                หอผู้ป่วย: {selectedRecord.ward} | วันที่รับบริการ: {selectedRecord.admissionDate}
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400 block">เภสัชกรผู้ดำเนินการ:</span>
            <strong className="text-violet-800 font-semibold">{selectedRecord.pharmacistName}</strong>
          </div>
        </div>

        {/* Drug Comparison Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <h4 className="font-bold text-slate-900">
              ตารางเปรียบเทียบรายการยา (Drug Comparison Sheet)
            </h4>
            <span className="text-slate-500">
              สถานะ: <strong className="text-emerald-700">Reconciled สมบูรณ์</strong>
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">ยาเดิมที่ใช้อยู่จริง (Prior to Admission)</th>
                  <th className="p-3">คำสั่งการรักษาใหม่ (New Inpatient Orders)</th>
                  <th className="p-3">สถานะความสอดคล้อง (Discrepancy Status)</th>
                  <th className="p-3">เหตุผลทางคลินิก / แผนการรักษา</th>
                  {isStaff && <th className="p-3 text-center">การจัดการ</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {selectedRecord.items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-mono text-slate-400">{index + 1}</td>
                    <td className="p-3">
                      <strong className="text-slate-900 block">{item.drugName}</strong>
                      <span className="text-slate-500 text-[11px]">{item.dosePriorToAdmission}</span>
                    </td>
                    <td className="p-3">
                      {item.newOrderDose ? (
                        <>
                          <strong className="text-slate-900 block">{item.drugName}</strong>
                          <span className="text-teal-700 font-semibold text-[11px]">
                            {item.newOrderDose}
                          </span>
                        </>
                      ) : (
                        <span className="text-red-500 italic text-[11px]">ไม่ได้สั่งยาตัวนี้ในครั้งนี้</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-block ${
                          item.status.includes('Omission') || item.status.includes('Discrepancy')
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs">{item.clinicalReason}</td>
                    {isStaff && (
                      <td className="p-3 text-center">
                        {item.status.includes('Omission') ? (
                          <button
                            onClick={() => handleResolve(index)}
                            className="px-2.5 py-1 bg-violet-700 hover:bg-violet-800 text-white rounded-md text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            ประสานแพทย์แล้ว
                          </button>
                        ) : (
                          <span className="text-emerald-700 text-[11px] font-medium flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> ผ่าน
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Summary Note */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
          <strong className="text-slate-900 block font-semibold">
            📝 บันทึกสรุปการส่งมอบข้อมูลยาของเภสัชกร (Pharmacist Discharge / Transfer Plan):
          </strong>
          <p className="leading-relaxed">
            {selectedRecord.clinicalNotes}
          </p>
        </div>
      </div>
    </div>
  );
};
