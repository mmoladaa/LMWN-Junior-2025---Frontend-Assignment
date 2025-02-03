import axios from "axios";
import { Restaurant, Menu } from "./types";

const API_URL = "http://localhost:3001/api";

const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds
});

export const getRestaurant = async (
  restaurantId: string
): Promise<Restaurant> => {
  const response = await axiosInstance.get(
    `${API_URL}/restaurants/${restaurantId}`
  );
  return response.data;
};

export const getShortMenu = async (
  restaurantId: string,
  menuName: string
): Promise<Menu[]> => {
  const response = await axiosInstance.get(
    `${API_URL}/restaurants/${restaurantId}/menus/${menuName}/short`
  );
  return response.data;
};
