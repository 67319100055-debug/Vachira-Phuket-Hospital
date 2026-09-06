import { DocumentDownload } from '../types';

/**
 * Format bytes to human readable size
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get visual styling based on file extension/type
 */
export function getFileTypeBadge(fileType: string): {
  bg: string;
  text: string;
  badge: string;
} {
  const type = fileType?.toUpperCase() || 'FILE';
  if (type.includes('PDF')) {
    return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', badge: 'bg-red-600 text-white' };
  }
  if (type.includes('DOC') || type.includes('WORD')) {
    return { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', badge: 'bg-blue-600 text-white' };
  }
  if (type.includes('XLS') || type.includes('SHEET') || type.includes('CSV')) {
    return { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-600 text-white' };
  }
  if (type.includes('PPT') || type.includes('SLIDE')) {
    return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', badge: 'bg-amber-600 text-white' };
  }
  if (type.includes('PNG') || type.includes('JPG') || type.includes('JPEG') || type.includes('IMAGE')) {
    return { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', badge: 'bg-purple-600 text-white' };
  }
  if (type.includes('LINK') || type.includes('URL') || type.includes('DRIVE')) {
    return { bg: 'bg-sky-50 border-sky-200', text: 'text-sky-700', badge: 'bg-sky-600 text-white' };
  }
  return { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-700', badge: 'bg-slate-700 text-white' };
}

/**
 * Triggers a real browser download for a document
 */
export function downloadDocumentFile(doc: DocumentDownload): void {
  // 1. If it's an external link (e.g. Google Drive or direct cloud link)
  if (doc.isExternalLink || (doc.url && (doc.url.startsWith('http://') || doc.url.startsWith('https://')))) {
    window.open(doc.url, '_blank', 'noopener,noreferrer');
    return;
  }

  // 2. If the file has real base64 / data URL payload uploaded by admin
  if (doc.fileData && doc.fileData.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = doc.fileData;
    link.download = doc.fileName || `${doc.title}.${doc.fileType.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // 3. Fallback for pre-loaded initial demo documents without large base64 binaries:
  // Generate a valid hospital document text file with official letterhead and info
  const content = `===============================================================
กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต
VACHIRA PHUKET HOSPITAL - PHARMACY DEPARTMENT
===============================================================

ชื่อเอกสาร: ${doc.title}
หมวดหมู่: ${doc.category}
ประเภทไฟล์ต้นฉบับ: ${doc.fileType}
วันที่ปรับปรุงล่าสุด: ${doc.date}
ขนาดเอกสาร: ${doc.fileSize}

รายละเอียด / คำแนะนำ:
${doc.description || 'เอกสารทางการกลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต สำหรับผู้รับบริการและบุคลากรทางการแพทย์'}

---------------------------------------------------------------
ติดต่อกลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต
โทรศัพท์: 076-361234 ต่อ 1234 (ห้องจ่ายยาผู้ป่วยนอก)
เว็บไซต์: https://vachiraphuket.go.th
Facebook: กลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต
===============================================================
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = `${doc.title}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

/**
 * Compress and resize an image file for safe localStorage storage
 */
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

/**
 * Curated hospital & pharmacy stock images for quick selection
 */
export const PRESET_HOSPITAL_IMAGES = [
  {
    title: 'กิจกรรมสัปดาห์เภสัชกรรม',
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'อบรมการใช้ยาและเครื่องมือแพทย์',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'ห้องจ่ายยาและตรวจเช็กยา',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'ทีมแพทย์และเภสัชกรสัมมนา',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'บริการให้คำปรึกษาด้านยาผู้ป่วยนอก',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'ห้องปฏิบัติการและวิจัยยา',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
  },
];
