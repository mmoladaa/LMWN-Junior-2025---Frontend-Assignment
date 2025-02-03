import React, { useEffect, useState } from "react";
import { FullMenu, getFullMenu } from "../api";
import ChevronDownIcon from "../assets/icons/chevron-down-solid.svg";
import DefaultFoodImage from "../assets/images/default-food-modal.png";
import { sortMenus } from "../utils/menuSorter";
import FireIcon from "../assets/icons/fire-solid.svg";

export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
  menuName: string[];
  isTopSeller: boolean;
  discountedPercent?: number;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  restaurantId,
  menuName,
  isTopSeller,
  discountedPercent = 0,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [menu, setMenu] = useState<FullMenu | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const menuData = await getFullMenu(restaurantId, menuName);
        setMenu(menuData);
      } catch (error) {
        console.error("Failed to load full menu:", error);
        setMenu(null);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMenu();
    }
  }, [restaurantId, menuName, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  // คำนวณราคาหลังลด
  const discountedPrice =
    menu && discountedPercent > 0
      ? Math.round((menu.fullPrice * (100 - discountedPercent)) / 100)
      : menu?.fullPrice;

  if (!isOpen && !isAnimating) return null;

  return (
    <div className="contents">
      {/* Background */}
      <div
        className={`fixed inset-0 z-40 transition-colors duration-300 ${
          isVisible ? "bg-black/50" : "bg-black/0"
        }`}
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={`fixed inset-x-0 bottom-0 max-w-2xl mx-auto max-h-[90vh] z-50 bg-white rounded-t-3xl shadow-xl transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white z-10 pt-4 pb-2 rounded-t-3xl">
          <button
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <img src={ChevronDownIcon} className="w-5 h-5" alt="Close" />
          </button>
          {!loading && menu && (
            <h2 className="text-2xl font-bold px-12 text-center break-words">
              {menu.name}
            </h2>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(90vh-64px)]">
          {loading ? (
            <div className="px-8 pt-20 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-gray-500"></div>
            </div>
          ) : menu === null ? (
            <div className="text-center">ไม่พบข้อมูลเมนู</div>
          ) : (
            <div>
              <div className="relative">
                <img
                  src={menu.largeImage || DefaultFoodImage}
                  alt={menu.name}
                  className="w-full h-64 md:h-72 object-cover"
                />
              </div>
              <div className="px-8 py-4">
                <div className="flex flex-wrap items-center gap-2 mb-2 text-2xl font-bold">
                  <div>
                    ราคา{" "}
                    {discountedPercent > 0 ? (
                      <>
                        <span className="line-through text-gray-400 text-base">
                          {menu?.fullPrice}
                        </span>
                        <span className="ml-2 text-red-500">
                          {discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium">{menu?.fullPrice}</span>
                    )}{" "}
                    บาท
                  </div>
                  {isTopSeller && (
                    <span className="text-orange-500">
                      ยอดขายดีที่สุดในร้าน
                    </span>
                  )}
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                {menu.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {option.label}
                    </h3>
                    <div className="pl-4">
                      {option.choices?.map((choice, choiceIndex) => (
                        <p key={choiceIndex} className="text-gray-600 mb-1">
                          • {choice.label}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
