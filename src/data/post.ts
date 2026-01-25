export type Post = {
    id: number;
    sme: string;
    title: string;
    description: string;
    logo: string;
    raised: number;
    target: number;
};

export const posts: Post[] = [
    {
        id: 1,
        sme: "ก๋วยเตี๋ยวป้าณี",
        title: "เป้าหมายในการระดมทุน: เปิดสาขาสองที่เชียงใหม่",
        description:
            "ป้าใคร่แอ่วเจียงใหม่ขนาดเจ้า ต้องการเงินทุนเพื่อขยายรสชาติก๋วยเตี๋ยวสูตรดั้งเดิมให้ชาวเชียงใหม่ได้ลิ้มลอง",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=PN&backgroundColor=ff6b6b",
        raised: 2690,
        target: 120000,
    },
    {
        id: 2,
        sme: "สวนทุเรียนลุงสม",
        title: "เป้าหมายในการระดมทุน: ติดตั้งระบบรดน้ำอัตโนมัติ",
        description:
            "ช่วยลุงประหยัดแรงและเพิ่มผลผลิตทุเรียนหมอนทองเกรดพรีเมียมด้วยเทคโนโลยี Smart Farming",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=LS&backgroundColor=4ecdc4",
        raised: 45000,
        target: 80000,
    },
    {
        id: 3,
        sme: "คาเฟ่แมวเหมียว",
        title: "เป้าหมายในการระดมทุน: ขยายโซนที่นั่งและซื้อเครื่องชงกาแฟใหม่",
        description:
            "น้องแมวต้องการบ้านที่กว้างขึ้น และเราต้องการเสิร์ฟกาแฟรสชาติเยี่ยมให้คนรักแมวทุกท่าน",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=MM&backgroundColor=feca57",
        raised: 15000,
        target: 50000,
    },
    {
        id: 4,
        sme: "ฟาร์มผักไฮโดร",
        title: "เป้าหมายในการระดมทุน: สร้างโรงเรือนเพิ่มรองรับความต้องการ",
        description: "ปลูกผักสลัดออร์แกนิก ปลอดสารพิษ เพื่อสุขภาพที่ดีของคนในชุมชน",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=HF&backgroundColor=1dd1a1",
        raised: 5000,
        target: 30000,
    },
];
