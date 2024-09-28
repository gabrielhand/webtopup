import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Pembayaran = db.define(
  "pembayarans",
  {
    order_id: {
      type: Sequelize.STRING,
    },
    harga: {
      type: Sequelize.STRING,
    },
    jumlah: {
      type: Sequelize.INTEGER,
    },
    no_pembayaran: {
      type: Sequelize.TEXT,
    },
    no_pembeli: {
      type: Sequelize.BIGINT,
    },
    status: {
      type: Sequelize.STRING,
    },
    metode: {
      type: Sequelize.STRING,
    },
    reference: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Pembayaran;
