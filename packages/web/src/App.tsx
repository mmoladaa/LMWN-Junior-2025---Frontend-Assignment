import React, { useEffect, useState } from "react";
import "./index.css";
import { getRestaurant } from "./api";
import Header from "./components/Header";
import MenuList from "./components/MenuList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Footer from "./components/Footer";
import { Restaurant } from "./types";

function RestaurantPage() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (restaurantId) {
          setRestaurant(null);
          const restaurantData = await getRestaurant(restaurantId);
          setRestaurant(restaurantData);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, [restaurantId]);

  useEffect(() => {
    document.title = restaurant?.name || "Restaurant Menu";
  }, [restaurant]);

  return (
    <>
      {restaurant && (
        <Header
          imageUrl={restaurant.coverImage}
          restaurantName={restaurant.name}
          activeTimePeriod={restaurant.activeTimePeriod}
        />
      )}
      <MenuList
        restaurantId={restaurantId || ""}
        menus={restaurant?.menus || []}
        shortMenus={restaurant?.shortMenus || []}
      />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
