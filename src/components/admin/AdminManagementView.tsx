import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Settings,
  Pill,
  Package,
  MessageCircleQuestion,
  AlertTriangle,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database
} from 'lucide-react';
import { UserRole, Medicine, RefillRequest, PharmacistConsultation, ADRReport, MedicationError } from '../../types/pharmacy';

interface AdminManagementViewProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  setCurrentTab: (tab: string) => void;
  medicinesCount: number;
  refillsCount: number;
  consultsCount: number;
  adrCount: number;
  errorsCount: number;
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({
  userRole,
  setUserRole,
  setCurrentTab,
  medicinesCount,
  refillsCount,
  consultsCount,
  adrCount,
  errorsCount
}) => {
  const rolesConfig: { id: UserRole; name: string; desc: string; badge: string }[] = [
    {
      id: 'public',
      name: 'ประชาชนทั่วไป (Public)',
      desc: 'ค้นหาข้อมูลยา อ่านความรู้ ส่งคำถามปรึกษาเภสัชกร ขอเติมยา ตรวจสอบสถานะการจัดส่ง',
      badge: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'pharmacist',
      name: 'เภสัชกร (Pharmacist)',
      desc: 'ตอบคำถามเรื่องยา ตรวจสอบคำขอเติมยา Reconcile ยา รายงาน ADR/Med Error จัดการข้อมูลยา',
      badge: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'inventory_staff',
      name: 'เจ้าหน้าที่คลังยา (Inventory Staff)',
      desc: 'จัดการสต็อกยา ตรวจสอบยาใกล้หมดอายุ วางแผนและออกใบสั่งซื้อยา (Purchase Orders)',
      badge: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'admin',
      name: 'ผู้ดูแลระบบ (System Admin)',
      desc: 'เข้าถึงได้ทุกส่วน กำหนดสิทธิ์ผู้ใช้ ตรวจสอบ Audit Log สำรองฐานข้อมูล ดูแดชบอร์ดบริหาร',
      badge: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            Hospital HIS & Pharmacy Administration
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          ⚙️ ระบบบริหารจัดการหลังบ้านและกำหนดสิทธิ์ผู้ใช้
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ศูนย์ควบคุมระบบจัดการข้อมูลยา คลังเวชภัณฑ์ การประสานยา และการสลับบทบาทผู้ใช้งาน (RBAC)
        </p>
      </div>

      {/* Role Switching Interactive Cards (Section 22) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              👥 บทบาทผู้ใช้งานและการจำลองสิทธิ์ (User Roles Simulation)
            </h3>
            <p className="text-xs text-slate-500">
              คลิกเลือกบทบาทเพื่อสลับสิทธิ์การเข้าถึงเมนูและการบันทึกข้อมูลของระบบ
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            สิทธิ์ปัจจุบัน: <strong className="text-teal-700">{userRole}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolesConfig.map((role) => {
            const isSelected = userRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setUserRole(role.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-slate-900">{role.name}</strong>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${role.badge}`}>
                      {role.id}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-bold text-teal-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> ใช้งานอยู่
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{role.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Quick Control Center (Section 21) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          ⚙️ เมนูจัดการระบบหลังบ้าน (Admin Quick Actions)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => setCurrentTab('medicines')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Pill className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                {medicinesCount} รายการ
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">จัดการข้อมูลยาในบัญชี รพ.</h4>
              <p className="text-xs text-slate-500 mt-1">
                เพิ่มรายการยา แก้ไขขนาดยา ปรับปรุงคำเตือน และอนุมัติยาเข้าบัญชี
              </p>
            </div>
            <div className="text-xs text-teal-700 font-semibold flex items-center gap-1 pt-1">
              <span>ไปที่ฐานข้อมูลยา</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('refill')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Package className="w-5 h-5 text-emerald-700" />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {refillsCount} คำขอ
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">จัดการคำขอเติมยา</h4>
              <p className="text-xs text-slate-500 mt-1">
                คัดกรองใบสั่งยา ตรวจสอบผลตรวจ อนุมัติจัดส่ง และออกเลข EMS
              </p>
            </div>
            <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 pt-1">
              <span>ไปที่ระบบเติมยา</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('consult')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-xs transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                <MessageCircleQuestion className="w-5 h-5 text-cyan-700" />
              </div>
              <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">
                {consultsCount} คำถาม
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">จัดการคำถามปรึกษาเภสัชกร</h4>
              <p className="text-xs text-slate-500 mt-1">
                ตอบคำถามเรื่องยาจากประชาชน ให้คำแนะนำ และตรวจสอบภาพถ่ายยา
              </p>
            </div>
            <div className="text-xs text-cyan-700 font-semibold flex items-center gap-1 pt-1">
              <span>ไปที่ระบบปรึกษา</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('inventory')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Database className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                ROP & FEFO
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">จัดการคลังยาและจัดซื้อ</h4>
              <p className="text-xs text-slate-500 mt-1">
                ตรวจสอบสต็อกคงเหลือ ยาใกล้หมดอายุ และออกใบสั่งซื้อยา (PO)
              </p>
            </div>
            <div className="text-xs text-amber-700 font-semibold flex items-center gap-1 pt-1">
              <span>ไปที่ระบบคลังยา</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('safety-reporting')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-rose-400 hover:shadow-xs transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                {adrCount + errorsCount} ฉบับ
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">จัดการรายงาน ADR & Med Error</h4>
              <p className="text-xs text-slate-500 mt-1">
                วิเคราะห์สาเหตุเชิงระบบ บันทึก Naranjo และจัดระดับ NCC MERP
              </p>
            </div>
            <div className="text-xs text-rose-700 font-semibold flex items-center gap-1 pt-1">
              <span>ไปที่รายงานความปลอดภัย</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('dashboard')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                KPI Analytics
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">แดชบอร์ดบริหารเภสัชกรรม</h4>
              <p className="text-xs text-slate-500 mt-1">
                สรุปภาพรวมยอดจ่ายยา OPD/IPD มูลค่าสต็อก และตัวชี้วัดคุณภาพ
              </p>
            </div>
            <div className="text-xs text-blue-700 font-semibold flex items-center gap-1 pt-1">
              <span>เปิดแดชบอร์ด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
