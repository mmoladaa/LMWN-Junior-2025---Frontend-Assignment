import React, { useEffect, useState } from "react";
import { MenuOverlayProps } from "../types";

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, menu }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Card */}
      <div
        className={`fixed inset-x-0 bottom-0 h-[70vh] z-50 bg-white rounded-t-2xl transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Handle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2">
          <div className="h-1 w-10 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="p-4 pt-8">
          <div className="flex items-start space-x-4">
            {menu.thumbnailImage && (
              <img
                src={menu.thumbnailImage}
                alt={menu.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-medium mb-2">{menu.name}</h2>
              <p className="text-gray-600 mb-1">ขายแล้ว {menu.sold} ชิ้น</p>
              <p className="text-gray-600 mb-1">
                เหลือ {menu.totalInStock} ชิ้น
              </p>
              <p className="text-lg font-medium">{menu.fullPrice} บาท</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
