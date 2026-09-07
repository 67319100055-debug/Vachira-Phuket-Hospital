import React, { useState } from 'react';
import { QueueItem } from '../types';
import { Clock, Search, X, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface QueueCheckModalProps {
  queues: QueueItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const QueueCheckModal: React.FC<QueueCheckModalProps> = ({
  queues = [],
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<QueueItem | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanQuery = query.trim().toUpperCase();
    const found = (queues || []).find(
      (q) => q.queueNumber.toUpperCase() === cleanQuery || q.hn.includes(cleanQuery)
    );
    setSearchResult(found || null);
  };

  const getStatusBadge = (status: QueueItem['status']) => {
    switch (status) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 animate-pulse">
            <CheckCircle2 className="w-4 h-4" />
            <span>พร้อมรับยา (เชิญที่ช่องบริการ)</span>
          </span>
        );
      case 'dispensing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>กำลังจัดและตรวจสอบยา</span>
          </span>
        );
      case 'waiting_check':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Clock className="w-4 h-4" />
            <span>รอเภสัชกรตรวจสอบใบสั่งยา</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            เสร็จสิ้น
          </span>
        );
    }
  };

  return (
    <div
      id="queue-check-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                ตรวจสอบคิวรับยาผู้ป่วยนอก
              </h3>
              <p className="text-xs text-emerald-200">
                ระบบติดตามสถานะการจัดยา Real-time รพ.วชิระภูเก็ต
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:bg-white/10"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              กรอกหมายเลขคิวรับยา (เช่น A102, A103) หรือ หมายเลขบัตรโรงพยาบาล (HN):
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="queue-search-input"
                  type="text"
                  placeholder="เช่น A102 หรือ 5812934"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-3.5 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>ค้นหาคิว</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span>คิวตัวอย่างที่เปิดทดสอบ:</span>
              {queues.slice(0, 3).map((q) => (
                <button
                  type="button"
                  key={q.queueNumber}
                  onClick={() => {
                    setQuery(q.queueNumber);
                    setSearchResult(q);
                    setHasSearched(true);
                  }}
                  className="px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 text-emerald-700 font-semibold border border-slate-200 text-[10px]"
                >
                  {q.queueNumber}
                </button>
              ))}
            </div>
          </form>

          {/* Search Result Card */}
          {hasSearched && (
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
              {searchResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500">หมายเลขคิวของคุณ</span>
                      <div className="text-3xl font-black text-slate-900 tracking-tight">
                        {searchResult.queueNumber}
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(searchResult.status)}
                      <div className="text-[11px] text-slate-500 mt-1">
                        อัปเดตเมื่อ {searchResult.updatedAt}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-500">ผู้รับบริการ:</span>
                      <div className="font-bold text-slate-800 mt-0.5">
                        {searchResult.patientName}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-500">ช่องรับยาที่กำหนด:</span>
                      <div className="font-bold text-emerald-800 mt-0.5">
                        {searchResult.room}
                      </div>
                    </div>
                  </div>

                  {/* Progress steps */}
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-slate-700 mb-2">
                      ความคืบหน้าการบริการ:
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div
                        className={`p-2 rounded-lg font-medium ${
                          searchResult.status === 'waiting_check'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        1. ตรวจสอบใบสั่งยา
                      </div>
                      <div
                        className={`p-2 rounded-lg font-medium ${
                          searchResult.status === 'dispensing'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : searchResult.status === 'ready'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        2. จัดและตรวจสอบยา
                      </div>
                      <div
                        className={`p-2 rounded-lg font-medium ${
                          searchResult.status === 'ready'
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        3. รับยาที่ช่องบริการ
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="font-semibold text-sm">ไม่พบคิวรับยา "{query}"</p>
                  <p className="text-xs text-slate-400 mt-1">
                    กรุณาตรวจสอบหมายเลขคิวบนบัตร หรือติดต่อเคาน์เตอร์คัดกรองห้องยา
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Current Hospital Live Board */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>กระดานสถานะคิวห้องจ่ายยาผู้ป่วยนอกขณะนี้</span>
              </h4>
              <span className="text-[11px] text-slate-400">อัปเดตอัตโนมัติ</span>
            </div>

            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
              {(queues || []).map((q) => (
                <div key={q.queueNumber} className="p-3 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm text-slate-800 bg-slate-100 px-2 py-1 rounded-md">
                      {q.queueNumber}
                    </span>
                    <div>
                      <div className="font-medium text-slate-700">{q.room}</div>
                      <div className="text-[10px] text-slate-400">{q.patientName}</div>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(q.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
