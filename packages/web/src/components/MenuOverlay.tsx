import React, { useEffect, useState } from "react";
import { FullMenu, getFullMenu } from "../api";
import ChevronDownIcon from "../assets/icons/chevron-down-solid.svg";

export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
  menuName: string[];
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  restaurantId,
  menuName,
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
        className={`fixed inset-x-0 bottom-0 h-[70vh] z-50 bg-white rounded-t-2xl transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <img src={ChevronDownIcon} className="w-5 h-5" alt="Close" />
        </button>

        {/* Content */}
        <div className="p-4 h-full overflow-y-auto">
          {loading ? (
            <div className="text-center">กำลังโหลด...</div>
          ) : menu === null ? (
            <div className="text-center">ไม่พบข้อมูลเมนู</div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">{menu.name}</h2>
              <img
                src={menu.largeImage}
                alt={menu.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-2">ราคา: {menu.fullPrice} บาท</p>
              {menu.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
