import Voucher from "../models/VoucherModel.js";

export const getVoucher = async (req, res) => {
  try {
    const response = await Voucher.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getVoucherForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, kode } = req.query;
    let whereCondition = {};

    if (kode) {
      whereCondition.kode = kode;
    }

    const voucher = await Voucher.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(voucher.count / limit),
      currentPage: parseInt(page),
      voucher: voucher.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addVoucherForAdmin = async (req, res) => {
  try {
    const { kode, promo, stock, max_potongan } = req.body;

    await Voucher.create({
      kode: kode,
      promo: promo,
      stock: stock,
      max_potongan: max_potongan,
    });

    return res.status(200).json({
      msg: "Berhasil menambahkan voucher!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getVoucherByIdForAdmin = async (req, res) => {
  try {
    const voucher = await Voucher.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!voucher)
      return res.status(404).json({
        msg: "Maaf, voucher tidak ditemukan!",
      });

    return res.status(200).json(voucher);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateVoucherForAdmin = async (req, res) => {
  try {
    const { kode, promo, stock, max_potongan } = req.body;
    const voucherId = req.params.id;

    const voucher = await Voucher.findOne({
      where: {
        id: voucherId,
      },
    });

    if (!voucher) {
      return res.status(404).json({
        msg: "Maaf, voucher tidak ditemukan!",
      });
    }

    await Voucher.update(
      {
        kode: kode,
        promo: promo,
        stock: stock,
        max_potongan: max_potongan,
      },
      {
        where: {
          id: voucherId,
        },
      }
    );

    return res.status(200).json({
      msg: "Berhasil mengedit voucher!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteVocuherForAdmin = async (req, res) => {
  try {
    const voucherId = req.params.id;

    const voucher = await Voucher.destroy({
      where: {
        id: voucherId,
      },
    });

    if (voucher === 0) {
      return res.status(404).json({ message: "Voucher tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus voucher!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
