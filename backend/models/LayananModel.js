import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Layanan = db.define(
  "layanans",
  {
    kategori_id: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Kategori tidak boleh kosong!",
        },
      },
    },
    sub_category_id: {
      type: Sequelize.BIGINT,
    },
    layanan: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Layanan tidak boleh kosong",
        },
      },
    },
    provider_id: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Provider ID tidak boleh kosong",
        },
      },
    },
    harga_member: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Harga member tidak boleh kosong",
        },
      },
    },
    harga_gold: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Harga gold tidak boleh kosong",
        },
      },
    },
    harga_platinum: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Harga platinum tidak boleh kosong",
        },
      },
    },
    harga_flash_sale: {
      type: Sequelize.BIGINT,
    },
    profit_member: {
      type: Sequelize.DECIMAL(11, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Profit member tidak boleh kosong",
        },
      },
    },
    profit_gold: {
      type: Sequelize.DECIMAL(11, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Profit gold tidak boleh kosong",
        },
      },
    },
    profit_platinum: {
      type: Sequelize.DECIMAL(11, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Profit platinum tidak boleh kosong",
        },
      },
    },
    modal: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Modal tidak boleh kosong",
        },
      },
    },
    is_flash_sale: {
      type: Sequelize.TINYINT,
    },
    judul_flash_sale: {
      type: Sequelize.TEXT,
    },
    banner_flash_sale: {
      type: Sequelize.TEXT,
    },
    banner_flash_sale_filename: {
      type: Sequelize.STRING,
    },
    expired_flash_sale: {
      type: Sequelize.DATE,
    },
    catatan: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.STRING,
    },
    provider: {
      type: Sequelize.STRING,
    },
    product_logo: {
      type: Sequelize.STRING,
    },
    product_logo_filename: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Layanan;
