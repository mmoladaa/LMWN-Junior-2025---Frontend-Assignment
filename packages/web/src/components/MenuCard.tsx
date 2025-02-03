import React from "react";

interface MenuCardProps {
  thumbnailImage?: string;
  name: string;
  sold: number;
  fullPrice: number;
  totalInStock: number;
  onClick?: () => void;
}

const MenuCard = ({
  thumbnailImage,
  name,
  sold,
  fullPrice,
  totalInStock,
  onClick,
}: MenuCardProps) => {
  return (
    <div className="flex items-center p-2 bg-white" onClick={onClick}>
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
  );
};

export default MenuCard;
