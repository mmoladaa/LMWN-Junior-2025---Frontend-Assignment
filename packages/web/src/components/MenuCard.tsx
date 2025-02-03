import React, { useState } from "react";
import MenuOverlay from "./MenuOverlay";

export interface MenuCardProps {
  restaurantId: string;
  thumbnailImage?: string;
  name: string;
  sold: number;
  fullPrice: number;
  totalInStock: number;
}

const MenuCard: React.FC<MenuCardProps> = ({
  restaurantId,
  thumbnailImage,
  name,
  sold,
  fullPrice,
  totalInStock,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    console.log("Clicked menu:", {
      restaurantId,
      name,
    });
    setShowOverlay(true);
  };

  return (
    <>
      <div
        className="flex items-center p-2 bg-white cursor-pointer hover:bg-gray-50"
        onClick={handleClick}
      >
        {thumbnailImage && (
          <img
            src={thumbnailImage}
            alt={name}
            className="w-16 h-16 object-cover rounded-lg"
          />
        )}
        <div className="ml-3 flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-700">{fullPrice} บาท</p>
        </div>
      </div>

      <MenuOverlay
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        restaurantId={restaurantId}
        menuName={name}
      />
    </>
  );
};

export default MenuCard;
