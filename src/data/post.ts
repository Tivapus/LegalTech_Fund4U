export type Investor = {
  id: string;
  name: string;
  avatar?: string;      // optional
  invested: number;     // ยอดลงทุนรวมของคนนี้กับโพสต์นี้
  investedAt: string;   // ISO date
  isReturning: boolean; // นักลงทุนซ้ำไหม
};

export type MonthlyRaised = {
  month: string;
  amount: number;
};

export type Post = {
  id: number;
  sme: string;
  title: string;
  description: string;
  logo: string;
  raised: number;
  target: number;
  history: MonthlyRaised[];
  investors: Investor[];     // ✅ เพิ่ม
};

const sum = (xs: MonthlyRaised[]) => xs.reduce((acc, x) => acc + x.amount, 0);

// helper สร้าง avatar
const av = (seed: string) => `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;

export const posts: Post[] = [
  {
    id: 1,
    sme: "ก๋วยเตี๋ยวป้าณี",
    title: "เปิดสาขาสองที่เชียงใหม่",
    description:
      "ป้าใคร่แอ่วเจียงใหม่ขนาดเจ้า ต้องการเงินทุนเพื่อขยายรสชาติก๋วยเตี๋ยวสูตรดั้งเดิมให้ชาวเชียงใหม่ได้ลิ้มลอง",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=PN&backgroundColor=ff6b6b",
    target: 120000,
    history: [
      { month: "2025-08", amount: 1200 },
      { month: "2025-09", amount: 6100 },
      { month: "2025-10", amount: 3500 },
      { month: "2025-11", amount: 4800 },
      { month: "2025-12", amount: 2100 },
      { month: "2026-01", amount: 9200 },
    ],
    investors: [
      { id: "inv-001", name: "Anan P.", avatar: av("AP"), invested: 5000, investedAt: "2026-01-11", isReturning: true },
      { id: "inv-002", name: "Mali S.", avatar: av("MS"), invested: 4200, investedAt: "2026-01-10", isReturning: false },
      { id: "inv-003", name: "Krit T.", avatar: av("KT"), invested: 2100, investedAt: "2025-12-21", isReturning: false },
      { id: "inv-004", name: "Nicha R.", avatar: av("NR"), invested: 4800, investedAt: "2025-11-09", isReturning: true },
      { id: "inv-005", name: "Ploy V.", avatar: av("PV"), invested: 3500, investedAt: "2025-10-03", isReturning: false },
      { id: "inv-006", name: "Thanakorn J.", avatar: av("TJ"), invested: 2200, investedAt: "2025-09-18", isReturning: false },
      { id: "inv-007", name: "Sirin C.", avatar: av("SC"), invested: 3900, investedAt: "2025-09-02", isReturning: true },
      { id: "inv-008", name: "Boss N.", avatar: av("BN"), invested: 250, investedAt: "2025-08-25", isReturning: false },
      { id: "inv-009", name: "View K.", avatar: av("VK"), invested: 250, investedAt: "2025-08-20", isReturning: false },
      { id: "inv-010", name: "Fern L.", avatar: av("FL"), invested: 700, investedAt: "2025-08-11", isReturning: false },
    ],
    raised: 0,
  },

  // ... post 2-4 ใส่ investors แบบเดียวกันได้ (สั้น ๆ ก็พอสำหรับ prototype)
  {
    id: 2,
    sme: "สวนทุเรียนลุงสม",
    title: "ติดตั้งระบบรดน้ำอัตโนมัติ",
    description:
      "ช่วยลุงประหยัดแรงและเพิ่มผลผลิตทุเรียนหมอนทองเกรดพรีเมียมด้วยเทคโนโลยี Smart Farming",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=LS&backgroundColor=4ecdc4",
    target: 80000,
    history: [
      { month: "2025-08", amount: 6000 },
      { month: "2025-09", amount: 10500 },
      { month: "2025-10", amount: 8500 },
      { month: "2025-11", amount: 9800 },
      { month: "2025-12", amount: 10500 },
      { month: "2026-01", amount: 3000 },
    ],
    investors: [
      { id: "inv-101", name: "Korn D.", avatar: av("KD"), invested: 12000, investedAt: "2025-12-22", isReturning: true },
      { id: "inv-102", name: "Nan W.", avatar: av("NW"), invested: 8000, investedAt: "2025-11-05", isReturning: false },
      { id: "inv-103", name: "James P.", avatar: av("JP"), invested: 5000, investedAt: "2026-01-03", isReturning: false },
    ],
    raised: 0,
  },

  {
    id: 3,
    sme: "คาเฟ่แมวเหมียว",
    title: "ขยายโซนที่นั่งและซื้อเครื่องชงกาแฟใหม่",
    description:
      "น้องแมวต้องการบ้านที่กว้างขึ้น และเราต้องการเสิร์ฟกาแฟรสชาติเยี่ยมให้คนรักแมวทุกท่าน",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=MM&backgroundColor=feca57",
    target: 50000,
    history: [
      { month: "2025-08", amount: 1200 },
      { month: "2025-09", amount: 1600 },
      { month: "2025-10", amount: 2200 },
      { month: "2025-11", amount: 2800 },
      { month: "2025-12", amount: 4200 },
      { month: "2026-01", amount: 3000 },
    ],
    investors: [
      { id: "inv-201", name: "Mew M.", avatar: av("MM"), invested: 2000, investedAt: "2026-01-08", isReturning: true },
      { id: "inv-202", name: "Pat C.", avatar: av("PC"), invested: 1500, investedAt: "2025-12-13", isReturning: false },
    ],
    raised: 0,
  },

  {
    id: 4,
    sme: "ฟาร์มผักไฮโดร",
    title: "สร้างโรงเรือนเพิ่มรองรับความต้องการ",
    description: "ปลูกผักสลัดออร์แกนิก ปลอดสารพิษ เพื่อสุขภาพที่ดีของคนในชุมชน",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=HF&backgroundColor=1dd1a1",
    target: 30000,
    history: [
      { month: "2025-08", amount: 300 },
      { month: "2025-09", amount: 450 },
      { month: "2025-10", amount: 650 },
      { month: "2025-11", amount: 900 },
      { month: "2025-12", amount: 1100 },
      { month: "2026-01", amount: 1600 },
    ],
    investors: [
      { id: "inv-301", name: "Green L.", avatar: av("GL"), invested: 900, investedAt: "2025-12-01", isReturning: false },
    ],
    raised: 0,
  },
].map((p) => ({ ...p, raised: sum(p.history) }));
