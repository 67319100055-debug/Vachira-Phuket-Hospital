import React, { useState } from 'react';
import {
  Building2,
  Bed,
  FlaskConical,
  HeartPulse,
  Wind,
  Droplet,
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface PharmacyServicesViewProps {
  setCurrentTab: (tab: string) => void;
}

export const PharmacyServicesView: React.FC<PharmacyServicesViewProps> = ({ setCurrentTab }) => {
  const [activeSection, setActiveSection] = useState<'opd' | 'ipd' | 'production'>('opd');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
            Clinical Pharmacy Services
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          🏥 บริการทางเภสัชกรรม (Pharmacy Services)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ครอบคลุมการบริการผู้ป่วยนอก ผู้ป่วยใน คลินิกเฉพาะทาง และงานเตรียมยาปลอดเชื้อมาตรฐานระดับสากล
        </p>
      </div>

      {/* Main Tab Switches */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveSection('opd')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
            activeSection === 'opd'
              ? 'bg-teal-800 text-white border-teal-800 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl ${
            activeSection === 'opd' ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-700'
          }`}>
            🏥
          </div>
          <div>
            <h3 className="text-sm font-bold">1. บริการเภสัชกรรมผู้ป่วยนอก (OPD)</h3>
            <p className={`text-[11px] ${activeSection === 'opd' ? 'text-teal-200' : 'text-slate-500'}`}>
              ห้องจ่ายยา คลินิกเฉพาะทาง และคิวรับยา
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveSection('ipd')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
            activeSection === 'ipd'
              ? 'bg-teal-800 text-white border-teal-800 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl ${
            activeSection === 'ipd' ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700'
          }`}>
            🛏️
          </div>
          <div>
            <h3 className="text-sm font-bold">2. บริการเภสัชกรรมผู้ป่วยใน (IPD)</h3>
            <p className={`text-[11px] ${activeSection === 'ipd' ? 'text-teal-200' : 'text-slate-500'}`}>
              เภสัชกรประจำวอร์ด และระบบ Unit Dose
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveSection('production')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
            activeSection === 'production'
              ? 'bg-teal-800 text-white border-teal-800 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl ${
            activeSection === 'production' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
          }`}>
            🧪
          </div>
          <div>
            <h3 className="text-sm font-bold">3. บริการผลิตและเตรียมยาเฉพาะราย</h3>
            <p className={`text-[11px] ${activeSection === 'production' ? 'text-teal-200' : 'text-slate-500'}`}>
              เคมีบำบัด TPN และยาผสมเฉพาะคราว
            </p>
          </div>
        </button>
      </div>

      {/* SECTION 1: OPD SERVICES */}
      {activeSection === 'opd' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-teal-700 uppercase">Outpatient Pharmacy (OPD)</span>
              <h2 className="text-xl font-bold text-slate-900">
                บริการห้องจ่ายยาผู้ป่วยนอก โรงพยาบาลวชิระภูเก็ต
              </h2>
              <p className="text-xs text-slate-500">
                ให้บริการตรวจสอบคำสั่งใช้ยา จัดยา และให้คำแนะนำการใช้ยาแก่ผู้มารับบริการตลอด 24 ชั่วโมง
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-teal-800 text-sm block">📍 ห้องจ่ายยาผู้ป่วยนอก 1</span>
                <p className="text-slate-600">
                  ชั้น 1 อาคารคุณพุ่ม บริการผู้ป่วยคลินิกอายุรกรรม, ศัลยกรรม, และคลินิกเฉพาะทาง
                </p>
                <div className="text-[11px] text-slate-400">เปิดบริการ: 07:30 - 20:30 น.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-teal-800 text-sm block">📍 ห้องจ่ายยาผู้ป่วยนอก 2</span>
                <p className="text-slate-600">
                  ชั้น 2 อาคารคุณพุ่ม บริการผู้ป่วยคลินิกกุมารเวชกรรม, สูติ-นรีเวชกรรม, และจักษุ
                </p>
                <div className="text-[11px] text-slate-400">เปิดบริการ: 08:00 - 16:30 น.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-teal-800 text-sm block">🚨 ห้องจ่ายยาอุบัติเหตุ-ฉุกเฉิน (ER)</span>
                <p className="text-slate-600">
                  ชั้น 1 อาคารอุบัติเหตุ ให้บริการผู้ป่วยฉุกเฉินและผู้ป่วยนอกนอกเวลาราชการ
                </p>
                <div className="text-[11px] text-red-600 font-semibold">เปิดบริการ: ตลอด 24 ชั่วโมง</div>
              </div>
            </div>

            {/* Specialized Outpatient Pharmacy Clinics */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                คลินิกบริบาลทางเภสัชกรรมเฉพาะทาง (Specialized Pharmacy Clinics)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-red-950 font-bold text-sm">
                    <HeartPulse className="w-4 h-4 text-red-600" />
                    คลินิกวาร์ฟาริน (Warfarin Clinic)
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    ติดตามค่าการแข็งตัวของเลือด (INR) ประเมินภาวะเลือดออกผิดปกติ ตรวจสอบปฏิกิริยาระหว่างยาวาร์ฟารินกับยาอื่น/อาหาร/สมุนไพร และปรับขนาดยาร่วมกับแพทย์
                  </p>
                </div>

                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-sky-950 font-bold text-sm">
                    <Wind className="w-4 h-4 text-sky-600" />
                    คลินิกโรคหอบหืดและปอดอุดกั้นเรื้อรัง (Asthma/COPD)
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    ฝึกสอนและประเมินเทคนิคการใช้ยาพ่นชนิดต่างๆ (MDI, Accuhaler, Turbuhaler) เพื่อให้ผู้ป่วยได้รับยาเข้าสู่ปอดอย่างมีประสิทธิภาพสูงสุด
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                    <Droplet className="w-4 h-4 text-amber-600" />
                    คลินิกโรคไตเรื้อรัง (CKD Pharmacy Clinic)
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    ปรับขนาดยาตามค่าการทำงานของไต (eGFR / CrCl) ให้คำแนะนำการจำกัดอาหาร หลีกเลี่ยงยาที่มีพิษต่อไต เช่น ยาแก้ปวดกลุ่ม NSAIDs
                  </p>
                </div>

                <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
                    <Activity className="w-4 h-4 text-purple-600" />
                    คลินิกผู้ป่วยติดเชื้อเรื้อรัง (HIV & TB Clinic)
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    ส่งเสริมความร่วมมือในการรับประทานยาต้านไวรัสอย่างสม่ำเสมอ (Adherence) จัดการอาการข้างเคียงของยา และป้องกันเชื้อดื้อยา
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: IPD SERVICES */}
      {activeSection === 'ipd' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-indigo-700 uppercase">Inpatient Pharmacy (IPD)</span>
              <h2 className="text-xl font-bold text-slate-900">
                บริการเภสัชกรรมผู้ป่วยใน และเภสัชกรประจำหอผู้ป่วย
              </h2>
              <p className="text-xs text-slate-500">
                ดูแลความปลอดภัยด้านยาอย่างใกล้ชิดตลอด 24 ชั่วโมง โดยทีมเภสัชกรคลินิกประจำวอร์ด
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-lg">
                  👨‍⚕️
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  บทบาทเภสัชกรประจำหอผู้ป่วย (Ward Pharmacist)
                </h4>
                <ul className="text-slate-600 space-y-2 text-xs">
                  <li>• ร่วมราวน์วอร์ดกับแพทย์และทีมสหสาขาวิชาชีพทุกเช้า</li>
                  <li>• ตรวจสอบความถูกต้องและเหมาะสมของขนาดยา คำนวณตามน้ำหนักและค่าการทำงานของอวัยวะ</li>
                  <li>• ติดตามผลการรักษาและอาการไม่พึงประสงค์จากการใช้ยาอย่างต่อเนื่อง</li>
                  <li>• ให้คำปรึกษาแก่พยาบาลเกี่ยวกับการบริหารยา ความเข้ากันได้ของยาฉีด และอัตราการให้ยาทางหลอดเลือด</li>
                  <li>• สัมภาษณ์ประวัติยาเดิมแรกรับ (Medication Reconciliation) และวางแผนการใช้ยาก่อนจำหน่ายกลับบ้าน</li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
                  📦
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  ระบบยาแบบ 1 มื้อ (Unit Dose Drug Distribution System)
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  โรงพยาบาลวชิระภูเก็ตใช้ระบบจ่ายยารายมื้อสำหรับผู้ป่วยในทุกเตียง
                  โดยเม็ดยาจะถูกบรรจุในซองปิดสนิทเฉพาะมื้อ มีฉลากบาร์โค้ดระบุชื่อยา ขนาดยา ชื่อผู้ป่วย และเวลาที่ต้องรับประทาน
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs text-slate-700">
                  <strong className="text-teal-800 block">ประโยชน์ของระบบ Unit Dose:</strong>
                  <p>✓ ลดความคลาดเคลื่อนทางยา (Medication Error) ได้มากกว่า 80%</p>
                  <p>✓ ป้องกันการปนเปื้อนของเม็ดยา</p>
                  <p>✓ ควบคุมสต็อกและตรวจสอบย้อนกลับได้แม่นยำ 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: PRODUCTION & STERILE COMPOUNDING */}
      {activeSection === 'production' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-purple-700 uppercase">Sterile & Non-sterile Compounding</span>
              <h2 className="text-xl font-bold text-slate-900">
                งานผลิตยาและเตรียมยาเฉพาะราย (Aseptic Compounding)
              </h2>
              <p className="text-xs text-slate-500">
                มาตรฐานห้องสะอาด Cleanroom Class 100 / ISO Class 5 ภายใต้ระบบควบคุมแรงดันและความชื้น
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2.5">
                <span className="text-2xl block">🧬</span>
                <h4 className="font-bold text-purple-950 text-sm">
                  1. การผสมยาเคมีบำบัด (Chemotherapy Admixture)
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  ผสมในตู้ Biological Safety Cabinet (BSC Class II Type B2) ควบคุมความดันลบ ป้องกันการฟุ้งกระจายของสารพิษต่อผู้ปฏิบัติงานและสิ่งแวดล้อม
                </p>
              </div>

              <div className="p-5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2.5">
                <span className="text-2xl block">🍼</span>
                <h4 className="font-bold text-purple-950 text-sm">
                  2. การเตรียมสารอาหารทางหลอดเลือดดำ (TPN)
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  เตรียมสารอาหารครบถ้วน (Total Parenteral Nutrition) สำหรับทารกแรกเกิดน้ำหนักน้อย และผู้ป่วยวิกฤตที่ไม่สามารถรับอาหารทางเดินอาหารได้
                </p>
              </div>

              <div className="p-5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2.5">
                <span className="text-2xl block">🧪</span>
                <h4 className="font-bold text-purple-950 text-sm">
                  3. การผลิตยาน้ำและยาทาเฉพาะคราว (Extemporaneous)
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  ดัดแปลงรูปแบบยาสำหรับผู้ป่วยเด็กที่กลืนเม็ดยาไม่ได้ เช่น การบดและเตรียมยาน้ำเชื่อมชนิดปราศจากน้ำตาล และยาทาโรคผิวหนังสูตรเฉพาะ
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
