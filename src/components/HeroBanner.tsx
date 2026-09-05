import React from 'react';
import { Pill, ShieldCheck, HeartPulse, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BannerConfig } from '../types';

interface HeroBannerProps {
  bannerConfig: BannerConfig;
  onOpenDrugGuide: () => void;
  onOpenConsult: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  bannerConfig,
  onOpenDrugGuide,
  onOpenConsult,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl my-4 sm:my-6">
      {/* Background Decorative Healthcare Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-16 md:py-20 text-center">
        {/* Hospital Branding Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
          <HeartPulse className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{bannerConfig.badgeText}</span>
        </div>

        {/* Hero Headings */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          {bannerConfig.headline}
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-300 tracking-tight mb-6">
          {bannerConfig.subheadline}
        </h2>

        {/* Department & Vision text */}
        <div className="max-w-2xl mx-auto space-y-2 mb-8">
          <p className="text-base sm:text-lg font-medium text-slate-100">
            {bannerConfig.hospitalName}
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {bannerConfig.vision}
          </p>
        </div>

        {/* Action Buttons: [ข้อมูลการใช้ยา] [ปรึกษาเภสัชกร] */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            id="hero-btn-drug-info"
            onClick={onOpenDrugGuide}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Pill className="w-5 h-5" />
            <span>{bannerConfig.primaryButtonText}</span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            id="hero-btn-consult-pharmacist"
            onClick={onOpenConsult}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-emerald-100 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span>{bannerConfig.secondaryButtonText}</span>
          </button>
        </div>

        {/* Key Hospital Highlights */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>เภสัชกรวิชาชีพ 24 ชม.</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ระบบตรวจสอบบาร์โค้ดยา</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>บริการส่งยาทางไปรษณีย์</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>คลินิกให้คำปรึกษาเฉพาะโรค</span>
          </div>
        </div>
      </div>
    </section>
  );
};
