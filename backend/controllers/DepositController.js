import Deposit from "../models/DepositModel.js";

export const getMemberDepositAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, username } = req.query;
    let whereCondition = {};

    if (username) {
      whereCondition.username = username;
    }

    const memberDeposit = await Deposit.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    return res.status(200).json({
      totalPages: Math.ceil(memberDeposit.count / limit),
      currentPage: parseInt(page),
      memberDeposit: memberDeposit.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
