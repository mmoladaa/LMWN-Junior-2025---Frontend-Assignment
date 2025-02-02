import express, { Application } from "express";
import axios from "axios";

const app: Application = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));

app.get("/restaurants/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`
    );
    console.log("Restaurant Data:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    res.status(500).json({ message: "Error fetching restaurant data" });
  }
});

app.get(
  "/restaurants/:restaurantId/menus/:menuName/short",
  async (req, res) => {
    const { restaurantId, menuName } = req.params;
    try {
      const response = await axios.get(
        `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/short.json`
      );
      console.log("Short Menu Data:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching short menu data:", error);
      res.status(500).json({ message: "Error fetching short menu data" });
    }
  }
);

app.get("/restaurants/:restaurantId/menus/:menuName/full", async (req, res) => {
  const { restaurantId, menuName } = req.params;
  try {
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/full.json`
    );
    console.log("Full Menu Data:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching full menu data:", error);
    res.status(500).json({ message: "Error fetching full menu data" });
  }
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
