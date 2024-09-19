import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
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
import AuthRoute from "./routes/AuthRoute.js";
import VoucherRoute from "./routes/VoucherRoute.js";
import FileUpload from "express-fileupload";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      httpOnly: true,
      sameSite: "strict",
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
app.use(FileUpload());
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
app.use(AuthRoute);
app.use(VoucherRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => console.log("Server up and running..."));
