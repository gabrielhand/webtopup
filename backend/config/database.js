import { Sequelize } from "sequelize";

const db = new Sequelize('webtopup','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;