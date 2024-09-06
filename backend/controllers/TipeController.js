import Tipe from "../models/TipeModel.js";

export const getTipe = async (req, res) => {
    try {
        const response = await Tipe.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}