import request from "supertest";
import app from "../src/app";
import { MenuShort } from "../src/types";
describe("Restaurant API", () => {
  // Test GET restaurant
  it("should get restaurant data", async () => {
    const res = await request(app).get("/api/restaurants/567051").expect(200);

    const expectedProps = [
      "name",
      "id",
      "coverImage",
      "menus",
      "activeTimePeriod",
    ];
    expectedProps.forEach((prop) => {
      expect(res.body).toHaveProperty(prop);
    });
    expect(res.body.menus).toBeInstanceOf(Array);
    expect(res.body.activeTimePeriod).toBeInstanceOf(Object);
  });

  // Test GET short menu - ใช้เมนูที่แน่ใจว่ามีอยู่จริง
  it("should get short menu data", async () => {
    const restaurantId = "227018";
    const menuName = encodeURIComponent("Iced Americano");

    const res = await request(app)
      .get(`/api/restaurants/${restaurantId}/menus/${menuName}/short`)
      .expect(200);

    // ตรวจสอบเฉพาะ properties หลักๆ ที่สำคัญ
    const expectedProps = [
      "name",
      "id",
      "thumbnailImage",
      "discountedPercent",
      "fullPrice",
      "sold",
      "totalInStock",
    ];
    expectedProps.forEach((prop) => {
      expect(res.body).toHaveProperty(prop);
    });
  });

  // Test GET full menu
  it("should get full menu data", async () => {
    const restaurantId = "227018";
    const menuName = encodeURIComponent("Iced Americano");

    const res = await request(app)
      .get(`/api/restaurants/${restaurantId}/menus/${menuName}/full`)
      .expect(200);

    const expectedProps = [
      "name",
      "id",
      "thumbnailImage",
      "discountedPercent",
      "fullPrice",
      "sold",
      "totalInStock",
      "options",
    ];
    expectedProps.forEach((prop) => {
      expect(res.body).toHaveProperty(prop);
    });
    expect(res.body.options).toBeInstanceOf(Array);
    //some option have choices
    if (res.body.options.length > 0) {
      expect(res.body.options[0]).toHaveProperty("label");
      expect(res.body.options[0]).toHaveProperty("choices");
      expect(res.body.options[0].choices).toBeInstanceOf(Array);
      expect(res.body.options[0].choices[0]).toHaveProperty("label");
    }
  });

  // Test GET Discounted menu
  it("should get discounted menu data", async () => {
    const restaurantId = "227018";

    const res = await request(app)
      .get(`/api/restaurants/${restaurantId}/menus/discounted`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const expectedProps = ["name", "discountedPercent"];
      expectedProps.forEach((prop) => {
        expect(res.body[0]).toHaveProperty(prop);
      });
      expect(res.body[0].discountedPercent).toBeGreaterThan(0);
    }
  });

  // Test GET Menus Sold
  it("should get maxSold menu data", async () => {
    const restaurantId = "227018";

    const res = await request(app)
      .get(`/api/restaurants/${restaurantId}/menus/sold`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const expectedProps = ["name", "sold"];
      expectedProps.forEach((prop) => {
        expect(res.body[0]).toHaveProperty(prop);
      });
      //ตรวจสอบว่า sold มากสุด
      const maxSold = Math.max(...res.body.map((menu: MenuShort) => menu.sold));
      expect(res.body[0].sold).toBe(maxSold);
    }
  });

  // Test error case
  it("should return 500 for invalid restaurant id", async () => {
    await request(app).get("/api/restaurants/invalid-id").expect(500);
  });

  afterAll((done) => {
    done();
  });
});
