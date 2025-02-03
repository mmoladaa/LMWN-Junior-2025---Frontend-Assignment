import React, { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import { MenuCardProps } from "../types";

const MenuCard: React.FC<MenuCardProps> = ({
  thumbnailImage,
  name,
  sold,
  fullPrice,
  totalInStock,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    console.log("Clicked menu:", {
      name,
      fullPrice,
      sold,
      totalInStock,
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
        menu={{
          thumbnailImage,
          name,
          sold,
          fullPrice,
          totalInStock,
        }}
      />
    </>
  );
};

export default MenuCard;
