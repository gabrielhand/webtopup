import Layanan from "../models/LayananModel.js";

export const getLayanan = async(req, res) =>{
    try{
        const response = await Layanan.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}