import { Sequelize } from "sequelize";
import db from "../config/database.js";

const SettingWeb = db.define("setting_webs", {
    judul_web: {
        type: Sequelize.TEXT
    },
    deskripsi_web: {
        type: Sequelize.TEXT
    },
    keyword: {
        type: Sequelize.TEXT
    },
    og_image: {
        type: Sequelize.TEXT
    },
    logo_header: {
        type: Sequelize.TEXT
    },
    logo_footer: {
        type: Sequelize.TEXT
    },
    logo_favicon: {
        type: Sequelize.TEXT
    },
    logo_sidebar_bawah: {
        type: Sequelize.TEXT
    },
    banner_allgames: {
        type: Sequelize.TEXT
    },
    banner_cek_transaksi: {
        type: Sequelize.TEXT
    },
    banner_services: {
        type: Sequelize.TEXT
    },
    banner_user_profile: {
        type: Sequelize.TEXT
    },
    banner_cari_single: {
        type: Sequelize.TEXT
    },
    banner_login_register: {
        type: Sequelize.TEXT
    },
    pattern: {
        type: Sequelize.TEXT
    },
    url_wa: {
        type: Sequelize.TEXT
    },
    url_ig: {
        type: Sequelize.TEXT
    },
    url_tiktok: {
        type: Sequelize.TEXT
    },
    url_youtube: {
        type: Sequelize.TEXT
    },
    url_fb: {
        type: Sequelize.TEXT
    },
    slogan_web: {
        type: Sequelize.TEXT
    },
    snk: {
        type: Sequelize.TEXT
    },
    privacy: {
        type: Sequelize.TEXT
    },
    harga_gold: {
        type: Sequelize.TEXT
    },
    harga_platinum: {
        type: Sequelize.TEXT
    },
    tripay_api: {
        type: Sequelize.TEXT
    },
    tripay_merchant_code: {
        type: Sequelize.TEXT
    },
    tripay_private_key: {
        type: Sequelize.TEXT
    },
    username_digi: {
        type: Sequelize.TEXT
    },
    api_key_digi: {
        type: Sequelize.TEXT
    },
    apigames_secret: {
        type: Sequelize.TEXT
    },
    apigames_merchant: {
        type: Sequelize.TEXT
    },
    vip_apiid: {
        type: Sequelize.TEXT
    },
    vip_apikey: {
        type: Sequelize.TEXT
    },
    nomor_admin: {
        type: Sequelize.TEXT
    },
    wa_key: {
        type: Sequelize.TEXT
    },
    wa_number: {
        type: Sequelize.TEXT
    },
    ovo_admin: {
        type: Sequelize.TEXT
    },
    ovo1_admin: {
        type: Sequelize.TEXT
    },
    gopay_admin: {
        type: Sequelize.TEXT
    },
    gopay1_admin: {
        type: Sequelize.TEXT
    },
    dana_admin: {
        type: Sequelize.TEXT
    },
    shopeepay_admin: {
        type: Sequelize.TEXT
    },
    bca_admin: {
        type: Sequelize.TEXT
    },
    mandiri_admin: {
        type: Sequelize.TEXT
    },
    logo_ceo: {
        type: Sequelize.TEXT
    },
    sejarah: {
        type: Sequelize.TEXT
    },
    sejarah_1: {
        type: Sequelize.TEXT
    },
    visi: {
        type: Sequelize.TEXT
    },
    misi: {
        type: Sequelize.TEXT
    },
    nama_ceo: {
        type: Sequelize.TEXT
    },
    deskripsi_ceo: {
        type: Sequelize.TEXT
    },
    nama_bagan: {
        type: Sequelize.TEXT
    },
    alamat: {
        type: Sequelize.TEXT
    },
    telp: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.TEXT
    }
  },{
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export default SettingWeb;
