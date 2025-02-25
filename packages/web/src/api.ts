import axios from "axios";
import { ShortMenu, Restaurant, FullMenu } from "./types";

export const getRestaurant = async (
  restaurantId: string
): Promise<Restaurant> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/restaurants/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.log("Restaurant API error:", error);
    throw error;
  }
};

export const getShortMenu = async (
  restaurantId: string,
  menuName: string
): Promise<ShortMenu[]> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/restaurants/${restaurantId}/menus/${menuName}/short`
    );
    return response.data;
  } catch (error) {
    console.log("Menu API error:", error);
    throw error;
  }
};

export const getFullMenu = async (
  restaurantId: string,
  menuName: string
): Promise<FullMenu> => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/restaurants/${restaurantId}/menus/${menuName}/full`
    );
    return response.data;
  } catch (error) {
    console.log("Full menu API error:", error);
    throw error;
  }
};
