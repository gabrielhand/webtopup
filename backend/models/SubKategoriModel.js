import { Sequelize } from "sequelize";
import db from "../config/database.js";

const SubKategori = db.define('sub_categories', {
    sub_logo: {
      type: Sequelize.STRING,
    },
    category_id : {
        type: Sequelize.BIGINT,
    },
    code : {
        type: Sequelize.STRING,
    },
    name : {
        type: Sequelize.STRING,
    },
    active : {
        type: Sequelize.TINYINT,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default SubKategori;
