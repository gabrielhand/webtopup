import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Deposit = db.define(
  "deposits",
  {
    username: {
      type: Sequelize.STRING,
    },
    metode: {
      type: Sequelize.STRING,
    },
    no_pembayaran: {
      type: Sequelize.STRING,
    },
    jumlah: {
      type: Sequelize.BIGINT,
    },
    status: {
      type: Sequelize.ENUM("Success", "Pending"),
    },
  },
  {
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Deposit;
