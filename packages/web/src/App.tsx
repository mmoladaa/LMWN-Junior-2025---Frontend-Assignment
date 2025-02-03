import React, { useEffect, useState } from "react";
import "./index.css";
import { getRestaurant } from "./api";
import Header from "./components/Header";
import MenuList from "./components/MenuList";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import { Restaurant } from "./types";

function App() {
  const restaurantId = "227018";
  // 567051
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const restaurantData = await getRestaurant(restaurantId);
        setRestaurant(restaurantData);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  return (
    <Router>
      {/* Header */}
      {restaurant && (
        <Header
          imageUrl={restaurant.coverImage}
          restaurantName={restaurant.name}
          activeTimePeriod={restaurant.activeTimePeriod}
        />
      )}

      {/* Menu List */}
      <MenuList
        restaurantId={restaurantId}
        menus={restaurant?.menus || []}
        shortMenus={restaurant?.shortMenus || []}
      />

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
