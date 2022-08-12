import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server";

/**
 * This file has integration tests for ignoring a digipet.
 *
 * It is intended to test three behaviours:
 *  1. ignoring a digipet leads to decreasing discipline
 *  2. ignoring a digipet leads to decreasing happiness
 *  3. ignoring a digipet leads to decreasing nutrition
 */

describe("When a user ignores a digipet repeatedly, its discipline decreases by 10 each time until it eventually stays at 0", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 60,
      nutrition: 80,
      discipline: 25,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("discipline", 25);
  });

  test("1st GET /digipet/ignore informs them about the ignore and shows decrease in discipline for digipet", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 15);
  });

  test("2nd GET /digipet/ignore shows continued stats change", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 5);
  });

  test("3rd GET /digipet/ignore shows discipline hitting a bottom of 0", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 0);
  });

  test("4th GET /digipet/ignore shows no further decrease in discipline", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 0);
  });
});

describe("When a user ignores a digipet repeatedly, its happiness decreases by 10 each time until it eventually floors out at 0", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 11,
      nutrition: 50,
      discipline: 50,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("happiness", 11);
  });

  test("1st GET /digipet/ignore informs them about the ignore and shows decreased happiness for digipet", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 1);
  });

  test("2nd GET /digipet/ignore shows happiness hitting a floor of 0", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
  });

  test("3rd GET /digipet/ignore shows no further decrease in happiness", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
  });
});

describe("When a user ignores a digipet repeatedly, its nutrition decreases by 10 each time until it eventually floors out at 0", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 50,
      nutrition: 11,
      discipline: 50,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("nutrition", 11);
  });

  test("1st GET /digipet/ignore informs them about the ignore and shows decreased nutrition for digipet", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("nutrition", 1);
  });

  test("2nd GET /digipet/ignore shows nutrition hitting a floor of 0", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
  });

  test("3rd GET /digipet/ignore shows no further decrease in nutrition", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
  });
});