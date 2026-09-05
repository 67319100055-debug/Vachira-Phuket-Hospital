import React, { useState } from 'react';
import {
  MessageCircleQuestion,
  Send,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Image,
  Upload,
  Filter,
  ShieldCheck,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PharmacistConsultation, UserRole } from '../../types/pharmacy';

interface PharmacistConsultViewProps {
  consultations?: PharmacistConsultation[];
  onAddConsultation?: (newConsult: PharmacistConsultation) => void;
  onAnswerConsultation?: (id: string, answer: string, pharmacistName: string) => void;
  userRole?: UserRole;
}

export const PharmacistConsultView: React.FC<PharmacistConsultViewProps> = ({
  consultations = [],
  onAddConsultation,
  onAnswerConsultation,
  userRole = 'public'
}) => {
  const [activeTab, setActiveTab] = useState<'ask' | 'answered'>('ask');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('วิธีรับประทานยา');
  const [question, setQuestion] = useState('');
  const [imageAttached, setImageAttached] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Pharmacist answering state
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [pharmacistAnswerText, setPharmacistAnswerText] = useState('');

  const isStaffOrPharmacist = userRole === 'pharmacist' || userRole === 'admin';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageAttached(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !question) return;

    const newConsult: PharmacistConsultation = {
      id: 'consult-' + Date.now(),
      patientName,
      phone,
      category,
      question,
      imageUrl: imageAttached || undefined,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    if (onAddConsultation) onAddConsultation(newConsult);
    setSubmittedSuccess(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  const handleAnswerSubmit = (consultId: string) => {
    if (!pharmacistAnswerText.trim()) return;
    if (onAnswerConsultation) {
      onAnswerConsultation(
        consultId,
        pharmacistAnswerText,
        'ภก. ประจำคลินิกให้คำปรึกษา รพ.วชิระภูเก็ต'
      );
    }
    setAnsweringId(null);
    setPharmacistAnswerText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-teal-700" />
            Online Pharmacist Consultation
          </span>
          <span className="text-xs text-slate-500">กลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          👨‍⚕️ บริการปรึกษาเภสัชกรออนไลน์
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ส่งคำถามเรื่องยา การใช้ยา ผลข้างเคียง หรือแนบภาพซองยา/เม็ดยาเพื่อสอบถามเภสัชกรโรงพยาบาลโดยตรง
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => {
            setActiveTab('ask');
            setSubmittedSuccess(false);
          }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'ask'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>ส่งคำถามเรื่องยา</span>
        </button>

        <button
          onClick={() => setActiveTab('answered')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'answered'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>คำถามและคำตอบจากเภสัชกร ({consultations.length})</span>
        </button>
      </div>

      {activeTab === 'ask' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ask Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {submittedSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">ส่งคำถามเรียบร้อยแล้ว!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  เภสัชกรกลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต จะทำการตรวจสอบข้อมูลยาและติดต่อกลับตามเบอร์โทรศัพท์ที่ท่านระบุ หรือตอบกลับในระบบภายใน 24 ชม.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setQuestion('');
                      setImageAttached(null);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    ส่งคำถามเพิ่มเติม
                  </button>
                  <button
                    onClick={() => setActiveTab('answered')}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold"
                  >
                    ดูรายการคำถาม
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-4 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    แบบฟอร์มส่งคำถามเรื่องยา (ข้อมูลจะถูกเก็บเป็นความลับ)
                  </h3>
                  <p className="text-slate-500">
                    ตอบโดยทีมเภสัชกรคลินิกและเภสัชกรจ่ายยา โรงพยาบาลวชิระภูเก็ต
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      ชื่อ - นามสกุล หรือชื่อเล่น *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="เช่น คุณสมชาย"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      เบอร์โทรศัพท์สำหรับติดต่อกลับ *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="เช่น 081-234-5678"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    หมวดหมู่คำถาม *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  >
                    <option value="วิธีรับประทานยา">วิธีรับประทานยา / การใช้ยาเฉพาะทาง</option>
                    <option value="การลืมรับประทานยา">ลืมรับประทานยา ต้องทำอย่างไร</option>
                    <option value="อาการไม่พึงประสงค์">สงสัยผลข้างเคียงจากยา / อาการแพ้ยา</option>
                    <option value="ยาตีกันและปฏิกิริยาระหว่างยา">ยาตีกัน / ทานร่วมกับอาหารเสริมหรือสมุนไพร</option>
                    <option value="การเก็บรักษายา">การเก็บรักษายา / ยาหมดอายุ</option>
                    <option value="อื่นๆ">คำถามอื่นๆ เกี่ยวกับยา</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    คำถามหรือข้อสงสัยเกี่ยวกับยา *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="พิมพ์ชื่อยา อาการ หรือข้อสงสัยของท่านอย่างละเอียด เช่น รับประทานยา Amlodipine แล้วมีอาการข้อเท้าบวมทั้งสองข้าง เป็นผลข้างเคียงของยาหรือไม่..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white leading-relaxed"
                  />
                </div>

                {/* File / Photo Upload */}
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-semibold">
                    แนบภาพถ่ายเม็ดยา หรือซองยา (ถ้ามี)
                  </label>
                  <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center gap-2">
                    {imageAttached ? (
                      <div className="space-y-2">
                        <img
                          src={imageAttached}
                          alt="ภาพยาที่แนบ"
                          className="h-32 object-contain rounded-lg border border-slate-200 mx-auto"
                        />
                        <button
                          type="button"
                          onClick={() => setImageAttached(null)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          ลบรูปภาพ
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-400" />
                        <div className="text-xs text-slate-600">
                          <label className="text-teal-700 font-bold hover:underline cursor-pointer">
                            คลิกเพื่อเลือกไฟล์รูปภาพ
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <span> หรือถ่ายภาพซองยา</span>
                        </div>
                        <span className="text-[10px] text-slate-400">รองรับไฟล์ JPG, PNG</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งคำถามถึงเภสัชกร</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Sidebar Note */}
          <div className="space-y-6">
            <div className="bg-teal-50 rounded-2xl border border-teal-200 p-6 space-y-3 text-xs text-teal-950">
              <h4 className="font-bold text-sm flex items-center gap-2 text-teal-900">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                คำแนะนำและข้อตกลงการให้บริการ
              </h4>
              <p className="leading-relaxed">
                • การให้คำปรึกษาออนไลน์มีวัตถุประสงค์เพื่อแนะนำการใช้ยาเบื้องต้น ไม่สามารถทดแทนการตรวจวินิจฉัยโรคโดยแพทย์ได้
              </p>
              <p className="leading-relaxed">
                • หากมีอาการรุนแรงเฉียบพลัน เช่น แน่นหน้าอก หายใจไม่ออก หน้ามืด หมดสติ กรุณามาพบแพทย์ที่ห้องฉุกเฉินทันที
              </p>
              <p className="leading-relaxed">
                • โทรสายด่วนฉุกเฉิน: <strong className="text-red-700 font-bold">1669</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 text-sm">เวลาทำการตอบคำถาม</h4>
              <p>วันจันทร์ - ศุกร์: 08:30 - 16:30 น.</p>
              <p>คำถามนอกเวลาทำการจะได้รับการตอบกลับในวันทำการถัดไป</p>
            </div>
          </div>
        </div>
      ) : (
        /* Answered Questions Tab */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>รายการคำถามที่ได้รับการบันทึกในระบบ:</span>
            {isStaffOrPharmacist && (
              <span className="text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                โหมดเภสัชกร: ท่านสามารถคลิก "ตอบคำถามนี้" เพื่อตอบกลับผู้ป่วยได้
              </span>
            )}
          </div>

          <div className="space-y-4">
            {consultations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
              >
                {/* Question Info Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      ผู้ถาม: {item.patientName.slice(0, 3)}*** (เบอร์: {item.phone.slice(0, 3)}***)
                    </span>
                    <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.createdAt}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        item.status === 'answered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status === 'answered' ? 'ตอบแล้ว' : 'รอเภสัชกรตอบ'}
                    </span>
                  </div>
                </div>

                {/* Question body */}
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  ❓ "{item.question}"
                </div>

                {/* Attached Image Preview */}
                {item.imageUrl && (
                  <div className="pt-1">
                    <span className="text-[11px] text-slate-400 block mb-1">ภาพที่แนบ:</span>
                    <img
                      src={item.imageUrl}
                      alt="ภาพแนบ"
                      className="h-28 object-contain rounded-lg border border-slate-200 bg-slate-50"
                    />
                  </div>
                )}

                {/* Pharmacist Answer */}
                {item.status === 'answered' && item.answer ? (
                  <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>คำตอบจาก: {item.answeredBy || 'เภสัชกร รพ.วชิระภูเก็ต'}</span>
                      {item.answeredAt && (
                        <span className="text-[10px] font-normal text-slate-500">({item.answeredAt})</span>
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-6">
                      {item.answer}
                    </p>
                  </div>
                ) : (
                  /* Pending state */
                  <div>
                    {isStaffOrPharmacist ? (
                      answeringId === item.id ? (
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-300 space-y-3">
                          <label className="block text-xs font-bold text-slate-800">
                            พิมพ์คำตอบจากเภสัชกร:
                          </label>
                          <textarea
                            rows={3}
                            value={pharmacistAnswerText}
                            onChange={(e) => setPharmacistAnswerText(e.target.value)}
                            placeholder="ระบุคำแนะนำทางเภสัชกรรม ขนาดยา และการปฏิบัติตน..."
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setAnsweringId(null)}
                              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                            >
                              ยกเลิก
                            </button>
                            <button
                              onClick={() => handleAnswerSubmit(item.id)}
                              className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-xs"
                            >
                              ส่งคำตอบ
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setAnsweringId(item.id);
                            setPharmacistAnswerText('');
                          }}
                          className="text-xs px-3 py-1.5 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors"
                        >
                          + ตอบคำถามนี้ (เภสัชกร)
                        </button>
                      )
                    ) : (
                      <p className="text-xs text-amber-700 italic">
                        ⏳ คำถามนี้อยู่ระหว่างเภสัชกรค้นหาข้อมูลและเตรียมคำตอบ...
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
