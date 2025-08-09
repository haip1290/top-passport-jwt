import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.json({ message: "GET from user" });
});

route.get("/profile", (req, res) => {
  res.json({ message: "GET PROFILE", user: req.user });
});

export default route;
