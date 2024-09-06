import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Tipe = db.define('tipes', {
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Tipe;
