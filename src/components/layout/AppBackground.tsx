import React from 'react';
import { BackgroundConfig } from '../../types/background';

interface AppBackgroundProps {
  config: BackgroundConfig;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({ config }) => {
  if (!config.enabled || !config.imageUrl) {
    return null;
  }

  // Calculate opacity safely between 0.01 and 0.50
  const normalizedOpacity = Math.max(0.01, Math.min(0.50, config.opacity / 100));

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url("${config.imageUrl}")`,
          opacity: normalizedOpacity,
          filter: config.blur > 0 ? `blur(${config.blur}px)` : undefined,
          transform: 'scale(1.02)', // Avoid blur fringe edges
        }}
      />

      {/* Subtle Pattern Grid Overlay for premium depth */}
      {config.patternOverlay && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* Soft color gradient overlay to keep high contrast & AA readability */}
      <div
        className={`absolute inset-0 ${
          config.overlayColor === 'emerald'
            ? 'bg-gradient-to-b from-emerald-50/60 via-slate-50/80 to-slate-100/90'
            : config.overlayColor === 'white'
            ? 'bg-gradient-to-b from-white/70 via-slate-50/85 to-slate-100/95'
            : 'bg-gradient-to-b from-slate-50/60 via-slate-50/85 to-slate-100/90'
        }`}
      />
    </div>
  );
};
