import express, { Application } from "express";
import axios from "axios";

const app: Application = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("LINE MAN Wongnai Frontend Assignment"));

// Endpoint to get restaurant details
app.get("/restaurants/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant data" });
  }
});

// Endpoint to get short menu details
app.get(
  "/restaurants/:restaurantId/menus/:menuName/short",
  async (req, res) => {
    const { restaurantId, menuName } = req.params;
    try {
      const response = await axios.get(
        `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/short.json`
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching short menu data" });
    }
  }
);

// Endpoint to get full menu details
app.get("/restaurants/:restaurantId/menus/:menuName/full", async (req, res) => {
  const { restaurantId, menuName } = req.params;
  try {
    const response = await axios.get(
      `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/full.json`
    );
    res.json(response.data);
  } catch (error) {
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
