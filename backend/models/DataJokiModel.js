import { Sequelize } from "sequelize";
import db from "../config/database.js";

const DataJoki = db.define(
  "data_joki",
  {
    order_id: {
      type: Sequelize.STRING,
    },
    email_joki: {
      type: Sequelize.STRING,
    },
    password_joki: {
      type: Sequelize.TEXT,
    },
    loginvia_joki: {
      type: Sequelize.TEXT,
    },
    nickname_joki: {
      type: Sequelize.TEXT,
    },
    request_joki: {
      type: Sequelize.TEXT,
    },
    catatan_joki: {
      type: Sequelize.TEXT,
    },
    status_joki: {
      type: Sequelize.TEXT,
    },
  },
  {
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default DataJoki;
