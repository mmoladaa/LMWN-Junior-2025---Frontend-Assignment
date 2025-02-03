import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton";
import { getShortMenu } from "../api";
import { ShortMenu } from "../types";

interface MenuListProps {
  restaurantId: string;
  menus: string[];
}

const MenuList: React.FC<MenuListProps> = ({ restaurantId, menus }) => {
  const [shortMenus, setShortMenus] = useState<(ShortMenu | null)[]>(
    new Array(menus.length).fill(null)
  );
  const [topSellerMenu, setTopSellerMenu] = useState<ShortMenu | null>(null);
  const [loadingTopSeller, setLoadingTopSeller] = useState(true);
  const [loadingDiscounted, setLoadingDiscounted] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const BATCH_SIZE = 5;

  useEffect(() => {
    const loadMenus = async () => {
      try {
        setLoadingTopSeller(true);
        setLoadingDiscounted(true);
        setLoadingAll(true);
        setTopSellerMenu(null);
        setShortMenus(new Array(menus.length).fill(null));
        setLoadedCount(0);

        let maxSold = -1;
        let currentTopSeller: ShortMenu | null = null;

        // โหลดทุกเมนูพร้อมกัน แต่แสดงผลทันทีที่แต่ละเมนูโหลดเสร็จ
        const loadPromises = menus.map(async (menuId, index) => {
          try {
            const menuData = await getShortMenu(restaurantId, menuId);
            if (menuData) {
              if (menuData.sold > maxSold) {
                maxSold = menuData.sold;
                currentTopSeller = { ...menuData, isTopSeller: true };
                setTopSellerMenu(currentTopSeller);
              }

              setShortMenus((currentMenus) => {
                const updatedMenus = [...currentMenus];
                // อัพเดทเฉพาะเมนูที่ไม่ใช่ top seller
                if (currentTopSeller?.name !== menuData.name) {
                  updatedMenus[index] = menuData;
                }
                return updatedMenus;
              });
            }

            setLoadedCount((prev) => {
              const newCount = prev + 1;
              // อัพเดทสถานะ loading ตามจำนวนที่โหลดได้
              const loadedPercent = newCount / menus.length;
              if (loadedPercent >= 0.33) setLoadingTopSeller(false);
              if (loadedPercent >= 0.66) setLoadingDiscounted(false);
              if (newCount === menus.length) setLoadingAll(false);
              return newCount;
            });
          } catch (error) {
            console.error(`Failed to load menu ${menuId}:`, error);
            setLoadedCount((prev) => prev + 1);
          }
        });

        await Promise.all(loadPromises);
      } catch (error) {
        console.error("Failed to load menus:", error);
      }
    };

    if (menus.length > 0) {
      loadMenus();
    } else {
      setLoadingTopSeller(false);
      setLoadingDiscounted(false);
      setLoadingAll(false);
    }
  }, [restaurantId, menus]);

  const renderMenuGroups = () => {
    const discountedMenus = shortMenus.filter(
      (menu) => menu?.discountedPercent > 0
    );

    return (
      <div className="space-y-2">
        {/* Top Seller Section */}
        {loadingTopSeller ? (
          <MenuCardSkeleton key="top-seller-skeleton" isTopSeller={true} />
        ) : (
          topSellerMenu && (
            <MenuCard
              key={`top-${topSellerMenu.name}`}
              restaurantId={restaurantId}
              thumbnailImage={topSellerMenu.thumbnailImage}
              name={topSellerMenu.name}
              fullPrice={topSellerMenu.fullPrice}
              sold={topSellerMenu.sold}
              totalInStock={topSellerMenu.totalInStock}
              isTopSeller={true}
              discountedPercent={topSellerMenu.discountedPercent}
            />
          )
        )}

        {/* Discounted Section */}
        {discountedMenus.map(
          (menu, index) =>
            menu && (
              <MenuCard
                key={`discount-${menu.name}-${index}`}
                restaurantId={restaurantId}
                thumbnailImage={menu.thumbnailImage}
                name={menu.name}
                fullPrice={menu.fullPrice}
                sold={menu.sold}
                totalInStock={menu.totalInStock}
                isTopSeller={false}
                discountedPercent={menu.discountedPercent}
              />
            )
        )}

        {/* All Menus Section */}
        {shortMenus.map((menuData, index) => {
          if (!menuData && index >= loadedCount) {
            return <MenuCardSkeleton key={`skeleton-${index}`} />;
          }

          if (menuData?.discountedPercent > 0 || menuData?.isTopSeller) {
            return null;
          }

          return (
            menuData && (
              <MenuCard
                key={`regular-${menuData.name}-${index}`}
                restaurantId={restaurantId}
                thumbnailImage={menuData.thumbnailImage}
                name={menuData.name}
                fullPrice={menuData.fullPrice}
                sold={menuData.sold}
                totalInStock={menuData.totalInStock}
                isTopSeller={false}
                discountedPercent={menuData.discountedPercent}
              />
            )
          );
        })}
      </div>
    );
  };

  if (loadingTopSeller && loadingDiscounted && loadingAll) {
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

  return <div className="max-w-2xl mx-auto p-4">{renderMenuGroups()}</div>;
};

export default MenuList;
