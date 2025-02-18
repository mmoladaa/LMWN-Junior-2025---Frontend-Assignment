import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurant } from "../api";
import Header from "../components/Header";
import MenuList from "../components/MenuList";
import Footer from "../components/Footer";
import { Restaurant } from "../types";

function RestaurantPage() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [checkRestaurant, setCheckRestaurant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (restaurantId) {
          setIsLoading(true);
          setRestaurant(null);
          setCheckRestaurant(true);
          const restaurantData = await getRestaurant(restaurantId);
          if (restaurantData) {
            setRestaurant(restaurantData);
          } else {
            setCheckRestaurant(false);
          }
        } else {
          setCheckRestaurant(false);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        setCheckRestaurant(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [restaurantId]);

  if (isLoading) {
    return (
      <div
        role="status"
        className="min-h-screen flex justify-center items-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-500" />
      </div>
    );
  }

  if (!checkRestaurant) {
    return (
      <div
        role="main"
        className="min-h-screen flex flex-col justify-center items-center bg-gray-50"
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            ไม่พบร้านอาหาร
          </h1>
          <p className="text-gray-600 mb-4">
            ขออภัย ไม่พบข้อมูลร้านอาหารที่คุณต้องการ
          </p>
        </div>
      </div>
    );
  }

  return (
    <main role="main">
      {restaurant && (
        <Header
          imageUrl={restaurant.coverImage || ""}
          restaurantName={restaurant.name || ""}
          activeTimePeriod={restaurant.activeTimePeriod}
        />
      )}
      <MenuList restaurantId={restaurantId || ""} />
      <Footer />
    </main>
  );
}

export default RestaurantPage;
