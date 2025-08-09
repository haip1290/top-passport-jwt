import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
import users from "../db/users.js";

const verifyLocal = (email, password, cb) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return cb(null, false, { message: "Incorrect email or password" });
  }
  return cb(null, user, { message: "Logged in successfully" });
};

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    verifyLocal
  )
);

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const verifyJwt = (jwtPayload, cb) => {
  const id = jwtPayload.id;
  const user = users.find((user) => user.id === id);
  return cb(null, user);
};
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    verifyJwt
  )
);

export default passport;
