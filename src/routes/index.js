import { Router } from "express";

const indexRoute = Router();

indexRoute.get("/", (req, res) => {
  return res.json({ message: "Welcome" });
});

export { indexRoute };
