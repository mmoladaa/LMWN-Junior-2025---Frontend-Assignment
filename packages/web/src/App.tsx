import React, { useEffect, useState } from "react";
import "./index.css";
import { getRestaurant, getShortMenu } from "./api";
import Header from "./components/Header";
import MenuList from "./components/MenuList";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [menus, setMenus] = useState([]);
  const [shortMenus, setShortMenus] = useState([]);
  const restaurantId = "567051";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลร้านอาหาร
        const restaurantData = await getRestaurant(restaurantId);
        setImageUrl(restaurantData.coverImage);
        setRestaurantName(restaurantData.name);
        setActiveStatus(restaurantData.activeStatus);
        setOpeningHours(restaurantData.openingHours);

        const menuList = restaurantData.menus;
        setMenus(menuList);

        const shortMenuPromises = menuList.map((menuName) => {
          return getShortMenu(restaurantId, menuName);
        });

        const shortMenuResults = await Promise.all(shortMenuPromises);
        setShortMenus(shortMenuResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Header
        imageUrl={imageUrl}
        restaurantName={restaurantName}
        activeStatus={activeStatus}
        openingHours={openingHours}
      />
      <MenuList menus={menus} shortMenus={shortMenus} />
    </Router>
  );
}

export default App;
