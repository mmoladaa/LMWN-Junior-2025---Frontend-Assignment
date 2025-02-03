import { ShortMenu } from "../types";

export const sortMenus = (
  menus: (ShortMenu | null)[]
): (ShortMenu | null)[] => {
  return [...menus].sort((a, b) => {
    // ถ้าเมนูใดเมนูหนึ่งเป็น null ให้ไปต่อท้าย
    if (!a) return 1;
    if (!b) return -1;

    // 1. Top seller ขึ้นก่อน
    if (a.isTopSeller && !b.isTopSeller) return -1;
    if (!a.isTopSeller && b.isTopSeller) return 1;

    // 2. มีส่วนลดขึ้นถัดมา
    if (a.discountedPercent && !b.discountedPercent) return -1;
    if (!a.discountedPercent && b.discountedPercent) return 1;

    // 3. ถ้ามีส่วนลดเท่ากัน เรียงตามเปอร์เซ็นต์ส่วนลดมากไปน้อย
    if (a.discountedPercent && b.discountedPercent) {
      return b.discountedPercent - a.discountedPercent;
    }

    // 4. ถ้าไม่มีเงื่อนไขพิเศษ เรียงตามยอดขายมากไปน้อย
    return b.sold - a.sold;
  });
};
