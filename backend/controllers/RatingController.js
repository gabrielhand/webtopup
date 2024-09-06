import Rating from "../models/RatingModel.js";
import User from "../models/UserModel.js";
import db from "../config/database.js";

export const getRating = async (req, res) => {
  try {
    const response = await Rating.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRatingByKategori = async (req, res) => {
  try {
    const { kode } = req.params;

    const ratings = await db.query(
      `
        SELECT 
          ratings.*, 
          users.image, 
          users.username 
        FROM 
          ratings 
        LEFT JOIN 
          users 
        ON 
          ratings.nama = users.username
        WHERE 
          ratings.kategori_kode = :kode
        ORDER BY 
          ratings.created_at ASC
        `,
      {
        replacements: { kode },
        type: db.QueryTypes.SELECT,
      }
    );

    const totalReviews = await Rating.count({
      where: { kategori_kode: kode },
    });

    const totalBintang = await Rating.sum("bintang", {
      where: { kategori_kode: kode },
    });

    const totalBintangLima = await Rating.count({
      where: { kategori_kode: kode, bintang: 5 },
    });

    const totalBintangEmpat = await Rating.count({
      where: { kategori_kode: kode, bintang: 4 },
    });

    const totalBintangTiga = await Rating.count({
      where: { kategori_kode: kode, bintang: 3 },
    });

    const totalBintangDua = await Rating.count({
      where: { kategori_kode: kode, bintang: 2 },
    });

    const totalBintangSatu = await Rating.count({
      where: { kategori_kode: kode, bintang: 1 },
    });

    const mostlyStarData = await Rating.findAll({
      where: { kategori_kode: kode },
      attributes: [
        "bintang",
        [db.fn("COUNT", db.col("bintang")), "count"],
      ],
      group: ["bintang"],
      order: [[db.literal("count"), "DESC"]],
      limit: 1,
    });

    const mostlyStar = mostlyStarData.length ? mostlyStarData[0].bintang : null;

    res
      .status(200)
      .json({
        ratings,
        totalReviews,
        totalBintang,
        totalBintangLima,
        totalBintangEmpat,
        totalBintangTiga,
        totalBintangDua,
        totalBintangSatu,
        mostlyStar,
      });
  } catch (error) {
    console.log(error.message);
  }
};
