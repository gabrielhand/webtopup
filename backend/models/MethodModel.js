import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Method = db.define('methods', {
    name: {
      type: Sequelize.STRING,
    },
    images: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    keterangan: {
      type: Sequelize.STRING,
    },
    tipe: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Method;
