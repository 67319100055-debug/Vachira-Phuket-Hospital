import React, { useState, useMemo } from 'react';
import { Search, X, Pill, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle, Thermometer, ExternalLink } from 'lucide-react';
import { Medicine } from '../../types/pharmacy';

interface DrugSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicines: Medicine[];
  onSelectMedicine: (med: Medicine) => void;
}

export const DrugSearchModal: React.FC<DrugSearchModalProps> = ({
  isOpen,
  onClose,
  medicines,
  onSelectMedicine
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set(medicines.map((m) => m.category));
    return ['all', ...Array.from(set)];
  }, [medicines]);

  const filteredMedicines = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return medicines.filter((m) => {
      const matchCategory = selectedCategory === 'all' || m.category === selectedCategory;
      if (!matchCategory) return false;
      if (!query) return true;

      return (
        m.name.toLowerCase().includes(query) ||
        m.genericName.toLowerCase().includes(query) ||
        m.tradeName.toLowerCase().includes(query) ||
        m.code.toLowerCase().includes(query) ||
        m.dosageForm.toLowerCase().includes(query) ||
        m.strength.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query) ||
        m.indication.toLowerCase().includes(query)
      );
    });
  }, [medicines, searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header input */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
            <input
              type="text"
              id="drug-quick-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหายาด้วย ชื่อยา, ชื่อสามัญ, ชื่อการค้า, รหัสยา (เช่น Paracetamol, Amoxicillin, 1001542)..."
              autoFocus
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category chip filters */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap pl-1 pr-2">หมวดหมู่:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white font-medium shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'ทั้งหมด' : cat}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100">
          {filteredMedicines.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Pill className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium text-slate-600">ไม่พบข้อมูลยาที่ตรงกับคำค้นหา "{searchTerm}"</p>
              <p className="text-xs text-slate-400">
                ลองตรวจสอบตัวสะกด หรือค้นหาด้วยชื่อสามัญภาษาอังกฤษ (เช่น Paracetamol, Metformin)
              </p>
            </div>
          ) : (
            filteredMedicines.map((med) => (
              <div
                key={med.id}
                onClick={() => {
                  onSelectMedicine(med);
                  onClose();
                }}
                className="pt-2.5 first:pt-0 group p-3 rounded-xl hover:bg-teal-50/60 border border-transparent hover:border-teal-100 cursor-pointer transition-all flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold border border-slate-200">
                      {med.code}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      💊 {med.name}
                    </h4>
                    <span className="text-[11px] bg-teal-100 text-teal-800 font-medium px-2 py-0.2 rounded-full">
                      {med.dosageForm} {med.strength}
                    </span>
                    {med.isApproved && (
                      <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> เภสัชกรอนุมัติแล้ว
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                    <div>
                      <span className="text-slate-400">ชื่อสามัญ: </span>
                      <strong className="text-slate-700">{med.genericName}</strong>
                    </div>
                    {med.tradeName && (
                      <div>
                        <span className="text-slate-400">ชื่อการค้า: </span>
                        <span>{med.tradeName}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-400">กลุ่มยา: </span>
                      <span className="text-teal-700 font-medium">{med.category}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1">
                    <strong className="text-slate-600">ข้อบ่งใช้: </strong>
                    {med.indication}
                  </p>

                  {med.warning && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50/80 px-2 py-1 rounded border border-amber-200/60 line-clamp-1">
                      <AlertTriangle className="w-3 h-3 shrink-0 text-amber-600" />
                      <span>{med.warning}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-teal-600 group-hover:translate-x-1 transition-transform self-center">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>พบ {filteredMedicines.length} รายการในฐานข้อมูลโรงพยาบาล</span>
          <span className="text-[11px] text-slate-400">กด Esc เพื่อปิด</span>
        </div>
      </div>
    </div>
  );
};
