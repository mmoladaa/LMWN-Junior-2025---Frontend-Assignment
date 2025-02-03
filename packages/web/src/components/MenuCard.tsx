import React from "react";

interface MenuCardProps {
  thumbnailImage?: string;
  name: string;
  sold: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ thumbnailImage, name, sold }) => {
  return (
    <div className="flex items-center p-2 bg-white">
      {thumbnailImage && (
        <img
          src={thumbnailImage}
          alt={name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      )}
      <div className="ml-4 flex-1">
        <h3 className="font-medium text-base">{name}</h3>
        <p className="text-gray-600 text-sm">{sold} บาท</p>
      </div>
    </div>
  );
};

export default MenuCard;
