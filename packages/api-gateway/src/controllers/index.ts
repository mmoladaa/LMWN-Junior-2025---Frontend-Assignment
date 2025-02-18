import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config";
import { MenuShort } from "../types";

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const response = await axios.get(
      `${config.baseUrl}/restaurants/${restaurantId}.json`
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
      `${config.baseUrl}/restaurants/${restaurantId}/menus/${menuName}/short.json`
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
      `${config.baseUrl}/restaurants/${restaurantId}/menus/${menuName}/full.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch full menu data" });
  }
};

export const getMenusDiscounted = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    // 1. Get restaurant data
    const restaurantResponse = await axios.get(
      `${config.baseUrl}/restaurants/${restaurantId}.json`
    );
    const menuNames = restaurantResponse.data.menus || [];

    // 2. ดึงข้อมูลเมนูพร้อมกัน
    const menuPromises = menuNames.map((menuName: string) =>
      axios
        .get(
          `${config.baseUrl}/restaurants/${restaurantId}/menus/${menuName}/short.json`
        )
        .catch(() => null)
    );

    const menuResponses = await Promise.all(menuPromises);

    // 3. กรองเฉพาะเมนูที่มีส่วนลด (discountedPercent > 0)
    const discountedMenus = menuResponses
      .filter((response) => response !== null)
      .map((response) => response?.data)
      .filter((menuData) => menuData?.discountedPercent > 0);

    res.json(discountedMenus);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch discounted menus" });
  }
};

//เพิ่มการดึงข้อมูลคล่้าย discount แต่เอาเปนเมนูทุกอันที่มี sold มากที่สุด
export const getMenusMaxSold = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const TIMEOUT = 1000;

    // 1. Get restaurant data
    const restaurantResponse = await axios.get(
      `${config.baseUrl}/restaurants/${restaurantId}.json`,
      { timeout: TIMEOUT }
    );
    const menuNames = restaurantResponse.data.menus || [];

    // 2. Get short menu data for all menus
    const menuPromises = menuNames.map((menuName: string) =>
      axios
        .get(
          `${config.baseUrl}/restaurants/${restaurantId}/menus/${menuName}/short.json`,
          { timeout: TIMEOUT }
        )
        .catch(() => null)
    );

    const menuResponses = await Promise.all(menuPromises);
    const menus = menuResponses
      .filter((response) => response !== null)
      .map((response) => response?.data);

    // 3. หา max และ min sold
    const soldCounts = menus.map((menu) => menu.sold);
    const maxSold = Math.max(...soldCounts);
    const minSold = Math.min(...soldCounts);

    // 4. กรองเมนูที่มี sold เท่ากับ maxSold เฉพาะเมื่อ maxSold > minSold
    const menusWithMaxSold =
      maxSold > minSold ? menus.filter((menu) => menu.sold === maxSold) : [];

    res.json(menusWithMaxSold);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch menus sold" });
  }
};

export const getAllShortMenus = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const TIMEOUT = 1000;

    // 1. Get restaurant data
    const restaurantResponse = await axios.get(
      `${config.baseUrl}/restaurants/${restaurantId}.json`,
      { timeout: TIMEOUT }
    );
    const menuNames = restaurantResponse.data.menus || [];

    // 2. Get short menu data for all menus
    const menuPromises = menuNames.map((menuName: string) =>
      axios
        .get(
          `${config.baseUrl}/restaurants/${restaurantId}/menus/${menuName}/short.json`,
          { timeout: TIMEOUT }
        )
        .catch(() => null)
    );

    const menuResponses = await Promise.all(menuPromises);
    const menus = menuResponses
      .filter((response) => response !== null)
      .map((response) => response?.data);

    res.json(menus);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch all short menus" });
  }
};
