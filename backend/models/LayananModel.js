import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Layanan = db.define('layanans', {
    kategori_id: {
        type: Sequelize.STRING
    },
    sub_category_id: {
        type: Sequelize.BIGINT
    },
    layanan: {
        type: Sequelize.STRING
    },
    provider_id: {
        type: Sequelize.STRING
    },
    harga_member: {
        type: Sequelize.BIGINT
    },
    harga_gold: {
        type: Sequelize.BIGINT
    },
    harga_platinum: {
        type: Sequelize.BIGINT
    },
    harga_flash_sale: {
        type: Sequelize.BIGINT
    },
    profit_member: {
        type: Sequelize.DECIMAL(11,2)
    },
    profit_gold: {
        type: Sequelize.DECIMAL(11,2)
    },
    profit_platinum: {
        type: Sequelize.DECIMAL(11,2)
    },
    modal: {
        type: Sequelize.BIGINT
    },
    is_flash_sale: {
        type: Sequelize.TINYINT
    },
    judul_flash_sale: {
        type: Sequelize.TEXT
    },
    banner_flash_sale: {
        type: Sequelize.TEXT
    },
    expired_flash_sale: {
        type: Sequelize.DATE
    },
    catatan: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.STRING
    },
    provider: {
        type: Sequelize.STRING
    },
    product_logo: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Layanan;