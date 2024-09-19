import Voucher from "../models/VoucherModel.js";

export const getVoucher = async (req, res) => {
  try {
    const response = await Voucher.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
