import React, { useState, useRef } from 'react';
import { NewsItem, KnowledgeArticle } from '../../types';
import {
  Newspaper,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Image as ImageIcon,
  Search,
  Eye,
  Upload,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Tag,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { compressImageFile, PRESET_HOSPITAL_IMAGES } from '../../utils/fileHelpers';

interface AdminNewsAndKnowledgeProps {
  type: 'news' | 'knowledge';
  news: NewsItem[];
  articles: KnowledgeArticle[];
  onUpdateNews: (updated: NewsItem[]) => void;
  onUpdateArticles: (updated: KnowledgeArticle[]) => void;
  onResetNewsToDefault?: () => void;
}

export const AdminNewsAndKnowledge: React.FC<AdminNewsAndKnowledgeProps> = ({
  type,
  news,
  articles,
  onUpdateNews,
  onUpdateArticles,
  onResetNewsToDefault,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem>>({});
  const [currentArticle, setCurrentArticle] = useState<Partial<KnowledgeArticle>>({});
  const [previewNewsItem, setPreviewNewsItem] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: 'news' | 'article';
    id: string;
    title: string;
  } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const getTodayThaiDate = () => {
    return new Date().toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // News Actions
  const handleOpenAddNews = () => {
    setCurrentNews({
      id: `n_${Date.now()}`,
      title: '',
      summary: '',
      content: '',
      imageUrl: PRESET_HOSPITAL_IMAGES[0].url,
      date: getTodayThaiDate(),
      category: 'กิจกรรมกลุ่มงาน',
      views: 1,
      published: true,
    });
    setIsEditing(true);
  };

  const handleOpenEditNews = (item: NewsItem) => {
    setCurrentNews({ ...item });
    setIsEditing(true);
  };

  const handleDeleteNews = (id: string) => {
    const itemToDelete = news.find((n) => n.id === id);
    if (itemToDelete) {
      setDeleteConfirmTarget({
        type: 'news',
        id: itemToDelete.id,
        title: itemToDelete.title,
      });
    }
  };

  const handleTogglePublish = (id: string) => {
    const updated = news.map((item) =>
      item.id === id ? { ...item, published: !item.published } : item
    );
    onUpdateNews(updated);
    showToast('ปรับสถานะการเผยแพร่ข่าวเรียบร้อย');
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const compressedDataUrl = await compressImageFile(file, 1000, 0.75);
      setCurrentNews((prev) => ({
        ...prev,
        imageUrl: compressedDataUrl,
      }));
      showToast('อัปโหลดและประมวลผลรูปภาพสำเร็จ');
    } catch (err) {
      console.error('Failed to compress image', err);
      showToast('เกิดข้อผิดพลาดในการโหลดรูปภาพ กรุณาลองใหม่');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentNews.title?.trim()) {
      showToast('กรุณาระบุหัวข้อข่าว');
      return;
    }

    const savedItem: NewsItem = {
      id: currentNews.id || `n_${Date.now()}`,
      title: currentNews.title.trim(),
      summary: currentNews.summary?.trim() || currentNews.title.trim(),
      content: currentNews.content?.trim() || currentNews.summary?.trim() || currentNews.title.trim(),
      imageUrl: currentNews.imageUrl || PRESET_HOSPITAL_IMAGES[0].url,
      date: currentNews.date?.trim() || getTodayThaiDate(),
      category: currentNews.category?.trim() || 'กิจกรรมกลุ่มงาน',
      views: currentNews.views && currentNews.views > 0 ? currentNews.views : 1,
      published: currentNews.published ?? true,
    };

    const exists = news.some((n) => n.id === savedItem.id);
    const updated = exists
      ? news.map((n) => (n.id === savedItem.id ? savedItem : n))
      : [savedItem, ...news];

    onUpdateNews(updated);
    setIsEditing(false);
    showToast('บันทึกข่าวสารสำเร็จ! ข้อมูลถูกจัดเก็บลงระบบถาวรแล้ว');
  };

  // Knowledge Actions
  const handleOpenAddArticle = () => {
    setCurrentArticle({
      id: `k_${Date.now()}`,
      title: '',
      icon: '💊',
      summary: '',
      content: '',
      category: 'ความรู้เรื่องยา',
      author: 'เภสัชกร รพ.วชิระภูเก็ต',
      date: getTodayThaiDate(),
      readTime: '3 นาที',
    });
    setIsEditing(true);
  };

  const handleOpenEditArticle = (art: KnowledgeArticle) => {
    setCurrentArticle({ ...art });
    setIsEditing(true);
  };

  const handleDeleteArticle = (id: string) => {
    const itemToDelete = articles.find((a) => a.id === id);
    if (itemToDelete) {
      setDeleteConfirmTarget({
        type: 'article',
        id: itemToDelete.id,
        title: itemToDelete.title,
      });
    }
  };

  const handleExecuteDelete = () => {
    if (!deleteConfirmTarget) return;
    if (deleteConfirmTarget.type === 'news') {
      const updated = news.filter((n) => n.id !== deleteConfirmTarget.id);
      onUpdateNews(updated);
      showToast(`ลบข่าวสาร "${deleteConfirmTarget.title}" สำเร็จ ข้อมูลถูกอัปเดตเรียบร้อย`);
    } else {
      const updated = articles.filter((a) => a.id !== deleteConfirmTarget.id);
      onUpdateArticles(updated);
      showToast(`ลบบทความ "${deleteConfirmTarget.title}" สำเร็จ`);
    }
    setDeleteConfirmTarget(null);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentArticle.title?.trim()) return;

    const savedArticle: KnowledgeArticle = {
      id: currentArticle.id || `k_${Date.now()}`,
      title: currentArticle.title.trim(),
      icon: currentArticle.icon || '💊',
      summary: currentArticle.summary?.trim() || '',
      content: currentArticle.content?.trim() || currentArticle.summary?.trim() || '',
      category: currentArticle.category?.trim() || 'ความรู้เรื่องยา',
      author: currentArticle.author?.trim() || 'เภสัชกร รพ.วชิระภูเก็ต',
      date: currentArticle.date?.trim() || getTodayThaiDate(),
      readTime: currentArticle.readTime?.trim() || '3 นาที',
    };

    const exists = articles.some((a) => a.id === savedArticle.id);
    const updated = exists
      ? articles.map((a) => (a.id === savedArticle.id ? savedArticle : a))
      : [savedArticle, ...articles];

    onUpdateArticles(updated);
    setIsEditing(false);
    showToast('บันทึกบทความสำเร็จ');
  };

  // Filter Categories for News
  const newsCategories = [
    'ทั้งหมด',
    ...Array.from(new Set(news.map((n) => n.category).filter(Boolean))),
  ];

  const filteredNews = news.filter((item) => {
    const matchesCategory =
      selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (type === 'news') {
    return (
      <div className="space-y-6">
        {/* Success Toast */}
        {toastMessage && (
          <div className="p-3.5 bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-between shadow-md transition-all">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Header & Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">
                จัดการข่าวสารและกิจกรรมกลุ่มงานเภสัชกรรม
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                {news.length} รายการ
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              เพิ่ม แก้ไข และลบข่าวสาร กิจกรรมสัปดาห์เภสัชกรรม ข้อมูลจะถูกบันทึกสู่ระบบถาวร
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onResetNewsToDefault && (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5"
                title="คืนค่าข่าวเริ่มต้นของระบบ"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>คืนค่าเริ่มต้น</span>
              </button>
            )}

            <button
              onClick={handleOpenAddNews}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ เพิ่มข่าวใหม่</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ค้นหาชื่อข่าวสาร, เนื้อหาย่อ หรือหมวดหมู่..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-xl border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Total Results */}
            <div className="text-xs text-slate-500 shrink-0">
              แสดง {filteredNews.length} จากทั้งหมด {news.length} รายการ
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        {filteredNews.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            <Newspaper className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <div className="font-bold text-slate-700 text-sm">ไม่พบข่าวสารที่ค้นหา</div>
            <p className="mt-1 text-slate-400">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Image & Status Tag */}
                <div className="aspect-16/9 bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_HOSPITAL_IMAGES[0].url;
                    }}
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-medium backdrop-blur-xs">
                      {item.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.published
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {item.published ? 'เผยแพร่แล้ว' : 'แบบร่าง'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span>•</span>
                      <span>{item.views.toLocaleString()} views</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-1.5 line-clamp-2 hover:text-blue-600">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setPreviewNewsItem(item)}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ดูตัวอย่าง</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleTogglePublish(item.id)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${
                          item.published
                            ? 'text-amber-700 hover:bg-amber-50'
                            : 'text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {item.published ? 'ซ่อน' : 'เผยแพร่'}
                      </button>
                      <button
                        onClick={() => handleOpenEditNews(item)}
                        className="px-2.5 py-1 font-semibold text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="px-2.5 py-1 font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit / Add Modal for News */}
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-blue-700 text-white font-bold text-sm">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  <span>
                    {currentNews.id && news.some((n) => n.id === currentNews.id)
                      ? 'แก้ไขข่าวสาร / กิจกรรม'
                      : 'เพิ่มข่าวสาร / กิจกรรมใหม่'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNews} className="p-5 overflow-y-auto space-y-4 text-xs">
                {/* Title */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    หัวข้อข่าว / ชื่อกิจกรรม <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น สัปดาห์เภสัชกรรม 2568: กิจกรรมตรวจเช็กยาประจำตัว..."
                    value={currentNews.title || ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">หมวดหมู่ข่าว</label>
                    <input
                      type="text"
                      list="news-categories-list"
                      placeholder="เช่น กิจกรรมกลุ่มงาน, บริการวิชาการ, ประกาศเตือนภัย"
                      value={currentNews.category || ''}
                      onChange={(e) => setCurrentNews({ ...currentNews, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                    <datalist id="news-categories-list">
                      <option value="กิจกรรมกลุ่มงาน" />
                      <option value="บริการวิชาการ" />
                      <option value="ประกาศเตือนภัย" />
                      <option value="โครงการความปลอดภัยด้านยา" />
                      <option value="ข่าวประชาสัมพันธ์" />
                    </datalist>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">วันที่เผยแพร่</label>
                    <input
                      type="text"
                      placeholder="เช่น 5 ก.ย. 2568"
                      value={currentNews.date || ''}
                      onChange={(e) => setCurrentNews({ ...currentNews, date: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Image Section */}
                <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>รูปภาพประกอบข่าว</span>
                    </label>
                    <span className="text-[11px] text-slate-500">
                      อัปโหลดไฟล์จากเครื่อง หรือใส่ URL หรือเลือกภาพตัวอย่าง
                    </span>
                  </div>

                  {/* Upload button & URL input */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shrink-0 flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingImage ? 'กำลังประมวลผล...' : 'เลือกรูปจากเครื่อง'}</span>
                    </button>

                    <input
                      type="url"
                      placeholder="หรือวาง URL รูปภาพ (https://...)"
                      value={currentNews.imageUrl || ''}
                      onChange={(e) => setCurrentNews({ ...currentNews, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-xl border-slate-300 font-mono text-[11px] bg-white"
                    />
                  </div>

                  {/* Quick Preset Selector */}
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block mb-1.5">
                      หรือเลือกจากภาพกิจกรรมโรงพยาบาล:
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PRESET_HOSPITAL_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentNews({ ...currentNews, imageUrl: preset.url })}
                          className={`aspect-16/10 rounded-lg overflow-hidden border-2 relative transition-all ${
                            currentNews.imageUrl === preset.url
                              ? 'border-blue-600 ring-2 ring-blue-300'
                              : 'border-transparent hover:opacity-80'
                          }`}
                          title={preset.title}
                        >
                          <img
                            src={preset.url}
                            alt={preset.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Preview */}
                  {currentNews.imageUrl && (
                    <div className="mt-2 relative rounded-xl overflow-hidden aspect-16/9 bg-slate-200 border border-slate-300 max-h-48">
                      <img
                        src={currentNews.imageUrl}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs">
                        ตัวอย่างรูปภาพที่จะแสดง
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    เนื้อหาย่อ (Summary สำหรับแสดงบนการ์ดข่าว) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="สรุปประเด็นสำคัญของข่าว เช่น วัน เวลา สถานที่ และกิจกรรมเด่น..."
                    value={currentNews.summary || ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, summary: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-hidden leading-relaxed"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    เนื้อหาข่าวฉบับเต็ม
                  </label>
                  <textarea
                    rows={5}
                    placeholder="รายละเอียดกิจกรรม กำหนดการ ข้อควรปฏิบัติ หรือเบอร์ติดต่อสอบถาม..."
                    value={currentNews.content || ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-hidden leading-relaxed"
                  />
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="published-toggle"
                    checked={currentNews.published ?? true}
                    onChange={(e) =>
                      setCurrentNews({ ...currentNews, published: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <label htmlFor="published-toggle" className="text-slate-700 font-semibold cursor-pointer">
                    เผยแพร่ทันทีบนหน้าเว็บไซต์ (หากยกเลิกจะจัดเก็บเป็นแบบร่าง)
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  {currentNews.id && !currentNews.id.startsWith('n_') ? (
                    <button
                      type="button"
                      onClick={() => {
                        const newsItem = currentNews as NewsItem;
                        setIsEditing(false);
                        setDeleteConfirmTarget({
                          type: 'news',
                          id: newsItem.id,
                          title: newsItem.title,
                        });
                      }}
                      className="px-3 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>ลบข่าวนี้</span>
                    </button>
                  ) : <div />}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs transition-colors"
                    >
                      💾 บันทึกข้อมูลข่าวสาร
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Preview News Item */}
        {previewNewsItem && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setPreviewNewsItem(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white font-bold text-sm">
                <span>ตัวอย่างการแสดงผลข่าว</span>
                <button onClick={() => setPreviewNewsItem(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4 text-slate-800">
                <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={previewNewsItem.imageUrl}
                    alt={previewNewsItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                      {previewNewsItem.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {previewNewsItem.date} • {previewNewsItem.views} views
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {previewNewsItem.title}
                  </h3>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed font-medium">
                  {previewNewsItem.summary}
                </div>

                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {previewNewsItem.content || previewNewsItem.summary}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setPreviewNewsItem(null)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // KNOWLEDGE MANAGER (ARTICLES)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {toastMessage && (
        <div className="p-3.5 bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center justify-between shadow-md transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-200 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>จัดการคลังความรู้เรื่องยา</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
              {articles.length} บทความ
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            เพิ่ม แก้ไข และจัดหมวดหมู่บทความความรู้เรื่องยาสำหรับประชาชน
          </p>
        </div>
        <button
          onClick={handleOpenAddArticle}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ เพิ่มบทความใหม่</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((art) => (
          <div key={art.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="text-2xl mb-2">{art.icon}</div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800">{art.category}</span>
              <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1">{art.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{art.author}</span>
              <div className="flex gap-1">
                <button onClick={() => handleOpenEditArticle(art)} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDeleteArticle(art.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal for Article */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-indigo-700 text-white font-bold text-sm">
              <span>จัดการบทความความรู้</span>
              <button onClick={() => setIsEditing(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveArticle} className="p-5 overflow-y-auto space-y-3 text-xs">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block font-bold text-slate-700 mb-1">ไอคอน</label>
                  <input
                    type="text"
                    value={currentArticle.icon || '💊'}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, icon: e.target.value })}
                    className="w-full px-2 py-2 border rounded-xl border-slate-300 text-center text-lg"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block font-bold text-slate-700 mb-1">ชื่อบทความ *</label>
                  <input
                    type="text"
                    required
                    value={currentArticle.title || ''}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">หมวดหมู่</label>
                  <input
                    type="text"
                    value={currentArticle.category || ''}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ผู้เขียน (เภสัชกร)</label>
                  <input
                    type="text"
                    value={currentArticle.author || ''}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, author: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">เนื้อหาย่อ (Summary)</label>
                <textarea
                  rows={2}
                  value={currentArticle.summary || ''}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">เนื้อหาบทความฉบับเต็ม</label>
                <textarea
                  rows={4}
                  value={currentArticle.content || ''}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                {currentArticle.id && !currentArticle.id.startsWith('k_') ? (
                  <button
                    type="button"
                    onClick={() => {
                      const art = currentArticle as KnowledgeArticle;
                      setIsEditing(false);
                      setDeleteConfirmTarget({
                        type: 'article',
                        id: art.id,
                        title: art.title,
                      });
                    }}
                    className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ลบบทความนี้</span>
                  </button>
                ) : <div />}
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded-xl hover:bg-slate-50 font-semibold text-slate-700">ยกเลิก</button>
                  <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs">บันทึกบทความ</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal for News & Articles */}
      {deleteConfirmTarget && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDeleteConfirmTarget(null)}
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
                  ยืนยันการลบ{deleteConfirmTarget.type === 'news' ? 'ข่าวสาร/กิจกรรม' : 'บทความความรู้'}
                </h3>
                <p className="text-xs text-slate-500">ข้อมูลจะถูกลบออกจากระบบและไม่สามารถกู้คืนได้</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">ประเภท:</span>
                <span className="font-bold text-slate-700">
                  {deleteConfirmTarget.type === 'news' ? 'ข่าวสารและกิจกรรม' : 'คลังความรู้เรื่องยา'}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-500 block">หัวข้อ:</span>
                <span className="font-bold text-slate-900 line-clamp-2">{deleteConfirmTarget.title}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ยืนยันลบรายการนี้</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">ยืนยันการคืนค่าเริ่มต้น</h3>
                <p className="text-xs text-slate-500">ข้อมูลข่าวสารและกิจกรรมทั้งหมดจะถูกคืนค่ากลับเป็นชุดเริ่มต้นของโรงพยาบาล</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onResetNewsToDefault) {
                    onResetNewsToDefault();
                  }
                  setShowResetConfirm(false);
                  showToast('คืนค่าข่าวสารและกิจกรรมเริ่มต้นเรียบร้อยแล้ว');
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ยืนยันคืนค่า</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

