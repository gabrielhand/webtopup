import Pembelian from "../models/PembelianModel.js";
import db from "../config/database.js";

export const getPembelian = async (req, res) => {
  try {
    const response = await Pembelian.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPembelianForCekTransaksi = async (req, res) => {
  try {
    const [results, metadata] = await db.query(
      `
            SELECT 
            data_joki.status_joki AS status_joki, 
            pembelians.*, 
            pembayarans.status AS status_pembayaran, 
            pembayarans.metode
        FROM pembelians
        JOIN pembayarans ON pembelians.order_id = pembayarans.order_id
        LEFT JOIN data_joki ON pembelians.order_id = data_joki.order_id
        ORDER BY pembayarans.id DESC
        LIMIT 10
        `
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
