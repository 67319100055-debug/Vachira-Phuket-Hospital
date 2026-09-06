import React, { useState } from 'react';
import { DrugItem } from '../../types';
import { Pill, Plus, Search, Edit2, Trash2, Check, X, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AdminDrugManagerProps {
  drugs: DrugItem[];
  onUpdateDrugs: (updated: DrugItem[]) => void;
}

export const AdminDrugManager: React.FC<AdminDrugManagerProps> = ({
  drugs,
  onUpdateDrugs,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentDrug, setCurrentDrug] = useState<Partial<DrugItem>>({});
  const [deleteConfirmDrug, setDeleteConfirmDrug] = useState<DrugItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const filtered = drugs.filter(
    (d) =>
      d.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.tradeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setCurrentDrug({
      id: `d_${Date.now()}`,
      genericName: '',
      tradeName: '',
      category: 'ยาสามัญประจำบ้าน',
      dosageForm: 'ยาเม็ด',
      strength: '',
      indications: '',
      usageInstructions: '',
      precautions: '',
      contraindications: '',
      storage: 'เก็บที่อุณหภูมิห้อง ต่ำกว่า 30°C',
      adverseEffects: '',
      interactions: '',
      inHospitalList: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (drug: DrugItem) => {
    setCurrentDrug({ ...drug });
    setIsEditing(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmDrug) return;
    const name = deleteConfirmDrug.genericName;
    onUpdateDrugs(drugs.filter((d) => d.id !== deleteConfirmDrug.id));
    setDeleteConfirmDrug(null);
    showToast(`ลบข้อมูลยา "${name}" ออกจากระบบเรียบร้อยแล้ว`);
  };

  const handleSaveDrug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDrug.genericName) return;

    const exists = drugs.some((d) => d.id === currentDrug.id);
    let updated: DrugItem[];
    if (exists) {
      updated = drugs.map((d) => (d.id === currentDrug.id ? (currentDrug as DrugItem) : d));
    } else {
      updated = [currentDrug as DrugItem, ...drugs];
    }
    onUpdateDrugs(updated);
    setIsEditing(false);
    showToast(`บันทึกข้อมูลยา "${currentDrug.genericName}" เรียบร้อย`);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-emerald-600" />
            <span>จัดการข้อมูลยา & บัญชียาโรงพยาบาล</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            เพิ่ม แก้ไข และจัดการรายการยา สรรพคุณ วิธีใช้ และข้อห้ามใช้ในระบบ
          </p>
        </div>

        <button
          id="btn-admin-add-drug"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ เพิ่มรายการยาใหม่</span>
        </button>
      </div>

      {/* Filter / Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหายาด้วยชื่อสามัญ, ชื่อการค้า หรือหมวดหมู่..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>
        <span className="text-xs text-slate-500 shrink-0 font-medium">
          รวม {filtered.length} รายการ
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ชื่อยาสามัญ (Generic)</th>
                <th className="py-3 px-4">ชื่อการค้า</th>
                <th className="py-3 px-4">หมวดหมู่</th>
                <th className="py-3 px-4">ขนาด / รูปแบบ</th>
                <th className="py-3 px-4">สรรพคุณหลัก</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {d.genericName}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{d.tradeName}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium">
                      {d.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{d.strength}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {d.indications}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="แก้ไข"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmDrug(d)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        title="ลบข้อมูลยานี้"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-emerald-800 text-white">
              <h3 className="font-bold text-sm sm:text-base">
                {currentDrug.id?.startsWith('d_') ? '+ เพิ่มรายการยาใหม่' : 'แก้ไขข้อมูลยา'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-emerald-200 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDrug} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    ชื่อยาสามัญ (Generic Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น Paracetamol"
                    value={currentDrug.genericName || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, genericName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    ชื่อการค้า (Trade Name)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น Sara, Tylenol"
                    value={currentDrug.tradeName || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, tradeName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">หมวดหมู่ยา</label>
                  <input
                    type="text"
                    placeholder="เช่น ยาลดไข้, ยาลดความดัน"
                    value={currentDrug.category || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">รูปแบบยา (Form)</label>
                  <input
                    type="text"
                    placeholder="ยาเม็ด, ยาน้ำ, ยาพ่น"
                    value={currentDrug.dosageForm || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, dosageForm: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ขนาดยา (Strength)</label>
                  <input
                    type="text"
                    placeholder="เช่น 500 mg, 10 mg"
                    value={currentDrug.strength || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, strength: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">สรรพคุณ / ข้อบ่งใช้</label>
                <textarea
                  rows={2}
                  value={currentDrug.indications || ''}
                  onChange={(e) => setCurrentDrug({ ...currentDrug, indications: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">วิธีใช้ยาและขนาดยาที่แนะนำ</label>
                <textarea
                  rows={2}
                  value={currentDrug.usageInstructions || ''}
                  onChange={(e) => setCurrentDrug({ ...currentDrug, usageInstructions: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">คำเตือนและข้อควรระวัง</label>
                  <textarea
                    rows={2}
                    value={currentDrug.precautions || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, precautions: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ข้อห้ามใช้ (Contraindications)</label>
                  <textarea
                    rows={2}
                    value={currentDrug.contraindications || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, contraindications: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ปฏิกิริยาระหว่างยา (Interactions)</label>
                  <input
                    type="text"
                    value={currentDrug.interactions || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, interactions: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">การเก็บรักษายา</label>
                  <input
                    type="text"
                    value={currentDrug.storage || ''}
                    onChange={(e) => setCurrentDrug({ ...currentDrug, storage: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {currentDrug.id && !currentDrug.id.startsWith('d_') ? (
                  <button
                    type="button"
                    onClick={() => {
                      const drugToDelete = currentDrug as DrugItem;
                      setIsEditing(false);
                      setDeleteConfirmDrug(drugToDelete);
                    }}
                    className="px-3 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>ลบยานี้ออกจากระบบ</span>
                  </button>
                ) : <div />}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold shadow-xs"
                  >
                    บันทึกข้อมูลยา
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-bounce text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* In-App Delete Confirmation Modal */}
      {deleteConfirmDrug && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDeleteConfirmDrug(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">ยืนยันการลบข้อมูลยา</h3>
                <p className="text-xs text-slate-500">ข้อมูลจะถูกลบออกจากระบบและไม่สามารถกู้คืนได้</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">ชื่อยาสามัญ:</span>
                <span className="font-bold text-slate-900">{deleteConfirmDrug.genericName}</span>
              </div>
              {deleteConfirmDrug.tradeName && (
                <div className="flex justify-between">
                  <span className="text-slate-500">ชื่อทางการค้า:</span>
                  <span className="font-semibold text-slate-800">{deleteConfirmDrug.tradeName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">หมวดหมู่:</span>
                <span className="font-semibold text-emerald-800">{deleteConfirmDrug.category}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmDrug(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ยืนยันลบยานี้</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
