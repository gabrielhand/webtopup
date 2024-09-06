import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import LayananRoute from "./routes/LayananRoute.js";
import SettingWebRoute from "./routes/SettingWebRoute.js";
import BeritaRoute from "./routes/BeritaRoute.js";
import TipeRoute from "./routes/TipeRoute.js";
import PembelianRoute from "./routes/PembelianRoute.js";
import SubKategoriRoute from "./routes/SubKategoriRoute.js";
import MethodRoute from "./routes/MethodRoute.js";
import RatingRoute from "./routes/RatingRoute.js";

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(UserRoute);
app.use(KategoriRoute);
app.use(LayananRoute);
app.use(SettingWebRoute);
app.use(BeritaRoute);
app.use(TipeRoute);
app.use(PembelianRoute);
app.use(SubKategoriRoute);
app.use(MethodRoute);
app.use(RatingRoute);

app.listen(process.env.APP_PORT, () => console.log("Server up and running..."));
