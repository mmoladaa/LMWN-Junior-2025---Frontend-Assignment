import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { getShortMenu } from "../api";
import { ShortMenu } from "../types";

interface MenuListProps {
  restaurantId: string;
  menus: string[];
}

const MenuList: React.FC<MenuListProps> = ({ restaurantId, menus }) => {
  const [shortMenus, setShortMenus] = useState<(ShortMenu | null)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        setLoading(true);
        const loadedMenus: (ShortMenu | null)[] = new Array(menus.length).fill(
          null
        );

        // โหลดข้อมูลทีละเมนู และเก็บไว้ในตำแหน่งเดียวกับ menus array
        for (let i = 0; i < menus.length; i++) {
          try {
            const menuData = await getShortMenu(restaurantId, menus[i]);
            loadedMenus[i] = menuData;
          } catch (error) {
            console.error(`Failed to load menu ${menus[i]}:`, error);
            loadedMenus[i] = null;
          }
        }

        setShortMenus(loadedMenus);
      } catch (error) {
        console.error("Failed to load menus:", error);
      } finally {
        setLoading(false);
      }
    };

    if (menus.length > 0) {
      loadMenus();
    } else {
      setLoading(false);
    }
  }, [restaurantId, menus]);

  if (loading) {
    return <div className="p-4 text-center">กำลังโหลดเมนู...</div>;
  }

  if (shortMenus.every((menu) => menu === null)) {
    return <div className="p-4 text-center">ไม่พบเมนู</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        {menus.map((menuName, index) => {
          const menuData = shortMenus[index];
          return (
            <MenuCard
              key={`${index}-${menuName}`} // ใช้ทั้ง index และ menuName เป็น key
              thumbnailImage={menuData?.thumbnailImage}
              name={menuData?.name || menuName}
              fullPrice={menuData?.fullPrice || 0}
              sold={menuData?.sold || 0}
              totalInStock={menuData?.totalInStock || 0}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuList;
