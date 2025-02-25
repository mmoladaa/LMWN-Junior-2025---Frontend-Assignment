export const calculateActiveStatus = (
  openTime: string,
  closeTime: string
): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;

  if (closeTimeInMinutes < openTimeInMinutes) {
    return (
      currentTime >= openTimeInMinutes || currentTime <= closeTimeInMinutes
    );
  }

  return currentTime >= openTimeInMinutes && currentTime <= closeTimeInMinutes;
};
