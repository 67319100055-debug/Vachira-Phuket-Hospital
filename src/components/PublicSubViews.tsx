import React, { useState } from 'react';
import {
  DrugItem,
  NewsItem,
  KnowledgeArticle,
  DocumentDownload,
  PublicNavSection,
} from '../types';
import {
  Pill,
  AlertTriangle,
  ClipboardList,
  BookOpen,
  Newspaper,
  FileText,
  PhoneCall,
  ArrowLeft,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building,
  HeartHandshake,
  Package,
  FileCheck
} from 'lucide-react';
import { CONTACT_INFO } from '../data/initialData';

interface PublicSubViewsProps {
  section: PublicNavSection;
  onBackHome: () => void;
  drugs: DrugItem[];
  news: NewsItem[];
  articles: KnowledgeArticle[];
  documents: DocumentDownload[];
  onOpenDrugDetail: (drug: DrugItem) => void;
  onOpenArticleDetail: (article: KnowledgeArticle) => void;
  onOpenNewsDetail: (item: NewsItem) => void;
}

export const PublicSubViews: React.FC<PublicSubViewsProps> = ({
  section,
  onBackHome,
  drugs,
  news,
  articles,
  documents,
  onOpenDrugDetail,
  onOpenArticleDetail,
  onOpenNewsDetail,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const renderContent = () => {
    switch (section) {
      // -------------------------------------------------------------
      // ข้อมูลยา: รายการยา / บัญชียา
      // -------------------------------------------------------------
      case 'drugs_all':
      case 'drugs_search': {
        const filtered = drugs.filter(
          (d) =>
            d.genericName.toLowerCase().includes(filterQuery.toLowerCase()) ||
            d.tradeName.toLowerCase().includes(filterQuery.toLowerCase()) ||
            d.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
            d.indications.toLowerCase().includes(filterQuery.toLowerCase())
        );

        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Pill className="w-6 h-6 text-emerald-600" />
                    <span>รายการยาและบัญชียาโรงพยาบาล</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    บัญชียาหลักแห่งชาติและยามาตรฐาน กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต
                  </p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อยา หรือสรรพคุณ..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-900 font-semibold uppercase tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">ชื่อยาสามัญ (Generic Name)</th>
                      <th className="py-3 px-4">ชื่อการค้า (Trade Name)</th>
                      <th className="py-3 px-4">หมวดหมู่</th>
                      <th className="py-3 px-4">ขนาดยา / รูปแบบ</th>
                      <th className="py-3 px-4">สรรพคุณเบื้องต้น</th>
                      <th className="py-3 px-4 text-center">ดูวิธีใช้</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((d) => (
                      <tr key={d.id} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {d.genericName}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{d.tradeName}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium">
                            {d.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{d.strength}</td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {d.indications}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => onOpenDrugDetail(d)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium"
                          >
                            ดูข้อมูลยา
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // ข้อมูลยา: วิธีใช้ยา
      // -------------------------------------------------------------
      case 'drugs_usage': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>คำแนะนำวิธีใช้ยาที่ถูกต้อง</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ข้อปฏิบัติการรับประทานยาและใช้อุปกรณ์ทางการแพทย์อย่างถูกต้องเพื่อผลการรักษาที่ดีที่สุด
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <h3 className="font-bold text-sm text-emerald-950 mb-2">⏰ ยาก่อนอาหาร</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    รับประทานก่อนอาหาร 30 - 60 นาที ขณะท้องว่าง เพื่อให้ตัวยาดูดซึมได้ดีที่สุด หากลืมรับประทาน ให้ข้ามไปรับประทานมื้อถัดไปก่อนอาหาร ห้ามรับประทานหลังอาหารทันที
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                  <h3 className="font-bold text-sm text-blue-950 mb-2">🍲 ยาหลังอาหาร</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    รับประทานหลังอาหาร 15 - 30 นาที หรือหลังอาหารทันทีสำหรับยาที่ระคายเคืองกระเพาะอาหาร (เช่น ยาแก้ปวดข้อ NSAIDs)
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
                  <h3 className="font-bold text-sm text-purple-950 mb-2">🌙 ยาก่อนนอน</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    รับประทานก่อนนอน 15 - 30 นาที เหมาะสำหรับยาที่ทำให้ง่วงซึม เช่น ยาแก้แพ้ หรือยาลดไขมันในเลือดบางชนิดที่ออกฤทธิ์ได้ดีในเวลากลางคืน
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                  <h3 className="font-bold text-sm text-amber-950 mb-2">💊 ยารับประทานเมื่อมีอาการ</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    รับประทานเฉพาะเมื่อมีอาการเท่านั้น เช่น ยาลดไข้ ยาแก้ปวด และควรเว้นระยะเวลาตามที่ระบุบนฉลากอย่างน้อย 4 - 6 ชั่วโมง เมื่ออาการดีขึ้นสามารถหยุดยาได้
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // ข้อมูลยา: คำเตือนและข้อควรระวัง
      // -------------------------------------------------------------
      case 'drugs_warning': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <span>คำเตือนและข้อควรระวังในการใช้ยา</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ข้อควรระวังสำคัญเพื่อหลีกเลี่ยงอันตรายต่อร่างกายและการเกิดพิษจากยา
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-950 text-sm">การใช้ยาแก้ปวดกลุ่ม NSAIDs</h4>
                    <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                      เช่น ไอบูโพรเฟน ไดโคลฟีแนค ต้องรับประทานหลังอาหารทันที ดื่มน้ำตามมากๆ ห้ามใช้ในผู้ป่วยโรคแผลในกระเพาะอาหาร โรคไตวาย หรือสตรีมีครรภ์
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-950 text-sm">การใช้ยาพาราเซตามอลเกินขนาด</h4>
                    <p className="text-xs text-red-900 mt-1 leading-relaxed">
                      ไม่ควรรับประทานเกินครั้งละ 1,000 มก. (2 เม็ด) และไม่เกิน 4,000 มก. (8 เม็ด) ต่อวัน การรับประทานติดต่อกันนานอาจทำให้ตับวายได้
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">ยาที่ต้องรับประทานจนหมดชุด (ยาปฏิชีวนะ)</h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      ยาฆ่าเชื้อแบคทีเรียต้องรับประทานติดต่อกันจนหมดตามคำสั่งแพทย์ แม้จะรู้สึกหายดีแล้วก็ตาม เพื่อป้องกันปัญหาเชื้อดื้อยา
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // ข้อมูลยา: ปฏิกิริยาระหว่างยา (Drug Interactions)
      // -------------------------------------------------------------
      case 'drugs_interactions': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
                <span>ปฏิกิริยาระหว่างยา (Drug Interactions)</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ยาตีกัน อาหารตีกับยา และสมุนไพรที่มีผลต่อระดับยาในร่างกาย
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                  <div className="font-bold text-slate-900 text-sm mb-1">
                    🩸 ยาวาร์ฟาริน (Warfarin) กับ ผักใบเขียว & แปะก๊วย โสม
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ผักใบเขียวเข้มมีวิตามินเคสูง ต้านฤทธิ์ยาวาร์ฟารินทำให้เลือดแข็งตัวง่ายขึ้น ส่วนแปะก๊วย โสม ขิง เพิ่มฤทธิ์ต้านการแข็งตัวของเลือด เสี่ยงต่อภาวะเลือดออกผิดปกติ
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                  <div className="font-bold text-slate-900 text-sm mb-1">
                    🥛 ยาฆ่าเชื้อบางชนิด (เช่น Ciprofloxacin, Doxycycline) กับ นมและแคลเซียม
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    แคลเซียมในนมและยาลดกรดจะจับกับตัวยา ทำให้ยาไม่ดูดซึม ควรเว้นระยะห่างอย่างน้อย 2 ชั่วโมง
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
                  <div className="font-bold text-slate-900 text-sm mb-1">
                    🍺 ยาฆ่าเชื้อ Metronidazole กับ เครื่องดื่มแอลกอฮอล์
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เกิดปฏิกิริยาคล้าย Disulfiram ทำให้หน้าแดง แน่นหน้าอก อาเจียนรุนแรง หายใจลำบาก ห้ามดื่มแอลกอฮอล์ระหว่างทานยาและหลังหยุดยา 3 วัน
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // การใช้ยาอย่างปลอดภัย: การใช้ยาอย่างสมเหตุผล (RDU)
      // -------------------------------------------------------------
      case 'safe_rdu': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <span>การใช้ยาอย่างสมเหตุผล (Rational Drug Use - RDU)</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                โรงพยาบาลส่งเสริมการใช้ยาอย่างสมเหตุผล เพื่อความปลอดภัย คุ้มค่า และลดความเสี่ยงจากการใช้ยาเกินจำเป็น
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-2xl mb-2">🤧</div>
                  <h4 className="font-bold text-emerald-950 text-sm mb-1">
                    1. โรคหวัด น้ำมูกไหล
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ร้อยละ 80 เกิดจากเชื้อไวรัส ไม่จำเป็นต้องใช้ยาปฏิชีวนะ (ยาฆ่าเชื้อ) พักผ่อน ดื่มน้ำอุ่น อาการจะดีขึ้นเองใน 7-10 วัน
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200">
                  <div className="text-2xl mb-2">🤢</div>
                  <h4 className="font-bold text-teal-950 text-sm mb-1">
                    2. ท้องเสียเฉียบพลัน
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    การรักษาหลักคือการชดเชยน้ำและเกลือแร่ (ORS) ไม่จำเป็นต้องกินยาฆ่าเชื้อหรือยาหยุดถ่ายทันที เพื่อให้ร่างกายขับสารพิษออก
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                  <div className="text-2xl mb-2">🩹</div>
                  <h4 className="font-bold text-blue-950 text-sm mb-1">
                    3. บาดแผลสดทั่วไป
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ล้างแผลด้วยน้ำสะอาดและน้ำเกลือปราศจากเชื้อ ปิดแผลสะอาด ไม่จำเป็นต้องรับประทานยาฆ่าเชื้อ ยกเว้นแผลสกปรกมากหรือมีอาการอักเสบติดเชื้อ
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // การใช้ยาอย่างปลอดภัย: การแพ้ยา (Drug Allergy)
      // -------------------------------------------------------------
      case 'safe_allergy': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
                <span>การแพ้ยา (Drug Allergy) และบัตรแพ้ยา</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                รู้จักอาการแพ้ยา การสังเกตตนเอง และความสำคัญของการพกบัตรแพ้ยา
              </p>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 mb-6">
                <h4 className="font-bold text-rose-950 text-sm mb-1">🚨 สัญญาณเตือนอาการแพ้ยารุนแรง:</h4>
                <ul className="text-xs text-rose-900 list-disc list-inside space-y-1 mt-2">
                  <li>ริมฝีปากบวม หนังตาบวม หน้าบวม</li>
                  <li>ผื่นลมพิษ ผื่นแดงคันกระจายทั่วตัว</li>
                  <li>หายใจติดขัด หอบเหนื่อย เสียงแหบ</li>
                  <li>ผิวหนังพุพอง หลุดลอก มีแผลในช่องปาก (สตีเวนส์จอห์นสัน)</li>
                </ul>
                <div className="mt-3 text-xs font-bold text-rose-900">
                  * หากพบอาการเหล่านี้ ให้หยุดยาทันทีและรีบนำตัวส่งห้องฉุกเฉินโรงพยาบาลที่ใกล้ที่สุด
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-2">💳 บัตรแพ้ยา โรงพยาบาลวชิระภูเก็ต</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ผู้ที่มีประวัติแพ้ยาจะได้รับบัตรแพ้ยาจากกลุ่มงานเภสัชกรรม กรุณาพกติดตัวเสมอ และแสดงบัตรแพ้ยาแก่แพทย์ ทันตแพทย์ หรือเภสัชกรทุกครั้งก่อนรับการรักษาหรือซื้อยา
                </p>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // การใช้ยาอย่างปลอดภัย: อาการไม่พึงประสงค์จากยา (ADR)
      // -------------------------------------------------------------
      case 'safe_adr': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <span>การเฝ้าระวังอาการไม่พึงประสงค์จากยา (ADR)</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ระบบเฝ้าระวังความปลอดภัยด้านยา และการรายงานอาการไม่พึงประสงค์จากการใช้ยา
              </p>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  อาการไม่พึงประสงค์จากยา (Adverse Drug Reaction: ADR) คือ การตอบสนองต่อยาที่เป็นอันตรายและไม่ได้ตั้งใจ ซึ่งเกิดขึ้นในขนาดปกติที่ใช้ในมนุษย์
                </p>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="font-bold text-emerald-950 mb-1">
                    หน้าที่ของศูนย์เฝ้าระวังความปลอดภัยด้านยา รพ.วชิระภูเก็ต:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-emerald-900">
                    <li>รับแจ้งและประเมินรายงานการแพ้ยาและอาการข้างเคียง</li>
                    <li>ออกบัตรแพ้ยาอิเล็กทรอนิกส์และบัตรพกติดตัว</li>
                    <li>ส่งรายงานต่อศูนย์เฝ้าระวังความปลอดภัยด้านยา สำนักงานคณะกรรมการอาหารและยา (อย.)</li>
                    <li>ตรวจสอบความปลอดภัยก่อนแพทย์สั่งยาผ่านระบบแจ้งเตือน Alert ในโรงพยาบาล</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // บริการเภสัชกรรม: ผู้ป่วยนอก (OPD)
      // -------------------------------------------------------------
      case 'services_opd': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Building className="w-6 h-6 text-emerald-600" />
                <span>บริการเภสัชกรรมผู้ป่วยนอก (OPD Pharmacy)</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                บริการจัดและส่งมอบยาแก่ผู้ป่วยนอก ณ ชั้น 1 อาคารผู้ป่วยนอก โรงพยาบาลวชิระภูเก็ต
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">ห้องจ่ายยาหลัก 1-5</h4>
                  <p className="text-slate-600">
                    ให้บริการผู้ป่วยสิทธิประกันสุขภาพถ้วนหน้า (บัตรทอง 30 บาท), ประกันสังคม, ข้าราชการ และผู้ป่วยชำระเงิน
                  </p>
                  <div className="text-emerald-700 font-semibold">เปิดบริการ: 08.00 - 20.00 น.</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">จุดคัดกรองและให้คำปรึกษาด่วน</h4>
                  <p className="text-slate-600">
                    ตรวจสอบสิทธิบัตรคิว ให้คำแนะนำการใช้ยาเฉพาะทาง และจัดคิวพิเศษสำหรับผู้สูงอายุและผู้พิการ
                  </p>
                  <div className="text-emerald-700 font-semibold">ช่องบริการลำดับความสำคัญพิเศษ</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // บริการเภสัชกรรม: ผู้ป่วยใน (IPD)
      // -------------------------------------------------------------
      case 'services_ipd': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <HeartHandshake className="w-6 h-6 text-teal-600" />
                <span>บริการเภสัชกรรมผู้ป่วยใน (IPD Pharmacy)</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ดูแลความปลอดภัยด้านยาสำหรับผู้ป่วยที่พักรักษาตัวในหอผู้ป่วยตลอด 24 ชั่วโมง
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">ระบบจัดยาวันต่อวัน (Unit Dose System):</span>
                  จัดยาเฉพาะบุคคลในแต่ละมื้อ เพิ่มความถูกต้อง ลดความคลาดเคลื่อนทางยา
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">ห้องผสมยาเคมีบำบัดและสารอาหารทางหลอดเลือด (IV Admixture):</span>
                  ห้องสะอาดมาตรฐาน Cleanroom ระดับสากล ปราศจากเชื้อ ป้องกันการปนเปื้อน
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">เภสัชกรประจำหอผู้ป่วย (Ward Pharmacist):</span>
                  ร่วมตรวจเยี่ยมผู้ป่วยกับทีมแพทย์ ปรับขนาดยาตามการทำงานของไตและตับ
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // บริการเภสัชกรรม: บริบาลเภสัชกรรม (Clinical Pharmacy)
      // -------------------------------------------------------------
      case 'services_care': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
                <span>บริบาลเภสัชกรรม (คลินิกเฉพาะทาง)</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                บริการให้คำปรึกษาและติดตามผลการใช้ยาในกลุ่มโรคเฉพาะที่มีความซับซ้อน
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">❤️ คลินิกวาร์ฟาริน (Warfarin Clinic)</h4>
                  <p className="text-xs text-slate-600">
                    ติดตามค่าการแข็งตัวของเลือด (INR) ปรับขนาดยา และแนะนำอาหารที่ควรหลีกเลี่ยง
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">🫁 คลินิกโรคหืดและปอดอุดกั้นเรื้อรัง</h4>
                  <p className="text-xs text-slate-600">
                    สอนและประเมินเทคนิคการสูดยาพ่น เพื่อให้ผู้ป่วยได้รับยาอย่างเต็มที่
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">🩺 คลินิกเบาหวานและความดันโลหิตสูง</h4>
                  <p className="text-xs text-slate-600">
                    แนะนำการฉีดอินซูลิน การเก็บรักษายา และการป้องกันภาวะน้ำตาลในเลือดต่ำ
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">🧬 คลินิกโรคไตเรื้อรัง (CKD Clinic)</h4>
                  <p className="text-xs text-slate-600">
                    ปรับขนาดยาให้เหมาะสมกับค่าการทำงานของไต และหลีกเลี่ยงยาที่เป็นพิษต่อไต
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // บริการเภสัชกรรม: บริการเติมยา (Refill)
      // -------------------------------------------------------------
      case 'services_refill': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Package className="w-6 h-6 text-amber-600" />
                <span>บริการเติมยาและจัดส่งยาทางไปรษณีย์ (Vachira Med Post)</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                อำนวยความสะดวกให้ผู้ป่วยโรคเรื้อรังที่อาการคงที่ ไม่ต้องเดินทางมารอรับยาที่โรงพยาบาล
              </p>

              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 mb-6">
                <h4 className="font-bold text-amber-950 text-sm mb-2">
                  คุณสมบัติผู้มีสิทธิใช้บริการ:
                </h4>
                <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                  <li>เป็นผู้ป่วยโรคเรื้อรังที่มีนัดพบแพทย์ต่อเนื่อง และอาการคงที่</li>
                  <li>แพทย์ประเมินและเห็นชอบให้รับยาทางไปรษณีย์หรือร้านยาใกล้บ้านได้</li>
                  <li>ไม่ใช่ยาที่ต้องควบคุมอุณหภูมิพิเศษระดับสูง หรือยาเสพติดให้โทษประเภท 2</li>
                  <li>แจ้งความประสงค์ล่วงหน้าก่อนยาหมด 5-7 วันทำการ</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">ช่องทางที่ 1: ส่งพัสดุไปรษณีย์ด่วน (EMS)</span>
                  จัดส่งถึงหน้าบ้าน มีรหัส Tracking ตรวจสอบสถานะการขนส่งได้ทุกขั้นตอน
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">ช่องทางที่ 2: รับยาที่ร้านยาคุณภาพใกล้บ้าน</span>
                  โครงการความร่วมมือกับร้านขายยาในจังหวัดภูเก็ต รับคำปรึกษาจากเภสัชกรชุมชนฟรี
                </div>
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // ความรู้เรื่องยา: หน้ารวมบทความ
      // -------------------------------------------------------------
      case 'knowledge': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <span>คลังบทความความรู้เรื่องยา</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                บทความสุขภาพและการใช้ยาที่ถูกต้อง เขียนและตรวจสอบโดยเภสัชกรโรงพยาบาลวชิระภูเก็ต
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onOpenArticleDetail(art)}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-3">{art.icon}</div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                        {art.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mt-2 mb-1">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{art.summary}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                      <span>อ่านเพิ่มเติม</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // ข่าวสารกิจกรรม
      // -------------------------------------------------------------
      case 'news': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Newspaper className="w-6 h-6 text-blue-600" />
                <span>ข่าวสารและกิจกรรมกลุ่มงานเภสัชกรรม</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ข่าวสาร ประชาสัมพันธ์ และกิจกรรมส่งเสริมสุขภาพ
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenNewsDetail(item)}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    <div className="aspect-16/9 bg-slate-100 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.summary}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-700">
                        อ่านข่าวฉบับเต็ม →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // เอกสารดาวน์โหลด
      // -------------------------------------------------------------
      case 'documents': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <FileText className="w-6 h-6 text-emerald-600" />
                <span>เอกสารดาวน์โหลด & แบบฟอร์ม</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                แบบฟอร์มขอรับบริการ คู่มือการใช้ยา และเอกสารวิชาการสำหรับประชาชนและบุคลากร
              </p>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between gap-4 bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs shrink-0">
                        {doc.fileType}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                          <span>หมวดหมู่: {doc.category}</span>
                          <span>ขนาด: {doc.fileSize}</span>
                          <span>ดาวน์โหลดแล้ว {doc.downloads.toLocaleString()} ครั้ง</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={doc.url}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`จำลองการดาวน์โหลดไฟล์: ${doc.title}`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shrink-0 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // -------------------------------------------------------------
      // ติดต่อเรา
      // -------------------------------------------------------------
      case 'contact': {
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <PhoneCall className="w-6 h-6 text-amber-600" />
                <span>ช่องทางติดต่อกลุ่มงานเภสัชกรรม</span>
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ติดต่อสอบถามข้อมูลการใช้ยา ติดตามพัสดุยา หรือนัดหมายรับคำปรึกษา
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 text-sm block mb-1">📍 ที่ตั้ง</span>
                    <p className="text-slate-600 leading-relaxed">{CONTACT_INFO.address}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 text-sm block mb-2">📞 หมายเลขโทรศัพท์</span>
                    <ul className="space-y-2">
                      {CONTACT_INFO.phones.map((p, i) => (
                        <li key={i} className="flex justify-between pb-1 border-b border-slate-200/60">
                          <span className="text-slate-600">{p.label}:</span>
                          <a href={`tel:${p.number}`} className="font-semibold text-emerald-700 hover:underline">
                            {p.number}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 text-sm block mb-2">🕐 เวลาทำการ</span>
                    <div className="space-y-2">
                      {CONTACT_INFO.hours.map((h, idx) => (
                        <div key={idx} className="pb-1.5 border-b border-slate-200/60 last:border-0">
                          <div className="font-bold text-slate-800">{h.day}</div>
                          <div className="text-emerald-700">{h.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                    <h4 className="font-bold text-emerald-950 text-sm mb-1">
                      โทรปรึกษาเภสัชกรสายด่วน
                    </h4>
                    <p className="text-emerald-800 mb-3 text-xs">
                      กดปุ่มเพื่อติดต่อเจ้าหน้าที่ห้องจ่ายยาได้ทันที
                    </p>
                    <a
                      href="tel:076361234"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-xs"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>076-361234 (ต่อ 1234)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="my-6">
      {/* Back to Home Button */}
      <button
        onClick={onBackHome}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>← กลับหน้าแรก</span>
      </button>

      {renderContent()}
    </div>
  );
};
