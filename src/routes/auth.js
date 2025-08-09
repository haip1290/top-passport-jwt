import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const route = Router();

route.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: "Something is wrong", user });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, "secret");
      return res.json({ user, token });
    });
  })(req, res);
});

export default route;
