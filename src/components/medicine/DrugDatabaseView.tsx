import React, { useState, useMemo } from 'react';
import {
  Search,
  Pill,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Plus,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  X,
  ExternalLink
} from 'lucide-react';
import { Medicine, UserRole } from '../../types/pharmacy';

interface DrugDatabaseViewProps {
  medicines?: Medicine[];
  onSelectMedicine?: (med: Medicine) => void;
  onSelectDrug?: (med: Medicine) => void;
  userRole?: UserRole;
  onAddMedicine?: (newMed: Medicine) => void;
}

export const DrugDatabaseView: React.FC<DrugDatabaseViewProps> = ({
  medicines = [],
  onSelectMedicine,
  onSelectDrug,
  userRole = 'public',
  onAddMedicine
}) => {
  const handleSelect = (med: Medicine) => {
    if (onSelectMedicine) onSelectMedicine(med);
    else if (onSelectDrug) onSelectDrug(med);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New medicine form state
  const [newMedForm, setNewMedForm] = useState<Partial<Medicine>>({
    name: '',
    genericName: '',
    tradeName: '',
    dosageForm: 'Tablet',
    strength: '',
    unit: 'เม็ด',
    category: 'ยาแก้ปวดและลดไข้',
    indication: '',
    contraindication: '',
    warning: '',
    adverseEffect: '',
    drugInteraction: '',
    storageMethod: 'เก็บที่อุณหภูมิห้อง ไม่เกิน 30°C พ้นแสงแดด',
    instructions: '',
    rduCategory: 'ED',
    stockQuantity: 1000,
    reorderPoint: 500
  });

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(medicines.map((m) => m.category)))];
  }, [medicines]);

  const dosageForms = useMemo(() => {
    return ['all', ...Array.from(new Set(medicines.map((m) => m.dosageForm)))];
  }, [medicines]);

  const filteredMedicines = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return medicines.filter((m) => {
      const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
      const matchForm = selectedForm === 'all' || m.dosageForm === selectedForm;

      if (!matchCat || !matchForm) return false;
      if (!q) return true;

      return (
        m.name.toLowerCase().includes(q) ||
        m.genericName.toLowerCase().includes(q) ||
        m.tradeName.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q) ||
        m.dosageForm.toLowerCase().includes(q) ||
        m.strength.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.indication.toLowerCase().includes(q)
      );
    });
  }, [medicines, searchQuery, selectedCategory, selectedForm]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedForm.name || !newMedForm.genericName) return;

    const generatedCode = '100' + Math.floor(1000 + Math.random() * 9000);
    const createdMed: Medicine = {
      id: 'med-' + Date.now(),
      code: generatedCode,
      name: newMedForm.name || '',
      genericName: newMedForm.genericName || '',
      tradeName: newMedForm.tradeName || '',
      dosageForm: newMedForm.dosageForm || 'Tablet',
      strength: newMedForm.strength || '',
      unit: newMedForm.unit || 'เม็ด',
      category: newMedForm.category || 'ยาทั่วไป',
      indication: newMedForm.indication || '',
      contraindication: newMedForm.contraindication || '',
      warning: newMedForm.warning || '',
      adverseEffect: newMedForm.adverseEffect || '',
      drugInteraction: newMedForm.drugInteraction || '',
      storageMethod: newMedForm.storageMethod || '',
      instructions: newMedForm.instructions || '',
      rduCategory: (newMedForm.rduCategory as any) || 'ED',
      isApproved: true,
      approvedBy: 'ภก. ผู้รับผิดชอบคลินิก (อนุมัติผ่านระบบ)',
      stockQuantity: Number(newMedForm.stockQuantity) || 5000,
      reorderPoint: Number(newMedForm.reorderPoint) || 1000,
      lotNumber: 'LOT-' + new Date().getFullYear().toString().slice(2) + 'N' + Math.floor(100 + Math.random() * 900),
      expiryDate: '2027-12-31'
    };

    onAddMedicine(createdMed);
    setIsAddModalOpen(false);
    onSelectMedicine(createdMed);
  };

  const isStaffOrAdmin = userRole !== 'public';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
              Hospital Drug Formulary
            </span>
            <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            💊 ฐานข้อมูลและระบบค้นหายา
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            สืบค้นข้อมูลยาตามบัญชียาโรงพยาบาลวชิระภูเก็ต ข้อบ่งใช้ ข้อควรระวัง และสถานะการอนุมัติทางคลินิก
          </p>
        </div>

        {isStaffOrAdmin && (
          <button
            id="add-medicine-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มรายการยาใหม่ (เภสัชกร)</span>
          </button>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
          <input
            type="text"
            id="drug-database-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาด้วย: ชื่อยา, ชื่อสามัญ, ชื่อการค้า, รูปแบบยา, ความแรง, รหัสยา (เช่น Paracetamol, 1001542, Amoxicillin)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>กรองตามกลุ่มยา:</span>
          </div>

          <select
            id="category-filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-teal-500 cursor-pointer"
          >
            <option value="all">ทุกกลุ่มยา ({medicines.length})</option>
            {categories.filter((c) => c !== 'all').map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-slate-500 font-medium ml-2">
            <span>รูปแบบยา:</span>
          </div>

          <select
            id="form-filter-select"
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-teal-500 cursor-pointer"
          >
            <option value="all">ทุกรูปแบบยา</option>
            {dosageForms.filter((f) => f !== 'all').map((form) => (
              <option key={form} value={form}>
                {form}
              </option>
            ))}
          </select>

          <div className="ml-auto text-xs text-slate-500">
            ผลลัพธ์: <strong className="text-teal-700 font-semibold">{filteredMedicines.length}</strong> รายการ
          </div>
        </div>
      </div>

      {/* Medicine Cards List */}
      <div className="space-y-3">
        {filteredMedicines.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Pill className="w-12 h-12 mx-auto text-slate-300" />
            <h3 className="text-base font-bold text-slate-700">ไม่พบรายการยาที่ค้นหา</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              กรุณาตรวจสอบชื่อยา ตัวสะกด หรือลองค้นหาด้วยชื่อสามัญภาษาอังกฤษ เช่น Paracetamol, Amlodipine
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedForm('all');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          filteredMedicines.map((med) => (
            <div
              key={med.id}
              id={`medicine-card-${med.code}`}
              onClick={() => handleSelect(med)}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold border border-slate-200">
                    รหัส: {med.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    💊 {med.name}
                  </h3>
                  <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-2.5 py-0.5 rounded-full">
                    {med.dosageForm} {med.strength}
                  </span>
                  {med.isApproved && (
                    <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> อนุมัติแล้ว
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400">ชื่อสามัญ: </span>
                    <strong className="text-slate-800">{med.genericName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">ชื่อการค้า: </span>
                    <span>{med.tradeName || '-'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">กลุ่มยา: </span>
                    <span className="text-teal-700 font-medium">{med.category}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 line-clamp-2">
                  <strong className="text-slate-700">ข้อบ่งใช้: </strong>
                  {med.indication}
                </div>

                {med.warning && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/70">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    <span className="line-clamp-1">{med.warning}</span>
                  </div>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span className="text-[11px] text-slate-400 font-mono">
                  {med.rduCategory === 'ED' ? 'ยาในบัญชี (ED)' : 'ยานอกบัญชี (NED)'}
                </span>
                <span className="text-xs text-teal-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>ดูรายละเอียด</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Medicine Modal (Pharmacist / Admin role) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 bg-teal-700 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">เพิ่มรายการยาใหม่ในฐานข้อมูลโรงพยาบาล</h3>
                <p className="text-xs text-teal-100">สำหรับเภสัชกรและเจ้าหน้าที่กลุ่มงานเภสัชกรรม</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-teal-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    ชื่อยาเต็ม *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMedForm.name}
                    onChange={(e) => setNewMedForm({ ...newMedForm, name: e.target.value })}
                    placeholder="เช่น Paracetamol 500 mg Tablet"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    ชื่อสามัญทางยา (Generic Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMedForm.genericName}
                    onChange={(e) => setNewMedForm({ ...newMedForm, genericName: e.target.value })}
                    placeholder="เช่น Paracetamol"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    ชื่อการค้า (Trade Name)
                  </label>
                  <input
                    type="text"
                    value={newMedForm.tradeName}
                    onChange={(e) => setNewMedForm({ ...newMedForm, tradeName: e.target.value })}
                    placeholder="Sara, Tylenol"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">รูปแบบยา</label>
                  <select
                    value={newMedForm.dosageForm}
                    onChange={(e) => setNewMedForm({ ...newMedForm, dosageForm: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="Tablet">Tablet (ยาเม็ด)</option>
                    <option value="Capsule">Capsule (แคปซูล)</option>
                    <option value="Syrup">Syrup (ยาน้ำ)</option>
                    <option value="Injection">Injection (ยาฉีด)</option>
                    <option value="Inhaler">Inhaler (ยาพ่น)</option>
                    <option value="Ointment">Ointment / Cream (ยาทา)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ความแรง</label>
                  <input
                    type="text"
                    value={newMedForm.strength}
                    onChange={(e) => setNewMedForm({ ...newMedForm, strength: e.target.value })}
                    placeholder="เช่น 500 mg, 10 mg/mL"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">กลุ่มยา</label>
                  <select
                    value={newMedForm.category}
                    onChange={(e) => setNewMedForm({ ...newMedForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="ยาแก้ปวดและลดไข้">ยาแก้ปวดและลดไข้</option>
                    <option value="ยาปฏิชีวนะ">ยาปฏิชีวนะ</option>
                    <option value="ยาความดันโลหิต">ยาความดันโลหิต</option>
                    <option value="ยาเบาหวาน">ยาเบาหวาน</option>
                    <option value="ยาหัวใจและหลอดเลือด">ยาหัวใจและหลอดเลือด</option>
                    <option value="ยาละลายลิ่มเลือด">ยาละลายลิ่มเลือด</option>
                    <option value="ยาจิตเวช">ยาจิตเวช</option>
                    <option value="ยาระบบทางเดินอาหาร">ยาระบบทางเดินอาหาร</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">หน่วยนับ</label>
                  <input
                    type="text"
                    value={newMedForm.unit}
                    onChange={(e) => setNewMedForm({ ...newMedForm, unit: e.target.value })}
                    placeholder="เม็ด, แคปซูล, ขวด"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">ข้อบ่งใช้ (Indication) *</label>
                <textarea
                  rows={2}
                  required
                  value={newMedForm.indication}
                  onChange={(e) => setNewMedForm({ ...newMedForm, indication: e.target.value })}
                  placeholder="เช่น ใช้สำหรับบรรเทาอาการปวดและลดไข้..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">คำเตือนและข้อควรระวัง (Warning)</label>
                <textarea
                  rows={2}
                  value={newMedForm.warning}
                  onChange={(e) => setNewMedForm({ ...newMedForm, warning: e.target.value })}
                  placeholder="เช่น ห้ามใช้ยาเกินขนาดที่ระบุบนฉลาก..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">ข้อห้ามใช้ (Contraindication)</label>
                <input
                  type="text"
                  value={newMedForm.contraindication}
                  onChange={(e) => setNewMedForm({ ...newMedForm, contraindication: e.target.value })}
                  placeholder="เช่น ผู้ที่มีประวัติแพ้ยานี้ หรือโรคตับรุนแรง"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 -mx-6 -mb-6 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  บันทึกเข้าฐานข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
