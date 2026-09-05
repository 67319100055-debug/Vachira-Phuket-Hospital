import React, { useState } from 'react';
import { StepInfographic } from '../../types';
import { Image, Save, Check, Plus, Trash2, RefreshCw } from 'lucide-react';

interface AdminInfographicsManagerProps {
  infographics: StepInfographic[];
  onUpdateInfographics: (updated: StepInfographic[]) => void;
}

export const AdminInfographicsManager: React.FC<AdminInfographicsManagerProps> = ({
  infographics,
  onUpdateInfographics,
}) => {
  const [items, setItems] = useState<StepInfographic[]>(infographics);
  const [selectedId, setSelectedId] = useState<string>(infographics[0]?.id || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentItem = items.find((i) => i.id === selectedId) || items[0];

  const handleFieldChange = (field: keyof StepInfographic, value: any) => {
    setItems((prev) =>
      prev.map((it) => (it.id === currentItem.id ? { ...it, [field]: value } : it))
    );
  };

  const handleStepChange = (index: number, newText: string) => {
    const newSteps = [...currentItem.steps];
    newSteps[index] = newText;
    handleFieldChange('steps', newSteps);
  };

  const handleAddStep = () => {
    const newSteps = [...currentItem.steps, `${currentItem.steps.length + 1}. ขั้นตอนใหม่`];
    handleFieldChange('steps', newSteps);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = currentItem.steps.filter((_, i) => i !== index);
    handleFieldChange('steps', newSteps);
  };

  const handleSave = () => {
    onUpdateInfographics(items);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Image Presets for easy testing
  const presets = [
    { label: 'ภาพห้องยาหลัก รพ.วชิระภูเก็ต', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80' },
    { label: 'ภาพห้องจ่ายยาผู้ป่วยนอก OPD', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80' },
    { label: 'ภาพบริการส่งยาทางไปรษณีย์ Refill', url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80' },
    { label: 'ภาพเภสัชกรให้คำปรึกษาผู้ป่วย', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Image className="w-5 h-5 text-emerald-600" />
            <span>จัดการรูปภาพและผัง "ขั้นตอนการรับยา"</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Admin สามารถเปลี่ยนรูปภาพ Infographic, หัวข้อ และขั้นตอนของทั้ง 3 คอลัมน์ได้เอง
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
        >
          {saveSuccess ? <Check className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
          <span>{saveSuccess ? 'บันทึกสำเร็จแล้ว!' : 'บันทึกการเปลี่ยนแปลง'}</span>
        </button>
      </div>

      {/* Column Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((it, idx) => (
          <button
            key={it.id}
            onClick={() => setSelectedId(it.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedId === it.id
                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                คอลัมน์ที่ {idx + 1}
              </span>
              <span className="text-[10px] text-slate-400">ID: {it.id}</span>
            </div>
            <div className="font-bold text-slate-900 text-sm">{it.title}</div>
            <div className="text-xs text-slate-500 truncate">{it.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Editor Form */}
      {currentItem && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Details */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">ชื่อขั้นตอน (Title) *</label>
              <input
                type="text"
                value={currentItem.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">หัวข้อย่อย (Subtitle)</label>
              <input
                type="text"
                value={currentItem.subtitle}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">คำอธิบายภาพรวม</label>
              <textarea
                rows={2}
                value={currentItem.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800 resize-none"
              />
            </div>

            {/* Image URL Change */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                URL รูปภาพ Infographic * (Admin สามารถเปลี่ยนรูปได้เอง)
              </label>
              <input
                type="url"
                value={currentItem.imageUrl}
                onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                placeholder="https://example.com/infographic.jpg"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800 font-mono text-[11px]"
              />

              {/* Presets */}
              <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-slate-400">เลือกรูปตัวอย่างด่วน:</span>
                {presets.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleFieldChange('imageUrl', p.url)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-[10px] text-slate-600 border border-slate-200"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Steps List Editor */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-slate-700">รายการขั้นตอนย่อย ({currentItem.steps.length} ขั้นตอน):</label>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>เพิ่มขั้นตอน</span>
                </button>
              </div>

              <div className="space-y-2">
                {currentItem.steps.map((st, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 font-bold text-slate-400 text-center">{idx + 1}.</span>
                    <input
                      type="text"
                      value={st}
                      onChange={(e) => handleStepChange(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                      title="ลบขั้นตอนนี้"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              <span>ภาพตัวอย่างการแสดงผลบนหน้าเว็บ (Live Preview):</span>
            </span>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="p-3 border-b border-slate-200 bg-white">
                  <div className="font-bold text-slate-900 text-sm">{currentItem.title}</div>
                  <div className="text-[11px] text-slate-500">{currentItem.subtitle}</div>
                </div>

                <div className="relative aspect-16/10 bg-slate-200">
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // fallback if image fails
                      (e.target as HTMLElement).setAttribute('src', presets[0].url);
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-950/70 text-white text-[10px] px-2 py-0.5 rounded">
                    Infographic
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  <p className="text-[11px] text-slate-600">{currentItem.description}</p>
                  <div className="space-y-1">
                    {currentItem.steps.slice(0, 3).map((s, i) => (
                      <div key={i} className="text-[10px] text-slate-700 bg-white p-1.5 rounded border border-slate-200">
                        {s}
                      </div>
                    ))}
                    {currentItem.steps.length > 3 && (
                      <div className="text-[10px] text-slate-400 pl-1">
                        + อีก {currentItem.steps.length - 3} ขั้นตอน...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-2 border-t border-slate-200 bg-white text-right">
                <span className="text-[10px] text-emerald-700 font-medium">
                  ✓ พร้อมแสดงผลในหน้าแรกของประชาชน
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
