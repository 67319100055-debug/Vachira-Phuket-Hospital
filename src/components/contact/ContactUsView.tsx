import React from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  ShieldAlert,
  Building2,
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react';
import { HOSPITAL_CONTACT_INFO } from '../../data/mockPharmacyData';

export const ContactUsView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-rose-700" />
            Direct Contact & Directory
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📞 ติดต่อกลุ่มงานเภสัชกรรม
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          หมายเลขโทรศัพท์สายตรง เบอร์ต่อภายในแต่ละจุดบริการ และข้อมูลที่ตั้ง
        </p>
      </div>

      {/* Emergency Callout */}
      <div className="bg-red-600 text-white rounded-2xl p-5 border border-red-500 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-white shrink-0" />
          <div>
            <h3 className="text-base font-bold">สายด่วนอุบัติเหตุและเหตุฉุกเฉินตลอด 24 ชั่วโมง</h3>
            <p className="text-xs text-red-100">กรณีสงสัยแพ้ยารุนแรง หรือภาวะวิกฤต โทรฟรี</p>
          </div>
        </div>
        <a
          href="tel:1669"
          className="px-6 py-2.5 bg-white text-red-700 font-extrabold text-base rounded-xl shadow-xs hover:bg-red-50 transition-colors"
        >
          โทร 1669
        </a>
      </div>

      {/* Main Grid: Location & Internal Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Hospital Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl">
                🏥
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">กลุ่มงานเภสัชกรรม</h3>
                <p className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  {HOSPITAL_CONTACT_INFO.address}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span>โทรศัพท์กลาง: </span>
                  <strong className="text-slate-800">{HOSPITAL_CONTACT_INFO.phoneMain}</strong>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>{HOSPITAL_CONTACT_INFO.email}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>{HOSPITAL_CONTACT_INFO.workHours}</span>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Preview Box */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">แผนที่โรงพยาบาลวชิระภูเก็ต</span>
              <a
                href="https://maps.google.com/?q=Vachira+Phuket+Hospital"
                target="_blank"
                rel="noreferrer"
                className="text-teal-700 hover:underline flex items-center gap-1 font-medium"
              >
                <span>เปิดใน Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="h-48 bg-slate-100 flex items-center justify-center text-center p-4">
              <div className="space-y-1 text-slate-500 text-xs">
                <MapPin className="w-8 h-8 text-teal-700 mx-auto" />
                <strong className="text-slate-800 block">โรงพยาบาลวชิระภูเก็ต</strong>
                <span>ถนนเยาวราช ตำบลตลาดใหญ่ อำเภอเมือง ภูเก็ต</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Internal Extensions Directory */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900">
              สมุดเบอร์โทรศัพท์ต่อภายในกลุ่มงานเภสัชกรรม (Internal Extensions)
            </h3>
            <p className="text-xs text-slate-500">
              กดหมายเลข <strong>076-361234</strong> แล้วตามด้วยหมายเลขต่อภายในด้านล่าง
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {HOSPITAL_CONTACT_INFO.internalExtensions.map((ext, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-300 hover:bg-teal-50/40 transition-colors flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <strong className="text-slate-800 block text-xs font-semibold">
                    {ext.department}
                  </strong>
                  <span className="text-[11px] text-slate-400">กลุ่มงานเภสัชกรรม</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">เบอร์ต่อ:</span>
                  <span className="font-mono text-sm font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {ext.extension}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Special notice for refill callers */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <strong className="block font-semibold">สำหรับผู้ป่วยโครงการเติมยา (Refill Clinic):</strong>
            <p>
              สามารถติดต่อสอบถามคิวรับยาทางไปรษณีย์ หรือประสานร้านยาใกล้บ้าน ได้ที่เบอร์ต่อตรง{' '}
              <strong className="text-emerald-900 font-bold">1183 หรือ 1184</strong> ในวันและเวลาราชการ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
