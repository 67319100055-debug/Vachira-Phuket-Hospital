import React, { useState } from 'react';
import { BookOpen, Search, Clock, User, ArrowLeft, ChevronRight, Bookmark } from 'lucide-react';
import { KnowledgeArticle } from '../../types/pharmacy';

interface KnowledgeBaseViewProps {
  articles?: KnowledgeArticle[];
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ articles = [] }) => {
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredArticles = articles.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปคลังความรู้เรื่องยา</span>
        </button>

        <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 sm:p-8 space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-5">
            <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-semibold">
              {selectedArticle.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug font-heading">
              {selectedArticle.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-teal-600" />
                {selectedArticle.author}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.publishedDate}
              </span>
            </div>
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100 text-teal-950 font-medium">
              💡 {selectedArticle.summary}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">แนวทางปฏิบัติและข้อควรจำที่ถูกต้อง</h3>
              <p>
                {selectedArticle.content ||
                  'การใช้ยาให้ได้ผลการรักษาสูงสุดและปลอดภัย ต้องคำนึงถึงขนาดยา เวลาที่เหมาะสม และการสังเกตอาการผิดปกติอย่างสม่ำเสมอ หากมีข้อสงสัยหรือไม่แน่ใจในการใช้ยา สามารถนำซองยามาปรึกษาเภสัชกรได้ที่ห้องจ่ายยา โรงพยาบาลวชิระภูเก็ต'}
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-600">
                <strong className="text-slate-800 block font-semibold">ข้อแนะนำสำหรับผู้ป่วยและญาติ:</strong>
                <p>1. ห้ามปรับขนาดยาเอง หรือหยุดยาเองแม้จะรู้สึกว่าอาการดีขึ้นแล้ว</p>
                <p>2. จัดเก็บยาในที่แห้ง พ้นแสงแดด และเก็บให้พ้นมือเด็กเล็ก</p>
                <p>3. นำยาเดิมและประวัติการใช้ยาทั้งหมดมาด้วยทุกครั้งที่มาพบแพทย์</p>
              </div>
            </div>
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
            Patient Education & Knowledge
          </span>
          <span className="text-xs text-slate-500">โรงพยาบาลวชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📚 คลังความรู้เรื่องยาสำหรับประชาชน
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          บทความวิชาการทางการแพทย์และเภสัชกรรม ย่อยง่าย ถูกต้อง เขียนและตรวจสอบโดยเภสัชกรโรงพยาบาลวชิระภูเก็ต
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
              {cat === 'all' ? 'ทุกหมวดหมู่' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาบทความยา..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                {article.category}
              </span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{article.author}</span>
              <span className="font-semibold text-teal-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>อ่านบทความ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
