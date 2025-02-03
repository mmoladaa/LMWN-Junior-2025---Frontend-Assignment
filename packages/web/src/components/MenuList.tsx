import React from "react";
import MenuCard from "./MenuCard";

interface MenuListProps {
  menus: string[];
  shortMenus: any[];
}

const MenuList: React.FC<MenuListProps> = ({ menus, shortMenus }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(menus) && menus.length > 0 ? (
          menus.map((menuName, index) => (
            <MenuCard
              key={index}
              thumbnailImage={shortMenus[index]?.thumbnailImage}
              name={menuName}
              sold={shortMenus[index]?.sold || 0}
            />
          ))
        ) : (
          <div>No menus available</div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
