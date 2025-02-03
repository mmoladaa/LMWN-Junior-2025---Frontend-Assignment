import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton";
import { getShortMenu } from "../api";
import { ShortMenu } from "../types";

interface MenuListProps {
  restaurantId: string;
  menus: string[];
}

const BATCH_SIZE = 5; // จำนวนเมนูที่จะโหลดในแต่ละครั้ง

const MenuList: React.FC<MenuListProps> = ({ restaurantId, menus }) => {
  const [shortMenus, setShortMenus] = useState<(ShortMenu | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        setLoading(true);
        const loadedMenus: (ShortMenu | null)[] = new Array(menus.length).fill(
          null
        );

        // โหลด 5 เมนูแรก
        const initialBatch = menus.slice(0, BATCH_SIZE);
        for (let i = 0; i < initialBatch.length; i++) {
          try {
            const menuData = await getShortMenu(restaurantId, initialBatch[i]);
            loadedMenus[i] = menuData;
            setShortMenus([...loadedMenus]);
            setLoadedCount(i + 1);
          } catch (error) {
            console.error(`Failed to load menu ${initialBatch[i]}:`, error);
            loadedMenus[i] = null;
          }
        }

        setLoading(false);

        // โหลดเมนูที่เหลือ
        const remainingMenus = menus.slice(BATCH_SIZE);
        for (let i = 0; i < remainingMenus.length; i++) {
          try {
            const menuData = await getShortMenu(
              restaurantId,
              remainingMenus[i]
            );
            loadedMenus[i + BATCH_SIZE] = menuData;
            setShortMenus([...loadedMenus]);
            setLoadedCount(i + BATCH_SIZE + 1);
          } catch (error) {
            console.error(`Failed to load menu ${remainingMenus[i]}:`, error);
            loadedMenus[i + BATCH_SIZE] = null;
          }
        }
      } catch (error) {
        console.error("Failed to load menus:", error);
      }
    };

    if (menus.length > 0) {
      loadMenus();
    } else {
      setLoading(false);
    }
  }, [restaurantId, menus]);

  if (loading && loadedCount === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <MenuCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (shortMenus.every((menu) => menu === null)) {
    return <div className="p-4 text-center">ไม่พบเมนู</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        {menus.map((menuName, index) => {
          const menuData = shortMenus[index];

          // ถ้ายังไม่มีข้อมูลและเลยจำนวนที่โหลดมาแล้ว แสดง skeleton
          if (!menuData && index >= loadedCount) {
            return <MenuCardSkeleton key={`skeleton-${index}`} />;
          }

          return (
            <MenuCard
              key={`${index}-${menuName}`}
              restaurantId={restaurantId}
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
