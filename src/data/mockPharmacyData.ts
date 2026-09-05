import {
  Medicine,
  ConsultationQuestion,
  RefillRequest,
  ADRReport,
  MedicationError,
  InventoryItem,
  PurchaseRequest,
  NewsItem,
  KnowledgeArticle,
  DocumentItem
} from '../types/pharmacy';

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-01',
    code: '1001542',
    name: 'Paracetamol 500 mg Tablet',
    genericName: 'Paracetamol',
    tradeName: 'Sara, Tylenol, Paracet, Cemol',
    dosageForm: 'Tablet',
    strength: '500 mg',
    unit: 'เม็ด',
    category: 'ยาแก้ปวดและลดไข้',
    indication: 'บรรเทาอาการปวดเล็กน้อยถึงปานกลาง และลดไข้จากหวัดหรือการอักเสบ',
    contraindication: 'ผู้ที่มีประวัติแพ้ยาพาราเซตามอล ผู้ป่วยโรคตับขั้นรุนแรง',
    warning: 'ห้ามใช้ยาเกินขนาดที่ระบุบนฉลาก (ไม่เกิน 8 เม็ด หรือ 4,000 mg ต่อวันในผู้ใหญ่) ระวังการใช้ร่วมกับยาอื่นที่มีพาราเซตามอลเป็นส่วนประกอบ หลีกเลี่ยงการดื่มสุราขณะรับประทานยาเพราะเพิ่มความเสี่ยงต่อพิษตับ',
    adverseEffect: 'อาการแพ้ทางผิวหนัง ผื่นคัน คลื่นไส้ ตับอักเสบเมื่อใช้เกินขนาดหรือติดต่อกันเป็นเวลานาน',
    drugInteraction: 'Warfarin (อาจเพิ่มฤทธิ์ต้านการแข็งตัวของเลือดเมื่อใช้พาราเซตามอลขนาดสูงต่อเนื่อง), Alcohol',
    storageMethod: 'เก็บในภาชนะปิดสนิท ป้องกันแสง อุณหภูมิห้องไม่เกิน 30°C',
    instructions: 'รับประทานครั้งละ 1-2 เม็ด ทุก 4-6 ชั่วโมง เมื่อมีอาการปวดหรือมีไข้ (ห้ามรับประทานถี่กว่า 4 ชั่วโมง)',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
    pregnancyCategory: 'B',
    stockQuantity: 45200,
    reorderPoint: 10000,
    lotNumber: 'LOT-24P081',
    expiryDate: '2027-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'med-02',
    code: '1002381',
    name: 'Amoxicillin 500 mg Capsule',
    genericName: 'Amoxicillin trihydrate',
    tradeName: 'Amoxil, Ibiamox, Curam',
    dosageForm: 'Capsule',
    strength: '500 mg',
    unit: 'แคปซูล',
    category: 'ยาปฏิชีวนะ',
    indication: 'รักษาการติดเชื้อแบคทีเรียที่ไวต่อยานี้ เช่น ติดเชื้อทางเดินหายใจ หู คอ จมูก และทางเดินปัสสาวะ',
    contraindication: 'ผู้ที่มีประวัติแพ้ยากลุ่มเพนิซิลลิน (Penicillins) หรือเซฟาโลสปอริน (Cephalosporins)',
    warning: 'ต้องรับประทานยาติดต่อกันจนหมดตามคำสั่งแพทย์แม้ว่าอาการจะดีขึ้นแล้ว เพื่อป้องกันเชื้อดื้อยา หากมีผื่น แน่นหน้าอก หายใจไม่ออก ให้หยุดยาและมาพบแพทย์ทันที',
    adverseEffect: 'คลื่นไส้ อาเจียน ท้องเสีย ผื่นคัน ลมพิษ ลำไส้อักเสบจากเชื้อ Clostridioides difficile',
    drugInteraction: 'Methotrexate (เพิ่มความเป็นพิษ), Allopurinol (เพิ่มความเสี่ยงผื่นคัน), ยาคุมกำเนิดชนิดฮอร์โมนรวม (อาจลดประสิทธิภาพ)',
    storageMethod: 'เก็บในที่แห้ง ป้องกันแสง อุณหภูมิไม่เกิน 25-30°C',
    instructions: 'รับประทานครั้งละ 1 แคปซูล วันละ 3 ครั้ง ก่อนหรือหลังอาหาร ติดต่อกัน 5-7 วันตามแพทย์สั่ง',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภญ. พรรณพร สุขเกษม (ภ.21045)',
    pregnancyCategory: 'B',
    stockQuantity: 18500,
    reorderPoint: 8000,
    lotNumber: 'LOT-24A102',
    expiryDate: '2026-11-20',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'med-03',
    code: '1003419',
    name: 'Amlodipine 5 mg Tablet',
    genericName: 'Amlodipine besylate',
    tradeName: 'Norvasc, Amcard, Cardil',
    dosageForm: 'Tablet',
    strength: '5 mg',
    unit: 'เม็ด',
    category: 'ยาความดันโลหิต',
    indication: 'รักษาโรคความดันโลหิตสูง และบรรเทาอาการเจ็บหน้าอกเรื้อรังจากหลอดเลือดหัวใจตีบ (Angina pectoris)',
    contraindication: 'ผู้ที่มีภาวะความดันโลหิตต่ำรุนแรง (Hypotension) ช็อกที่มีจุดกำเนิดจากหัวใจ',
    warning: 'อาจทำให้เกิดอาการข้อเท้าบวม (Ankle edema) หรือเวียนศีรษะหน้ามืดเมื่อเปลี่ยนท่ารวดเร็ว ตรวจวัดความดันโลหิตสม่ำเสมอ',
    adverseEffect: 'ข้อเท้าบวม ร้อนวูบวาบ ปวดศีรษะ ใจสั่น เวียนศีรษะ อ่อนเพลีย',
    drugInteraction: 'Simvastatin (ไม่ควรรับประทานซิมวาสแตตินเกิน 20 mg/วัน เมื่อใช้คู่กัน), Clopidogrel, Grapefruit juice',
    storageMethod: 'เก็บที่อุณหภูมิห้อง ไม่เกิน 30°C ป้องกันแสงและความชื้น',
    instructions: 'รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง เวลาเดิมทุกวัน (เช้าหรือเย็น)',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
    pregnancyCategory: 'C',
    stockQuantity: 58000,
    reorderPoint: 15000,
    lotNumber: 'LOT-24M044',
    expiryDate: '2027-02-28',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-ed2405625c57?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'med-04',
    code: '1004112',
    name: 'Metformin 500 mg Tablet',
    genericName: 'Metformin hydrochloride',
    tradeName: 'Glucophage, Metfor, Formin',
    dosageForm: 'Tablet',
    strength: '500 mg',
    unit: 'เม็ด',
    category: 'ยาเบาหวาน',
    indication: 'รักษาโรคเบาหวานชนิดที่ 2 (Type 2 Diabetes Mellitus) เพื่อควบคุมระดับน้ำตาลในเลือด',
    contraindication: 'ผู้ป่วยไตวายรุนแรง (eGFR < 30 mL/min/1.73m²), ภาวะเลือดเป็นกรดจากกรดแลกติก (Lactic acidosis), ภาวะขาดน้ำรุนแรง',
    warning: 'ต้องหยุดยาก่อนและหลังเข้ารับการฉีดสารทึบรังสีชนิดไอโอดีนอย่างน้อย 48 ชั่วโมง และติดตามการทำงานของไตสม่ำเสมอ',
    adverseEffect: 'คลื่นไส้ ท้องอืด ท้องเสีย รสชาติโลหะในปาก ภาวะขาดวิตามินบี 12 เมื่อรับประทานระยะยาว',
    drugInteraction: 'แอลกอฮอล์ (เพิ่มความเสี่ยง Lactic acidosis), Cimetidine (เพิ่มระดับยาเมทฟอร์มินในเลือด)',
    storageMethod: 'เก็บที่อุณหภูมิห้อง ไม่เกิน 30°C พ้นแสงแดด',
    instructions: 'รับประทานครั้งละ 1 เม็ด วันละ 2-3 ครั้ง พร้อมอาหารหรือหลังอาหารทันที เพื่อลดอาการระคายเคืองกระเพาะอาหาร',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภญ. นภาพร จารุวรรณ (ภ.19532)',
    pregnancyCategory: 'B',
    stockQuantity: 62000,
    reorderPoint: 12000,
    lotNumber: 'LOT-24F099',
    expiryDate: '2026-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'med-05',
    code: '1005882',
    name: 'Warfarin 3 mg Tablet (Blue)',
    genericName: 'Warfarin sodium',
    tradeName: 'Coumadin, Orfarin',
    dosageForm: 'Tablet',
    strength: '3 mg',
    unit: 'เม็ด',
    category: 'ยาละลายลิ่มเลือด',
    indication: 'ป้องกันและรักษาภาวะลิ่มเลือดอุดตันในหลอดเลือดดำ หลอดเลือดปอด ภาวะหัวใจห้องบนสั่นพลิ้ว (Atrial fibrillation) และหลังผ่าตัดเปลี่ยนลิ้นหัวใจ',
    contraindication: 'หญิงตั้งครรภ์ (โดยเฉพาะไตรมาสแรกและใกล้คลอด), ผู้ที่มีภาวะเลือดออกผิดปกติรุนแรง แผลเลือดออกในทางเดินอาหาร',
    warning: 'ยานี้จัดเป็นยาเสี่ยงสูง (High Alert Drug: HAD) ต้องเจาะเลือดตรวจค่า INR สม่ำเสมอ สังเกตอาการเลือดออกผิดปกติ เช่น จุดจ้ำเลือด เลือดกำเดา อุจจาระสีดำ',
    adverseEffect: 'ภาวะเลือดออกง่าย เลือดหยุดยาก ผื่น ผิวหนังเนื้อตาย (Skin necrosis)',
    drugInteraction: 'มีปฏิกิริยากับยาจำนวนมาก (NSAIDs, ยาปฏิชีวนะ, ยาลดกรด) และอาหารที่มีวิตามินเคสูง (ผักใบเขียวเข้ม) อาหารเสริมแปะก๊วย โสม ขิง กระเทียม',
    storageMethod: 'เก็บในภาชนะทึบแสง อุณหภูมิห้องต่ำกว่า 25-30°C',
    instructions: 'รับประทานวันละ 1 ครั้ง ในเวลาเดียวกันทุกวันอย่างเคร่งครัด (แนะนำเวลา 18.00 น. หรือ 20.00 น.) ห้ามปรับขนาดยาเองเด็ดขาด',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
    pregnancyCategory: 'X',
    stockQuantity: 9200,
    reorderPoint: 3500,
    lotNumber: 'LOT-24W021',
    expiryDate: '2026-09-28', // Near expiry within 30 days!
    imageUrl: 'https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'med-06',
    code: '1006190',
    name: 'Ibuprofen 400 mg Tablet',
    genericName: 'Ibuprofen',
    tradeName: 'Brufen, Nurofen, Ibuman',
    dosageForm: 'Tablet',
    strength: '400 mg',
    unit: 'เม็ด',
    category: 'ยาแก้ปวดและลดไข้',
    indication: 'บรรเทาอาการปวดและอักเสบ เช่น ปวดประจำเดือน ปวดข้อ ปวดฟัน ปวดกล้ามเนื้อ ลดไข้',
    contraindication: 'ผู้ที่มีแผลในกระเพาะอาหารหรือลำไส้รุนแรง โรคไตวาย โรคหัวใจล้มเหลว หญิงตั้งครรภ์ไตรมาสที่สาม',
    warning: 'ห้ามรับประทานขณะท้องว่าง เสี่ยงระคายเคืองกระเพาะอาหาร ระวังการใช้ในผู้ป่วยโรคหัวใจและความดันโลหิตสูง',
    adverseEffect: 'แสบท้อง คลื่นไส้ เลือดออกในทางเดินอาหาร ไตวายเฉียบพลัน บวมน้ำ',
    drugInteraction: 'Aspirin, Warfarin, ACE inhibitors (ยาลดความดัน), Methotrexate',
    storageMethod: 'เก็บในที่แห้ง ป้องกันแสง อุณหภูมิไม่เกิน 30°C',
    instructions: 'รับประทานครั้งละ 1 เม็ด วันละ 3 ครั้ง หลังอาหารทันที และดื่มน้ำตามมากๆ',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภญ. พรรณพร สุขเกษม (ภ.21045)',
    pregnancyCategory: 'D',
    stockQuantity: 14200,
    reorderPoint: 6000,
    lotNumber: 'LOT-24I038',
    expiryDate: '2026-10-10', // Near expiry ~35 days
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'med-07',
    code: '1007421',
    name: 'Atorvastatin 40 mg Tablet',
    genericName: 'Atorvastatin calcium',
    tradeName: 'Lipitor, Xarator, Atorva',
    dosageForm: 'Tablet',
    strength: '40 mg',
    unit: 'เม็ด',
    category: 'ยาหัวใจและหลอดเลือด',
    indication: 'ลดระดับคอเลสเตอรอลและไตรกลีเซอไรด์ในเลือด ลดความเสี่ยงโรคหัวใจขาดเลือดและหลอดเลือดสมอง',
    contraindication: 'ผู้ป่วยโรคตับที่กำลังมีอาการหรือค่าเอนไซม์ตับสูงผิดปกติ หญิงตั้งครรภ์และให้นมบุตร',
    warning: 'หากมีอาการปวดกล้ามเนื้ออย่างรุนแรง กล้ามเนื้ออ่อนแรง หรือปัสสาวะสีชาเข้ม ให้รีบพบแพทย์ทันที (เสี่ยง Rhabdomyolysis)',
    adverseEffect: 'ปวดกล้ามเนื้อ ปวดข้อ ท้องผูก แน่นท้อง เอนไซม์ตับขึ้นชั่วคราว',
    drugInteraction: 'Clarithromycin, Ketoconazole, Gemfibrozil, น้ำเกรปฟรุต',
    storageMethod: 'เก็บที่อุณหภูมิห้อง ไม่เกิน 25-30°C',
    instructions: 'รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง ก่อนนอน หรือเวลาใดก็ได้ที่ตรงกันทุกวัน',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
    pregnancyCategory: 'X',
    stockQuantity: 31000,
    reorderPoint: 10000,
    lotNumber: 'LOT-24T119',
    expiryDate: '2027-08-30',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'med-08',
    code: '1008920',
    name: 'Sertraline 50 mg Tablet',
    genericName: 'Sertraline hydrochloride',
    tradeName: 'Zoloft, Serlift, Sertra',
    dosageForm: 'Tablet',
    strength: '50 mg',
    unit: 'เม็ด',
    category: 'ยาจิตเวช',
    indication: 'รักษาโรคซึมเศร้า (Major Depressive Disorder) โรควิตกกังวล โรคย้ำคิดย้ำทำ (OCD) และโรคตื่นตระหนก (Panic)',
    contraindication: 'การใช้ร่วมกับยาในกลุ่ม MAOIs หรือ Pimozide',
    warning: 'ยานี้ต้องใช้เวลาออกฤทธิ์ 2-4 สัปดาห์ ไม่ควรหยุดยาเองกะทันหันเพราะอาจเกิดภาวะถอนยา เฝ้าระวังความคิดทำร้ายตนเองในช่วงแรกของการใช้ยา',
    adverseEffect: 'คลื่นไส้ นอนไม่หลับหรือนอนหลับมาก ท้องเสีย ปากแห้ง สมรรถภาพทางเพศลดลง',
    drugInteraction: 'Tramadol (เพิ่มความเสี่ยง Serotonin Syndrome), St. John\'s Wort, NSAIDs (เพิ่มความเสี่ยงเลือดออก)',
    storageMethod: 'เก็บที่อุณหภูมิห้อง ไม่เกิน 30°C พ้นแสง',
    instructions: 'รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง ในตอนเช้าหรือเย็น พร้อมอาหารหรือหลังอาหาร',
    rduCategory: 'ED',
    isApproved: true,
    approvedBy: 'ภญ. นภาพร จารุวรรณ (ภ.19532)',
    pregnancyCategory: 'C',
    stockQuantity: 8400,
    reorderPoint: 4000,
    lotNumber: 'LOT-24S055',
    expiryDate: '2026-11-15',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-ed2405625c57?w=500&auto=format&fit=crop&q=60'
  }
];

export const INITIAL_NEAR_EXPIRY_STATS = {
  within30Days: 12,
  within60Days: 25,
  within90Days: 43
};

export const INITIAL_CONSULTATIONS: ConsultationQuestion[] = [
  {
    id: 'q-101',
    patientName: 'คุณสมชาย วิจิตรกุล',
    contactNumber: '081-456-xxxx',
    hn: '6408912',
    category: 'วิธีใช้ยา',
    title: 'ลืมกินยาความดัน Amlodipine ตอนเช้า กินชดเชยตอนบ่ายได้ไหมครับ?',
    question: 'ปกติผมทานยา Amlodipine 5 mg ทุกเช้า 8 โมง แต่วันนี้รีบออกจากบ้านมาทำงาน ตอนนี้บ่ายโมงแล้วเพิ่งนึกได้ ควรกินทันทีเลยไหม หรือรอทานเช้าพรุ่งนี้ทีเดียวครับ?',
    status: 'answered',
    createdAt: '2026-09-02 13:15',
    answer: 'สวัสดีครับ หากจำได้ว่าลืมทานยาและยังห่างจากเวลามื้อถัดไปเกิน 12 ชั่วโมง สามารถรับประทานทันทีที่นึกได้ 1 เม็ดครับ แต่ถ้าใกล้เวลามื้อถัดไปแล้ว ให้ข้ามมื้อที่ลืมไป แล้วรับประทานมื้อต่อไปตามปกติในขนาดเดิม ห้ามเพิ่มขนาดยาเป็น 2 เท่าเด็ดขาดครับ หากมีอาการวิงเวียนหรือใจสั่น ให้วัดความดันโลหิตและสังเกตอาการครับ',
    answeredBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
    answeredAt: '2026-09-02 13:45',
    isPublic: true
  },
  {
    id: 'q-102',
    patientName: 'คุณกรรณิการ์ จันทร์เพ็ญ',
    contactNumber: '089-876-xxxx',
    hn: '6512304',
    category: 'ยาตีกัน',
    title: 'ทานยาละลายลิ่มเลือด Warfarin อยู่ ทานอาหารเสริมฟ้าทะลายโจรได้ไหม?',
    question: 'คุณแม่ทานยาวาร์ฟารินของ รพ.วชิระภูเก็ตอยู่ รู้สึกเจ็บคอเหมือนจะเป็นหวัด จะซื้อยาแคปซูลฟ้าทะลายโจรมาทานเสริมได้ไหมคะ จะมีผลต่อค่าเลือดไหม?',
    status: 'answered',
    createdAt: '2026-09-03 10:20',
    answer: 'ไม่แนะนำให้รับประทานฟ้าทะลายโจรหรือสมุนไพรเสริมขณะรับประทานยา Warfarin ครับ เนื่องจากสมุนไพรหลายชนิดรวมทั้งฟ้าทะลายโจร โสม แปะก๊วย ขิง กระเทียม มีผลรบกวนการทำงานของเอนไซม์ในตับและเกล็ดเลือด อาจทำให้ค่า INR ผิดปกติและเสี่ยงต่อภาวะเลือดออกในอวัยวะภายในอย่างรุนแรง แนะนำให้พบแพทย์หรือปรึกษาห้องจ่ายยาเพื่อรับยารักษาอาการหวัดที่ปลอดภัยกับยาวาร์ฟารินครับ',
    answeredBy: 'ภญ. พรรณพร สุขเกษม (ภ.21045)',
    answeredAt: '2026-09-03 11:05',
    isPublic: true
  },
  {
    id: 'q-103',
    patientName: 'คุณประสิทธิ์ แซ่ตัน',
    contactNumber: '086-123-xxxx',
    hn: '6620981',
    category: 'การเก็บยา',
    title: 'ยาฉีดอินซูลินที่ยังไม่ได้เปิดใช้ ต้องแช่ช่องฟรีซหรือไม่?',
    question: 'ได้รับปากกาอินซูลินจาก รพ. กลับมาบ้าน 3 ด้าม ด้ามที่ยังไม่เปิดใช้ต้องเก็บในตู้เย็นแบบไหนคะ แช่ช่องฟรีซได้ไหม?',
    status: 'answered',
    createdAt: '2026-09-04 09:30',
    answer: 'ห้ามแช่ในช่องฟรีซ (ช่องแช่แข็ง) เด็ดขาดครับ เพราะความเย็นจัดจะทำให้โมเลกุลของโปรตีนอินซูลินเสียสภาพและหมดฤทธิ์ ให้เก็บในช่องธรรมดาของตู้เย็น (อุณหภูมิ 2-8 องศาเซลเซียส) ห้ามวางไว้ที่ฝาประตูตู้เย็นเพราะอุณหภูมิแกว่ง ส่วนด้ามที่เปิดใช้งานแล้ว สามารถเก็บไว้ที่อุณหภูมิห้องที่ไม่เกิน 30 องศาเซลเซียส พ้นแสงแดด มีอายุการใช้งาน 28-30 วันครับ',
    answeredBy: 'ภญ. นภาพร จารุวรรณ (ภ.19532)',
    answeredAt: '2026-09-04 10:15',
    isPublic: true
  }
];

export const INITIAL_REFILLS: RefillRequest[] = [
  {
    id: 'refill-01',
    requestNumber: 'RF-20260904-001',
    patientName: 'นายวิชัย สุวรรณรัตน์',
    cid: '1839900123456',
    hn: '6301289',
    phone: '081-998-1122',
    clinic: 'คลินิกเบาหวานและความดันโลหิตสูง',
    deliveryType: 'postal',
    deliveryDetail: '14/5 ถ.เยาวราช ต.ตลาดใหญ่ อ.เมือง จ.ภูเก็ต 83000',
    registeredDate: '2026-09-04',
    appointmentDate: '2026-09-05',
    status: 'dispensed',
    trackingCode: 'ED987261552TH',
    note: 'ลงทะเบียนล่วงหน้า 1 วัน อาการคงที่ ผลแล็บ 6 เดือนปกติ'
  },
  {
    id: 'refill-02',
    requestNumber: 'RF-20260904-002',
    patientName: 'นางสาวมาลี เพชรประสม',
    cid: '3830200456789',
    hn: '6519821',
    phone: '089-771-4455',
    clinic: 'คลินิกอายุรกรรมระบบทางเดินอาหาร',
    deliveryType: 'pharmacy',
    deliveryDetail: 'ร้านยาฟาร์มาแคร์ สาขาถลาง (ร้านยาเครือข่าย รพ.วชิระภูเก็ต)',
    registeredDate: '2026-09-04',
    appointmentDate: '2026-09-05',
    status: 'approved',
    note: 'รอจัดส่งไปยังร้านยาเครือข่าย'
  },
  {
    id: 'refill-03',
    requestNumber: 'RF-20260903-088',
    patientName: 'นายอำนวย จงเจริญ',
    cid: '1830100987654',
    hn: '6218765',
    phone: '084-332-9090',
    clinic: 'คลินิกหัวใจและหลอดเลือด',
    deliveryType: 'hospital',
    deliveryDetail: 'ช่องจ่ายยาเบอร์ 8 (จุดรับยาเติมด่วน อาคารผู้ป่วยนอก ชั้น 1)',
    registeredDate: '2026-09-03',
    appointmentDate: '2026-09-04',
    status: 'delivered',
    note: 'ผู้ป่วยรับยาเรียบร้อยแล้ว'
  }
];

export const INITIAL_ADR_REPORTS: ADRReport[] = [
  {
    id: 'adr-001',
    reportDate: '2026-09-01',
    patientHn: '6409812',
    patientAge: 54,
    patientGender: 'หญิง',
    suspectedDrug: 'Allopurinol 100 mg Tablet',
    reactionDescription: 'มีผื่นแดงลอกทั่วตัว Maculopapular rash ร่วมกับมีไข้สูง ปากเปื่อย เยื่อบุตาอักเสบ เข้าเกณฑ์ Stevens-Johnson Syndrome (SJS)',
    onsetDuration: '14 วัน หลังเริ่มใช้ยา',
    severity: 'รุนแรง (Severe)',
    naranjoScore: 7,
    naranjoResult: 'น่าจะใช่ (Probable)',
    clinicalManagement: 'หยุดยาทันที รับตัวไว้รักษาในหอผู้ป่วยวิกฤต ให้ systemic corticosteroids, supportive care, ออกบัตรแพ้ยา และลงบันทึกในระบบ HIS',
    reporterName: 'ภก. เกียรติศักดิ์ พชรเมธา',
    reporterRole: 'เภสัชกรประจำคลินิก',
    status: 'reported_to_fda'
  },
  {
    id: 'adr-002',
    reportDate: '2026-09-03',
    patientHn: '6614520',
    patientAge: 62,
    patientGender: 'ชาย',
    suspectedDrug: 'Captopril 25 mg Tablet',
    reactionDescription: 'ไอแห้งๆ เรื้อรัง (Dry cough) ไม่มีไข้ ไม่มีเสมหะ อาการเป็นมากเวลากลางคืน รบกวนการนอนหลับ',
    onsetDuration: '3 สัปดาห์ หลังเริ่มยา',
    severity: 'ปานกลาง (Moderate)',
    naranjoScore: 6,
    naranjoResult: 'น่าจะใช่ (Probable)',
    clinicalManagement: 'ประสานแพทย์เปลี่ยนยาเป็นกลุ่ม ARB (Losartan 50 mg) อาการไอทุเลาลงหลังหยุดยา 1 สัปดาห์',
    reporterName: 'ภญ. พรรณพร สุขเกษม',
    reporterRole: 'เภสัชกรผู้ป่วยนอก',
    status: 'reviewed'
  }
];

export const INITIAL_MEDICATION_ERRORS: MedicationError[] = [
  {
    id: 'me-001',
    date: '2026-09-02',
    category: 'Prescribing Error',
    subType: 'Wrong Dose / High Alert Drug',
    errorStage: 'ขั้นตอนการสั่งใช้ยาโดยแพทย์',
    severityIndex: 'B',
    severityDescription: 'เกิดความคลาดเคลื่อนแต่ตรวจพบก่อนยาถึงตัวผู้ป่วย (Near Miss)',
    cause: 'พิมพ์ตัวเลขขนาดอินซูลินผิดจาก 10 Units เป็น 100 Units เนื่องจากคีย์บอร์ดมีปัญหา',
    actionTaken: 'เภสัชกรคัดกรองใบสั่งยาพบขนาดยาผิดปกติ ติดต่อแพทย์ผู้สั่งเพื่อยืนยันและแก้ไขขนาดยาก่อนจัดยา',
    preventionPlan: 'กำหนด Dose limit pop-up alert ในระบบสารสนเทศโรงพยาบาลสำหรับอินซูลินและยา HAD ทุกรายการ',
    wardOrDept: 'ห้องตรวจอายุรกรรม 3',
    reportedBy: 'ภก. เกียรติศักดิ์ พชรเมธา',
    isNearMiss: true
  },
  {
    id: 'me-002',
    date: '2026-09-03',
    category: 'Dispensing Error',
    subType: 'Look-Alike Sound-Alike (LASA)',
    errorStage: 'ขั้นตอนการจัดยาที่ห้องจ่ายยา',
    severityIndex: 'B',
    severityDescription: 'จัดยาผิดรายการ แต่เภสัชกรจ่ายยาตรวจพบที่จุด Double Check ก่อนส่งมอบ',
    cause: 'หยิบยา Amlodipine 5 mg แทน Atenolol 50 mg เนื่องจากวางแผงยาติดกันและชื่อขึ้นต้นคล้ายกัน',
    actionTaken: 'แก้ไขเปลี่ยนยาให้ถูกต้องตามใบสั่ง และปรับปรุงตำแหน่งจัดวางยา LASA ให้แยกตู้ห่างกัน',
    preventionPlan: 'ติดสติกเกอร์ LASA สีส้มสะท้อนแสง แยกช่องวาง และบังคับสแกนบาร์โค้ด 2D DataMatrix ก่อนส่งตรวจ',
    wardOrDept: 'ห้องจ่ายยาผู้ป่วยนอก 1',
    reportedBy: 'ภญ. พรรณพร สุขเกษม',
    isNearMiss: true
  },
  {
    id: 'me-003',
    date: '2026-08-28',
    category: 'Administration Error',
    subType: 'Wrong Time / Rate',
    errorStage: 'ขั้นตอนการบริหารยาแก่ผู้ป่วยในหอผู้ป่วย',
    severityIndex: 'C',
    severityDescription: 'ยาถึงตัวผู้ป่วยแต่ไม่เกิดอันตราย (No harm)',
    cause: 'ให้ยาปฏิชีวนะ Ceftriaxone ช้ากว่าเวลากำหนด 3 ชั่วโมงเนื่องจากติดภารกิจส่งผู้ป่วยฉุกเฉินไป CT scan',
    actionTaken: 'พยาบาลรายงานแพทย์และปรับตารางเวลามื้อถัดไปให้เว้นระยะห่างเหมาะสม ผู้ป่วยไม่มีภาวะแทรกซ้อน',
    preventionPlan: 'ประสานระบบแจ้งเตือน Smart Nurse Call และมอบหมายพยาบาลสำรองในเวร',
    wardOrDept: 'หอผู้ป่วยอายุรกรรมชาย 2',
    reportedBy: 'พว. รัตนาภรณ์ สุวรรณ',
    isNearMiss: false
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    medicineId: 'med-01',
    code: '1001542',
    name: 'Paracetamol 500 mg Tablet',
    genericName: 'Paracetamol',
    unit: 'เม็ด',
    lotNumber: 'LOT-24P081',
    stockQty: 45200,
    reorderPoint: 10000,
    unitCost: 0.35,
    manufactureDate: '2024-05-15',
    expiryDate: '2027-05-15',
    location: 'คลังกลาง ชั้น 2 (Rack A-04)',
    status: 'normal'
  },
  {
    id: 'inv-02',
    medicineId: 'med-05',
    code: '1005882',
    name: 'Warfarin 3 mg Tablet (Blue)',
    genericName: 'Warfarin sodium',
    unit: 'เม็ด',
    lotNumber: 'LOT-24W021',
    stockQty: 9200,
    reorderPoint: 3500,
    unitCost: 2.10,
    manufactureDate: '2024-09-28',
    expiryDate: '2026-09-28',
    location: 'ตู้ยาเสี่ยงสูง HAD (Rack H-01)',
    status: 'near_expiry'
  },
  {
    id: 'inv-03',
    medicineId: 'med-06',
    code: '1006190',
    name: 'Ibuprofen 400 mg Tablet',
    genericName: 'Ibuprofen',
    unit: 'เม็ด',
    lotNumber: 'LOT-24I038',
    stockQty: 14200,
    reorderPoint: 6000,
    unitCost: 0.75,
    manufactureDate: '2024-10-10',
    expiryDate: '2026-10-10',
    location: 'คลังกลาง ชั้น 2 (Rack B-12)',
    status: 'near_expiry'
  },
  {
    id: 'inv-04',
    medicineId: 'med-04',
    code: '1004112',
    name: 'Metformin 500 mg Tablet',
    genericName: 'Metformin hydrochloride',
    unit: 'เม็ด',
    lotNumber: 'LOT-24F099',
    stockQty: 62000,
    reorderPoint: 12000,
    unitCost: 0.40,
    manufactureDate: '2024-10-15',
    expiryDate: '2026-10-15',
    location: 'คลังกลาง ชั้น 2 (Rack C-02)',
    status: 'near_expiry'
  },
  {
    id: 'inv-05',
    medicineId: 'med-08',
    code: '1008920',
    name: 'Sertraline 50 mg Tablet',
    genericName: 'Sertraline hydrochloride',
    unit: 'เม็ด',
    lotNumber: 'LOT-24S055',
    stockQty: 3200,
    reorderPoint: 4000,
    unitCost: 4.80,
    manufactureDate: '2024-11-15',
    expiryDate: '2026-11-15',
    location: 'ตู้ยาจิตเวช (Rack P-03)',
    status: 'low_stock'
  }
];

export const INITIAL_PURCHASE_REQUESTS: PurchaseRequest[] = [
  {
    id: 'pr-001',
    prNumber: 'PR-202609-012',
    date: '2026-09-03',
    items: [
      { medicineName: 'Sertraline 50 mg Tablet', code: '1008920', quantity: 15000, unit: 'เม็ด', estimatedCost: 72000 },
      { medicineName: 'Warfarin 3 mg Tablet', code: '1005882', quantity: 20000, unit: 'เม็ด', estimatedCost: 42000 }
    ],
    totalAmount: 114000,
    requestedBy: 'ภก. วิโรจน์ ธนสาร (หัวหน้างานคลังเวชภัณฑ์)',
    status: 'pending_review',
    vendor: 'องค์การเภสัชกรรม (GPO)'
  },
  {
    id: 'pr-002',
    prNumber: 'PR-202608-095',
    date: '2026-08-25',
    items: [
      { medicineName: 'Amoxicillin 500 mg Capsule', code: '1002381', quantity: 50000, unit: 'แคปซูล', estimatedCost: 65000 }
    ],
    totalAmount: 65000,
    requestedBy: 'ภก. วิโรจน์ ธนสาร',
    status: 'approved',
    vendor: 'องค์การเภสัชกรรม (GPO)'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-01',
    title: 'โครงการสัปดาห์เภสัชกรรมเพื่อประชาชน 2569: "ใช้ยาอย่างปลอดภัย สบายใจ ไร้กังวล"',
    category: 'สัปดาห์เภสัชกรรม',
    summary: 'กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต ขอเชิญชวนประชาชนร่วมงานสัปดาห์เภสัชกรรม รับบริการตรวจเช็กยาประจำตัว ปรึกษาเภสัชกรฟรี ณ โถงชั้น 1 อาคารผู้ป่วยนอก',
    content: `กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต จัดกิจกรรม "สัปดาห์เภสัชกรรมเพื่อประชาชน ประจำปี 2569" เพื่อส่งเสริมการใช้ยาอย่างสมเหตุผล (RDU) และสร้างความตระหนักรู้เรื่องความปลอดภัยในการใช้ยา
    
    ภายในงานมีกิจกรรม:
    1. บริการตรวจเช็กยาเดิมที่บ้าน (Brown Bag Clinic) นำยามาให้เภสัชกรตรวจเช็กวันหมดอายุและความซ้ำซ้อน
    2. บริการลงทะเบียนรับยาใกล้บ้านและส่งยาทางไปรษณีย์
    3. นิทรรศการ "การสังเกตอาการแพ้ยา และ 5 สัญญาณอันตรายที่ต้องมา รพ. ทันที"
    4. ตอบคำถามชิงรางวัลและรับของที่ระลึก
    
    ณ บริเวณโถงกิจกรรม ชั้น 1 อาคารผู้ป่วยนอก โรงพยาบาลวชิระภูเก็ต`,
    date: '2026-09-01',
    author: 'กลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต',
    pinned: true,
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 'news-02',
    title: 'ประกาศ: โรงพยาบาลวชิระภูเก็ต พัฒนาระบบ Medication Reconciliation ลดความคลาดเคลื่อนทางยา 12%',
    category: 'ข่าววิชาการ',
    summary: 'กลุ่มงานเภสัชกรรมร่วมกับทีมแพทย์และพยาบาล ประสบความสำเร็จในการผลักดันระบบประสานรายการยา (Med Rec) ครบทุกหอผู้ป่วย ส่งผลให้อัตราความคลาดเคลื่อนลดลงอย่างมีนัยสำคัญ',
    content: `จากนโยบายความปลอดภัยของผู้ป่วย (Patient Safety Goals) กลุ่มงานเภสัชกรรมได้นำระบบ Medication Reconciliation ดิจิทัลมาใช้บูรณาการระหว่างแผนกอุบัติเหตุ-ฉุกเฉิน หอผู้ป่วยใน และห้องจ่ายยาผู้ป่วยนอก
    
    ส่งผลให้สามารถป้องกันความคลาดเคลื่อนทางยาในกลุ่มยาเสี่ยงสูง (High Alert Drugs) ได้มากกว่า 140 รายการในรอบไตรมาสที่ผ่านมา และลดอัตราการเกิด Medication Error ลง 12%`,
    date: '2026-08-28',
    author: 'คณะกรรมการพัฒนาระบบยา (PTC)',
    pinned: true,
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 'news-03',
    title: 'ขยายโครงการรับยาทางไปรษณีย์และร้านยาใกล้บ้าน ครอบคลุมทุกอำเภอในจังหวัดภูเก็ต',
    category: 'ข่าวบริการ',
    summary: 'ผู้ป่วยโรคเรื้อรัง (เบาหวาน ความดัน ไขมัน) ที่มีอาการคงที่ สามารถลงทะเบียนล่วงหน้าไม่เกิน 1 วัน เพื่อเลือกรับยาที่บ้านหรือร้านยาคุณภาพใกล้บ้าน ลดเวลารอคอยในโรงพยาบาล',
    content: `เพื่อความสะดวกของประชาชนชาวภูเก็ต โรงพยาบาลวชิระภูเก็ตได้เชื่อมโยงเครือข่ายร้านยาชุมชนอบอุ่นกว่า 45 ร้านยาทั่วเกาะภูเก็ต และบริการจัดส่งพัสดุด่วน EMS ทางไปรษณีย์
    
    ผู้ป่วยที่มีนัดสามารถลงทะเบียนล่วงหน้าได้ 1 วันก่อนถึงวันนัด สอบถามเพิ่มเติมโทร 076-361234 ต่อ 1183–1184`,
    date: '2026-08-20',
    author: 'หน่วยบริการจ่ายยาต่อเนื่อง',
    pinned: false,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60'
  }
];

export const INITIAL_KNOWLEDGE: KnowledgeArticle[] = [
  {
    id: 'kn-01',
    title: 'การใช้ยาปฏิชีวนะอย่างสมเหตุผล: ทำไมไม่ควรซื้อยากินเองเมื่อเป็นหวัดเจ็บคอ',
    category: 'ยาปฏิชีวนะ',
    summary: 'หวัด เจ็บคอ ท้องเสีย กว่า 80% เกิดจากเชื้อไวรัส การกินยาฆ่าเชื้อแบคทีเรียไม่ช่วยให้หายเร็วขึ้น แต่เพิ่มความเสี่ยงเชื้อดื้อยาและผลข้างเคียงรุนแรง',
    keyPoints: [
      'ไข้หวัดทั่วไปเกิดจากเชื้อไวรัส ยาปฏิชีวนะฆ่าเชื้อไวรัสไม่ได้',
      'หากเริ่มมีอาการหวัด ให้พักผ่อน ดื่มน้ำอุ่น กลั้วคอด้วยน้ำเกลือ',
      'หากมีอาการไอ เจ็บคอรุนแรง มีหนองที่ต่อมทอนซิล หรือไข้สูงเกิน 3 วัน ควรพบแพทย์',
      'เมื่อแพทย์สั่งยาปฏิชีวนะ ต้องรับประทานติดต่อกันจนหมดตามคำแนะนำ'
    ],
    content: `ยาปฏิชีวนะ (Antibiotics) หรือที่ชาวบ้านมักเรียกติดปากว่า "ยาแก้อักเสบ" แท้จริงแล้วเป็นยาที่ออกฤทธิ์ฆ่าหรือยับยั้งการเจริญเติบโตของ "เชื้อแบคทีเรีย" เท่านั้น แต่โรคหวัด เจ็บคอ คัดจมูก น้ำมูกไหล มากกว่า 80% เกิดจาก "เชื้อไวรัส" ซึ่งร่างกายสามารถขจัดออกไปได้เองด้วยภูมิคุ้มกัน
    
    การใช้ยาปฏิชีวนะโดยไม่จำเป็น นอกจากจะไม่ช่วยให้หายป่วยเร็วขึ้นแล้ว ยังทำให้แบคทีเรียประจำถิ่นในลำไส้ถูกทำลาย เกิดอาการท้องเสีย เชื้อราในช่องปาก และที่อันตรายที่สุดคือการเกิด "เชื้อดื้อยา" (Superbugs) ซึ่งหากติดเชื้อดื้อยาในอนาคต อาจไม่มียารักษา`,
    author: 'ภญ. พรรณพร สุขเกษม',
    readTime: '4 นาที',
    views: 1420
  },
  {
    id: 'kn-02',
    title: 'คู่มือผู้ป่วยรับประทานยาลดความดันโลหิต: กินอย่างไรให้ปลอดภัยและคุมความดันได้ผล',
    category: 'ยาความดัน',
    summary: 'ความดันโลหิตสูงคือ "ฆาตกรเงียบ" การหยุดยาเองเมื่อไม่มีอาการเป็นสาเหตุหลักของเส้นเลือดสมองแตกและอัมพฤกษ์อัมพาต',
    keyPoints: [
      'โรคความดันโลหิตสูงส่วนใหญ่ไม่มีอาการเตือน การรู้สึกสบายดีไม่ได้แปลว่าความดันปกติ',
      'รับประทานยาในเวลาเดิมทุกวันสม่ำเสมอ ห้ามหยุดยาหรือลดยาเอง',
      'ลดอาหารเค็ม เลี่ยงกะปิ น้ำปลา อาหารแปรรูป ออกกำลังกายสม่ำเสมอ',
      'จดบันทึกค่าความดันที่วัดได้ที่บ้าน นำมาให้แพทย์ดูทุกครั้งที่มาตรวจ'
    ],
    content: `ผู้ป่วยจำนวนมากมักเข้าใจผิดว่า เมื่อไม่มีอาการปวดหัว เวียนหัว หรือเมื่อวัดความดันได้ปกติแล้ว สามารถหยุดรับประทานยาได้ ความจริงคือ ค่าความดันที่ปกตินั้นเป็นผลมาจากการออกฤทธิ์ของยา หากหยุดยา ความดันจะพุ่งสูงขึ้นอย่างรวดเร็ว (Rebound hypertension) และเพิ่มความเสี่ยงต่อการเกิดโรคหลอดเลือดสมองตีบหรือแตก (Stroke) และโรคหัวใจขาดเลือด`,
    author: 'ภก. เกียรติศักดิ์ พชรเมธา',
    readTime: '5 นาที',
    views: 2180
  },
  {
    id: 'kn-03',
    title: 'การฉีดและการเก็บรักษาปากกาอินซูลินสำหรับผู้ป่วยเบาหวาน',
    category: 'ยาเบาหวาน',
    summary: 'เทคนิคการฉีดอินซูลิน การหมุนเวียนตำแหน่งฉีด และการเก็บรักษาที่ถูกต้องเพื่อคงประสิทธิภาพของยา',
    keyPoints: [
      'อินซูลินที่ยังไม่เปิดใช้ เก็บในตู้เย็น 2-8 °C (ห้ามแช่ช่องฟรีซ)',
      'อินซูลินที่กำลังเปิดใช้ เก็บที่อุณหภูมิห้องไม่เกิน 30 °C ได้นาน 28-30 วัน',
      'หมุนเวียนตำแหน่งฉีดหน้าท้อง โดยเว้นระยะห่างจากสะดืออย่างน้อย 1 นิ้ว',
      'เปลี่ยนหัวเข็มทุกครั้ง และทิ้งเข็มในขวดพลาสติกเนื้อหนาที่มีฝาปิดมิดชิด'
    ],
    content: `อินซูลินเป็นฮอร์โมนโปรตีนที่ไวต่ออุณหภูมิและความร้อนอย่างมาก การเก็บรักษาที่ไม่ถูกต้อง เช่น การวางไว้ในรถที่จอดตากแดด หรือการแช่ในช่องแช่แข็ง จะทำให้โครงสร้างโมเลกุลเสียสภาพ ส่งผลให้ฉีดยาแล้วน้ำตาลไม่ลด และอาจทำให้ผู้ป่วยเข้าใจผิดว่าต้องเพิ่มขนาดยา`,
    author: 'ภญ. นภาพร จารุวรรณ',
    readTime: '6 นาที',
    views: 1890
  },
  {
    id: 'kn-04',
    title: 'ข้อควรระวังสำคัญที่สุดในการใช้ยาวาร์ฟาริน (Warfarin) ยาละลายลิ่มเลือด',
    category: 'ยาละลายลิ่มเลือด',
    summary: 'ยาวาร์ฟารินเป็นยาเสี่ยงสูงที่มีช่วงการรักษาแคบ หากยาน้อยไปเสี่ยงลิ่มเลือดอุดตัน หากยามากไปเสี่ยงเลือดออกในสมอง',
    keyPoints: [
      'ต้องรับประทานยาเวลาเดิมทุกวันอย่างเคร่งครัด (แนะนำ 18.00-20.00 น.)',
      'พก "บัตรประจำตัวผู้ใช้ยาวาร์ฟาริน" ติดตัวเสมอ และแจ้งแพทย์/ทันตแพทย์ทุกครั้ง',
      'สังเกตสัญญาณเลือดออก: แปรงฟันเลือดออกไม่หยุด จุดจ้ำเลือดใต้ผิวหนัง ปัสสาวะสีน้ำล้างเนื้อ อุจจาระสีดำ',
      'ควบคุมการรับประทานผักใบเขียวเข้มให้สม่ำเสมอ ไม่กินมากหรือน้อยเกินไปกะทันหัน'
    ],
    content: `วิตามินเคในอาหารมีฤทธิ์ต้านการทำงานของยาวาร์ฟาริน ผักใบเขียวเข้ม เช่น คะน้า บรอกโคลี ผักโขม ชะอม มีวิตามินเคสูง หากรับประทานมากผิดปกติจะทำให้ยาออกฤทธิ์ลดลง ในทางกลับกัน หากอดอาหารหรือท้องเสีย ยาจะออกฤทธิ์แรงขึ้นจนเสี่ยงเลือดออก จึงควรรับประทานอาหารให้สมดุลสม่ำเสมอ`,
    author: 'ภก. เกียรติศักดิ์ พชรเมธา',
    readTime: '7 นาที',
    views: 3450
  },
  {
    id: 'kn-05',
    title: 'การใช้ยาในเด็ก: ป้องกันการให้ยาเกินขนาดและเทคนิคการป้อนยาอย่างปลอดภัย',
    category: 'ยาสำหรับเด็ก',
    summary: 'ขนาดยาในเด็กต้องคำนวณตามน้ำหนักตัว ห้ามกะประมาณด้วยช้อนแกงหรือช้อนกาแฟเด็ดขาด',
    keyPoints: [
      'ใช้อุปกรณ์ตวงยามาตรฐาน เช่น กระบอกฉีดยา (Syringe) หรือช้อนตวงยาเท่านั้น',
      '1 ช้อนชามาตรฐาน = 5 มิลลิลิตร (mL) ไม่เท่ากับช้อนชงกาแฟที่บ้าน',
      'ห้ามผสมยากับขวดนมทั้งหมด เพราะหากเด็กดื่มไม่หมด จะได้รับยาไม่ครบขนาด',
      'หลีกเลี่ยงการหลอกเด็กว่า "ยานี้เป็นขนม" เพราะอาจทำให้เด็กแอบหยิบกินเองจนเกิดพิษ'
    ],
    content: `ร่างกายของเด็ก โดยเฉพาะตับและไต ยังพัฒนาไม่เต็มที่เหมือนผู้ใหญ่ การได้รับยาเกินขนาดเพียงเล็กน้อยอาจก่อให้เกิดพิษร้ายแรง เช่น พาราเซตามอลยาน้ำ หากให้เกินขนาดจะทำให้ตับวายเฉียบพลันได้ ควรตรวจสอบฉลากยาและวัดขนาดด้วยกระบอกฉีดยาทุกครั้ง`,
    author: 'ภญ. พรรณพร สุขเกษม',
    readTime: '5 นาที',
    views: 1670
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-01',
    title: 'คู่มือการใช้ยาอย่างปลอดภัยสำหรับผู้ป่วยและประชาชน (ฉบับ รพ.วชิระภูเก็ต)',
    targetAudience: 'public',
    category: 'คู่มือการใช้ยา',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    downloadCount: 2840,
    updatedDate: '2026-08-15'
  },
  {
    id: 'doc-02',
    title: 'แผ่นพับความรู้: 5 สัญญาณเตือนอาการแพ้ยารุนแรง และวิธีปฏิบัติเบื้องต้น',
    targetAudience: 'public',
    category: 'Infographic',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadCount: 3950,
    updatedDate: '2026-08-20'
  },
  {
    id: 'doc-03',
    title: 'คู่มือขั้นตอนการขอรับยาทางไปรษณีย์และร้านยาใกล้บ้าน โรงพยาบาลวชิระภูเก็ต',
    targetAudience: 'public',
    category: 'ใบความรู้',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadCount: 4120,
    updatedDate: '2026-09-01'
  },
  {
    id: 'doc-04',
    title: 'SOP-PHARM-01: แนวทางปฏิบัติการประสานรายการยา (Medication Reconciliation)',
    targetAudience: 'staff',
    category: 'SOP',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    downloadCount: 890,
    updatedDate: '2026-07-10'
  },
  {
    id: 'doc-05',
    title: 'แบบฟอร์มรายงานอาการไม่พึงประสงค์จากการใช้ยา (ADR Report Form Vachira 2569)',
    targetAudience: 'staff',
    category: 'แบบฟอร์ม ADR',
    fileType: 'DOCX',
    fileSize: '450 KB',
    downloadCount: 1250,
    updatedDate: '2026-08-01'
  },
  {
    id: 'doc-06',
    title: 'คู่มือแนวทางการรายงานและวิเคราะห์สาเหตุความคลาดเคลื่อนทางยา (Medication Error RCA)',
    targetAudience: 'staff',
    category: 'Medication Error',
    fileType: 'PDF',
    fileSize: '5.2 MB',
    downloadCount: 760,
    updatedDate: '2026-06-25'
  },
  {
    id: 'doc-07',
    title: 'บัญชียาโรงพยาบาลวชิระภูเก็ต ประจำปีงบประมาณ 2569 (Vachira Hospital Formulary)',
    targetAudience: 'staff',
    category: 'เอกสารวิชาการ',
    fileType: 'PDF',
    fileSize: '8.6 MB',
    downloadCount: 2310,
    updatedDate: '2026-08-10'
  },
  {
    id: 'doc-08',
    title: 'WI-HAD-04: ข้อปฏิบัติในการบริหารยาเสี่ยงสูง (High Alert Drugs Administration WI)',
    targetAudience: 'staff',
    category: 'WI',
    fileType: 'PDF',
    fileSize: '2.9 MB',
    downloadCount: 1480,
    updatedDate: '2026-08-05'
  }
];

export const HOSPITAL_CONTACT_INFO = {
  hospitalName: 'โรงพยาบาลวชิระภูเก็ต (Vachira Phuket Hospital)',
  departmentName: 'กลุ่มงานเภสัชกรรม (Department of Pharmacy)',
  mainPhone: '076-361234',
  extensions: [
    {
      unit: 'ปรึกษาเรื่องยา (เภสัชกร)',
      ext: 'ต่อ 2807, 1183',
      hours: 'ทุกวันจันทร์ - ศุกร์ 08:00 - 16:00 น. (นอกเวลากรุณาติดต่อห้องจ่ายยาฉุกเฉิน)',
      note: 'โทรสายตรงให้คำปรึกษา แนะนำการใช้ยา ตรวจสอบยาตีกัน'
    },
    {
      unit: 'ห้องจ่ายยาผู้ป่วยนอก (OPD Pharmacy)',
      ext: 'ต่อ 1263-1264',
      hours: 'ทุกวัน 07:30 - 20:00 น.',
      note: 'ตรวจสอบสถานะคิวรับยา ใบสั่งยาผู้ป่วยนอก อาคารผู้ป่วยนอก ชั้น 1'
    },
    {
      unit: 'บริการเติมยา / รับยาทางไปรษณีย์ / ร้านยาใกล้บ้าน',
      ext: 'ต่อ 1183-1184',
      hours: 'วันจันทร์ - ศุกร์ 08:30 - 15:30 น.',
      note: 'ลงทะเบียนล่วงหน้าไม่เกิน 1 วัน สำหรับผู้ป่วยโรคเรื้อรังอาการคงที่'
    },
    {
      unit: 'งานบริบาลเภสัชกรรมผู้ป่วยใน (IPD Clinical Ward)',
      ext: 'ต่อ 2210, 2211',
      hours: 'ตลอด 24 ชั่วโมง',
      note: 'บริการเภสัชกรประจำหอผู้ป่วยและผสมยาเคมีบำบัด'
    },
    {
      unit: 'งานพัฒนาระบบยาและคลังเวชภัณฑ์ (PTC & Medical Store)',
      ext: 'ต่อ 3105, 3106',
      hours: 'วันจันทร์ - ศุกร์ 08:00 - 16:30 น.',
      note: 'งานบริหารเวชภัณฑ์ จัดซื้อ จัดหา และระบบความปลอดภัยทางยา'
    }
  ],
  address: '453 ถนนเยาวราช ตำบลตลาดใหญ่ อำเภอเมือง จังหวัดภูเก็ต 83000',
  emergencyLine: '1669 (ศูนย์รับแจ้งเหตุฉุกเฉินการแพทย์)',
  email: 'pharmacy@vachiraphuket.go.th',
  facebook: 'กลุ่มงานเภสัชกรรม โรงพยาบาลวชิระภูเก็ต',
  qrCodeMock: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://vachiraphuket.go.th/pharmacy/refill',
  phoneMain: '076-361234',
  workHours: 'วันจันทร์ - ศุกร์ 08:00 - 16:30 น. (ห้องจ่ายยาฉุกเฉินเปิดตลอด 24 ชม.)',
  internalExtensions: [
    { department: 'ห้องจ่ายยาผู้ป่วยนอก 1 (OPD 1)', extension: '1181' },
    { department: 'ห้องจ่ายยาผู้ป่วยนอก 2 (OPD 2)', extension: '1182' },
    { department: 'จุดบริการโครงการเติมยา (Refill Clinic)', extension: '1183, 1184' },
    { department: 'ห้องจ่ายยาผู้ป่วยใน (IPD)', extension: '2141' },
    { department: 'ศูนย์ข้อมูลยา (Drug Information Center - DIC)', extension: '1185' },
    { department: 'งานผสมยาเคมีบำบัดและสารอาหารทางหลอดเลือด', extension: '2145' },
    { department: 'หัวหน้ากลุ่มงานเภสัชกรรม', extension: '1180' }
  ]
};

// Aliases for unified imports across application components
export const INITIAL_REFILL_REQUESTS = INITIAL_REFILLS;
export const MOCK_NEWS = INITIAL_NEWS;
export const MOCK_KNOWLEDGE_ARTICLES = INITIAL_KNOWLEDGE;
export const MOCK_DOCUMENTS = INITIAL_DOCUMENTS;

export const INITIAL_PURCHASE_ORDERS = [
  {
    id: 'po-01',
    poNumber: 'PO-2569-0842',
    orderDate: '2026-09-01',
    supplier: 'องค์การเภสัชกรรม (GPO)',
    status: 'approved' as const,
    totalAmount: 145000,
    items: [
      { drugName: 'Paracetamol 500 mg Tablet', quantity: 100000, unit: 'เม็ด', unitPrice: 0.35 },
      { drugName: 'Amoxicillin 500 mg Capsule', quantity: 50000, unit: 'แคปซูล', unitPrice: 2.20 }
    ]
  },
  {
    id: 'po-02',
    poNumber: 'PO-2569-0791',
    orderDate: '2026-08-20',
    supplier: 'บริษัท ดีเคเอสเอช (ประเทศไทย) จำกัด',
    status: 'received' as const,
    totalAmount: 280000,
    items: [
      { drugName: 'Insulin Glargine 100 IU/mL Pen', quantity: 800, unit: 'ด้าม', unitPrice: 350.0 }
    ]
  }
];

export const SAMPLE_ALLERGIES = [
  {
    id: 'alg-01',
    hn: '6409812',
    patientName: 'นางสาววิมลรัตน์ โสภณพานิช',
    drugName: 'Penicillin V',
    reaction: 'แน่นหน้าอก หายใจมีเสียงหวีด (Wheezing) ริมฝีปากและเปลือกตาบวมเฉียบพลัน',
    severity: 'severe' as const,
    recordedDate: '2025-06-12',
    recordedBy: 'ภก. เกียรติศักดิ์ พชรเมธา (ภ.18492)',
    confirmedByDoctor: 'นพ. ธนกฤต ศิริวัฒน์',
    symptoms: ['Angioedema', 'Bronchospasm', 'Hypotension']
  },
  {
    id: 'alg-02',
    hn: '6218765',
    patientName: 'นายประสิทธิ์ แซ่ตัน',
    drugName: 'Sulfamethoxazole + Trimethoprim (Bactrim)',
    reaction: 'ผื่นแดงคันกระจายทั่วลำตัว (Erythematous maculopapular rash) ไม่มีแผลในปาก',
    severity: 'moderate' as const,
    recordedDate: '2024-11-04',
    recordedBy: 'ภญ. พรรณพร สุขเกษม (ภ.21045)',
    confirmedByDoctor: 'พญ. สุดารัตน์ กลิ่นสุคนธ์',
    symptoms: ['Maculopapular rash', 'Pruritus']
  }
];

export const SAMPLE_MED_REC = {
  id: 'mr-001',
  hn: '6401928',
  patientName: 'นายบุญส่ง ทวีสุข (อายุ 67 ปี)',
  admissionDate: '2026-09-04',
  ward: 'หอผู้ป่วยอายุรกรรมชาย 1',
  pharmacistName: 'ภญ. นภาพร จารุวรรณ (ภ.19532)',
  clinicalNotes: 'ผู้ป่วยเข้ารับการรักษาด้วยภาวะปอดอักเสบติดเชื้อ (CAP) ได้ประสานแพทย์เพื่อคงรายการยารักษาโรคเบาหวานและความดันโลหิตสูงเดิม ยกเว้นหยุด Metformin ชั่วคราวเนื่องจากเตรียมตรวจฉีดสี CT scan และเริ่มยาปฏิชีวนะ Ceftriaxone IV',
  items: [
    {
      id: 'item-1',
      drugName: 'Amlodipine 5 mg',
      dosePriorToAdmission: '1 เม็ด วันละ 1 ครั้ง ตอนเช้า',
      newOrderDose: '1 เม็ด วันละ 1 ครั้ง ตอนเช้า',
      status: 'Agreed / Intentional change',
      clinicalReason: 'ให้รับประทานยาความดันตัวเดิมต่อเนื่อง'
    },
    {
      id: 'item-2',
      drugName: 'Metformin 500 mg',
      dosePriorToAdmission: '1 เม็ด วันละ 2 ครั้ง หลังอาหาร เช้า-เย็น',
      newOrderDose: undefined,
      status: 'Intentional Discrepancy (Hold/Stop)',
      clinicalReason: 'หยุดยาชั่วคราวระหว่างนอน รพ. เนื่องจากเสี่ยงต่อ Lactic Acidosis และเตรียมตรวจ Contrast media'
    },
    {
      id: 'item-3',
      drugName: 'Simvastatin 20 mg',
      dosePriorToAdmission: '1 เม็ด วันละ 1 ครั้ง ก่อนนอน',
      newOrderDose: '1 เม็ด วันละ 1 ครั้ง ก่อนนอน',
      status: 'Agreed / Intentional change',
      clinicalReason: 'ทานยาเดิมต่อเนื่อง'
    },
    {
      id: 'item-4',
      drugName: 'Enalapril 10 mg',
      dosePriorToAdmission: '1 เม็ด วันละ 1 ครั้ง ตอนเช้า',
      newOrderDose: undefined,
      status: 'Unintended Discrepancy - Omission',
      clinicalReason: 'แพทย์ไม่ได้สั่งรายการนี้ในคำสั่งแรกรับ เภสัชกรได้ประสานเพื่อสั่งเพิ่ม'
    }
  ]
};

export const FREQUENT_FAQS = [
  {
    q: 'โครงการเติมยาของ รพ.วชิระภูเก็ต ต้องลงทะเบียนล่วงหน้าอย่างไร?',
    a: 'ผู้ป่วยสามารถลงทะเบียนผ่านระบบออนไลน์นี้ หรือโทร 076-361234 ต่อ 1183-1184 ล่วงหน้าได้ "ไม่เกิน 1 วัน" ก่อนถึงวันนัด โดยต้องเป็นผู้ป่วยโรคเรื้อรังที่มีอาการคงที่ ได้รับการประเมินจากแพทย์ว่าสามารถรับยาเดิมได้ และผลการตรวจทางห้องปฏิบัติการอยู่ในเกณฑ์ปลอดภัย'
  },
  {
    q: 'หากแพ้ยา ต้องทำอย่างไร และควรแจ้งใครบ้าง?',
    a: 'หากมีอาการแพ้ยาเฉียบพลัน เช่น แน่นหน้าอก หายใจไม่ออก ปากบวม หน้าบวม ผื่นลอก ให้รีบมาห้องฉุกเฉิน รพ.วชิระภูเก็ต ทันที พร้อมนำยาที่ต้องสงสัยมาด้วย เมื่อแพทย์ยืนยันการแพ้ยา เภสัชกรจะออก "บัตรแพ้ยา" ให้ผู้ป่วยพกติดตัวเสมอ และต้องแสดงบัตรนี้ทุกครั้งที่เข้ารับการรักษาที่สถานพยาบาลหรือร้านยาทุกแห่ง'
  },
  {
    q: 'ยาที่ลืมรับประทาน ควรกินเบิ้ล 2 เท่าในมื้อถัดไปหรือไม่?',
    a: 'ห้ามรับประทานยาเพิ่มเป็น 2 เท่าเด็ดขาด เพราะอาจทำให้ระดับยาในเลือดสูงเกินขนาดจนเกิดพิษร้ายแรง หากนึกได้ทันทีให้รับประทานทันที แต่หากใกล้เวลามื้อถัดไป ให้ข้ามมื้อที่ลืมไปแล้วรับประทานมื้อต่อไปตามปกติในขนาดเดิม'
  },
  {
    q: 'ยาปฏิชีวนะ (ยาฆ่าเชื้อ) ทำไมต้องกินให้หมด ทั้งๆ ที่อาการหายแล้ว?',
    a: 'เพราะเชื้อแบคทีเรียอาจยังไม่ตายสนิท แม้อาการป่วยจะดีขึ้น การหยุดยาเร็วเกินไปจะทำให้เชื้อที่หลงเหลือกลายพันธุ์และเกิดภาวะ "เชื้อดื้อยา" ซึ่งครั้งต่อไปจะต้องใช้ยาที่แรงขึ้น แพงขึ้น และมีผลข้างเคียงมากขึ้น'
  },
  {
    q: 'สามารถติดต่อเภสัชกรเพื่อปรึกษาเรื่องยาโดยตรงได้ทางใดบ้าง?',
    a: 'สามารถใช้เมนู "ปรึกษาเภสัชกร" บนเว็บไซต์นี้ หรือโทรศัพท์สายตรง 076-361234 ต่อ 2807 หรือ 1183 ในวันและเวลาราชการ หรือปรึกษาเภสัชกรประจำห้องจ่ายยาผู้ป่วยนอก ชั้น 1 อาคารผู้ป่วยนอก รพ.วชิระภูเก็ต ได้ทุกวัน'
  }
];
