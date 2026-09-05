import React, { useState } from 'react';
import { NewsItem, KnowledgeArticle } from '../../types';
import { Newspaper, BookOpen, Plus, Trash2, Edit2, Check, X, Image } from 'lucide-react';

interface AdminNewsAndKnowledgeProps {
  type: 'news' | 'knowledge';
  news: NewsItem[];
  articles: KnowledgeArticle[];
  onUpdateNews: (updated: NewsItem[]) => void;
  onUpdateArticles: (updated: KnowledgeArticle[]) => void;
}

export const AdminNewsAndKnowledge: React.FC<AdminNewsAndKnowledgeProps> = ({
  type,
  news,
  articles,
  onUpdateNews,
  onUpdateArticles,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem>>({});
  const [currentArticle, setCurrentArticle] = useState<Partial<KnowledgeArticle>>({});

  // News Actions
  const handleOpenAddNews = () => {
    setCurrentNews({
      id: `n_${Date.now()}`,
      title: '',
      summary: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      date: 'วันนี้',
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
    if (confirm('ยืนยันการลบข่าวนี้?')) {
      onUpdateNews(news.filter((n) => n.id !== id));
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentNews.title) return;
    const exists = news.some((n) => n.id === currentNews.id);
    const updated = exists
      ? news.map((n) => (n.id === currentNews.id ? (currentNews as NewsItem) : n))
      : [currentNews as NewsItem, ...news];
    onUpdateNews(updated);
    setIsEditing(false);
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
      date: 'วันนี้',
      readTime: '3 นาที',
    });
    setIsEditing(true);
  };

  const handleOpenEditArticle = (art: KnowledgeArticle) => {
    setCurrentArticle({ ...art });
    setIsEditing(true);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('ยืนยันการลบบทความนี้?')) {
      onUpdateArticles(articles.filter((a) => a.id !== id));
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentArticle.title) return;
    const exists = articles.some((a) => a.id === currentArticle.id);
    const updated = exists
      ? articles.map((a) => (a.id === currentArticle.id ? (currentArticle as KnowledgeArticle) : a))
      : [currentArticle as KnowledgeArticle, ...articles];
    onUpdateArticles(updated);
    setIsEditing(false);
  };

  if (type === 'news') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              <span>จัดการข่าวสาร & กิจกรรม</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              เผยแพร่ข่าวสาร สัปดาห์เภสัชกรรม และประกาศเตือนภัยสุขภาพ
            </p>
          </div>
          <button
            onClick={handleOpenAddNews}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ เพิ่มข่าวใหม่</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="aspect-16/9 bg-slate-100 overflow-hidden relative">
                <img src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-medium">
                  {item.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 mb-1">{item.date} • {item.views} views</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{item.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.summary}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button onClick={() => handleOpenEditNews(item)} className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg">
                    แก้ไข
                  </button>
                  <button onClick={() => handleDeleteNews(item.id)} className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg">
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal for News */}
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-blue-700 text-white font-bold text-sm">
                <span>จัดการข่าวสาร</span>
                <button onClick={() => setIsEditing(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSaveNews} className="p-5 overflow-y-auto space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">หัวข้อข่าว *</label>
                  <input
                    type="text"
                    required
                    value={currentNews.title || ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">หมวดหมู่</label>
                    <input
                      type="text"
                      value={currentNews.category || ''}
                      onChange={(e) => setCurrentNews({ ...currentNews, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">วันที่เผยแพร่</label>
                    <input
                      type="text"
                      value={currentNews.date || ''}
                      onChange={(e) => setCurrentNews({ ...currentNews, date: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL รูปภาพ</label>
                  <input
                    type="url"
                    value={currentNews.imageUrl || ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">เนื้อหาย่อ (Summary)</label>
                  <textarea
                    rows={2}
                    value={currentNews.summary || ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, summary: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">เนื้อหาข่าวฉบับเต็ม</label>
                  <textarea
                    rows={4}
                    value={currentNews.content || ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl border-slate-300 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded-xl">ยกเลิก</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold">บันทึกข่าว</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Knowledge Manager
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>จัดการคลังความรู้เรื่องยา</span>
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
          <div key={art.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
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

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded-xl">ยกเลิก</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold">บันทึกบทความ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
