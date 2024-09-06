import SubKategori from "../models/SubKategoriModel.js";

export const getSubKategori = async (req, res) => {
    try {
        const response = await SubKategori.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}