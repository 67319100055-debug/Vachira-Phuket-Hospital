import React from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  Package,
  FileCheck2,
  Users,
  Activity,
  Layers,
  Building2,
  DollarSign
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Medicine, ADRReport, MedicationError, RefillRequest, PurchaseOrder } from '../../types/pharmacy';

interface PharmacyDashboardViewProps {
  medicines: Medicine[];
  adrReports: ADRReport[];
  medErrors: MedicationError[];
  refills: RefillRequest[];
  purchaseOrders: PurchaseOrder[];
}

export const PharmacyDashboardView: React.FC<PharmacyDashboardViewProps> = ({
  medicines,
  adrReports,
  medErrors,
  refills,
  purchaseOrders
}) => {
  // Monthly prescription statistics (sample realistic hospital data)
  const monthlyPrescriptionData = [
    { month: 'ม.ค.', opd: 42100, ipd: 8400, total: 50500 },
    { month: 'ก.พ.', opd: 39800, ipd: 7900, total: 47700 },
    { month: 'มี.ค.', opd: 44500, ipd: 8900, total: 53400 },
    { month: 'เม.ย.', opd: 41200, ipd: 8200, total: 49400 },
    { month: 'พ.ค.', opd: 46100, ipd: 9100, total: 55200 },
    { month: 'มิ.ย.', opd: 45300, ipd: 8800, total: 54100 },
    { month: 'ก.ค.', opd: 48000, ipd: 9500, total: 57500 },
    { month: 'ส.ค.', opd: 47200, ipd: 9300, total: 56500 }
  ];

  // Med Error Stage Distribution
  const errorStageData = [
    { name: 'Prescribing', value: 35, color: '#f59e0b' },
    { name: 'Transcribing', value: 15, color: '#3b82f6' },
    { name: 'Dispensing', value: 40, color: '#0d9488' },
    { name: 'Administration', value: 10, color: '#ec4899' }
  ];

  // Refill distribution
  const refillDeliveryData = [
    { name: 'ไปรษณีย์ EMS', value: 58, color: '#10b981' },
    { name: 'ร้านยาใกล้บ้าน', value: 27, color: '#06b6d4' },
    { name: 'ช่องด่วน รพ.', value: 15, color: '#6366f1' }
  ];

  const totalInventoryValue = medicines.reduce(
    (acc, m) => acc + (m.stockQuantity || 0) * 1.5,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-teal-700" />
            Executive & Pharmacy Management
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📊 แดชบอร์ดสรุปผลการดำเนินงานกลุ่มงานเภสัชกรรม
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ศูนย์รวมตัวชี้วัดความปลอดภัยทางยา (ADR / Med Error) ข้อมูลการจ่ายยา การบริหารคลัง และโครงการเติมยา
        </p>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-500">ยอดจ่ายยาเฉลี่ย / เดือน</span>
            <Activity className="w-4 h-4 text-teal-600" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900 font-heading">54,000+ ใบสั่ง</div>
            <div className="text-xs text-emerald-600 font-medium">↑ 4.2% เทียบกับปีที่แล้ว</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-500">ผู้ป่วยในโครงการเติมยา</span>
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900 font-heading">
              {refills.length * 140}+ ราย
            </div>
            <div className="text-xs text-teal-600 font-medium">ช่วยลดความแออัด OPD 32%</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-500">รายงาน ADR ในระบบ</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-rose-700 font-heading">
              {adrReports.length} รายงาน
            </div>
            <div className="text-xs text-slate-500">ออกบัตรแพ้ยาสำเร็จ 100%</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-500">มูลค่ายาและเวชภัณฑ์คงคลัง</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-slate-900 font-heading">
              ฿{(totalInventoryValue / 1000000).toFixed(1)}M บาท
            </div>
            <div className="text-xs text-slate-500">อัตราหมุนเวียน 12.4 รอบ/ปี</div>
          </div>
        </div>
      </div>

      {/* Chart 1: Monthly Prescriptions Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              สถิติการจ่ายยาผู้ป่วยนอก (OPD) และผู้ป่วยใน (IPD) ประจำปี 2569
            </h3>
            <p className="text-xs text-slate-500">จำนวนใบสั่งยาที่ได้รับการตรวจสอบและจ่ายยาโดยเภสัชกร</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-teal-700"></span>
              <span className="text-slate-600">ผู้ป่วยนอก (OPD)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-500"></span>
              <span className="text-slate-600">ผู้ป่วยใน (IPD)</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyPrescriptionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="opd" name="ผู้ป่วยนอก" fill="#0f766e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ipd" name="ผู้ป่วยใน" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Column Analytics: Med Error Stages & Refill Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart 1: Medication Error by Stage */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              สัดส่วนความคลาดเคลื่อนทางยาตามขั้นตอน (Medication Error Stages)
            </h3>
            <p className="text-xs text-slate-500">วิเคราะห์เพื่อยกระดับจุดตรวจสอบ Double Check</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errorStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {errorStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart 2: Refill Channels */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              สัดส่วนช่องทางการรับยาในโครงการเติมยา (Refill Channels)
            </h3>
            <p className="text-xs text-slate-500">ความพึงพอใจและการเลือกใช้บริการของประชาชน</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={refillDeliveryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {refillDeliveryData.map((entry, index) => (
                    <Cell key={`cell-refill-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
