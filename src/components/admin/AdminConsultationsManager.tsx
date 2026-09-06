import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pill,
  User,
  Trash2,
  Check,
  Filter,
  Plus,
  Copy,
  ExternalLink,
  MessageCircleQuestion,
  ChevronRight,
  HelpCircle,
  X,
  PhoneCall,
  Save,
  Bell,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { PharmacistConsultationItem } from '../../types';

interface AdminConsultationsManagerProps {
  consultations: PharmacistConsultationItem[];
  currentUser: string;
  onUpdateConsultation: (updated: PharmacistConsultationItem) => void;
  onDeleteConsultation: (id: string) => void;
  onAddConsultation: (newConsult: PharmacistConsultationItem) => void;
  onMarkAllAsRead: () => void;
  onClearAnsweredConsultations?: () => void;
}

export const AdminConsultationsManager: React.FC<AdminConsultationsManagerProps> = ({
  consultations,
  currentUser,
  onUpdateConsultation,
  onDeleteConsultation,
  onAddConsultation,
  onMarkAllAsRead,
  onClearAnsweredConsultations,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'answered' | 'unread'>('all');
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // In-app Delete Confirmation Modal State (Avoids window.confirm being blocked by iframe)
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<PharmacistConsultationItem | null>(null);
  const [showClearAnsweredModal, setShowClearAnsweredModal] = useState(false);

  // Active item for Reply / Consultation Note Modal
  const [activeConsultForReply, setActiveConsultForReply] = useState<PharmacistConsultationItem | null>(null);
  const [replyNotes, setReplyNotes] = useState('');
  const [replyPharmacistName, setReplyPharmacistName] = useState(currentUser || 'ภก.อดิศักดิ์ (Admin)');
  const [replyStatus, setReplyStatus] = useState<'answered' | 'pending' | 'in_progress'>('answered');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Stats
  const totalCount = consultations.length;
  const pendingCount = consultations.filter((c) => c.status === 'pending').length;
  const answeredCount = consultations.filter((c) => c.status === 'answered').length;
  const unreadCount = consultations.filter((c) => !c.isRead).length;

  // Filtered List
  const filteredConsultations = consultations.filter((item) => {
    // Status Filter
    if (statusFilter === 'pending' && item.status !== 'pending') return false;
    if (statusFilter === 'answered' && item.status !== 'answered') return false;
    if (statusFilter === 'unread' && item.isRead) return false;

    // Search Query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.patientName.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      (item.drugName && item.drugName.toLowerCase().includes(q)) ||
      item.question.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q))
    );
  });

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhoneId(id);
    setTimeout(() => setCopiedPhoneId(null), 2000);
  };

  // Quick action: Mark as Contacted & Answered
  const handleQuickMarkContacted = (consult: PharmacistConsultationItem) => {
    const now = new Date();
    const timeStr = `วันนี้, ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

    const updated: PharmacistConsultationItem = {
      ...consult,
      status: 'answered',
      isRead: true,
      answeredBy: consult.answeredBy || currentUser || 'ภก.ผู้ดูแลระบบ (Admin)',
      answeredAt: consult.answeredAt || timeStr,
      pharmacistNotes:
        consult.pharmacistNotes ||
        'ได้ทำการโทรศัพท์ติดต่อกลับให้คำปรึกษาและคำแนะนำการใช้ยาแก่ผู้ป่วยเรียบร้อยแล้ว',
    };

    onUpdateConsultation(updated);
    triggerToast(`บันทึกสถานะ: ได้ทำการติดต่อกลับ "${consult.patientName}" เรียบร้อยแล้ว`);
  };

  // Quick action: Undo / Remove "Contacted" status back to Pending
  const handleQuickMarkPending = (consult: PharmacistConsultationItem) => {
    onUpdateConsultation({
      ...consult,
      status: 'pending',
      answeredBy: undefined,
      answeredAt: undefined,
      pharmacistNotes: undefined,
    });
    triggerToast(`ยกเลิกสถานะ "ติดต่อกลับแล้ว" ของ "${consult.patientName}" คืนกลับเป็นรอดำเนินการ`);
  };

  // Direct Delete Execution (from in-app modal)
  const handleConfirmDelete = () => {
    if (!deleteConfirmItem) return;
    const name = deleteConfirmItem.patientName;
    onDeleteConsultation(deleteConfirmItem.id);
    setDeleteConfirmItem(null);
    triggerToast(`ลบข้อมูลข้อความของ "${name}" เรียบร้อยแล้ว`);
  };

  // Clear all answered items
  const handleConfirmClearAnswered = () => {
    if (onClearAnsweredConsultations) {
      onClearAnsweredConsultations();
    } else {
      // Fallback if not passed: delete each answered one
      consultations
        .filter((c) => c.status === 'answered')
        .forEach((c) => onDeleteConsultation(c.id));
    }
    setShowClearAnsweredModal(false);
    triggerToast(`ลบรายการที่ได้ทำการติดต่อกลับแล้วทั้งหมด ${answeredCount} รายการ สำเร็จ`);
  };

  const handleOpenReplyModal = (consult: PharmacistConsultationItem) => {
    setActiveConsultForReply(consult);
    setReplyNotes(consult.pharmacistNotes || '');
    setReplyPharmacistName(consult.answeredBy || currentUser || 'ภก.อดิศักดิ์ (Admin)');
    setReplyStatus(consult.status === 'answered' ? 'answered' : 'answered');

    // Automatically mark as read when opened
    if (!consult.isRead) {
      onUpdateConsultation({ ...consult, isRead: true });
    }
  };

  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConsultForReply) return;

    const now = new Date();
    const timeStr = `วันนี้, ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

    const updated: PharmacistConsultationItem = {
      ...activeConsultForReply,
      status: replyStatus,
      isRead: true,
      pharmacistNotes: replyNotes.trim(),
      answeredBy: replyPharmacistName.trim() || 'ภก.เวร รพ.วชิระภูเก็ต',
      answeredAt: activeConsultForReply.answeredAt || timeStr,
    };

    onUpdateConsultation(updated);
    setActiveConsultForReply(null);
    triggerToast(
      replyStatus === 'answered'
        ? `บันทึกว่าได้ทำการติดต่อกลับ "${activeConsultForReply.patientName}" เรียบร้อยแล้ว`
        : `บันทึกข้อมูลคำปรึกษา "${activeConsultForReply.patientName}" เรียบร้อยแล้ว`
    );
  };

  const handleToggleRead = (consult: PharmacistConsultationItem) => {
    onUpdateConsultation({ ...consult, isRead: !consult.isRead });
  };

  // Simulate a test incoming message from a patient
  const handleSimulateTestMessage = () => {
    const sampleNames = [
      'คุณมาลี วงศ์สวรรค์',
      'นายธวัชชัย รัตนประสิทธิ์',
      'นางสมศรี ทองคำ',
      'นายสุรเดช สุขเจริญ',
      'น.ส.กัญญารัตน์ ชุ่มชื่น',
    ];
    const sampleDrugs = [
      'Simvastatin 20 mg',
      'Aspirin 81 mg',
      'Losartan 50 mg',
      'ยาหยอดตา Levofloxacin',
      'Metformin 500 mg',
    ];
    const sampleQuestions = [
      'รับประทานยาลดไขมันแล้วมีอาการปวดกล้ามเนื้อน่องมากตอนกลางคืน เป็นมา 3 วันแล้ว ควรหยุดยาหรือไม่ครับ?',
      'ลืมทานยาความดันช่วงเช้า มานึกได้ตอน 15.00 น. ต้องทานเลยไหม หรือรอทานวันพรุ่งนี้ครับ?',
      'ยาหยอดตาเปิดใช้มา 1 เดือนแล้ว ยังเหลืออยู่ครึ่งขวด สามารถใช้ต่อได้ไหมคะ?',
      'ทานยาพาราเซตามอลคู่กับยาแก้แพ้ที่ได้มาพร้อมกันได้ไหมครับ มีอาการง่วงมาก',
      'ทานยาเบาหวานแล้วรู้สึกหน้ามืด ใจสั่น เหงื่อแตก ต้องทำอย่างไรทันทีครับ?',
    ];

    const randomIdx = Math.floor(Math.random() * sampleNames.length);
    const now = new Date();
    const timeStr = `วันนี้, ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

    const testConsult: PharmacistConsultationItem = {
      id: `consult-test-${Date.now()}`,
      patientName: sampleNames[randomIdx],
      phone: `08${Math.floor(10000000 + Math.random() * 90000000)}`,
      drugName: sampleDrugs[randomIdx],
      category: 'ข้อสงสัยการใช้ยาทั่วไป',
      question: sampleQuestions[randomIdx],
      status: 'pending',
      createdAt: timeStr,
      isRead: false,
    };

    onAddConsultation(testConsult);
    triggerToast(`เพิ่มข้อความจำลองจาก "${testConsult.patientName}" สำเร็จ`);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Feedback Notification */}
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

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Bell className="w-3.5 h-3.5 text-teal-700" />
              Pharmacist Consultations & Inquiries
            </span>
            {pendingCount > 0 ? (
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full animate-pulse border border-amber-300">
                ⚠️ รอดำเนินการติดต่อกลับ {pendingCount} รายการ
              </span>
            ) : (
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                ✓ ดำเนินการติดต่อกลับครบทุกรายการแล้ว
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-teal-700" />
            <span>กล่องข้อความปรึกษาเภสัชกร</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ข้อความคำถามและปัญหาการใช้ยาที่ผู้รับบริการ รพ.วชิระภูเก็ต ส่งเข้ามา แอดมินสามารถกดโทรกลับ บันทึกว่าติดต่อกลับแล้ว หรือลบรายการได้ทันที
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {answeredCount > 0 && (
            <button
              onClick={() => setShowClearAnsweredModal(true)}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
              title="ลบรายการที่ได้ทำการติดต่อกลับแล้วทั้งหมดออกจากระบบ"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>ลบรายการที่ติดต่อกลับแล้ว ({answeredCount})</span>
            </button>
          )}

          {unreadCount > 0 && (
            <button
              onClick={() => {
                onMarkAllAsRead();
                triggerToast('ทำเครื่องหมายว่าอ่านแล้วทั้งหมดเรียบร้อย');
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-slate-600" />
              <span>อ่านทั้งหมดแล้ว</span>
            </button>
          )}

          <button
            onClick={handleSimulateTestMessage}
            className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            title="จำลองคนไข้ส่งข้อความเข้ามาเพื่อทดสอบระบบ"
          >
            <Plus className="w-3.5 h-3.5 text-teal-700" />
            <span>+ จำลองข้อความใหม่ (ทดสอบ)</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-80">ข้อความทั้งหมด</span>
            <span className="text-lg">📬</span>
          </div>
          <div className="text-2xl font-black mt-2">{totalCount}</div>
          <div className="text-[11px] opacity-70 mt-0.5">รวมทุกสถานะ</div>
        </div>

        <div
          onClick={() => setStatusFilter('pending')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'pending'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md'
              : 'bg-white text-slate-900 border-slate-200 hover:border-amber-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-80">รอดำเนินการ / รอโทรกลับ</span>
            <span className="text-lg">⏳</span>
          </div>
          <div className="text-2xl font-black text-amber-600 group-hover:text-amber-700 mt-2">
            {pendingCount}
          </div>
          <div className="text-[11px] opacity-70 mt-0.5">
            {pendingCount > 0 ? '⚠️ ยังไม่ได้ติดต่อกลับ' : 'จัดการครบทุกรายการ'}
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('answered')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'answered'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
              : 'bg-white text-slate-900 border-slate-200 hover:border-emerald-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-80">ติดต่อกลับแล้ว</span>
            <span className="text-lg">✅</span>
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-2">{answeredCount}</div>
          <div className="text-[11px] opacity-70 mt-0.5">ให้คำปรึกษาสำเร็จ</div>
        </div>

        <div
          onClick={() => setStatusFilter('unread')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'unread'
              ? 'bg-rose-600 text-white border-rose-600 shadow-md'
              : 'bg-white text-slate-900 border-slate-200 hover:border-rose-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-80">ข้อความใหม่ที่ยังไม่อ่าน</span>
            <span className="text-lg">🔴</span>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-2">{unreadCount}</div>
          <div className="text-[11px] opacity-70 mt-0.5">ยังไม่เปิดดูรายละเอียด</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, เบอร์โทร, ชื่อยา, คำถาม..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-hidden bg-slate-50/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ล้าง
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด ({totalCount})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors flex items-center gap-1 ${
              statusFilter === 'pending'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span>รอดำเนินการ</span>
            <span className="px-1.5 py-0.2 bg-amber-700/30 rounded-md text-[10px]">
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setStatusFilter('answered')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors flex items-center gap-1 ${
              statusFilter === 'answered'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>ติดต่อกลับแล้ว</span>
            <span className="px-1.5 py-0.2 bg-emerald-700/30 rounded-md text-[10px]">
              {answeredCount}
            </span>
          </button>
          <button
            onClick={() => setStatusFilter('unread')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors ${
              statusFilter === 'unread'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            ยังไม่อ่าน ({unreadCount})
          </button>
        </div>
      </div>

      {/* Consultations List */}
      {filteredConsultations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
          <MessageCircleQuestion className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p className="text-sm font-bold text-slate-700">ไม่พบข้อความปรึกษาเภสัชกรที่ตรงกับเงื่อนไข</p>
          <p className="text-xs text-slate-400 mt-1">
            ลองปรับเปลี่ยนคำค้นหา หรือคลิกปุ่ม "+ จำลองข้อความใหม่" ด้านบนเพื่อทดสอบ
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConsultations.map((item) => {
            const isPending = item.status === 'pending';
            const isAnswered = item.status === 'answered';
            const isUnread = !item.isRead;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isUnread
                    ? 'border-teal-300 shadow-sm ring-1 ring-teal-200'
                    : isPending
                    ? 'border-amber-300 bg-amber-50/10 shadow-xs'
                    : 'border-slate-200 bg-slate-50/30 shadow-2xs'
                }`}
              >
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Top line: Status, Category, Timestamp, Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {isUnread && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                          ใหม่ (ยังไม่อ่าน)
                        </span>
                      )}

                      {isPending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[11px] font-bold border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-700" />
                          รอดำเนินการติดต่อกลับ
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[11px] font-bold border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          ได้ทำการติดต่อกลับแล้ว
                        </span>
                      )}

                      {item.category && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Main info row: Patient name, Phone, Drug Name */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2.5 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shadow-2xs">
                            {item.patientName.charAt(0) || 'ผ'}
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block">ผู้ส่งคำถาม</span>
                            <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                              {item.patientName}
                            </span>
                          </div>
                        </div>

                        {/* Phone with call button */}
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                          <Phone className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="font-bold text-slate-800">{item.phone}</span>
                          <a
                            href={`tel:${item.phone}`}
                            className="ml-1 p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="กดโทรออก"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleCopyPhone(item.id, item.phone)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                            title="คัดลอกเบอร์โทร"
                          >
                            {copiedPhoneId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {item.drugName && (
                        <div className="flex items-center gap-2 text-xs text-slate-700 pt-1">
                          <Pill className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-semibold text-slate-500">ยาที่มีข้อสงสัย:</span>
                          <span className="font-bold text-slate-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {item.drugName}
                          </span>
                        </div>
                      )}

                      {/* Question Content */}
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs text-slate-800 leading-relaxed">
                        <span className="font-bold text-slate-700 block mb-1">
                          รายละเอียดคำถาม / อาการที่พบ:
                        </span>
                        <p className="whitespace-pre-wrap">{item.question}</p>
                      </div>

                      {/* Answer / Notes from Pharmacist if answered */}
                      {item.pharmacistNotes && (
                        <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-1 font-bold text-emerald-900">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              บันทึกการให้คำปรึกษาของเภสัชกร:
                            </span>
                            <span className="text-[11px] font-normal text-emerald-800">
                              โดย {item.answeredBy || 'เภสัชกร'} {item.answeredAt ? `• ${item.answeredAt}` : ''}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap text-slate-700 leading-relaxed pt-1">
                            {item.pharmacistNotes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Controls Column */}
                    <div className="flex flex-col gap-2 shrink-0 pt-2 lg:pt-0 w-full lg:w-56">
                      {/* Priority Button: Mark Contacted or Toggle */}
                      {isPending ? (
                        <button
                          type="button"
                          onClick={() => handleQuickMarkContacted(item)}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:shadow-sm"
                          title="กดเพื่อทำเครื่องหมายว่าได้โทรติดต่อกลับและให้คำปรึกษาแล้ว"
                        >
                          <Check className="w-4 h-4" />
                          <span>ทำเครื่องหมาย: ติดต่อกลับแล้ว</span>
                        </button>
                      ) : (
                        <div className="space-y-1.5 w-full">
                          <button
                            type="button"
                            onClick={() => handleQuickMarkPending(item)}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold transition-colors"
                            title="ยกเลิก/ลบสถานะว่าติดต่อกลับแล้ว และคืนกลับเป็นรอดำเนินการ"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                            <span>ลบสถานะติดต่อแล้ว (คืนเป็นรอดำเนินการ)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmItem(item)}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
                            title="ลบข้อความนี้ออกจากระบบอย่างถาวร"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                            <span>ลบข้อความนี้ออกจากระบบ</span>
                          </button>
                        </div>
                      )}

                      {/* Phone Call */}
                      <a
                        href={`tel:${item.phone}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>โทรหาคนไข้ ({item.phone})</span>
                      </a>

                      {/* Clinical Note Modal Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenReplyModal(item)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-teal-900 border border-teal-200 rounded-xl text-xs font-bold transition-colors shadow-2xs"
                      >
                        <Save className="w-3.5 h-3.5 text-teal-700" />
                        <span>{item.pharmacistNotes ? 'แก้ไขบันทึกคำปรึกษา' : 'เขียนบันทึกคำแนะนำ'}</span>
                      </button>

                      <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleToggleRead(item)}
                          className="px-2.5 py-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          {item.isRead ? 'ทำเป็นยังไม่อ่าน' : 'ทำว่าอ่านแล้ว'}
                        </button>

                        {/* Safe In-App Delete Button (Does NOT use window.confirm) */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="ลบข้อความนี้ออกจากระบบ"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span>ลบข้อความ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* In-App Modal: Confirm Delete Single Consultation (Replaces window.confirm) */}
      {deleteConfirmItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDeleteConfirmItem(null)}
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
                <h3 className="text-base font-extrabold text-slate-900">
                  ยืนยันการลบข้อความปรึกษา
                </h3>
                <p className="text-xs text-slate-500">
                  ข้อมูลจะถูกลบออกจากระบบและไม่สามารถกู้คืนได้
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">ชื่อผู้ป่วย:</span>
                <span className="font-bold text-slate-900">{deleteConfirmItem.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">เบอร์โทรศัพท์:</span>
                <span className="font-semibold text-slate-800">{deleteConfirmItem.phone}</span>
              </div>
              {deleteConfirmItem.drugName && (
                <div className="flex justify-between">
                  <span className="text-slate-500">ยาที่สอบถาม:</span>
                  <span className="font-semibold text-teal-800">{deleteConfirmItem.drugName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">สถานะปัจจุบัน:</span>
                <span
                  className={`font-bold ${
                    deleteConfirmItem.status === 'answered' ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {deleteConfirmItem.status === 'answered'
                    ? '✅ ได้ทำการติดต่อกลับแล้ว'
                    : '⏳ รอดำเนินการติดต่อกลับ'}
                </span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 text-slate-700 line-clamp-2">
                "{deleteConfirmItem.question}"
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
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
                <span>ยืนยันการลบข้อความนี้</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-App Modal: Confirm Clear All Answered Consultations */}
      {showClearAnsweredModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowClearAnsweredModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  ลบรายการที่ติดต่อกลับแล้วทั้งหมด
                </h3>
                <p className="text-xs text-slate-500">
                  ล้างกล่องข้อความเฉพาะรายการที่ให้คำปรึกษาเสร็จสิ้นแล้ว
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              คุณต้องการลบข้อความที่{' '}
              <strong className="text-slate-900 font-bold">
                ได้ทำการติดต่อกลับแล้วทั้งหมด ({answeredCount} รายการ)
              </strong>{' '}
              ออกจากระบบใช่หรือไม่? ข้อความที่ยังรอดำเนินการ ({pendingCount} รายการ) จะยังคงอยู่ตามเดิม
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowClearAnsweredModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmClearAnswered}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ยืนยันลบ {answeredCount} รายการ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Record Pharmacist Consultation / Clinical Notes */}
      {activeConsultForReply && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveConsultForReply(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-teal-800 to-emerald-800 text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-300" />
                <h3 className="font-bold text-base">บันทึกการให้คำปรึกษาด้านยา (Clinical Note)</h3>
              </div>
              <button
                onClick={() => setActiveConsultForReply(null)}
                className="p-1.5 rounded-lg text-teal-200 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReply} className="p-5 overflow-y-auto space-y-4">
              {/* Patient Query Summary */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">ผู้ขอรับคำปรึกษา:</span>
                  <span className="font-bold text-slate-800">{activeConsultForReply.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">เบอร์โทรติดต่อ:</span>
                  <a href={`tel:${activeConsultForReply.phone}`} className="font-bold text-emerald-700 hover:underline">
                    {activeConsultForReply.phone}
                  </a>
                </div>
                {activeConsultForReply.drugName && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">ยาที่สอบถาม:</span>
                    <span className="font-bold text-slate-800">{activeConsultForReply.drugName}</span>
                  </div>
                )}
                <div className="pt-1 border-t border-slate-200/60 text-slate-700">
                  <span className="font-semibold">ข้อความผู้ป่วย: </span>
                  <span>"{activeConsultForReply.question}"</span>
                </div>
              </div>

              {/* Response Note Field */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  รายละเอียดการให้คำปรึกษา / คำแนะนำของเภสัชกร *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="เช่น โทรกลับเมื่อเวลา 10:45 น. แนะนำให้หยุดยาแก้แพ้ตัวเดิม นำประวัติการแพ้มาออกบัตรแพ้ยา และจัดกลุ่มยาใหม่ให้ผู้ป่วย คนไข้เข้าใจคำแนะนำเป็นอย่างดี..."
                  value={replyNotes}
                  onChange={(e) => setReplyNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    สถานะการให้คำปรึกษา
                  </label>
                  <select
                    value={replyStatus}
                    onChange={(e) => setReplyStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-hidden bg-white"
                  >
                    <option value="answered">✅ ได้ทำการติดต่อกลับแล้ว (Answered)</option>
                    <option value="in_progress">⏳ อยู่ระหว่างติดตามอาการ (In Progress)</option>
                    <option value="pending">⚠️ ยังรอดำเนินการติดต่อกลับ (Pending)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    เภสัชกรผู้ให้คำปรึกษา
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น ภก.อดิศักดิ์ (Admin)"
                    value={replyPharmacistName}
                    onChange={(e) => setReplyPharmacistName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const itemToDelete = activeConsultForReply;
                    setActiveConsultForReply(null);
                    setDeleteConfirmItem(itemToDelete);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ลบข้อความนี้</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveConsultForReply(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>บันทึกข้อมูลคำปรึกษา</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
