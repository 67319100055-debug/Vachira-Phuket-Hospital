import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Clock,
  ShoppingCart,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpRight,
  TrendingDown,
  Building2,
  Calendar,
  Layers,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Medicine, PurchaseOrder, UserRole } from '../../types/pharmacy';

interface InventoryManagementViewProps {
  medicines: Medicine[];
  purchaseOrders: PurchaseOrder[];
  onAddPurchaseOrder: (po: PurchaseOrder) => void;
  userRole: UserRole;
}

export const InventoryManagementView: React.FC<InventoryManagementViewProps> = ({
  medicines,
  purchaseOrders,
  onAddPurchaseOrder,
  userRole
}) => {
  const [activeTab, setActiveTab] = useState<'stock' | 'expiry' | 'purchasing'>('stock');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);

  // New PO form state
  const [poSupplier, setPoSupplier] = useState('');
  const [poDrugName, setPoDrugName] = useState('');
  const [poQuantity, setPoQuantity] = useState(5000);
  const [poBudget, setPoBudget] = useState(25000);

  const isStaff = userRole !== 'public';

  // Calculate stock statuses
  const lowStockItems = medicines.filter(
    (m) => (m.stockQuantity || 0) <= (m.reorderPoint || 0)
  );

  // Calculate expiry items
  const now = new Date();
  const getMonthsUntilExpiry = (expiryStr?: string) => {
    if (!expiryStr) return 999;
    const exp = new Date(expiryStr);
    return (exp.getFullYear() - now.getFullYear()) * 12 + (exp.getMonth() - now.getMonth());
  };

  const expiredItems = medicines.filter((m) => getMonthsUntilExpiry(m.expiryDate) <= 0);
  const expiry3Months = medicines.filter((m) => {
    const diff = getMonthsUntilExpiry(m.expiryDate);
    return diff > 0 && diff <= 3;
  });
  const expiry6Months = medicines.filter((m) => {
    const diff = getMonthsUntilExpiry(m.expiryDate);
    return diff > 3 && diff <= 6;
  });

  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.includes(searchTerm)
  );

  const handleCreatePOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poSupplier || !poDrugName) return;

    const poNumber = 'PO-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newPO: PurchaseOrder = {
      id: 'po-' + Date.now(),
      poNumber,
      orderDate: new Date().toISOString().slice(0, 10),
      supplier: poSupplier,
      status: 'pending',
      totalAmount: poBudget,
      items: [
        {
          drugName: poDrugName,
          quantity: poQuantity,
          unit: 'เม็ด/หน่วย',
          unitPrice: poBudget / poQuantity
        }
      ]
    };

    onAddPurchaseOrder(newPO);
    setIsCreatePOOpen(false);
    confetti({ particleCount: 60, spread: 60 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-teal-700" />
            Supply Chain & Stock Control
          </span>
          <span className="text-xs text-slate-500">คลังยาและเวชภัณฑ์ รพ.วชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📦 ระบบจัดการคลังยา ยาใกล้หมดอายุ และจัดซื้อ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          บริหารจัดการปริมาณสำรองยา จุดสั่งซื้อซ้ำ (Reorder Point) การเฝ้าระวังยาหมดอายุ และกระบวนการจัดซื้อยา
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xl">
            <Layers className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <span className="text-xs text-slate-500">รายการยาในคลังทั้งหมด</span>
            <strong className="text-2xl font-bold text-slate-900 block font-heading">
              {medicines.length} รายการ
            </strong>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">
            <TrendingDown className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-xs text-amber-800">ยาต่ำกว่าจุดสั่งซื้อ (Low Stock)</span>
            <strong className="text-2xl font-bold text-amber-900 block font-heading">
              {lowStockItems.length} รายการ
            </strong>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xl">
            <Clock className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <span className="text-xs text-rose-800">ยาหมดอายุภายใน 3-6 เดือน</span>
            <strong className="text-2xl font-bold text-rose-900 block font-heading">
              {expiry3Months.length + expiry6Months.length} รายการ
            </strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab('stock')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'stock'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>1. สต็อกยาคงคลังและการเบิกจ่าย</span>
        </button>

        <button
          onClick={() => setActiveTab('expiry')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'expiry'
              ? 'border-rose-600 text-rose-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>2. เฝ้าระวังยาใกล้หมดอายุ (FEFO / Expiry)</span>
        </button>

        <button
          onClick={() => setActiveTab('purchasing')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeTab === 'purchasing'
              ? 'border-blue-600 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>3. งานจัดซื้อยาและเวชภัณฑ์ ({purchaseOrders.length})</span>
        </button>
      </div>

      {/* TAB 1: STOCK MANAGEMENT */}
      {activeTab === 'stock' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหายาในคลังด้วยชื่อยา รหัสยา..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="text-xs text-slate-500 shrink-0">
              พบ: <strong className="text-teal-700">{filteredMedicines.length}</strong> รายการ
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3">รหัสยา</th>
                    <th className="p-3">ชื่อยา / ชื่อสามัญ</th>
                    <th className="p-3">รูปแบบ</th>
                    <th className="p-3">จำนวนคงเหลือ</th>
                    <th className="p-3">จุดสั่งซื้อ (ROP)</th>
                    <th className="p-3">Lot Number</th>
                    <th className="p-3">วันหมดอายุ</th>
                    <th className="p-3 text-center">สถานะสต็อก</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredMedicines.map((med) => {
                    const isLow = (med.stockQuantity || 0) <= (med.reorderPoint || 0);
                    return (
                      <tr key={med.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-mono font-bold text-slate-500">{med.code}</td>
                        <td className="p-3">
                          <strong className="text-slate-900 block">{med.name}</strong>
                          <span className="text-slate-400 text-[11px] font-mono">{med.genericName}</span>
                        </td>
                        <td className="p-3">{med.dosageForm}</td>
                        <td className="p-3 font-mono font-bold text-slate-900 text-sm">
                          {med.stockQuantity?.toLocaleString()} {med.unit}
                        </td>
                        <td className="p-3 font-mono text-slate-500">
                          {med.reorderPoint?.toLocaleString()} {med.unit}
                        </td>
                        <td className="p-3 font-mono text-slate-500">{med.lotNumber || 'LOT-2601'}</td>
                        <td className="p-3 font-mono text-slate-500">{med.expiryDate || '2027-12-31'}</td>
                        <td className="p-3 text-center">
                          {isLow ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center justify-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> ต้องสั่งซื้อ
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800">
                              ปกติ (Normal)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXPIRY ALERTS */}
      {activeTab === 'expiry' && (
        <div className="space-y-6">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-1">
            <strong className="font-bold block text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-rose-600" />
              การบริหารจัดการยาหมดอายุตามหลัก FEFO (First Expired, First Out)
            </strong>
            <p>
              รายการยาที่หมดอายุก่อน ต้องถูกจัดจ่ายออกก่อน หรือประสานส่งคืนบริษัทผู้จัดจำหน่ายตามเงื่อนไขสัญญาซื้อขาย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: ภายใน 3 เดือน */}
            <div className="bg-white rounded-2xl border border-rose-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                  ยาหมดอายุภายใน 3 เดือน (เร่งระบาย / ส่งคืน)
                </h4>
                <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                  {expiry3Months.length} รายการ
                </span>
              </div>

              {expiry3Months.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">ไม่มียาที่หมดอายุภายใน 3 เดือน</p>
              ) : (
                <div className="space-y-2">
                  {expiry3Months.map((m) => (
                    <div key={m.id} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-slate-900 block">{m.name}</strong>
                        <span className="text-slate-500 text-[11px]">Lot: {m.lotNumber} | คงเหลือ: {m.stockQuantity}</span>
                      </div>
                      <span className="text-rose-700 font-bold font-mono">{m.expiryDate}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Box 2: ภายใน 6 เดือน */}
            <div className="bg-white rounded-2xl border border-amber-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  ยาหมดอายุภายใน 6 เดือน (เฝ้าระวัง)
                </h4>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  {expiry6Months.length} รายการ
                </span>
              </div>

              {expiry6Months.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">ไม่มียาที่หมดอายุใน 6 เดือน</p>
              ) : (
                <div className="space-y-2">
                  {expiry6Months.map((m) => (
                    <div key={m.id} className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-slate-900 block">{m.name}</strong>
                        <span className="text-slate-500 text-[11px]">Lot: {m.lotNumber} | คงเหลือ: {m.stockQuantity}</span>
                      </div>
                      <span className="text-amber-700 font-bold font-mono">{m.expiryDate}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PURCHASING SYSTEM */}
      {activeTab === 'purchasing' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              ประวัติและสถานะใบสั่งซื้อยา (Purchase Orders) สำหรับฝ่ายจัดซื้อกลุ่มงานเภสัชกรรม
            </div>
            {isStaff && (
              <button
                onClick={() => setIsCreatePOOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>เปิดใบสั่งซื้อใหม่ (PO)</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {purchaseOrders.map((po) => (
              <div
                key={po.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-800 text-sm">{po.poNumber}</span>
                    <span className="text-slate-400">|</span>
                    <strong className="text-slate-900">บริษัท: {po.supplier}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        po.status === 'received'
                          ? 'bg-emerald-100 text-emerald-800'
                          : po.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {po.status === 'received'
                        ? '✅ ตรวจรับเข้าคลังแล้ว'
                        : po.status === 'shipped'
                        ? '🚚 กำลังจัดส่ง'
                        : '⏳ รออนุมัติจัดซื้อ'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{po.orderDate}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  {po.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">{item.drugName}</span>
                      <span className="font-mono text-slate-600">
                        {item.quantity.toLocaleString()} {item.unit} @ ฿{item.unitPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 text-xs font-semibold text-slate-700">
                  <span>มูลค่ารวมทั้งสิ้น:</span>
                  <span className="text-sm font-bold text-blue-900 font-mono">
                    ฿{po.totalAmount.toLocaleString()} บาท
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Create PO Modal */}
          {isCreatePOOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
                <div className="p-4 bg-blue-700 text-white flex items-center justify-between">
                  <h3 className="text-sm font-bold">ออกใบสั่งซื้อยา (Purchase Order)</h3>
                  <button onClick={() => setIsCreatePOOpen(false)} className="text-white">✕</button>
                </div>

                <form onSubmit={handleCreatePOSubmit} className="p-5 space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">บริษัทผู้จำหน่าย / องค์การเภสัชกรรม *</label>
                    <input
                      type="text"
                      required
                      value={poSupplier}
                      onChange={(e) => setPoSupplier(e.target.value)}
                      placeholder="เช่น องค์การเภสัชกรรม (GPO), ดีเคเอสเอช"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">ชื่อรายการยาที่สั่งซื้อ *</label>
                    <input
                      type="text"
                      required
                      value={poDrugName}
                      onChange={(e) => setPoDrugName(e.target.value)}
                      placeholder="เช่น Paracetamol 500 mg Tablet"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">จำนวนสั่งซื้อ</label>
                      <input
                        type="number"
                        value={poQuantity}
                        onChange={(e) => setPoQuantity(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">งบประมาณ (บาท)</label>
                      <input
                        type="number"
                        value={poBudget}
                        onChange={(e) => setPoBudget(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsCreatePOOpen(false)}
                      className="px-3 py-1.5 bg-slate-200 rounded-lg text-slate-700"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold"
                    >
                      บันทึกใบสั่งซื้อ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
