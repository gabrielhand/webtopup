import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Pembelian = db.define('pembelians', {
    order_id: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    zone: {
      type: Sequelize.STRING,
    },
    nickname: {
      type: Sequelize.STRING,
    },
    email_vilog: {
      type: Sequelize.TEXT,
    },
    password_vilog: {
      type: Sequelize.TEXT,
    },
    loginvia_vilog: {
      type: Sequelize.TEXT,
    },
    layanan: {
      type: Sequelize.STRING,
    },
    harga: {
      type: Sequelize.INTEGER,
    },
    jumlah: {
      type: Sequelize.INTEGER,
    },
    profit: {
      type: Sequelize.INTEGER,
    },
    provider_order_id: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    log: {
      type: Sequelize.STRING,
    },
    tipe_transaksi: {
      type: Sequelize.STRING,
    },
    is_digi: {
      type: Sequelize.TINYINT,
    },
    is_review: {
      type: Sequelize.STRING,
    }
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Pembelian;
