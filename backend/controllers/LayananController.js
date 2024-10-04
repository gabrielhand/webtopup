import { Sequelize } from "sequelize";
import Layanan from "../models/LayananModel.js";
import User from "../models/UserModel.js";
import Voucher from "../models/VoucherModel.js";
import Kategori from "../models/KategoriModel.js";
import SubKategori from "../models/SubKategoriModel.js";
import path from "path";
import fs from "fs";

export const getLayanan = async (req, res) => {
  try {
    const response = await Layanan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPriceLayanan = async (req, res) => {
  try {
    let role = "Member";

    if (req.session.userId) {
      const user = await User.findOne({
        where: { id: req.session.userId },
        attributes: ["role"],
      });

      if (user) {
        role = user.role;
        console.log("Role user: ", user.role);
      }
    }

    let data;
    const layananId = req.body.nominal;

    if (role === "Member") {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_member"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else if (role === "Gold") {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_gold"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else if (role === "Platinum" || role === "Admin") {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_platinum"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_member"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    }

    const today = new Date().toISOString().split("T")[0];
    if (data.is_flash_sale === 1 && data.expired_flash_sale >= today) {
      data.harga = data.harga_flash_sale;
    }

    if (req.body.voucher) {
      const voucher = await Voucher.findOne({
        where: { kode: req.body.voucher },
      });

      if (voucher && voucher.stock > 0) {
        let potongan = data.harga * (voucher.promo / 100);
        if (potongan > voucher.max_potongan) {
          potongan = voucher.max_potongan;
        }
        data.harga = data.harga - potongan;
      }
    }

    res.status(200).json({
      harga: `${data.dataValues.harga}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLayananForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, id } = req.query;
    let whereCondition = {};

    if (id) {
      whereCondition.id = id;
    }

    const layanan = await Layanan.findAndCountAll({
      where: whereCondition,
      include: {
        model: Kategori,
        attributes: ["nama"],
      },
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(layanan.count / limit),
      currentPage: parseInt(page),
      layanan: layanan.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriForLayananAdmin = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      attributes: ["id", "nama"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubKategoriForLayananAdmin = async (req, res) => {
  try {
    const kategoriId = req.query.kategori_id;

    const subKat = await SubKategori.findAll({
      where: {
        category_id: kategoriId,
      },
      attributes: ["id", "name"],
    });

    subKat.push({
      id: 0,
      name: "Normal",
    });

    return res.status(200).json(subKat);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addLayananForAdmin = async (req, res) => {
  try {
    const {
      layanan,
      kategori,
      harga_member,
      harga_gold,
      harga_platinum,
      harga_flash_sale,
      profit_member,
      profit_gold,
      profit_platinum,
      modal,
      sub_kategori,
      provider_id,
      provider,
      flash_sale,
      judul_flash_sale,
      expired_flash_sale,
    } = req.body;

    let productLogoFileName = "";
    let bannerFsFileName = "";

    if (req.files?.product_logo || req.files?.banner_flash_sale) {
      const productLogoFile = req.files?.product_logo;
      const bannerFsFile = req.files?.banner_flash_sale;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (productLogoFile) {
        const productLogoFileSize = productLogoFile.data.length;
        const productLogoExt = path.extname(productLogoFile.name);
        productLogoFileName =
          productLogoFile.md5 + "-" + Date.now() + productLogoExt;

        if (
          !allowedType.includes(productLogoExt.toLocaleLowerCase()) ||
          productLogoFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File product logo tidak valid atau ukuran terlalu besar!",
          });
        }

        productLogoFile.mv(
          `./public/assets/product_logo/${productLogoFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      }
      if (bannerFsFile) {
        const bannerFsFileSize = bannerFsFile.data.length;
        const bannerFsExt = path.extname(bannerFsFile.name);
        bannerFsFileName = bannerFsFile.md5 + "-" + Date.now() + bannerFsExt;

        if (
          !allowedType.includes(bannerFsExt.toLocaleLowerCase()) ||
          bannerFsFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File banner flash sale tidak valid atau ukuran terlalu besar!",
          });
        }

        bannerFsFile.mv(
          `./public/assets/banner_flash_sale/${bannerFsFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      }
    }

    const productLogoUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/product_logo/${productLogoFileName}`;
    const bannerFsUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/banner_flash_sale/${bannerFsFileName}`;

    const formattedExpiredFlashSale = expired_flash_sale
      ? new Date(expired_flash_sale).toISOString().split("T")[0]
      : null;

    await Layanan.create({
      kategori_id: kategori,
      sub_category_id: sub_kategori,
      layanan: layanan,
      provider_id: provider_id,
      harga_member: harga_member,
      harga_gold: harga_gold,
      harga_platinum: harga_platinum,
      harga_flash_sale: harga_flash_sale,
      profit_member: profit_member,
      profit_gold: profit_gold,
      profit_platinum: profit_platinum,
      modal: modal,
      is_flash_sale: flash_sale,
      judul_flash_sale: judul_flash_sale,
      banner_flash_sale: bannerFsUrl,
      banner_flash_sale_filename: bannerFsFileName,
      expired_flash_sale: formattedExpiredFlashSale,
      catatan: "",
      status: "available",
      provider: provider,
      product_logo: productLogoUrl,
      product_logo_filename: productLogoFileName,
    });

    return res.status(200).json({
      msg: "Berhasil menambahkan layanan!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatusLayananForAdmin = async (req, res) => {
  try {
    const layananId = req.params.id;
    const status = req.body.status;

    const layanan = await Layanan.update(
      {
        status: status,
      },
      {
        where: {
          id: layananId,
        },
      }
    );

    if (layanan[0] === 0) {
      return res.status(404).json({ msg: "layanan tidak ditemukan!" });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil memperbarui status layanan!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLayananByIdForAdmin = async (req, res) => {
  try {
    const layananId = req.params.id;

    const layanan = await Layanan.findOne({
      where: {
        id: layananId,
      },
    });

    if (layanan[0] === 0) {
      return res.status(404).json({ msg: "Layanan tidak ditemukan!" });
    }

    return res.status(200).json(layanan);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateLayananByIdForAdmin = async (req, res) => {
  try {
    const {
      layanan,
      harga_member,
      harga_gold,
      harga_platinum,
      harga_flash_sale,
      profit_member,
      profit_gold,
      profit_platinum,
      modal,
      provider_id,
      provider,
      flash_sale,
      judul_flash_sale,
      expired_flash_sale,
    } = req.body;

    const layananId = req.params.id;

    const layananOne = await Layanan.findOne({
      where: {
        id: layananId,
      },
    });

    let productLogoFileName = "";
    let bannerFsFileName = "";

    if (req.files === null) {
      productLogoFileName = layananOne.product_logo_filename;
      bannerFsFileName = layananOne.banner_flash_sale_filename;
    } else {
      const productLogoFile = req.files?.product_logo;
      const bannerFsFile = req.files?.banner_flash_sale;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (productLogoFile) {
        const productLogoFileSize = productLogoFile.data.length;
        const productLogoExt = path.extname(productLogoFile.name);
        productLogoFileName =
          productLogoFile.md5 + "-" + Date.now() + productLogoExt;

        if (
          !allowedType.includes(productLogoExt.toLocaleLowerCase()) ||
          productLogoFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File product logo tidak valid atau ukuran terlalu besar!",
          });
        }

        if (layananOne.product_logo_filename) {
          const filepath = `./public/assets/product_logo/${layananOne.product_logo_filename}`;
          fs.unlinkSync(filepath);
        }

        productLogoFile.mv(
          `./public/assets/product_logo/${productLogoFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      }

      if (bannerFsFile) {
        const bannerFsFileSize = bannerFsFile.data.length;
        const bannerFsExt = path.extname(bannerFsFile.name);
        bannerFsFileName = bannerFsFile.md5 + "-" + Date.now() + bannerFsExt;

        if (
          !allowedType.includes(bannerFsExt.toLocaleLowerCase()) ||
          bannerFsFileSize > 5000000
        ) {
          return res.status(422).json({
            msg: "File banner flash sale tidak valid atau ukuran terlalu besar!",
          });
        }

        if (layananOne.banner_flash_sale_filename) {
          const filepath = `./public/assets/banner_flash_sale/${layananOne.banner_flash_sale_filename}`;
          fs.unlinkSync(filepath);
        }

        bannerFsFile.mv(
          `./public/assets/banner_flash_sale/${bannerFsFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      }
    }

    const productLogoUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/product_logo/${productLogoFileName}`;
    const bannerFsUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/banner_flash_sale/${bannerFsFileName}`;

    const formattedExpiredFlashSale = expired_flash_sale
      ? new Date(expired_flash_sale).toISOString().split("T")[0]
      : null;

    await Layanan.update(
      {
        layanan: layanan,
        provider_id: provider_id,
        harga_member: harga_member,
        harga_gold: harga_gold,
        harga_platinum: harga_platinum,
        harga_flash_sale: harga_flash_sale,
        profit_member: profit_member,
        profit_gold: profit_gold,
        profit_platinum: profit_platinum,
        modal: modal,
        is_flash_sale: flash_sale,
        judul_flash_sale: judul_flash_sale,
        banner_flash_sale: bannerFsUrl,
        banner_flash_sale_filename: bannerFsFileName,
        expired_flash_sale: formattedExpiredFlashSale,
        catatan: "",
        status: "available",
        provider: provider,
        product_logo: productLogoUrl,
        product_logo_filename: productLogoFileName,
      },
      {
        where: {
          id: layananId,
        },
      }
    );

    return res.status(200).json({
      msg: "Berhasil mengedit layanan!",
    });
  } catch (error) {
    return res.status(200).json(error.message);
  }
};

export const deleteLayananForAdmin = async (req, res) => {
  try {
    const layananId = req.params.id;

    const layanan = await Layanan.destroy({
      where: {
        id: layananId,
      },
    });

    if (layanan === 0) {
      return res.status(404).json({ message: "Layanan tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus Layanan!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
