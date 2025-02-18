import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton";
import { getAllShortMenus, getMenusDiscounted, getMenusMaxSold } from "../api";
import { ShortMenu } from "../types";

interface MenuListProps {
  restaurantId: string;
}

const MenuList: React.FC<MenuListProps> = ({ restaurantId }) => {
  const [regularMenus, setRegularMenus] = useState<ShortMenu[]>([]);
  const [discountedMenus, setDiscountedMenus] = useState<ShortMenu[]>([]);
  const [topSellerMenus, setTopSellerMenus] = useState<ShortMenu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMenus = async () => {
      if (!restaurantId) return;

      try {
        setIsLoading(true);
        setError(null);

        // แยกการเรียก API เป็น 3 ส่วน
        const topSellersPromise = getMenusMaxSold(restaurantId);
        const discountedPromise = getMenusDiscounted(restaurantId);
        const allMenusPromise = getAllShortMenus(restaurantId);

        // รอให้ทุก Promise ทำงานเสร็จ
        await Promise.all([
          // Top Sellers
          topSellersPromise
            .then((topSellers) => {
              if (Array.isArray(topSellers)) {
                setTopSellerMenus(
                  topSellers.map((menu) => ({ ...menu, isTopSeller: true }))
                );
              }
            })
            .catch((error) => {
              console.error("Failed to load top sellers:", error);
              setTopSellerMenus([]);
            }),

          // Discounted Menus
          discountedPromise
            .then((discounted) => {
              if (Array.isArray(discounted)) {
                setDiscountedMenus(discounted);
              }
            })
            .catch((error) => {
              console.error("Failed to load discounted menus:", error);
              setDiscountedMenus([]);
            }),

          // All Menus
          allMenusPromise
            .then((allMenus) => {
              if (Array.isArray(allMenus)) {
                setRegularMenus(allMenus);
              }
            })
            .catch((error) => {
              console.error("Failed to load regular menus:", error);
              setRegularMenus([]);
            }),
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load menus:", error);
        setError("ไม่สามารถโหลดข้อมูลเมนูได้ กรุณาลองใหม่อีกครั้ง");
        setIsLoading(false);
      }
    };

    loadMenus();
  }, [restaurantId]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center py-8 text-red-500">
          <p className="text-lg mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <MenuCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {/* เมนูขายดี */}
        {topSellerMenus.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">เมนูขายดี</h2>
            <div className="space-y-2">
              {topSellerMenus.map((menu, index) => (
                <MenuCard
                  key={`top-${menu.id}-${index}`}
                  restaurantId={restaurantId}
                  {...menu}
                  isTopSeller={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* เมนูลดราคา */}
        {discountedMenus.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">เมนูลดราคา</h2>
            <div className="space-y-2">
              {discountedMenus.map((menu, index) => (
                <MenuCard
                  key={`discount-${menu.id}-${index}`}
                  restaurantId={restaurantId}
                  {...menu}
                  isTopSeller={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* เมนูทั้งหมด */}
        {regularMenus.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">เมนูทั้งหมด</h2>
            <div className="space-y-2">
              {regularMenus.map((menu, index) => (
                <MenuCard
                  key={`regular-${menu.id}-${index}`}
                  restaurantId={restaurantId}
                  {...menu}
                  isTopSeller={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
