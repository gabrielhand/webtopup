import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Berita = db.define('beritas', {
    path: {
        type: Sequelize.STRING
    },
    tipe: {
        type: Sequelize.STRING
    },
    deskripsi: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Berita;