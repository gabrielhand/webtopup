import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Kategori = db.define('kategoris', {
    nama: {
        type: Sequelize.STRING
    },
    sub_nama: {
        type: Sequelize.STRING
    },
    brand: {
        type: Sequelize.TEXT
    },
    kode: {
        type: Sequelize.STRING
    },
    server_id: {
        type: Sequelize.TINYINT
    },
    status: {
        type: Sequelize.STRING
    },
    thumbnail: {
        type: Sequelize.STRING
    },
    tipe_id: {
        type: Sequelize.BIGINT
    },
    populer: {
        type: Sequelize.TINYINT
    },
    petunjuk: {
        type: Sequelize.STRING
    },
    ket_layanan: {
        type: Sequelize.TEXT
    },
    ket_id: {
        type: Sequelize.TEXT
    },
    placeholder_1: {
        type: Sequelize.TEXT
    },
    placeholder_2: {
        type: Sequelize.TEXT
    },
    bannerlayanan: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Kategori;