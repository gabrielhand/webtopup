import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Review = db.define('ratings', {
    nama: {
      type: Sequelize.STRING,
    },
    bintang: {
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
    },
    layanan: {
      type: Sequelize.STRING,
    },
    kategori_kode: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Review;