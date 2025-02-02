import request from "supertest";
import app from "../src/app";

describe("Restaurant API", () => {
  // Test GET restaurant
  it("should get restaurant data", async () => {
    const res = await request(app).get("/api/restaurants/567051").expect(200);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
  });

  // Test GET short menu - ใช้เมนูที่แน่ใจว่ามีอยู่จริง
  it("should get short menu data", async () => {
    // ร้าน Ekkamai Macchiato - Home Brewer
    const restaurantId = "227018";
    const menuName = encodeURIComponent("Iced Americano");

    const res = await request(app)
      .get(`/api/restaurants/${restaurantId}/menus/${menuName}/short`)
      .expect(200);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("fullPrice");
  });

  // Test GET full menu
  it("should get full menu data", async () => {
    const restaurantId = "227018";
    const menuName = encodeURIComponent("Iced Americano");

    const res = await request(app)
      .get(`/api/restaurants/${restaurantId}/menus/${menuName}/full`)
      .expect(200);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("fullPrice");
  });

  // Test error case
  it("should return 500 for invalid restaurant id", async () => {
    await request(app).get("/api/restaurants/invalid-id").expect(500);
  });

  afterAll((done) => {
    done();
  });
});
