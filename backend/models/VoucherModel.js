import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Voucher = db.define('vouchers', {
    kode: {
      type: Sequelize.STRING,
    },
    promo: {
      type: Sequelize.INTEGER,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    max_potongan: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Voucher;
