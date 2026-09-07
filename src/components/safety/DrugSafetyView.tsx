import React, { useState } from 'react';
import {
  ShieldAlert,
  Clock,
  Thermometer,
  AlertTriangle,
  HeartPulse,
  Baby,
  Users,
  CheckCircle2,
  Utensils,
  BookOpen,
  HelpCircle,
  Pill,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DrugSafetyViewProps {
  setCurrentTab?: (tab: string) => void;
}

export const DrugSafetyView: React.FC<DrugSafetyViewProps> = ({ setCurrentTab }) => {
  const [activeCategory, setActiveCategory] = useState<string>('how-to-take');

  const safetyTopics = [
    { id: 'how-to-take', label: 'การรับประทานยาให้ถูกต้อง', icon: '💊' },
    { id: 'timing', label: 'ยาก่อน/หลังอาหาร/พร้อมอาหาร', icon: '🍽️' },
    { id: 'missed-dose', label: 'การลืมรับประทานยา', icon: '⏰' },
    { id: 'storage', label: 'การเก็บรักษายาที่ถูกต้อง', icon: '❄️' },
    { id: 'interactions', label: 'ยาที่ไม่ควรใช้ร่วมกัน', icon: '⚠️' },
    { id: 'adr-vs-allergy', label: 'การแพ้ยา vs ผลข้างเคียง', icon: '🚨' },
    { id: 'special-groups', label: 'เด็ก / ผู้สูงอายุ / หญิงมีครรภ์', icon: '👶' },
    { id: 'rdu', label: 'การใช้ยาอย่างสมเหตุผล (RDU)', icon: '🌱' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
            Patient Medication Safety
          </span>
          <span className="text-xs text-slate-500">กลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          ⚠️ ระบบการใช้ยาอย่างปลอดภัย
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          คู่มือและแนวทางปฏิบัติการใช้ยาอย่างถูกต้อง ปลอดภัย และสมเหตุผล เพื่อผลการรักษาที่ดีและป้องกันอันตรายจากการใช้ยา
        </p>
      </div>

      {/* Main Container with Sidebar Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Topic Selector */}
        <div className="lg:col-span-1 space-y-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            หมวดความรู้ความปลอดภัย
          </div>
          {safetyTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveCategory(topic.id)}
              className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                activeCategory === topic.id
                  ? 'bg-teal-700 text-white font-bold shadow-sm'
                  : 'bg-white hover:bg-teal-50 text-slate-700 border border-slate-200/80 hover:border-teal-200'
              }`}
            >
              <span className="text-base">{topic.icon}</span>
              <span className="flex-1">{topic.label}</span>
            </button>
          ))}

          {/* Quick link to Allergy page */}
          <div className="pt-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                ระบบแพ้ยา (สำคัญมาก)
              </span>
              <p className="text-red-700 text-[11px] leading-relaxed">
                เรียนรู้สัญญาณเตือนแพ้ยารุนแรง และการพกบัตรแพ้ยา
              </p>
              <button
                onClick={() => setCurrentTab('allergy')}
                className="w-full mt-1 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors cursor-pointer text-center text-[11px]"
              >
                เข้าสู่ระบบข้อมูลการแพ้ยา ›
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {activeCategory === 'how-to-take' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase">Core Principle</span>
                <h2 className="text-xl font-bold text-slate-900">
                  หลัก 5 ถูก ในการรับประทานยาอย่างถูกต้อง
                </h2>
                <p className="text-xs text-slate-500">
                  กฎทองความปลอดภัยที่ผู้ป่วยและผู้ดูแลต้องตรวจสอบทุกครั้งก่อนรับประทานยา
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1">
                  <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" /> 1. ถูกคน (Right Patient)
                  </h4>
                  <p className="text-xs text-slate-600">
                    ตรวจดูชื่อ-นามสกุล บนซองยาทุกครั้ง ห้ามรับประทานยาของผู้อื่น แม้จะมีอาการป่วยคล้ายกัน
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1">
                  <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" /> 2. ถูกยา (Right Drug)
                  </h4>
                  <p className="text-xs text-slate-600">
                    ตรวจชื่อยา รูปแบบเม็ดยา สี และลักษณะของยาว่าตรงกับที่แพทย์สั่งและที่เคยได้รับหรือไม่
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1">
                  <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" /> 3. ถูกขนาด (Right Dose)
                  </h4>
                  <p className="text-xs text-slate-600">
                    รับประทานตามจำนวนเม็ดหรือมิลลิลิตรที่ระบุบนฉลาก ห้ามเพิ่มหรือลดยาเองโดยไม่ปรึกษาแพทย์
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1">
                  <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" /> 4. ถูกเวลา (Right Time)
                  </h4>
                  <p className="text-xs text-slate-600">
                    รับประทานให้ตรงเวลาและระยะห่างสม่ำเสมอ เช่น ก่อนอาหาร 30 นาที หลังอาหารทันที หรือก่อนนอน
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1 sm:col-span-2">
                  <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" /> 5. ถูกวิธี (Right Route)
                  </h4>
                  <p className="text-xs text-slate-600">
                    กลืนทั้งเม็ด เคี้ยวให้ละเอียดก่อนกลืน อมใต้ลิ้น หรือยาใช้ภายนอก (ห้ามกลืนยากลุ่มยาใช้ภายนอก)
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <strong className="text-slate-800 block">💡 ข้อแนะนำเพิ่มเติม:</strong>
                <p>• ดื่มน้ำเปล่าสะอาดตาม 1 แก้วเต็มทุกครั้ง หลีกเลี่ยงการดื่มยากับนม ชา กาแฟ หรือน้ำผลไม้</p>
                <p>• ไม่ควรแกะเม็ดยาออกจากแผงฟอยล์ล่วงหน้าเป็นเวลานาน เพราะความชื้นในอากาศอาจทำให้ยาเสื่อมสภาพ</p>
              </div>
            </div>
          )}

          {activeCategory === 'timing' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase">Meal Timing</span>
                <h2 className="text-xl font-bold text-slate-900">
                  การรับประทานยาก่อนอาหาร / หลังอาหาร / พร้อมอาหาร / ก่อนนอน
                </h2>
                <p className="text-xs text-slate-500">
                  ช่วงเวลาที่รับประทานยาส่งผลโดยตรงต่อการดูดซึมและลดการระคายเคืองกระเพาะอาหาร
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                    🍽️ ยาก่อนอาหาร (อย่างน้อย 30 - 60 นาที)
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    ควรรับประทานในขณะท้องว่าง เพื่อให้ยาถูกดูดซึมได้ดีที่สุดโดยไม่มีอาหารขัดขวาง เช่น ยาฆ่าเชื้อบางชนิด หรือเพื่อให้ยาออกฤทธิ์ก่อนอาหารเริ่มตกถึงกระเพาะ เช่น ยาลดกรดเคลือบกระเพาะ ยาแก้อาเจียน
                  </p>
                  <span className="text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-medium inline-block">
                    หากลืมทานก่อนอาหาร: ให้ข้ามไปทานหลังอาหารแล้ว 2 ชั่วโมง หรือรอทานก่อนอาหารมื้อถัดไป
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                  <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    🍚 ยาหลังอาหาร (หลังอาหาร 15 - 30 นาที)
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    เป็นช่วงเวลามาตรฐานของยาส่วนใหญ่ เพื่อให้ยาดูดซึมพร้อมกระบวนการย่อยอาหาร
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-1.5">
                  <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
                    🥩 ยาหลังอาหารทันที หรือพร้อมอาหาร
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    สำหรับยาที่มีฤทธิ์ระคายเคืองกระเพาะอาหารสูง เช่น ยาแก้ปวดข้อกล้ามเนื้อกลุ่ม NSAIDs (Ibuprofen, Diclofenac) หรือยาที่ต้องการไขมันในอาหารช่วยในการดูดซึม ห้ามทานตอนท้องว่างเด็ดขาด
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5">
                  <h4 className="font-bold text-purple-900 text-sm flex items-center gap-2">
                    🌙 ยาก่อนนอน (ก่อนเข้านอน 15 - 30 นาที)
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    สำหรับยาที่ทำให้ง่วงซึม เช่น ยาแก้แพ้ ยานอนหลับ หรือยาที่ร่างกายสังเคราะห์สารเคมีเวลากลางคืน เช่น ยาลดไขมันในเลือดกลุ่มสแตติน (Simvastatin)
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'missed-dose' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase">Missed Dose Management</span>
                <h2 className="text-xl font-bold text-slate-900">
                  ข้อปฏิบัติเมื่อลืมรับประทานยา
                </h2>
                <p className="text-xs text-slate-500">
                  หลักการจัดการอย่างปลอดภัยเพื่อคงระดับยาในเลือดและไม่ก่อให้เกิดพิษ
                </p>
              </div>

              <div className="p-4 bg-red-100/70 border-l-4 border-red-600 rounded-r-xl text-red-900 text-xs sm:text-sm font-semibold">
                ⚠️ กฎเหล็กที่สำคัญที่สุด: ห้ามรับประทานยาเพิ่มเป็น 2 เท่า หรือ "กินเบิ้ล 2 เม็ด" ในมื้อถัดไปเด็ดขาด!
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">1. ยารับประทานวันละ 1 ครั้ง (เช่น ยาความดัน, ยาไขมัน)</h4>
                  <p>
                    • ถ้านึกได้และยังไม่เกิน 12 ชั่วโมงจากเวลาเดิม ให้รับประทานทันที 1 มื้อในขนาดปกติ
                  </p>
                  <p>
                    • ถ้านึกได้ใกล้เวลาของมื้อวันถัดไป (เหลือเวลาไม่ถึง 12 ชั่วโมง) ให้ข้ามมื้อที่ลืมไป แล้วรับประทานมื้อต่อไปตามเวลาปกติ
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">2. ยารับประทานวันละ 2-3 ครั้ง (เช่น ยาปฏิชีวนะ, ยาแก้ปวด)</h4>
                  <p>
                    • ให้นึกถึง "จุดกึ่งกลางของเวลา": ถ้านึกได้ก่อนถึงกึ่งกลางเวลาที่จะต้องทานมื้อต่อไป ให้ทานทันทีที่นึกได้
                  </p>
                  <p>
                    • หากเลยกึ่งกลางเวลามาแล้ว ให้ข้ามมื้อนั้นไป แล้วรอทานมื้อถัดไปตามขนาดปกติ
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">3. กรณีพิเศษ: ยาละลายลิ่มเลือด (Warfarin)</h4>
                  <p>
                    • หากลืมทานและนึกได้ภายในวันเดียวกัน ให้ทานทันทีที่นึกได้
                  </p>
                  <p>
                    • หากข้ามวันไปแล้ว ให้ทานเฉพาะของวันใหม่ในขนาดเดิม จดบันทึกวันที่ลืมทานไว้ และแจ้งแพทย์หรือเภสัชกรคลินิกวาร์ฟารินในการเจาะเลือดครั้งต่อไป
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'storage' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase">Storage Guidelines</span>
                <h2 className="text-xl font-bold text-slate-900">
                  การเก็บรักษายาที่ถูกต้องเพื่อรักษาคุณภาพ
                </h2>
                <p className="text-xs text-slate-500">
                  ความร้อน แสงแดด และความชื้น คือศัตรูสำคัญที่ทำให้ตัวยาเสื่อมสลาย
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-2">
                  <h4 className="font-bold text-teal-900 flex items-center gap-2">
                    🏠 ยาที่เก็บอุณหภูมิห้อง (Room Temperature)
                  </h4>
                  <p className="text-slate-600">
                    เก็บในที่แห้ง ไม่โดนแดด อุณหภูมิต่ำกว่า 30°C เช่น ในตู้ยาประจำบ้าน
                  </p>
                  <span className="text-red-600 font-semibold block text-xs">
                    ❌ ห้ามเก็บยาในห้องน้ำ (ชื้นเกินไป) หรือในรถยนต์ที่จอดตากแดด
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 space-y-2">
                  <h4 className="font-bold text-cyan-900 flex items-center gap-2">
                    ❄️ ยาที่ต้องแช่เย็น (2 - 8 °C)
                  </h4>
                  <p className="text-slate-600">
                    เช่น ยาฉีดอินซูลินที่ยังไม่เปิดใช้, วัคซีน, ยาปฏิชีวนะชนิดผงละลายน้ำบางตัว
                  </p>
                  <span className="text-red-600 font-semibold block text-xs">
                    ❌ ห้ามแช่ในช่องฟรีซ (ช่องแช่แข็ง) และห้ามวางที่ฝาตู้เย็นเด็ดขาด
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">💧 ยาหยอดตา (Eye Drops)</h4>
                  <p className="text-slate-600">
                    หลังจากเปิดขวดใช้ครั้งแรก จะมีอายุการใช้งานไม่เกิน <strong>30 วัน</strong> (หรือ 1 วันสำหรับชนิดไร้สารกันเสีย) ให้เขียนวันที่เปิดขวดไว้เสมอ
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">🧴 ยาขี้ผึ้งและครีม</h4>
                  <p className="text-slate-600">
                    ปิดฝาให้สนิททุกครั้ง ไม่เก็บไว้ในที่ร้อนจนเนื้อครีมแยกชั้น หากมีกลิ่นหืน สีเปลี่ยน หรือเนื้อสัมผัสเปลี่ยนไป ให้ทิ้งทันที
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'interactions' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase">Drug & Herb Interactions</span>
                <h2 className="text-xl font-bold text-slate-900">
                  ยาและสารที่ไม่ควรใช้ร่วมกัน (Drug Interactions)
                </h2>
                <p className="text-xs text-slate-500">
                  การรับประทานยาหลายตัวพร้อมกัน หรือทานร่วมกับสมุนไพรและอาหารเสริม อาจทำให้ยาเสริมหรือหักล้างฤทธิ์กันจนเกิดอันตราย
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-red-50 rounded-xl border border-red-200">
                  <strong className="text-red-900 block font-semibold mb-1">
                    1. ยาละลายลิ่มเลือด (Warfarin) + ยาแก้ปวดกลุ่ม NSAIDs (Ibuprofen)
                  </strong>
                  <span className="text-slate-700">
                    เพิ่มความเสี่ยงต่อการเกิดแผลและเลือดออกในกระเพาะอาหารอย่างรุนแรง และทำให้เลือดหยุดยาก
                  </span>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                  <strong className="text-amber-900 block font-semibold mb-1">
                    2. ยาปฏิชีวนะ (Tetracycline, Ciprofloxacin) + ยาลดกรด / นม
                  </strong>
                  <span className="text-slate-700">
                    แคลเซียม แมกนีเซียม และอะลูมิเนียมในนมและยาลดกรด จะจับตัวกับยาปฏิชีวนะ ทำให้ยาไม่ดูดซึมและฆ่าเชื้อไม่ได้ผล ต้องเว้นห่างอย่างน้อย 2 ชั่วโมง
                  </span>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                  <strong className="text-amber-900 block font-semibold mb-1">
                    3. ยารักษาโรคเรื้อรัง + สมุนไพรและอาหารเสริม (ฟ้าทะลายโจร, โสม, แปะก๊วย)
                  </strong>
                  <span className="text-slate-700">
                    สมุนไพรหลายชนิดรบกวนเอนไซม์ในตับ อาจทำให้ระดับยารักษาโรคเบาหวาน ความดัน หรือหัวใจ ผิดเพี้ยนไป ต้องแจ้งแพทย์และเภสัชกรทุกครั้ง
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'adr-vs-allergy' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase">Allergy vs Side Effect</span>
                <h2 className="text-xl font-bold text-slate-900">
                  แยกให้ออก: การแพ้ยา (Drug Allergy) กับ ผลข้างเคียงจากยา (Side Effect)
                </h2>
                <p className="text-xs text-slate-500">
                  สองภาวะนี้มีความแตกต่างกันอย่างมาก การเข้าใจที่ถูกต้องจะช่วยป้องกันการสูญเสียโอกาสในการใช้ยาที่ดี
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-5 bg-red-50 rounded-2xl border border-red-200 space-y-3">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-base">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    การแพ้ยา (Drug Allergy)
                  </div>
                  <p className="text-slate-700">
                    เกิดจากระบบภูมิคุ้มกันของร่างกายต่อต้านตัวยา <strong>ไม่เกี่ยวกับขนาดยา</strong> แม้ได้รับยาเพียงเล็กน้อยก็อาจเกิดอาการได้
                  </p>
                  <div className="space-y-1 text-red-800 bg-white p-3 rounded-xl border border-red-200 text-xs">
                    <strong className="block font-semibold">อาการสำคัญ:</strong>
                    <p>• ผื่นคัน ลมพิษ ตาบวม ปากบวม แน่นหน้าอก</p>
                    <p>• หายใจมีเสียงหวีด ผิวหนังพุพองลอก</p>
                    <p className="text-red-600 font-bold">🚫 ต้องหยุดยาทันที และห้ามใช้ยานั้นซ้ำตลอดชีวิต!</p>
                  </div>
                </div>

                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200 space-y-3">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-base">
                    <HeartPulse className="w-5 h-5 text-blue-600" />
                    ผลข้างเคียงจากยา (Side Effect)
                  </div>
                  <p className="text-slate-700">
                    เป็นฤทธิ์ทางเภสัชวิทยาที่คาดเดาได้ของตัวยา <strong>สัมพันธ์กับขนาดยา</strong> มักทุเลาลงได้เมื่อร่างกายปรับตัว
                  </p>
                  <div className="space-y-1 text-blue-800 bg-white p-3 rounded-xl border border-blue-200 text-xs">
                    <strong className="block font-semibold">อาการพบบ่อย:</strong>
                    <p>• คลื่นไส้ มวนท้อง ง่วงนอน คอแห้ง เวียนศีรษะ</p>
                    <p>• อาการมักดีขึ้นเมื่อทานยาพร้อมอาหารหรือปรับเวลา</p>
                    <p className="text-teal-700 font-medium">💬 สามารถปรึกษาเภสัชกรเพื่อหาวิธีบรรเทาได้</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'special-groups' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase">Special Populations</span>
                <h2 className="text-xl font-bold text-slate-900">
                  การใช้ยาอย่างปลอดภัยในกลุ่มผู้ป่วยพิเศษ
                </h2>
                <p className="text-xs text-slate-500">
                  เด็ก ผู้สูงอายุ และสตรีมีครรภ์ มีสรีรวิทยาการทำงานของตับ ไต และร่างกายที่แตกต่างจากผู้ใหญ่ทั่วไป
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    👶 1. การใช้ยาในเด็ก
                  </h4>
                  <p className="text-slate-600">
                    • ขนาดยาต้องคำนวณตามน้ำหนักตัวของเด็ก ไม่ใช้การคาดเดาตามอายุ
                  </p>
                  <p className="text-slate-600">
                    • ใช้อุปกรณ์ตวงยามาตรฐาน เช่น กระบอกฉีดยา (Syringe) เท่านั้น ห้ามใช้ช้อนแกงหรือช้อนชงกาแฟ
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    👵 2. การใช้ยาในผู้สูงอายุ
                  </h4>
                  <p className="text-slate-600">
                    • การทำงานของตับและไตลดลง ทำให้ยาขับออกจากร่างกายช้าลง เสี่ยงสะสมจนเป็นพิษ
                  </p>
                  <p className="text-slate-600">
                    • ระวังภาวะความดันตกขณะลุกเปลี่ยนท่า (Orthostatic hypotension) เสี่ยงหกล้ม
                  </p>
                  <p className="text-slate-600">
                    • นำยาเดิมทุกตัวและสมุนไพรมาให้เภสัชกรตรวจเช็กความซ้ำซ้อน (Brown Bag Clinic)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    🤰 3. หญิงตั้งครรภ์และให้นมบุตร
                  </h4>
                  <p className="text-slate-600">
                    • ยาหลายชนิดสามารถผ่านรกไปยังทารกในครรภ์ หรือขับออกทางน้ำนมแม่ได้
                  </p>
                  <p className="text-slate-600">
                    • หลีกเลี่ยงยาแก้ปวดกลุ่ม NSAIDs ในไตรมาสที่สาม และห้ามใช้ยาวาร์ฟารินและยาลดไขมันสแตติน (Pregnancy Category X)
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'rdu' && (
            <div className="space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-emerald-700 uppercase">Hospital Policy</span>
                <h2 className="text-xl font-bold text-slate-900">
                  การใช้ยาอย่างสมเหตุผล (Rational Drug Use : RDU Hospital)
                </h2>
                <p className="text-xs text-slate-500">
                  นโยบายโรงพยาบาลวชิระภูเก็ต สู่การรักษาที่ปลอดภัย มีประสิทธิผล คุ้มค่า และยั่งยืน
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2 leading-relaxed">
                <p>
                  <strong>การใช้ยาอย่างสมเหตุผล หมายถึง:</strong> ผู้ป่วยได้รับยาที่เหมาะสมกับปัญหาทางคลินิก ในขนาดยาที่ตรงกับความต้องการของแต่ละคน ในระยะเวลาที่เพียงพอ และด้วยค่าใช้จ่ายที่ต่ำที่สุดต่อตัวผู้ป่วยและชุมชน
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-center">
                  <span className="text-2xl block">🤒</span>
                  <strong className="text-slate-900 block">หวัด เจ็บคอ</strong>
                  <span className="text-slate-500">ไม่จำเป็นต้องใช้ยาปฏิชีวนะ พักผ่อน ดื่มน้ำอุ่น</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-center">
                  <span className="text-2xl block">🥣</span>
                  <strong className="text-slate-900 block">ท้องเสียเฉียบพลัน</strong>
                  <span className="text-slate-500">จิบผงเกลือแร่ ORS ไม่อัดยาฆ่าเชื้อเกินจำเป็น</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-center">
                  <span className="text-2xl block">🩹</span>
                  <strong className="text-slate-900 block">แผลสด แผลตื้น</strong>
                  <span className="text-slate-500">ล้างน้ำสะอาด ใส่ยาฆ่าเชื้อภายนอก ไม่ต้องกินยาฆ่าเชื้อ</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
