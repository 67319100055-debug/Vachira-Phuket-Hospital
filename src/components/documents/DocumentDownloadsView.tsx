import React, { useState } from 'react';
import { FileText, Download, Filter, Search, FileSpreadsheet, FileCheck, CheckCircle2 } from 'lucide-react';
import { PharmacyDocument } from '../../types/pharmacy';

interface DocumentDownloadsViewProps {
  documents?: PharmacyDocument[];
}

export const DocumentDownloadsView: React.FC<DocumentDownloadsViewProps> = ({ documents = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(documents.map((d) => d.category)))];

  const filteredDocs = documents.filter((doc) => {
    const matchCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchQuery =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleDownload = (doc: PharmacyDocument) => {
    // Generate a mock downloaded blob file so clicking actually downloads a legitimate sample document
    const element = document.createElement('a');
    const file = new Blob(
      [
        `โรงพยาบาลวชิระภูเก็ต - กลุ่มงานเภสัชกรรม\nเอกสาร: ${doc.title}\nหมวดหมู่: ${doc.category}\nวันที่ปรับปรุง: ${doc.updatedDate}\n\nเอกสารนี้จัดทำขึ้นเพื่อการใช้งานตามมาตรฐานกลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต\n`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.replace(/\s+/g, '_')}.${doc.fileType.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccessMessage(`ดาวน์โหลด "${doc.title}" เรียบร้อยแล้ว`);
    setTimeout(() => setDownloadSuccessMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-teal-700" />
            Documents & Forms Center
          </span>
          <span className="text-xs text-slate-500">กลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          📄 ศูนย์ดาวน์โหลดเอกสาร แบบฟอร์ม และคู่มือ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ดาวน์โหลดแบบฟอร์มขอประวัติยา บัญชียาโรงพยาบาล คู่มือการใช้ยา และแนวทางปฏิบัติงานมาตรฐาน (SOP)
        </p>
      </div>

      {downloadSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{downloadSuccessMessage}</span>
        </div>
      )}

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
              {cat === 'all' ? 'เอกสารทั้งหมด' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อเอกสาร..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-teal-400 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {doc.fileType === 'PDF' ? (
                  <span className="text-red-700 font-bold">PDF</span>
                ) : (
                  <span className="text-emerald-700 font-bold">XLS</span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {doc.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ขนาด: {doc.fileSize}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                <p className="text-xs text-slate-500">{doc.description}</p>
                <span className="text-[11px] text-slate-400 block">อัปเดตล่าสุด: {doc.updatedDate}</span>
              </div>
            </div>

            <button
              onClick={() => handleDownload(doc)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer self-end sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
