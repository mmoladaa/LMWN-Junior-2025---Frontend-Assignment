import React from "react";

interface MenuCardProps {
  thumbnailImage?: string;
  name: string;
  sold: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ thumbnailImage, name, sold }) => {
  return (
    <div className="flex items-center">
      {thumbnailImage && (
        <img
          src={thumbnailImage}
          alt={name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      )}
      <div className="ml-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <p>{sold || 0} บาท</p>
      </div>
    </div>
  );
};

export default MenuCard;
