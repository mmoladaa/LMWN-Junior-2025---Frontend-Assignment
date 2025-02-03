import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton";
import { getShortMenu } from "../api";
import { ShortMenu } from "../types";
import { sortMenus } from "../utils/menuSorter";

interface MenuListProps {
  restaurantId: string;
  menus: string[];
}

const BATCH_SIZE = 5; // จำนวนเมนูที่จะโหลดในแต่ละครั้ง

const MenuList: React.FC<MenuListProps> = ({ restaurantId, menus }) => {
  const [shortMenus, setShortMenus] = useState<(ShortMenu | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [topSellerMenuName, setTopSellerMenuName] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadMenus = async () => {
      try {
        setLoading(true);
        const loadedMenus: (ShortMenu | null)[] = new Array(menus.length).fill(
          null
        );
        let maxSold = -1;
        let topSeller = null;

        // โหลด 5 เมนูแรก
        const initialBatch = menus.slice(0, BATCH_SIZE);
        for (let i = 0; i < initialBatch.length; i++) {
          try {
            const menuData = await getShortMenu(restaurantId, initialBatch[i]);
            if (menuData) {
              menuData.isTopSeller = false; // เพิ่มฟิลด์ isTopSeller
              if (menuData.sold > maxSold) {
                maxSold = menuData.sold;
                topSeller = menuData.name;
              }
            }
            loadedMenus[i] = menuData;
            setLoadedCount(i + 1);
          } catch (error) {
            console.error(`Failed to load menu ${initialBatch[i]}:`, error);
            loadedMenus[i] = null;
          }
        }

        // โหลดเมนูที่เหลือ
        const remainingMenus = menus.slice(BATCH_SIZE);
        for (let i = 0; i < remainingMenus.length; i++) {
          try {
            const menuData = await getShortMenu(
              restaurantId,
              remainingMenus[i]
            );
            if (menuData) {
              menuData.isTopSeller = false;
              if (menuData.sold > maxSold) {
                maxSold = menuData.sold;
                topSeller = menuData.name;
              }
            }
            loadedMenus[i + BATCH_SIZE] = menuData;
            setLoadedCount(i + BATCH_SIZE + 1);
          } catch (error) {
            console.error(`Failed to load menu ${remainingMenus[i]}:`, error);
            loadedMenus[i + BATCH_SIZE] = null;
          }
        }

        // กำหนด isTopSeller ให้กับเมนูที่ขายดีที่สุด
        const finalMenus = loadedMenus.map((menu) => {
          if (menu && menu.name === topSeller) {
            return { ...menu, isTopSeller: true };
          }
          return menu;
        });

        // เรียงลำดับเมนูและอัพเดท state
        const sortedMenus = sortMenus(finalMenus);
        setShortMenus(sortedMenus);
        setTopSellerMenuName(topSeller);
        setLoading(false);
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

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <MenuCardSkeleton key={`initial-skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">ไม่พบเมนูในร้านนี้</p>
          <p className="text-sm">โปรดลองใหม่อีกครั้งในภายหลัง</p>
        </div>
      </div>
    );
  }

  if (shortMenus.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center py-8 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-gray-500 mx-auto mb-4"></div>
          <p className="text-lg">กำลังโหลดเมนู...</p>
          <p className="text-sm mt-2">อาจใช้เวลาสักครู่</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        {menus.map((menuName, index) => {
          const menuData = shortMenus[index];

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
              isTopSeller={menuData?.name === topSellerMenuName}
              discountedPercent={menuData?.discountedPercent || 0}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuList;
