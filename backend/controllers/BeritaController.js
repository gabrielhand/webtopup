import Berita from "../models/BeritaModel.js";

export const getSwiper = async(req, res) =>{
    try{
        const response = await Berita.findAll({
            where: {
                tipe: 'banner'
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}