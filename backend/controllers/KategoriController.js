import { QueryTypes, where } from "sequelize";
import db from "../config/database.js";
import { Layanan, Tipe, Kategori } from "../config/relations.js";
import SubKategori from "../models/SubKategoriModel.js";
import LayananModel from "../models/LayananModel.js";
import User from "../models/UserModel.js";
import crypto from "crypto";
import path from "path";
import fs from "fs";

export const getKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      where: {
        status: "active",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriPopuler = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      where: {
        status: "active",
        populer: true,
      },
      limit: 9,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriByTipe = async (req, res) => {
  try {
    const response = await db.query(
      `
            SELECT k.*, t.name as tipe_nama
            FROM kategoris k
            JOIN tipes t ON k.tipe_id = t.id
            WHERE k.status = 'active'
            ORDER BY k.tipe_id ASC
        `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriForServices = async (req, res) => {
  try {
    const tipe = await Tipe.findAll({
      include: {
        model: Kategori,
        where: { status: "active" },
        include: {
          model: Layanan,
        },
      },
      order: [["id", "ASC"]],
    });

    const allKategori = tipe.map((tipe) => {
      return {
        tipe_nama: tipe.name,
        kategori: tipe.kategoris.map((kategori) => ({
          ...kategori.dataValues,
          layanans: kategori.layanans,
        })),
      };
    });

    res.status(200).json(allKategori);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getKategoriByKode = async (req, res) => {
  try {
    const { kode } = req.params;

    const data = await Kategori.findOne({
      where: { kode: kode },
      attributes: [
        "nama",
        "brand",
        "sub_nama",
        "server_id",
        "thumbnail",
        "id",
        "kode",
        "tipe_id",
        "deskripsi",
        "petunjuk",
        "bannerlayanan",
        "ket_layanan",
        "ket_id",
        "placeholder_1",
        "placeholder_2",
      ],
      include: [
        {
          model: Tipe,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Maaf, kategori tidak ditemukan!" });
    }

    let subkategori = await SubKategori.findAll({
      where: { category_id: data.id },
      attributes: ["sub_logo", "id", "category_id", "code", "name", "active"],
    });

    const normalSubCategory = {
      id: 0,
      category_id: data.id,
      code: "normal",
      name: "Topup",
      active: 1,
    };
    subkategori = [...subkategori, normalSubCategory];

    const user = await User.findOne({
      where: { id: req.session.userId },
      attributes: ["role"],
    });

    let role = user ? user.role : "Member";
    let priceColumn;

    switch (role) {
      case "Gold":
        priceColumn = "harga_gold";
        break;
      case "Platinum":
      case "Admin":
        priceColumn = "harga_platinum";
        break;
      default:
        priceColumn = "harga_member";
    }

    const layanan = await LayananModel.findAll({
      where: {
        kategori_id: data.id,
        status: "available",
      },
      attributes: [
        "id",
        "sub_category_id",
        "layanan",
        "product_logo",
        [priceColumn, "harga"],
        "is_flash_sale",
        "expired_flash_sale",
        "harga_flash_sale",
      ],
      order: [["harga", "ASC"]],
    });

    res.status(200).json({ data, subkategori, layanan });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getKategoriForKategoriAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, nama } = req.query;
    let whereCondition = {};

    if (nama) {
      whereCondition.nama = nama;
    }

    const kategori = await Kategori.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      include: {
        model: Tipe,
        attributes: ["name"],
      },
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(kategori.count / limit),
      currentPage: parseInt(page),
      kategori: kategori.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addKategoriForKategoriAdmin = async (req, res) => {
  try {
    const {
      nama,
      sub_nama,
      brand,
      kode,
      ket_layanan,
      ket_id,
      placeholder_1,
      placeholder_2,
      server_option,
      tipe_id,
      rate_member,
      rate_gold,
      rate_platinum,
      populer,
      deskripsi,
    } = req.body;

    const thumbnailFile = req.files?.thumbnail;
    const bannerLayananFile = req.files?.bannerlayanan;
    const petunjukFile = req.files?.petunjuk;

    if (!thumbnailFile || !bannerLayananFile || !petunjukFile) {
      return res.status(422).json({
        msg: "File thumbnail, banner, atau petunjuk tidak ditemukan!",
      });
    }

    const thumbnailFileSize = thumbnailFile.data.length;
    const bannerLayananFileSize = bannerLayananFile.data.length;
    const petunjukFileSize = petunjukFile.data.length;

    const thumbnailExt = path.extname(thumbnailFile.name);
    const thumbnailFileName =
      thumbnailFile.md5 + "-" + Date.now() + thumbnailExt;
    const bannerLayananExt = path.extname(bannerLayananFile.name);
    const bannerLayananFileName =
      bannerLayananFile.md5 + "-" + Date.now() + bannerLayananExt;
    const petunjukExt = path.extname(petunjukFile.name);
    const petunjukFileName = petunjukFile.md5 + "-" + Date.now() + petunjukExt;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (
      !allowedType.includes(thumbnailExt.toLocaleLowerCase()) ||
      !allowedType.includes(bannerLayananExt.toLocaleLowerCase()) ||
      !allowedType.includes(petunjukExt.toLocaleLowerCase())
    )
      return res.status(422).json({
        msg: "Maaf, jenis file ini tidak diizinkan!",
      });
    if (
      thumbnailFileSize > 5000000 ||
      bannerLayananFileSize > 5000000 ||
      petunjukFileSize > 5000000
    )
      return res.status(422).json({
        msg: "Maaf, ukuran image harus dibawah 5 MB!",
      });

    thumbnailFile.mv(
      `./public/assets/thumbnail/${thumbnailFileName}`,
      (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      }
    );
    bannerLayananFile.mv(
      `./public/assets/bannerlayanan/${bannerLayananFileName}`,
      (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      }
    );
    petunjukFile.mv(`./public/assets/petunjuk/${petunjukFileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    const thumbnailUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/thumbnail/${thumbnailFileName}`;
    const bannerLayananUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/bannerlayanan/${bannerLayananFileName}`;
    const petunjukUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/petunjuk/${petunjukFileName}`;

    await Kategori.create({
      nama: nama,
      sub_nama: sub_nama,
      brand: brand,
      kode: kode,
      server_id: server_option,
      rate_member: rate_member,
      rate_gold: rate_gold,
      rate_platinum: rate_platinum,
      thumbnail: thumbnailUrl,
      thumbnail_filename: thumbnailFileName,
      tipe_id: tipe_id,
      populer: populer,
      deskripsi: deskripsi,
      petunjuk: petunjukUrl,
      petunjuk_filename: petunjukFileName,
      ket_layanan: ket_layanan,
      ket_id: ket_id,
      placeholder_1: placeholder_1,
      placeholder_2: placeholder_2,
      bannerlayanan: bannerLayananUrl,
      bannerlayanan_filename: bannerLayananFileName,
    });

    return res.status(200).json({
      msg: "Berhasil menambahkan kategori!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatusKategoriForAdmin = async (req, res) => {
  try {
    const kategoriId = req.params.id;
    const status = req.body.status;

    const kategori = await Kategori.update(
      {
        status: status,
      },
      {
        where: {
          id: kategoriId,
        },
      }
    );

    if (kategori[0] === 0) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan!" });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil memperbarui status kategori!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getKategoriByIdForAdmin = async (req, res) => {
  try {
    const kategoriId = req.params.id;

    const kategori = await Kategori.findOne({
      include: {
        model: Tipe,
        attributes: ["id", "name"],
      },
      where: {
        id: kategoriId,
      },
    });

    if (kategori[0] === 0) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan!" });
    }

    return res.status(200).json(kategori);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateKategoriForAdmin = async (req, res) => {
  try {
    const {
      nama,
      sub_nama,
      brand,
      kode,
      ket_layanan,
      ket_id,
      placeholder_1,
      placeholder_2,
      server_option,
      tipe_id,
      rate_member,
      rate_gold,
      rate_platinum,
      populer,
      deskripsi,
    } = req.body;

    const kategoriId = req.params.id;

    const kategori = await Kategori.findOne({
      where: {
        id: kategoriId,
      },
    });

    let thumbnailFileName = "";
    let bannerLayananFileName = "";
    let petunjukFileName = "";
    if (req.files === null) {
      thumbnailFileName = kategori.thumbnail_filename;
      bannerLayananFileName = kategori.bannerlayanan_filename;
      petunjukFileName = kategori.petunjuk_filename;
    } else {
      const thumbnailFile = req.files.thumbnail ? req.files.thumbnail : null;
      const bannerLayananFile = req.files.bannerlayanan ? req.files.bannerlayanan : null;
      const petunjukFile = req.files.petunjuk ? req.files.petunjuk : null;

      const allowedType = [".png", ".jpg", ".jpeg"];
    
      if (thumbnailFile) {
        const thumbnailFileSize = thumbnailFile.data.length;
        const thumbnailExt = path.extname(thumbnailFile.name);
        thumbnailFileName = thumbnailFile.md5 + "-" + Date.now() + thumbnailExt;
        
        if (!allowedType.includes(thumbnailExt.toLocaleLowerCase()) || thumbnailFileSize > 5000000) {
          return res.status(422).json({
            msg: "File thumbnail tidak valid atau ukuran terlalu besar!",
          });
        }
    
        thumbnailFile.mv(
          `./public/assets/thumbnail/${thumbnailFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      } else {
        thumbnailFileName = kategori.thumbnail_filename;
      }
    
      if (bannerLayananFile) {
        const bannerLayananFileSize = bannerLayananFile.data.length;
        const bannerLayananExt = path.extname(bannerLayananFile.name);
        bannerLayananFileName = bannerLayananFile.md5 + "-" + Date.now() + bannerLayananExt;
    
        if (!allowedType.includes(bannerLayananExt.toLocaleLowerCase()) || bannerLayananFileSize > 5000000) {
          return res.status(422).json({
            msg: "File banner layanan tidak valid atau ukuran terlalu besar!",
          });
        }
    
        bannerLayananFile.mv(
          `./public/assets/bannerlayanan/${bannerLayananFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      } else {
        bannerLayananFileName = kategori.bannerlayanan_filename;
      }
    
      if (petunjukFile) {
        const petunjukFileSize = petunjukFile.data.length;
        const petunjukExt = path.extname(petunjukFile.name);
        petunjukFileName = petunjukFile.md5 + "-" + Date.now() + petunjukExt;
    
        if (!allowedType.includes(petunjukExt.toLocaleLowerCase()) || petunjukFileSize > 5000000) {
          return res.status(422).json({
            msg: "File petunjuk tidak valid atau ukuran terlalu besar!",
          });
        }
    
        petunjukFile.mv(
          `./public/assets/petunjuk/${petunjukFileName}`,
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
          }
        );
      } else {
        petunjukFileName = kategori.petunjuk_filename;
      }
    }
    

    const thumbnailUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/thumbnail/${thumbnailFileName}`;
    const bannerLayananUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/bannerlayanan/${bannerLayananFileName}`;
    const petunjukUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/petunjuk/${petunjukFileName}`;

    await Kategori.update(
      {
        nama: nama,
        sub_nama: sub_nama,
        brand: brand,
        kode: kode,
        server_id: server_option,
        rate_member: rate_member,
        rate_gold: rate_gold,
        rate_platinum: rate_platinum,
        thumbnail: thumbnailUrl,
        thumbnail_filename: thumbnailFileName,
        tipe_id: tipe_id,
        populer: populer,
        deskripsi: deskripsi,
        petunjuk: petunjukUrl,
        petunjuk_filename: petunjukFileName,
        ket_layanan: ket_layanan,
        ket_id: ket_id,
        placeholder_1: placeholder_1,
        placeholder_2: placeholder_2,
        bannerlayanan: bannerLayananUrl,
        bannerlayanan_filename: bannerLayananFileName,
      },
      {
        where: {
          id: kategoriId,
        },
      }
    );

    return res.status(200).json({
      msg: "Berhasil mengedit kategori!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteKategoriForKategoriAdmin = async (req, res) => {
  try {
    const kategoriId = req.params.id;

    const kategori = await Kategori.findOne({
      where: {
        id: kategoriId,
      },
    });

    if (kategori.thumbnail_filename) {
      const thumbnailFilepath = `./public/assets/thumbnail/${kategori.thumbnail_filename}`;
      fs.unlinkSync(thumbnailFilepath);
    }
    if (kategori.bannerlayanan_filename) {
      const bannerLayananFilepath = `./public/assets/bannerlayanan/${kategori.bannerlayanan_filename}`;
      fs.unlinkSync(bannerLayananFilepath);
    }
    if (kategori.petunjuk_filename) {
      const petunjukFilepath = `./public/assets/petunjuk/${kategori.petunjuk_filename}`;
      fs.unlinkSync(petunjukFilepath);
    }

    await Kategori.destroy({
      where: {
        id: kategoriId,
      },
    });

    return res.status(200).json({
      msg: "Berhasil menghapus kategori!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
