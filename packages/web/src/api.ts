import axios from "axios";
import { Restaurant } from "./types";

const API_URL = "http://localhost:3001/api";

export const getRestaurant = async (id: string): Promise<Restaurant> => {
  const response = await axios.get(`${API_URL}/restaurants/${id}`);
  return response.data;
};
