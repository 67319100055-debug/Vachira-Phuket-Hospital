import React, { useState } from 'react';
import { BannerConfig } from '../../types';
import { Sliders, Save, Check, Eye } from 'lucide-react';

interface AdminBannerManagerProps {
  bannerConfig: BannerConfig;
  onUpdateBanner: (newConfig: BannerConfig) => void;
}

export const AdminBannerManager: React.FC<AdminBannerManagerProps> = ({
  bannerConfig,
  onUpdateBanner,
}) => {
  const [formData, setFormData] = useState<BannerConfig>(bannerConfig);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBanner(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <span>จัดการ Banner / Hero หน้าแรก</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            แก้ไขข้อความพาดหัว สโลแกน และปุ่มกดบน Banner หลักของโรงพยาบาล
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">ข้อความพาดหัวหลัก (Headline)</label>
            <input
              type="text"
              required
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm font-bold"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">ข้อความพาดหัวรอง (Sub-headline)</label>
            <input
              type="text"
              required
              value={formData.subheadline}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-emerald-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">ชื่อหน่วยงาน / โรงพยาบาล</label>
            <input
              type="text"
              required
              value={formData.hospitalName}
              onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">ป้ายกำกับ Badge ด้านบน</label>
            <input
              type="text"
              value={formData.badgeText}
              onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">วิสัยทัศน์และพันธกิจ (Vision Statement)</label>
          <textarea
            rows={2}
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block font-bold text-slate-700 mb-1">ข้อความปุ่มกดที่ 1 (Primary Button)</label>
            <input
              type="text"
              value={formData.primaryButtonText}
              onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">ข้อความปุ่มกดที่ 2 (Secondary Button)</label>
            <input
              type="text"
              value={formData.secondaryButtonText}
              onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            * การแก้ไขจะมีผลต่อหน้าหลักของประชาชนทันทีหลังกดบันทึก
          </span>
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'บันทึกเรียบร้อย!' : 'บันทึกการเปลี่ยนแปลง'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
