import supertest from "supertest";
import { INITIAL_DIGIPET, setDigipet } from "../digipet/model";
import app from "../server";

describe("User can rehome a digipet when they currently have one, but they can only rehome one digipet", () => {
  // setup: ensure there is no digipet to begin with
  setDigipet(INITIAL_DIGIPET);

  test("1st GET /digipet/rehome informs them that they have rehomed a digipet and that they don't have a digipet anymore", async () => {
    const response = await supertest(app).get("/digipet/rehome");
    expect(response.body.message).toMatch(/success/i);
    expect(response.body.message).toMatch(/rehome/i);
    expect(response.body.digipet).toBeUndefined();
  });

  test("2nd GET /digipet now informs them that they don't currently have a digipet", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/don't/i);
    expect(response.body.digipet).toBeUndefined();
  });

  test("2nd GET /digipet/rehome now informs them that they can't rehome another digipet whilst they don't have one", async () => {
    const response = await supertest(app).get("/digipet/rehome");
    expect(response.body.message).not.toMatch(/success/i);
    expect(response.body.message).toMatch(/can't rehome/i);
    expect(response.body.digipet).toBeNull();
  });
});
