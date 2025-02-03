export const calculateActiveStatus = (
  openTime: string,
  closeTime: string
): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  // แปลงเวลาเปิด-ปิดเป็นนาที
  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;

  // กรณีร้านปิดข้ามวัน (เช่น 22:00 - 02:00)
  if (closeTimeInMinutes < openTimeInMinutes) {
    return (
      currentTime >= openTimeInMinutes || currentTime <= closeTimeInMinutes
    );
  }

  // กรณีปกติ
  return currentTime >= openTimeInMinutes && currentTime <= closeTimeInMinutes;
};
