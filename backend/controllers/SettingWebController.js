import SettingWeb from "../models/SettingWebModel.js";

export const getSettingWeb = async(req, res) =>{
    try{
        const response = await SettingWeb.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);

    }
}