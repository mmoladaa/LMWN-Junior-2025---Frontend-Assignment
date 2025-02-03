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
        <div className="relative w-24 h-24">
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
        <div className="ml-3 flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-700">
            {discountedPercent > 0 ? (
              <>
                <span className="line-through text-gray-400">{fullPrice}</span>
                <span className="ml-2 text-red-500">{discountedPrice}</span>
              </>
            ) : (
              fullPrice
            )}{" "}
            บาท
            {isTopSeller && (
              <span className="ml-2 text-sm text-orange-500">
                ยอดขายดีที่สุดในร้าน
              </span>
            )}
          </p>
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
