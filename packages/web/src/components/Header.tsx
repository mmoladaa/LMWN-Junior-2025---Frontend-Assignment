import React from "react";

interface HeaderProps {
  imageUrl: string;
  restaurantName: string;
  activeStatus: string;
  openingHours: string;
}

function Header({
  imageUrl,
  restaurantName,
  activeStatus,
  openingHours,
}: HeaderProps) {
  return (
    <div>
      <img
        src={imageUrl}
        alt="restaurant cover"
        className="w-full h-[240px] object-cover"
      />
      <div>
        <h1>{restaurantName}</h1>
        <div>
          <div>
            <span></span>
            <span>{activeStatus === "open" ? "เปิด" : "ปิด"}</span>
          </div>
          <span>{openingHours}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
