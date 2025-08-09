import express from "express";
import "dotenv/config";

import { indexRoute } from "./routes/index.js";
import passport from "./authentication/passport.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoute);

app.use("/auth", authRoute);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
