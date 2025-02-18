import { Router } from "express";
import {
  getRestaurant,
  getShortMenu,
  getFullMenu,
  getMenusDiscounted,
  getMenusMaxSold,
  getAllShortMenus,
} from "../controllers";

const router = Router();

router.get("/restaurants/:restaurantId", getRestaurant);
router.get("/restaurants/:restaurantId/menus/discounted", getMenusDiscounted);
router.get("/restaurants/:restaurantId/menus/maxsold", getMenusMaxSold);
router.get("/restaurants/:restaurantId/menus/:menuName/short", getShortMenu);
router.get("/restaurants/:restaurantId/menus/:menuName/full", getFullMenu);
router.get("/restaurants/:restaurantId/menus/allshort", getAllShortMenus);
export { router };
