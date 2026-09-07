import React, { useState } from 'react';
import { Clock, Tag, ChevronRight, Share2, Search, ArrowLeft } from 'lucide-react';
import { NewsItem } from '../../types/pharmacy';

interface NewsViewProps {
  news?: NewsItem[];
}

export const NewsView: React.FC<NewsViewProps> = ({ news = [] }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(news.map((n) => n.category)))];

  const filteredNews = news.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  if (selectedNews) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <button
          onClick={() => setSelectedNews(null)}
          className="flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้ารวมข่าวสาร</span>
        </button>

        <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-semibold">
                {selectedNews.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedNews.date}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug font-heading">
              {selectedNews.title}
            </h1>
          </div>

          {selectedNews.imageUrl && (
            <div className="rounded-xl overflow-hidden bg-slate-100 max-h-96">
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-medium text-slate-800 text-base">
              {selectedNews.summary}
            </p>
            <p>
              กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต มุ่งมั่นยกระดับคุณภาพการให้บริการด้านยาเพื่อความปลอดภัยสูงสุดของประชาชนในจังหวัดภูเก็ตและนักท่องเที่ยว โดยมีทีมเภสัชกรเชี่ยวชาญพร้อมให้คำปรึกษา แนะนำการใช้ยาอย่างสมเหตุผล (RDU) และติดตามการรักษาอย่างใกล้ชิด
            </p>
            <p>
              ผู้รับบริการสามารถสอบถามข้อมูลเพิ่มเติมเกี่ยวกับข่าวสารและกิจกรรมนี้ได้ที่ กลุ่มงานเภสัชกรรม อาคารคุณพุ่ม ชั้น 1 โรงพยาบาลวชิระภูเก็ต โทรศัพท์ 076-361234
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
            News & Public Announcements
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📰 ข่าวสารและกิจกรรมกลุ่มงานเภสัชกรรม
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          อัปเดตข่าวสาร ประกาศจัดซื้อยา แจ้งเตือนความปลอดภัยด้านยา และกิจกรรมบริการวิชาการเพื่อประชาชน
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'ทั้งหมด' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาข่าวสาร..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            {item.imageUrl && (
              <div className="h-44 overflow-hidden bg-slate-100 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-teal-800/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
            )}

            <div className="p-5 space-y-2 flex-1">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {item.date}
              </span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="p-5 pt-0 flex items-center text-xs font-semibold text-teal-600 group-hover:text-teal-800">
              <span>อ่านรายละเอียดต่อ</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
