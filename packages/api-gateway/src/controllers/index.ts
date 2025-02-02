import { Request, Response } from "express";
import axios from "axios";

const BASE_URL =
  "https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api";

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const response = await axios.get(
      `${BASE_URL}/restaurants/${restaurantId}.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
};

export const getShortMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuName } = req.params;
    const response = await axios.get(
      `${BASE_URL}/restaurants/${restaurantId}/menus/${menuName}/short.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch short menu data" });
  }
};

export const getFullMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuName } = req.params;
    const response = await axios.get(
      `${BASE_URL}/restaurants/${restaurantId}/menus/${menuName}/full.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch full menu data" });
  }
};
