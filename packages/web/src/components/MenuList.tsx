import React from "react";
import MenuCard from "./MenuCard";

interface MenuListProps {
  menus: string[];
  shortMenus: any[];
}

const MenuList: React.FC<MenuListProps> = ({ menus, shortMenus }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div>
        {Array.isArray(menus) && menus.length > 0 ? (
          menus.map((menuName, index) => (
            <MenuCard
              key={index}
              thumbnailImage={shortMenus[index]?.thumbnailImage}
              name={menuName}
              fullPrice={shortMenus[index]?.fullPrice || 0}
            />
          ))
        ) : (
          <div> No menus available </div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
