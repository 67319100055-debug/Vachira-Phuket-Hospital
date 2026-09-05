import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  FileBadge,
  PhoneCall,
  CheckCircle2,
  Lock,
  Search,
  Eye,
  Plus,
  HeartCrack,
  UserCheck,
  Building2,
  HelpCircle
} from 'lucide-react';
import { UserRole } from '../../types/pharmacy';

interface AllergySafetyViewProps {
  userRole?: UserRole;
  setCurrentTab?: (tab: string) => void;
  allergyRecords?: any[];
  onAddAllergy?: (newAllergy: any) => void;
}

interface AllergyRecord {
  id: string;
  hn: string;
  patientName: string;
  drugName: string;
  genericName: string;
  reaction: string;
  severity: 'Severe' | 'Moderate' | 'Mild';
  assessedDate: string;
  assessedBy: string;
  hasCard: boolean;
}

export const AllergySafetyView: React.FC<AllergySafetyViewProps> = ({ userRole, setCurrentTab }) => {
  const [activeTab, setActiveTab] = useState<'education' | 'internal_registry'>('education');
  const [internalSearchHn, setInternalSearchHn] = useState('');

  // Sample internal clinical registry records
  const [allergyRecords, setAllergyRecords] = useState<AllergyRecord[]>([
    {
      id: 'al-01',
      hn: '6409812',
      patientName: 'นางกาญจนา มงคลสุข',
      drugName: 'Allopurinol 100 mg',
      genericName: 'Allopurinol',
      reaction: 'ผื่น Maculopapular rash รุนแรง ลอกทั้งตัว เข้าเกณฑ์ SJS',
      severity: 'Severe',
      assessedDate: '2026-09-01',
      assessedBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
      hasCard: true
    },
    {
      id: 'al-02',
      hn: '6312450',
      patientName: 'นายประสิทธิ์ แซ่ตัน',
      drugName: 'Amoxicillin 500 mg',
      genericName: 'Amoxicillin',
      reaction: 'Angioedema ริมฝีปากบวม ลมพิษ แน่นหน้าอกเฉียบพลัน',
      severity: 'Severe',
      assessedDate: '2025-11-12',
      assessedBy: 'ภญ. พรรณพร สุขเกษม (ภ.21045)',
      hasCard: true
    },
    {
      id: 'al-03',
      hn: '6520119',
      patientName: 'นายสุรชัย วงศ์สว่าง',
      drugName: 'Diclofenac 25 mg/mL Injection',
      genericName: 'Diclofenac',
      reaction: 'หลอดลมตีบ หายใจมีเสียงหวีด Anaphylactoid reaction',
      severity: 'Severe',
      assessedDate: '2026-03-18',
      assessedBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
      hasCard: true
    }
  ]);

  const isStaff = userRole !== 'public';

  const filteredRecords = allergyRecords.filter((rec) => {
    if (!internalSearchHn.trim()) return true;
    return (
      rec.hn.includes(internalSearchHn.trim()) ||
      rec.patientName.includes(internalSearchHn.trim()) ||
      rec.drugName.toLowerCase().includes(internalSearchHn.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-red-100 text-red-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            ระบบความปลอดภัยทางยาขั้นวิกฤต
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          ⚠️ ระบบการแพ้ยา (Drug Allergy Safety)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ความรู้และข้อควรระวังเรื่องการแพ้ยา สัญญาณเตือนอันตราย และการป้องกันการแพ้ยาซ้ำอย่างเด็ดขาด
        </p>
      </div>

      {/* Tabs between Public Knowledge and Internal Hospital Registry */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('education')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'education'
              ? 'border-red-600 text-red-700'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>แนวทางปฏิบัติและความรู้สำหรับประชาชน</span>
        </button>

        <button
          onClick={() => setActiveTab('internal_registry')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'internal_registry'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>ระบบบันทึกประวัติแพ้ยา (เฉพาะบุคลากรทางการแพทย์)</span>
          {isStaff ? (
            <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-medium">
              เข้าถึงได้
            </span>
          ) : (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
              จำกัดสิทธิ์
            </span>
          )}
        </button>
      </div>

      {activeTab === 'education' ? (
        <div className="space-y-8">
          {/* Emergency Alert Banner */}
          <div className="bg-red-500 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-red-600 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-white text-red-700 text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Emergency Alert
              </span>
              <span className="text-red-100 text-xs">พบแพทย์ทันทีหากมีอาการเหล่านี้</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              🚨 อาการแพ้ยารุนแรงเฉียบพลันที่ต้องมาโรงพยาบาลทันที!
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-white/15 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1">
                <strong className="text-white block text-sm font-semibold">1. หายใจไม่ออก แน่นหน้าอก</strong>
                <span className="text-red-100">มีเสียงหวีดในลำคอ หายใจติดขัด (Anaphylaxis)</span>
              </div>
              <div className="bg-white/15 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1">
                <strong className="text-white block text-sm font-semibold">2. ริมฝีปากบวม หน้าบวม หนังตาบวม</strong>
                <span className="text-red-100">บวมกลืนน้ำลายลำบาก (Angioedema)</span>
              </div>
              <div className="bg-white/15 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1">
                <strong className="text-white block text-sm font-semibold">3. ผิวหนังลอก แผลในปาก ตาแดง</strong>
                <span className="text-red-100">ผื่นแดงไหม้พุพองคล้ายน้ำร้อนลวก (SJS / TEN)</span>
              </div>
            </div>
            <p className="text-xs text-red-100 pt-1">
              * ให้หยุดยาทันที และนำซองยาทั้งหมดที่รับประทานมาติดต่อห้องฉุกเฉิน โรงพยาบาลวชิระภูเก็ต หรือโทร <strong className="text-white font-bold underline">1669</strong> ตลอด 24 ชม.
            </p>
          </div>

          {/* 4 Informative Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: การพกบัตรแพ้ยา และการแจ้งประวัติ */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                  💳
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    การพกบัตรแพ้ยา (Drug Allergy Card)
                  </h3>
                  <p className="text-xs text-slate-500">ยึดถือเป็นเอกสารสำคัญประจำตัว</p>
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-2.5 leading-relaxed">
                <p>
                  • เมื่อได้รับการวินิจฉัยว่าแพ้ยา เภสัชกรจะออก <strong>"บัตรแพ้ยา"</strong> ที่ระบุชื่อสามัญทางยา ลักษณะอาการ และระดับความรุนแรง
                </p>
                <p>
                  • <strong>ต้องพกบัตรติดตัวเสมอในกระเป๋าสตางค์</strong> หรือบันทึกภาพถ่ายไว้ในโทรศัพท์มือถือ
                </p>
                <p>
                  • ยื่นบัตรแพ้ยาให้แพทย์ พยาบาล และเภสัชกรดูทุกครั้งก่อนรับการตรวจรักษาหรือซื้อยาทุกแห่ง
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <FileBadge className="w-4 h-4 text-amber-700 shrink-0" />
                <span>หากบัตรแพ้ยาสูญหาย ติดต่อขอออกบัตรใหม่ได้ที่ห้องจ่ายยาผู้ป่วยนอก รพ.วชิระภูเก็ต</span>
              </div>
            </div>

            {/* Box 2: 5 สิ่งสำคัญที่ต้องแจ้งเภสัชกร */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl">
                  📋
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    5 สิ่งที่ต้องแจ้งเภสัชกรทุกครั้ง
                  </h3>
                  <p className="text-xs text-slate-500">เพื่อความปลอดภัยสูงสุดในการรับยา</p>
                </div>
              </div>

              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 shrink-0">1.</span>
                  <span>ประวัติแพ้ยาในอดีต (ชื่อยา และอาการที่เคยเกิดขึ้น)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 shrink-0">2.</span>
                  <span>โรคประจำตัว เช่น โรคไต โรคตับ โรคหัวใจ หรือโรคหอบหืด</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 shrink-0">3.</span>
                  <span>ภาวะตั้งครรภ์ วางแผนจะมีบุตร หรือกำลังให้นมบุตร</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 shrink-0">4.</span>
                  <span>ยาเดิมที่กำลังรับประทานอยู่ทั้งหมด เพื่อป้องกันยาตีกัน</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 shrink-0">5.</span>
                  <span>อาหารเสริม สมุนไพร หรือวิตามินที่รับประทานเป็นประจำ</span>
                </li>
              </ul>
            </div>

            {/* Box 3: การอ่านฉลากยาและการสังเกตชื่อสามัญ */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl">
                  🔍
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    การอ่านฉลากยาและชื่อสามัญทางยา
                  </h3>
                  <p className="text-xs text-slate-500">ป้องกันการได้รับยาตัวเดิมในชื่อการค้าใหม่</p>
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <p>
                  ยาหนึ่งชนิดอาจมีชื่อการค้า (Brand Name) ได้มากมาย เช่น <em>Paracetamol</em> มีชื่อการค้าทั้ง Sara, Tylenol, Paracet, Cemol
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs">
                  <div className="text-slate-400 text-[11px]">ตัวอย่างฉลากยา รพ.วชิระภูเก็ต:</div>
                  <div className="font-bold text-slate-900 text-sm">Amoxicillin 500 mg Capsule</div>
                  <div className="text-teal-700">ชื่อสามัญ: Amoxicillin trihydrate</div>
                </div>
                <p>
                  ผู้ป่วยต้องจำ <strong>"ชื่อสามัญ (Generic Name)"</strong> ที่ตนเองแพ้เสมอ ไม่จำเฉพาะชื่อการค้า
                </p>
              </div>
            </div>

            {/* Box 4: การป้องกันการแพ้ยาซ้ำและการแพ้ข้ามกลุ่ม */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    การป้องกันการแพ้ยาซ้ำ & การแพ้ข้ามกลุ่ม
                  </h3>
                  <p className="text-xs text-slate-500">Cross-reactivity ในยากลุ่มที่มีโครงสร้างเคมีคล้ายกัน</p>
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <p>
                  ตัวอย่างการแพ้ข้ามกลุ่มที่พบบ่อย:
                </p>
                <div className="space-y-1.5 bg-rose-50/60 p-3 rounded-xl border border-rose-200 text-xs">
                  <div>
                    <strong className="text-rose-950 block">กลุ่มเพนิซิลลินและเซฟาโลสปอริน:</strong>
                    <span>หากแพ้ Penicillin หรือ Amoxicillin อาจมีโอกาสแพ้ยา Cephalexin, Ceftriaxone ได้</span>
                  </div>
                  <div>
                    <strong className="text-rose-950 block">กลุ่มยาแก้ปวดลดการอักเสบ (NSAIDs):</strong>
                    <span>หากแพ้ Ibuprofen อาจแพ้ยาตัวอื่นในกลุ่ม เช่น Mefenamic acid, Naproxen ได้</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  * ต้องให้แพทย์และเภสัชกรประเมินโครงสร้างโมเลกุลยาก่อนสั่งใช้ทุกครั้ง
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INTERNAL HOSPITAL ALLERGY REGISTRY (ROLE-BASED VIEW) */
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-teal-400" />
                <h3 className="text-lg font-bold">
                  ระบบบันทึกประวัติแพ้ยาผู้ป่วยภายใน (Hospital Clinical Allergy Registry)
                </h3>
              </div>
              <span className="text-xs bg-teal-800/80 text-teal-200 px-3 py-1 rounded-full font-semibold border border-teal-700">
                ระดับการเข้าถึง: บุคลากรทางการแพทย์ (HIS Integration)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              🔒 ตามมาตรฐานความปลอดภัยทางคลินิกและ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) ระบบนี้สงวนไว้สำหรับบุคลากรของโรงพยาบาลเท่านั้น เพื่อค้นหาและประเมินประวัติการแพ้ยาของผู้ป่วย
            </p>
          </div>

          {!isStaff ? (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center space-y-4">
              <Lock className="w-12 h-12 text-amber-600 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-amber-900">
                  ต้องใช้สิทธิ์เภสัชกรหรือเจ้าหน้าที่ในการเข้าถึงข้อมูลประวัติการแพ้ยา
                </h4>
                <p className="text-xs text-amber-700 max-w-md mx-auto">
                  ท่านกำลังเข้าสู่ระบบในมุมมอง "ประชาชนทั่วไป" ซึ่งไม่สามารถเข้าถึงประวัติข้อมูลผู้ป่วยได้ หากท่านเป็นบุคลากร กรุณาเปลี่ยนสิทธิ์ที่มุมขวาบนของหน้าเว็บ
                </p>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                (ท่านสามารถสลับเป็น 'เภสัชกร' ที่แถบด้านบนเพื่อทดสอบการใช้งานระบบนี้ได้ทันที)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search Bar for Staff */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={internalSearchHn}
                    onChange={(e) => setInternalSearchHn(e.target.value)}
                    placeholder="ค้นหาด้วยรหัส HN หรือชื่อยาที่แพ้ (เช่น 6409812, Amoxicillin, Allopurinol)..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div className="text-xs text-slate-500 shrink-0">
                  พบข้อมูลแพ้ยา: <strong className="text-teal-700">{filteredRecords.length}</strong> รายการ
                </div>
              </div>

              {/* Records Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-3">รหัส HN</th>
                        <th className="p-3">ชื่อ-นามสกุลผู้ป่วย</th>
                        <th className="p-3">ยาที่แพ้</th>
                        <th className="p-3">ลักษณะอาการแพ้</th>
                        <th className="p-3">ความรุนแรง</th>
                        <th className="p-3">วันที่บันทึก</th>
                        <th className="p-3">เภสัชกรผู้ประเมิน</th>
                        <th className="p-3 text-center">บัตรแพ้ยา</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-teal-800">{rec.hn}</td>
                          <td className="p-3 font-medium">{rec.patientName}</td>
                          <td className="p-3">
                            <strong className="text-slate-900 block">{rec.drugName}</strong>
                            <span className="text-[11px] text-slate-400 font-mono">{rec.genericName}</span>
                          </td>
                          <td className="p-3 max-w-xs">{rec.reaction}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                rec.severity === 'Severe'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {rec.severity === 'Severe' ? 'รุนแรง (Severe)' : 'ปานกลาง'}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500">{rec.assessedDate}</td>
                          <td className="p-3 text-[11px]">{rec.assessedBy}</td>
                          <td className="p-3 text-center">
                            {rec.hasCard ? (
                              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium">
                                ออกบัตรแล้ว
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">ยังไม่มีบัตร</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
