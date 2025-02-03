import React, { useEffect, useState } from "react";
import "./index.css";
import { getRestaurant } from "./api";
import Header from "./components/Header";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [openingHours, setOpeningHours] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const data = await getRestaurant("567051");
        setImageUrl(data.coverImage);
        setRestaurantName(data.name);
        setActiveStatus(data.activeStatus);
        setOpeningHours(data.openingHours);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <Header
      imageUrl={imageUrl}
      restaurantName={restaurantName}
      activeStatus={activeStatus}
      openingHours={openingHours}
    />
  );
}

export default App;
