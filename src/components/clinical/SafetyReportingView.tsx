import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  FileSpreadsheet,
  Plus,
  CheckCircle2,
  Filter,
  BarChart2,
  Clock,
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ADRReport, MedicationError, UserRole } from '../../types/pharmacy';

interface SafetyReportingViewProps {
  adrReports: ADRReport[];
  medErrors: MedicationError[];
  onAddADR: (report: ADRReport) => void;
  onAddMedError: (error: MedicationError) => void;
  userRole: UserRole;
}

export const SafetyReportingView: React.FC<SafetyReportingViewProps> = ({
  adrReports,
  medErrors,
  onAddADR,
  onAddMedError,
  userRole
}) => {
  const [activeTab, setActiveTab] = useState<'adr' | 'med_error'>('adr');
  const [isADRFormOpen, setIsADRFormOpen] = useState(false);
  const [isErrorFormOpen, setIsErrorFormOpen] = useState(false);

  // New ADR Form State
  const [adrPatientName, setAdrPatientName] = useState('');
  const [adrHn, setAdrHn] = useState('');
  const [adrSuspectDrug, setAdrSuspectDrug] = useState('');
  const [adrDose, setAdrDose] = useState('');
  const [adrStartDate, setAdrStartDate] = useState('');
  const [adrOnsetDateTime, setAdrOnsetDateTime] = useState('');
  const [adrReactionDetail, setAdrReactionDetail] = useState('');
  const [adrTreatment, setAdrTreatment] = useState('');
  const [adrOutcome, setAdrOutcome] = useState('หายเป็นปกติ');
  const [adrNaranjoScore, setAdrNaranjoScore] = useState<number>(6);
  const [adrReporter, setAdrReporter] = useState('ภญ. ประจำหอผู้ป่วย');

  // New Med Error Form State
  const [errPatientHn, setErrPatientHn] = useState('');
  const [errStage, setErrStage] = useState<'Prescribing' | 'Transcribing' | 'Dispensing' | 'Administration'>('Dispensing');
  const [errNccMerp, setErrNccMerp] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'>('B');
  const [errDrugName, setErrDrugName] = useState('');
  const [errDescription, setErrDescription] = useState('');
  const [errRootCause, setErrRootCause] = useState('');
  const [errPreventionPlan, setErrPreventionPlan] = useState('');
  const [errReporter, setErrReporter] = useState('ภก. ห้องจ่ายยาผู้ป่วยนอก');

  const handleADRSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adrSuspectDrug || !adrReactionDetail) return;

    let probability = 'Possible';
    if (adrNaranjoScore >= 9) probability = 'Definite';
    else if (adrNaranjoScore >= 5) probability = 'Probable';
    else if (adrNaranjoScore >= 1) probability = 'Possible';
    else probability = 'Doubtful';

    const newReport: ADRReport = {
      id: 'adr-' + Date.now(),
      reportDate: new Date().toISOString().slice(0, 10),
      patientName: adrPatientName || 'ไม่ประสงค์ออกนาม',
      hn: adrHn || '6500000',
      suspectDrug: adrSuspectDrug,
      dose: adrDose || 'ตามขนาดมาตรฐาน',
      startDate: adrStartDate || '2026-08-20',
      onsetDateTime: adrOnsetDateTime || '2026-08-22',
      reactionDetail: adrReactionDetail,
      initialTreatment: adrTreatment || 'หยุดยาทันทีและให้ยาต้านฮิสตามีน',
      outcome: adrOutcome,
      naranjoScore: adrNaranjoScore,
      probabilityCategory: probability,
      reporterName: adrReporter,
      status: 'submitted'
    };

    onAddADR(newReport);
    setIsADRFormOpen(false);
    confetti({ particleCount: 60, spread: 60 });
  };

  const handleMedErrorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errDrugName || !errDescription) return;

    const newError: MedicationError = {
      id: 'err-' + Date.now(),
      incidentDate: new Date().toISOString().slice(0, 10),
      patientHn: errPatientHn || '6401928',
      errorType: errStage,
      nccMerpLevel: errNccMerp,
      drugName: errDrugName,
      description: errDescription,
      rootCause: errRootCause || 'ความคล้ายคลึงของชื่อยา (LASA) และงานจ่ายยาเร่งด่วน',
      preventionPlan: errPreventionPlan || 'ปรับแยกชั้นวางยาและเน้นย้ำ Double Check สองคน',
      reporterName: errReporter,
      status: 'investigated'
    };

    onAddMedError(newError);
    setIsErrorFormOpen(false);
    confetti({ particleCount: 60, spread: 60 });
  };

  const isStaff = userRole !== 'public';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
            Patient Safety & Quality Assurance
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          🚨 ศูนย์รายงานความปลอดภัยด้านยา (ADR & Med Error)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ระบบรายงานอาการไม่พึงประสงค์จากยา (ADR) และความคลาดเคลื่อนทางยา (Medication Error) เพื่อการพัฒนาเชิงระบบ
        </p>
      </div>

      {/* Main Mode Switches */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('adr')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'adr'
              ? 'border-rose-600 text-rose-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>ระบบรายงาน ADR (อาการไม่พึงประสงค์) ({adrReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('med_error')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'med_error'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>ระบบรายงาน Medication Error (ความคลาดเคลื่อนทางยา) ({medErrors.length})</span>
        </button>
      </div>

      {/* TAB 1: ADR REPORTING SYSTEM */}
      {activeTab === 'adr' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              การประเมินความสัมพันธ์ของเหตุการณ์ไม่พึงประสงค์กับยาตามมาตรฐาน <strong>Naranjo Algorithm</strong>
            </div>
            {isStaff && (
              <button
                onClick={() => setIsADRFormOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>เขียนรายงาน ADR ฉบับใหม่</span>
              </button>
            )}
          </div>

          {/* ADR Records Cards */}
          <div className="space-y-4">
            {adrReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 font-semibold">{report.id}</span>
                    <strong className="text-slate-900 text-sm">ผู้ป่วย: {report.patientName} (HN: {report.hn})</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full font-bold">
                      Naranjo Score: {report.naranjoScore} ({report.probabilityCategory})
                    </span>
                    <span className="text-[11px] text-slate-400">{report.reportDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block">ยาที่สงสัย:</span>
                    <strong className="text-rose-900 text-sm">{report.suspectDrug}</strong>
                    <span className="text-slate-500 text-[11px]">{report.dose}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">วันที่เริ่มยา / วันที่เกิดอาการ:</span>
                    <span>{report.startDate} ถึง {report.onsetDateTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">ผลลัพธ์การรักษา:</span>
                    <span className="text-emerald-700 font-semibold">{report.outcome}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <strong className="text-slate-900 block">รายละเอียดอาการ:</strong>
                  <p>{report.reactionDetail}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>การรักษาเบื้องต้น: {report.initialTreatment}</span>
                  <span>ผู้รายงาน: {report.reporterName}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal ADR Form */}
          {isADRFormOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-5 bg-rose-700 text-white flex items-center justify-between">
                  <h3 className="text-base font-bold">บันทึกรายงานอาการไม่พึงประสงค์จากยา (ADR Report)</h3>
                  <button onClick={() => setIsADRFormOpen(false)} className="text-white hover:text-rose-200">✕</button>
                </div>

                <form onSubmit={handleADRSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ชื่อผู้ป่วย *</label>
                      <input
                        type="text"
                        required
                        value={adrPatientName}
                        onChange={(e) => setAdrPatientName(e.target.value)}
                        placeholder="เช่น นายวิโรจน์ แซ่ลิ้ม"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">รหัส HN *</label>
                      <input
                        type="text"
                        required
                        value={adrHn}
                        onChange={(e) => setAdrHn(e.target.value)}
                        placeholder="เช่น 6401928"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ยาที่ต้องสงสัย (Suspect Drug) *</label>
                      <input
                        type="text"
                        required
                        value={adrSuspectDrug}
                        onChange={(e) => setAdrSuspectDrug(e.target.value)}
                        placeholder="เช่น Allopurinol 100 mg"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ขนาดยาและวิธีใช้</label>
                      <input
                        type="text"
                        value={adrDose}
                        onChange={(e) => setAdrDose(e.target.value)}
                        placeholder="เช่น 1 เม็ด วันละ 1 ครั้ง หลังอาหาร"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">วันที่เริ่มรับประทานยา</label>
                      <input
                        type="date"
                        value={adrStartDate}
                        onChange={(e) => setAdrStartDate(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">วันที่เริ่มเกิดอาการ</label>
                      <input
                        type="date"
                        value={adrOnsetDateTime}
                        onChange={(e) => setAdrOnsetDateTime(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">รายละเอียดอาการไม่พึงประสงค์ *</label>
                    <textarea
                      rows={3}
                      required
                      value={adrReactionDetail}
                      onChange={(e) => setAdrReactionDetail(e.target.value)}
                      placeholder="ระบุลักษณะผื่น อาการแสดง อวัยวะที่เกิดความผิดปกติ..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">คะแนน Naranjo Algorithm (0-10)</label>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={adrNaranjoScore}
                        onChange={(e) => setAdrNaranjoScore(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                      />
                      <span className="text-[10px] text-slate-400 block mt-1">
                        ≥9: Definite, 5-8: Probable, 1-4: Possible
                      </span>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ผลลัพธ์ (Outcome)</label>
                      <select
                        value={adrOutcome}
                        onChange={(e) => setAdrOutcome(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="หายเป็นปกติ">หายเป็นปกติ</option>
                        <option value="อาการทุเลาลง">อาการทุเลาลง</option>
                        <option value="ยังมีอาการอยู่">ยังมีอาการอยู่</option>
                        <option value="มีรอยโรคคงอยู่">มีรอยโรคคงอยู่</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsADRFormOpen(false)}
                      className="px-4 py-2 bg-slate-200 rounded-lg"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-bold"
                    >
                      บันทึกรายงาน ADR
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MEDICATION ERROR SYSTEM */}
      {activeTab === 'med_error' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              การจำแนกระดับความรุนแรงตามมาตรฐาน <strong>NCC MERP Category A ถึง I</strong> (A=มีโอกาสเกิด, I=เสียชีวิต)
            </div>
            {isStaff && (
              <button
                onClick={() => setIsErrorFormOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>รายงาน Med Error ฉบับใหม่</span>
              </button>
            )}
          </div>

          {/* Med Error Cards */}
          <div className="space-y-4">
            {medErrors.map((err) => (
              <div
                key={err.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 font-semibold">{err.id}</span>
                    <strong className="text-slate-900 text-sm">ยา: {err.drugName}</strong>
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium">
                      ขั้นตอน: {err.errorType} Error
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                      NCC MERP Level: {err.nccMerpLevel}
                    </span>
                    <span className="text-[11px] text-slate-400">{err.incidentDate}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-800 space-y-1">
                  <strong className="text-slate-900 block">เหตุการณ์ที่เกิดขึ้น:</strong>
                  <p className="leading-relaxed">{err.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold block">สาเหตุเชิงระบบ (Root Cause):</span>
                    <p className="text-slate-700">{err.rootCause}</p>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                    <span className="text-emerald-800 font-semibold block">แนวทางแก้ไขและป้องกัน (Prevention):</span>
                    <p className="text-emerald-950">{err.preventionPlan}</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-right pt-1">
                  รายงานโดย: {err.reporterName} (HN ผู้ป่วย: {err.patientHn})
                </div>
              </div>
            ))}
          </div>

          {/* Modal Med Error Form */}
          {isErrorFormOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-5 bg-amber-600 text-white flex items-center justify-between">
                  <h3 className="text-base font-bold">บันทึกรายงานความคลาดเคลื่อนทางยา (Medication Error)</h3>
                  <button onClick={() => setIsErrorFormOpen(false)} className="text-white hover:text-amber-200">✕</button>
                </div>

                <form onSubmit={handleMedErrorSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ขั้นตอนที่เกิดความคลาดเคลื่อน *</label>
                      <select
                        value={errStage}
                        onChange={(e) => setErrStage(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="Prescribing">Prescribing (การสั่งใช้ยาโดยแพทย์)</option>
                        <option value="Transcribing">Transcribing (การคัดลอกคำสั่งยา)</option>
                        <option value="Dispensing">Dispensing (การจัดและจ่ายยาโดยเภสัชกร)</option>
                        <option value="Administration">Administration (การบริหารยา/ให้ยาแก่ผู้ป่วย)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ระดับความรุนแรง (NCC MERP) *</label>
                      <select
                        value={errNccMerp}
                        onChange={(e) => setErrNccMerp(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                      >
                        <option value="A">Level A - มีโอกาสเกิดข้อผิดพลาด</option>
                        <option value="B">Level B - เกิดข้อผิดพลาดแต่ยังไม่ถึงผู้ป่วย (Near Miss)</option>
                        <option value="C">Level C - ถึงผู้ป่วยแต่ไม่เกิดอันตราย</option>
                        <option value="D">Level D - ถึงผู้ป่วย ต้องติดตามเฝ้าระวัง</option>
                        <option value="E">Level E - เกิดอันตรายชั่วคราว ต้องรักษา</option>
                        <option value="F">Level F - เกิดอันตรายชั่วคราว ต้องนอน รพ.</option>
                        <option value="G">Level G - เกิดอันตรายถาวร</option>
                        <option value="H">Level H - เกือบเสียชีวิต (Life-threatening)</option>
                        <option value="I">Level I - เสียชีวิต</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">ชื่อยาที่เกี่ยวข้อง *</label>
                      <input
                        type="text"
                        required
                        value={errDrugName}
                        onChange={(e) => setErrDrugName(e.target.value)}
                        placeholder="เช่น Hydralazine vs Hydroxyzine"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">รหัส HN ผู้ป่วย</label>
                      <input
                        type="text"
                        value={errPatientHn}
                        onChange={(e) => setErrPatientHn(e.target.value)}
                        placeholder="เช่น 6401928"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">รายละเอียดเหตุการณ์ *</label>
                    <textarea
                      rows={3}
                      required
                      value={errDescription}
                      onChange={(e) => setErrDescription(e.target.value)}
                      placeholder="อธิบายสิ่งที่เกิดขึ้น ขั้นตอนการตรวจพบ และการแก้ไขเฉพาะหน้า..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">สาเหตุเชิงระบบ (Root Cause)</label>
                      <input
                        type="text"
                        value={errRootCause}
                        onChange={(e) => setErrRootCause(e.target.value)}
                        placeholder="เช่น ยา Look-Alike Sound-Alike (LASA)"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">แนวทางป้องกันในอนาคต</label>
                      <input
                        type="text"
                        value={errPreventionPlan}
                        onChange={(e) => setErrPreventionPlan(e.target.value)}
                        placeholder="เช่น ปรับใช้ฉลากตัวพิมพ์ใหญ่ Tall Man Letters"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsErrorFormOpen(false)}
                      className="px-4 py-2 bg-slate-200 rounded-lg"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold"
                    >
                      บันทึกรายงาน Med Error
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
