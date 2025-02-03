import React, { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import FireIcon from "../assets/icons/fire-solid.svg";
import DefaultFoodImage from "../assets/images/default-food.png";

export interface MenuCardProps {
  restaurantId: string;
  thumbnailImage?: string;
  name: string;
  sold: number;
  fullPrice: number;
  totalInStock: number;
  isTopSeller?: boolean;
  discountedPercent?: number;
}

const MenuCard: React.FC<MenuCardProps> = ({
  restaurantId,
  thumbnailImage,
  name,
  sold,
  fullPrice,
  totalInStock,
  isTopSeller = false,
  discountedPercent = 0,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  // คำนวณราคาหลังลด
  const discountedPrice =
    discountedPercent > 0
      ? Math.round((fullPrice * (100 - discountedPercent)) / 100)
      : fullPrice;

  return (
    <>
      <div
        className="flex items-center p-2 bg-white cursor-pointer hover:bg-gray-50"
        onClick={() => setShowOverlay(true)}
      >
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={thumbnailImage || DefaultFoodImage}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
          {isTopSeller && (
            <div className="absolute -top-2 -right-2">
              <img src={FireIcon} alt="Popular menu" className="w-8 h-8" />
            </div>
          )}
        </div>
        <div className="ml-3 flex-1 overflow-hidden">
          <div className="pr-8">
            <h3 className="font-medium break-words">{name}</h3>
          </div>
          <div className="text-gray-700 text-lg flex flex-wrap items-center gap-2">
            {discountedPercent > 0 ? (
              <>
                <span className="line-through text-gray-400 text-base">
                  {fullPrice}
                </span>
                <span className="text-red-500 font-medium">
                  {discountedPrice}
                </span>
              </>
            ) : (
              <span className="font-medium">{fullPrice}</span>
            )}
            <span>บาท</span>
            {totalInStock === 0 && <span className="text-gray-500">(หมด)</span>}
          </div>
        </div>
      </div>

      <MenuOverlay
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        restaurantId={restaurantId}
        menuName={name}
        isTopSeller={isTopSeller}
        discountedPercent={discountedPercent}
      />
    </>
  );
};

export default MenuCard;
