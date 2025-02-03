import React from "react";
import { calculateActiveStatus } from "../utils/timeUtils";

interface HeaderProps {
  imageUrl: string;
  restaurantName: string;
  activeTimePeriod: {
    open: string;
    close: string;
  };
}

function Header({ imageUrl, restaurantName, activeTimePeriod }: HeaderProps) {
  const isActive = calculateActiveStatus(
    activeTimePeriod.open,
    activeTimePeriod.close
  );

  return (
    <div className="relative">
      <div className="w-full h-[240px] bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt="restaurant cover"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
      </div>
      <div className="max-w-2xl mx-auto pl-4 pr-4">
        <h1 className="text-3xl font-bold mb-2 pt-6">{restaurantName}</h1>
        <div className="flex items-center space-x-4 text-sm">
          <span
            className={`px-2 py-1 rounded-md text-white ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isActive ? "เปิด" : "ปิด"}
          </span>
          <span className="text-gray-600">
            {activeTimePeriod.open} - {activeTimePeriod.close} น.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
