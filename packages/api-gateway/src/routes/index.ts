import { Router } from "express";
import { getRestaurant, getShortMenu, getFullMenu } from "../controllers";

const router = Router();

router.get("/restaurants/:restaurantId", getRestaurant);
router.get("/restaurants/:restaurantId/menus/:menuName/short", getShortMenu);
router.get("/restaurants/:restaurantId/menus/:menuName/full", getFullMenu);

export { router };
