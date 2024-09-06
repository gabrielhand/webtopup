import User from "../models/UserModel.js";

export const getUsers = async(req, res) =>{
    try{
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}