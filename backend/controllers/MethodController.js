import Method from "../models/MethodModel.js";

export const getMethod = async (req, res) => {
    try {
        const response = await Method.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}