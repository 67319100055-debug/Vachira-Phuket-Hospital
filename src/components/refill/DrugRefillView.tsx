import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  Phone,
  Search,
  Truck,
  Building2,
  Store,
  HelpCircle,
  QrCode,
  AlertCircle,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RefillRequest } from '../../types/pharmacy';
import { HOSPITAL_CONTACT_INFO } from '../../data/mockPharmacyData';

interface DrugRefillViewProps {
  refills?: RefillRequest[];
  refillRequests?: RefillRequest[];
  onAddRefill?: (newRefill: RefillRequest) => void;
  userRole?: string;
}

export const DrugRefillView: React.FC<DrugRefillViewProps> = ({
  refills,
  refillRequests,
  onAddRefill
}) => {
  const allRefills = refills || refillRequests || [];
  const [activeTab, setActiveTab] = useState<'register' | 'track' | 'guideline'>('register');
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResult, setTrackResult] = useState<RefillRequest | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Registration Form State
  const [patientName, setPatientName] = useState('');
  const [cid, setCid] = useState('');
  const [hn, setHn] = useState('');
  const [phone, setPhone] = useState('');
  const [clinic, setClinic] = useState('คลินิกเบาหวานและความดันโลหิตสูง');
  const [deliveryType, setDeliveryType] = useState<'postal' | 'pharmacy' | 'hospital'>('postal');
  const [deliveryDetail, setDeliveryDetail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
  const [submittedRequestNumber, setSubmittedRequestNumber] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !hn || !phone) return;

    const reqNum = 'RF-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(100 + Math.random() * 900);
    const newRequest: RefillRequest = {
      id: 'refill-' + Date.now(),
      requestNumber: reqNum,
      patientName,
      cid: cid || '1839900000000',
      hn,
      phone,
      clinic,
      deliveryType,
      deliveryDetail: deliveryDetail || (deliveryType === 'hospital' ? 'ช่องจ่ายยาเบอร์ 8 จุดเติมยาด่วน' : 'ที่อยู่ตามระบบเวชระเบียน'),
      registeredDate: new Date().toISOString().slice(0, 10),
      appointmentDate: appointmentDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      status: 'pending',
      note: 'ลงทะเบียนออนไลน์ รอเภสัชกรคัดกรองใบสั่งยาและผลตรวจ'
    };

    if (onAddRefill) onAddRefill(newRequest);
    setSubmittedRequestNumber(reqNum);
    setIsSuccessSubmitted(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const handleSearchTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const q = trackQuery.trim();
    if (!q) {
      setTrackResult(null);
      return;
    }

    const found = allRefills.find(
      (r) => r.hn === q || r.requestNumber.toLowerCase() === q.toLowerCase() || r.phone === q
    );
    setTrackResult(found || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-emerald-700" />
            โครงการเติมยาผู้ป่วยโรคเรื้อรัง
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📦 บริการเติมยา (Drug Refill Project)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          อำนวยความสะดวกให้ผู้ป่วยโรคเรื้อรังที่มีอาการคงที่ สามารถรับยาเดิมต่อเนื่องได้โดยไม่ต้องรอคิวตรวจ
        </p>
      </div>

      {/* Hospital Condition Warning Banner */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 flex items-start gap-3.5 text-xs text-amber-900 leading-relaxed shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-sm font-bold text-amber-950 block">
            ข้อกำหนดสำคัญของโครงการเติมยา รพ.วชิระภูเก็ต:
          </strong>
          <p>
            • ผู้ป่วยสามารถลงทะเบียนล่วงหน้าได้ <strong>"ไม่เกิน 1 วัน"</strong> ก่อนถึงวันนัดหมาย
          </p>
          <p>
            • ต้องเป็นผู้ป่วยโรคเรื้อรังที่มีอาการคงที่ ไม่มีอาการผิดปกติ ผลการตรวจเลือด/ค่าไต/น้ำตาลสะสมอยู่ในเกณฑ์ที่แพทย์อนุญาตให้รับยาเดิมได้
          </p>
          <p>
            • สอบถามข้อมูลเพิ่มเติมโทร: <strong className="text-slate-900">076-361234 ต่อ 1183–1184</strong> (กลุ่มงานเภสัชกรรม)
          </p>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-4">
        <button
          id="tab-refill-register"
          onClick={() => {
            setActiveTab('register');
            setIsSuccessSubmitted(false);
          }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'register'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>ลงทะเบียนขอเติมยาออนไลน์</span>
        </button>

        <button
          id="tab-refill-track"
          onClick={() => setActiveTab('track')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'track'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>ตรวจสอบสถานะการเติมยา (HN / เลขคำขอ)</span>
        </button>

        <button
          id="tab-refill-guideline"
          onClick={() => setActiveTab('guideline')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'guideline'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>ขั้นตอน / เงื่อนไข และ FAQ</span>
        </button>
      </div>

      {/* Tab 1: Registration Form */}
      {activeTab === 'register' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {isSuccessSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">ลงทะเบียนขอเติมยาสำเร็จ!</h3>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-slate-700 max-w-md mx-auto space-y-1">
                  <div>
                    หมายเลขคำขอของคุณ: <strong className="text-emerald-800 font-mono text-sm">{submittedRequestNumber}</strong>
                  </div>
                  <div>ผู้ขอรับยา: {patientName} (HN: {hn})</div>
                  <div>คลินิก: {clinic}</div>
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  เภสัชกรกำลังตรวจสอบประวัติการรักษาและใบสั่งยา หากได้รับการอนุมัติ ท่านสามารถนำรหัสคำขอนี้มาตรวจสอบสถานะการจัดส่งได้ที่เมนู "ตรวจสอบสถานะการเติมยา"
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSuccessSubmitted(false);
                      setPatientName('');
                      setCid('');
                      setHn('');
                      setPhone('');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    ลงทะเบียนคำขอใหม่
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('track');
                      setTrackQuery(hn);
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold"
                  >
                    ตรวจสอบสถานะทันที
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    แบบฟอร์มขอรับยาเติมล่วงหน้า (ไม่เกิน 1 วันก่อนวันนัด)
                  </h3>
                  <p className="text-slate-500">กรุณากรอกข้อมูลตามบัตรประชาชนและใบนัดของโรงพยาบาลวชิระภูเก็ต</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      ชื่อ - นามสกุล ผู้ป่วย *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="เช่น นายวิชัย สุวรรณรัตน์"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      เลขประจำตัวผู้ป่วย (HN) *
                    </label>
                    <input
                      type="text"
                      required
                      value={hn}
                      onChange={(e) => setHn(e.target.value)}
                      placeholder="เช่น 6301289 (ดูได้จากบัตร รพ. หรือใบนัด)"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      เลขประจำตัวประชาชน 13 หลัก
                    </label>
                    <input
                      type="text"
                      value={cid}
                      maxLength={13}
                      onChange={(e) => setCid(e.target.value)}
                      placeholder="เช่น 1839900123456"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      เบอร์โทรศัพท์ที่ติดต่อได้สะดวก *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="เช่น 081-998-1122"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      คลินิกที่นัดหมาย
                    </label>
                    <select
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    >
                      <option value="คลินิกเบาหวานและความดันโลหิตสูง">คลินิกเบาหวานและความดันโลหิตสูง</option>
                      <option value="คลินิกอายุรกรรมโรคหัวใจ">คลินิกอายุรกรรมโรคหัวใจ</option>
                      <option value="คลินิกอายุรกรรมระบบทางเดินหายใจ">คลินิกอายุรกรรมระบบทางเดินหายใจ</option>
                      <option value="คลินิกจิตเวช">คลินิกจิตเวช</option>
                      <option value="คลินิกผู้สูงอายุ">คลินิกผู้สูงอายุ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      วันที่นัดหมายตามใบนัด (ล่วงหน้าไม่เกิน 1 วัน) *
                    </label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Delivery Type Option */}
                <div className="space-y-2 pt-2">
                  <label className="block text-slate-800 font-bold">
                    เลือกช่องทางการรับยาที่ต้องการ:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
                        deliveryType === 'postal'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryType"
                        value="postal"
                        checked={deliveryType === 'postal'}
                        onChange={() => setDeliveryType('postal')}
                        className="sr-only"
                      />
                      <Truck className="w-5 h-5 text-emerald-600" />
                      <span>ส่งยาทางไปรษณีย์ (EMS)</span>
                      <span className="text-[10px] text-slate-500 font-normal">จัดส่งตรงถึงบ้านใน จ.ภูเก็ต</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
                        deliveryType === 'pharmacy'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryType"
                        value="pharmacy"
                        checked={deliveryType === 'pharmacy'}
                        onChange={() => setDeliveryType('pharmacy')}
                        className="sr-only"
                      />
                      <Store className="w-5 h-5 text-teal-600" />
                      <span>รับยาที่ร้านยาใกล้บ้าน</span>
                      <span className="text-[10px] text-slate-500 font-normal">ร้านยาเครือข่าย 45 แห่ง</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
                        deliveryType === 'hospital'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryType"
                        value="hospital"
                        checked={deliveryType === 'hospital'}
                        onChange={() => setDeliveryType('hospital')}
                        className="sr-only"
                      />
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span>รับที่โรงพยาบาล</span>
                      <span className="text-[10px] text-slate-500 font-normal">ช่องทางด่วน ไม่ต้องรอคิวตรวจ</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {deliveryType === 'postal'
                      ? 'ที่อยู่สำหรับจัดส่งพัสดุไปรษณีย์ *'
                      : deliveryType === 'pharmacy'
                      ? 'ชื่อร้านยาใกล้บ้านที่ต้องการรับยา *'
                      : 'หมายเหตุเพิ่มเติม (ถ้ามี)'}
                  </label>
                  <input
                    type="text"
                    value={deliveryDetail}
                    onChange={(e) => setDeliveryDetail(e.target.value)}
                    placeholder={
                      deliveryType === 'postal'
                        ? 'บ้านเลขที่ หมู่ ซอย ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์'
                        : deliveryType === 'pharmacy'
                        ? 'เช่น ร้านยาฟาร์มาแคร์ สาขาถลาง, ร้านยาวชิระเภสัช'
                        : 'ระบุเวลาที่สะดวกมารับยา เช่น 10.00 น.'
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>ยืนยันการลงทะเบียนขอเติมยา</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Sidebar: Contact & QR Code */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-3">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                สแกนลงทะเบียนผ่านสมาร์ทโฟน
              </span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block">
                <img
                  src={HOSPITAL_CONTACT_INFO.qrCodeMock}
                  alt="QR Code โครงการเติมยา รพ.วชิระภูเก็ต"
                  className="w-40 h-40 mx-auto"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                สแกนเพื่อเปิดแบบฟอร์มลงทะเบียนเติมยาผ่านโทรศัพท์มือถือ
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <Phone className="w-4 h-4 text-emerald-700" />
                ติดต่อเจ้าหน้าที่โครงการเติมยา
              </h4>
              <p>โทรศัพท์กลาง รพ.วชิระภูเก็ต: <strong>076-361234</strong></p>
              <p className="text-emerald-800 font-semibold">เบอร์ต่อตรง: 1183 หรือ 1184</p>
              <p className="text-slate-500 text-[11px]">
                เวลาทำการ: วันจันทร์ - ศุกร์ 08:30 - 15:30 น. (เว้นวันหยุดราชการ)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Track Refill Status */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold text-slate-900">ตรวจสอบสถานะการเติมยา</h3>
            <p className="text-xs text-slate-500">
              ป้อนเลขประจำตัวผู้ป่วย (HN) หรือ หมายเลขคำขอ (Request No.) เพื่อดูสถานะ
            </p>
          </div>

          <form onSubmit={handleSearchTrack} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="ป้อนเลข HN เช่น 6301289, 6519821 หรือ รหัสคำขอ RF-..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              ค้นหาสถานะ
            </button>
          </form>

          {hasSearched && (
            <div className="pt-4">
              {trackResult ? (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[11px] text-slate-400">เลขคำขอ:</span>
                      <strong className="text-slate-900 block font-mono text-sm">{trackResult.requestNumber}</strong>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-xs ${
                          trackResult.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : trackResult.status === 'dispensed'
                            ? 'bg-blue-100 text-blue-800'
                            : trackResult.status === 'approved'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {trackResult.status === 'delivered'
                          ? '✅ รับยาเรียบร้อยแล้ว'
                          : trackResult.status === 'dispensed'
                          ? '📦 จัดยาและส่งออกแล้ว'
                          : trackResult.status === 'approved'
                          ? '👨‍⚕️ เภสัชกรอนุมัติแล้ว'
                          : '⏳ อยู่ระหว่างรอการตรวจสอบ'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-400">ชื่อผู้ป่วย:</span>
                      <p className="font-semibold text-slate-800">{trackResult.patientName}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">รหัส HN:</span>
                      <p className="font-semibold text-slate-800 font-mono">{trackResult.hn}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">คลินิก:</span>
                      <p className="text-slate-700">{trackResult.clinic}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">ช่องทางรับยา:</span>
                      <p className="text-slate-700">
                        {trackResult.deliveryType === 'postal'
                          ? 'ทางไปรษณีย์ EMS'
                          : trackResult.deliveryType === 'pharmacy'
                          ? 'รับที่ร้านยาใกล้บ้าน'
                          : 'รับที่ รพ.วชิระภูเก็ต'}
                      </p>
                    </div>
                  </div>

                  {trackResult.trackingCode && (
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400">หมายเลขพัสดุ EMS:</span>
                        <strong className="text-emerald-800 font-mono block text-sm">
                          {trackResult.trackingCode}
                        </strong>
                      </div>
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium">
                        จัดส่งโดย ไปรษณีย์ไทย
                      </span>
                    </div>
                  )}

                  {trackResult.note && (
                    <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
                      หมายเหตุ: {trackResult.note}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="font-bold text-slate-700">ไม่พบข้อมูลการเติมยาจากคำค้นหา "{trackQuery}"</p>
                  <p>
                    กรุณาตรวจสอบเลข HN หรือโทรติดต่อกลุ่มงานเติมยา 076-361234 ต่อ 1183–1184
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Guidelines & FAQ */}
      {activeTab === 'guideline' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">รับยาที่โรงพยาบาล</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                มาติดต่อที่ <strong>"ช่องจ่ายยาเบอร์ 8"</strong> อาคารผู้ป่วยนอก ชั้น 1 แจ้งชื่อและรหัสเติมยา สามารถรับยาได้ทันทีโดยไม่ต้องผ่านจุดคัดกรองหรือรอพบแพทย์
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">รับยาทางไปรษณีย์</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ยาจะถูกบรรจุในกล่องพัสดุมาตรฐานตามมาตรฐานเภสัชกรรม จัดส่งด่วน EMS ถึงหน้าบ้านภายใน 1-2 วันทำการ มีรหัสติดตามพัสดุผ่านเว็บไซต์ไปรษณีย์ไทย
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">รับยาที่ร้านยาใกล้บ้าน</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                เดินทางไปรับยาที่ร้านยาชุมชนอบอุ่นเครือข่าย รพ.วชิระภูเก็ต กว่า 45 ร้านยา โดยมีเภสัชกรประจำร้านยาเป็นผู้อธิบายวิธีใช้ยาและตรวจเช็กอาการ
              </p>
            </div>
          </div>

          {/* Detailed Condition Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">เงื่อนไขผู้ป่วยที่สามารถเข้าร่วมโครงการเติมยา</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>เป็นผู้ป่วยโรคเรื้อรังที่แพทย์ประเมินว่า "อาการคงที่"</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>ไม่มีการปรับเปลี่ยนขนาดยาในการตรวจ 2 ครั้งล่าสุด</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>ผลการตรวจทางห้องปฏิบัติการ (แล็บ) ล่าสุดไม่เกิน 6-12 เดือน</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>ไม่มียาเสี่ยงสูงหรือยาเสพติดให้โทษที่ต้องประเมินแบบพบตัว</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
