export type UserRole =
  | 'public'
  | 'pharmacist'
  | 'inventory_staff'
  | 'admin'
  | 'pharmacy_admin'
  | 'staff'
  | 'super_admin';

export interface Medicine {
  id: string;
  code: string; // e.g. "MED-001"
  name: string; // "Paracetamol 500 mg Tablet"
  genericName: string; // "Paracetamol"
  tradeName: string; // "Sara, Tylenol, Paracet"
  dosageForm: string; // "Tablet", "Capsule", "Syrup", "Injection", "Inhaler"
  strength: string; // "500 mg", "250 mg/5 mL"
  unit: string; // "เม็ด", "ขวด", "หลอด", "แผง"
  category: string;
  indication: string; // ข้อบ่งใช้
  contraindication: string; // ข้อห้ามใช้
  warning: string; // คำเตือน
  adverseEffect: string; // อาการไม่พึงประสงค์
  drugInteraction: string; // ปฏิกิริยาระหว่างยา
  storageMethod: string; // วิธีเก็บรักษา
  instructions: string; // วิธีการรับประทาน/ใช้ยา
  rduCategory: 'NED' | 'ED' | 'Specific' | 'Controlled'; // บัญชียาหลักแห่งชาติ / ยานอกบัญชี
  isApproved: boolean; // เภสัชกรตรวจสอบแล้ว
  approvedBy?: string; // ภก.ผู้ตรวจสอบ
  imageUrl?: string;
  leafletUrl?: string; // เอกสารกำกับยา
  pregnancyCategory?: 'A' | 'B' | 'C' | 'D' | 'X';
  stockQuantity: number;
  reorderPoint: number;
  lotNumber?: string;
  expiryDate?: string;
}

export interface ConsultationQuestion {
  id: string;
  patientName: string;
  contactNumber?: string;
  phone?: string;
  hn?: string;
  category: string;
  title?: string;
  question: string;
  status: 'pending' | 'answered';
  createdAt: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
  isPublic?: boolean;
  imageUrl?: string;
}

// Alias for PharmacistConsultation
export type PharmacistConsultation = ConsultationQuestion;

export interface RefillRequest {
  id: string;
  requestNumber: string;
  patientName: string;
  cid: string; // บัตรประชาชน 13 หลัก
  hn: string; // รหัส HN
  phone: string;
  clinic: string; // คลินิก เช่น อายุรกรรม, เบาหวาน-ความดัน
  deliveryType: 'hospital' | 'postal' | 'pharmacy'; // รับที่โรงพยาบาล, ทางไปรษณีย์, ร้านยาใกล้บ้าน
  deliveryDetail?: string; // ที่อยู่หรือชื่อร้านยา
  registeredDate: string;
  appointmentDate: string;
  status: 'pending' | 'approved' | 'dispensed' | 'delivered' | 'cancelled';
  note?: string;
  trackingCode?: string;
}

export interface PatientAllergyRecord {
  id: string;
  hn: string;
  patientName: string;
  drugName: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  recordedDate: string;
  recordedBy: string;
  confirmedByDoctor?: string;
  symptoms: string[];
}

export interface MedRecDrugItem {
  id: string;
  drugName: string;
  dosePriorToAdmission: string;
  newOrderDose?: string;
  status: string;
  clinicalReason: string;
}

export interface MedReconciliationRecord {
  id: string;
  hn: string;
  patientName: string;
  admissionDate: string;
  ward: string;
  pharmacistName: string;
  clinicalNotes: string;
  items: MedRecDrugItem[];
}

export interface ADRReport {
  id: string;
  reportDate: string;
  patientHn?: string;
  hn?: string;
  patientName?: string;
  patientAge?: number;
  patientGender?: 'ชาย' | 'หญิง';
  suspectDrug?: string;
  suspectedDrug?: string;
  dose?: string;
  startDate?: string;
  onsetDateTime?: string;
  reactionDetail?: string;
  reactionDescription?: string;
  initialTreatment?: string;
  clinicalManagement?: string;
  outcome?: string;
  onsetDuration?: string;
  severity?: string;
  naranjoScore: number;
  probabilityCategory?: string;
  naranjoResult?: string;
  reporterName: string;
  reporterRole?: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'reported_to_fda';
}

export interface MedicationError {
  id: string;
  incidentDate?: string;
  date?: string;
  patientHn?: string;
  errorType?: string;
  category?: string;
  subType?: string;
  errorStage?: string;
  nccMerpLevel?: string;
  severityIndex?: string;
  severityDescription?: string;
  drugName?: string;
  description?: string;
  rootCause?: string;
  cause?: string;
  actionTaken?: string;
  preventionPlan?: string;
  wardOrDept?: string;
  reporterName?: string;
  reportedBy?: string;
  status?: string;
  isNearMiss?: boolean;
}

export interface InventoryItem {
  id: string;
  medicineId: string;
  code: string;
  name: string;
  genericName: string;
  unit: string;
  lotNumber: string;
  stockQty: number;
  reorderPoint: number;
  unitCost: number;
  manufactureDate: string;
  expiryDate: string; // YYYY-MM-DD
  location: string;
  status: 'normal' | 'low_stock' | 'out_of_stock' | 'near_expiry' | 'expired';
}

export interface PurchaseOrderItem {
  drugName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  orderDate: string;
  supplier: string;
  status: 'pending' | 'approved' | 'shipped' | 'received';
  totalAmount: number;
  items: PurchaseOrderItem[];
}

export interface PurchaseRequest {
  id: string;
  prNumber: string;
  date: string;
  items: {
    medicineName: string;
    code: string;
    quantity: number;
    unit: string;
    estimatedCost: number;
  }[];
  totalAmount: number;
  requestedBy: string;
  status: 'draft' | 'pending_review' | 'approved' | 'ordered' | 'received';
  vendor?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  imageUrl?: string;
  pinned?: boolean;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  keyPoints?: string[];
  content: string;
  author: string;
  readTime?: string;
  views?: number;
  publishedDate?: string;
}

export interface PharmacyDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  downloadUrl?: string;
  updatedDate: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  targetAudience: 'public' | 'staff';
  category: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  fileSize: string;
  downloadCount: number;
  updatedDate: string;
}
