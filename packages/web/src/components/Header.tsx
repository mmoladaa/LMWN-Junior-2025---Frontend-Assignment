import React from "react";

// Helper function สำหรับคำนวณสถานะร้าน
const calculateActiveStatus = (open: string, close: string): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const [openHour, openMinute] = open.split(":").map(Number);
  const [closeHour, closeMinute] = close.split(":").map(Number);

  const currentTotal = currentHour * 60 + currentMinute;
  const openTotal = openHour * 60 + openMinute;
  const closeTotal = closeHour * 60 + closeMinute;

  return currentTotal >= openTotal && currentTotal <= closeTotal;
};

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
            <span>{isActive ? "เปิด" : "ปิด"}</span>
          </div>
          <span>
            {activeTimePeriod.open} - {activeTimePeriod.close}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
