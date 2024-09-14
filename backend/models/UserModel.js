import { Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define('users', {
    name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    whatsapp: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    filename: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.ENUM('Member', 'Gold', 'Platinum', 'Admin')
    },
    balance: {
        type: Sequelize.BIGINT
    },
    api_key: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default User;