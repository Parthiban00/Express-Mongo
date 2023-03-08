const bcrypt = require("bcrypt");
const userModel = require('../../models/user.model');

export const saveUser = async (req: any, res: any) => {

    try {
        bcrypt.hash(req.body.password, 10, async (error: any, hash: any) => {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: `Error while creating hash for password`,
                    error: error,
                });
            } else {
                const data = new userModel({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email
                })
                const dataToSave = await data.save();
                res.status(201).json({
                    status: true,
                    message: 'Data saved successfully...',
                    data: dataToSave
                })
            }
        })
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }

};

export const getAllUsers = async (req: any, res: any) => {

    try {
        const data = await userModel.find();
        res.status(200).json(data)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }

};

export const getOneUserById = async (req: any, res: any) => {

    try {
        const data = await userModel.findById(req.params.id);
        res.status(200).json({
            status: true,
            message: `Data's got`,
            data: data
        })
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }

};

export const updateOneUserById = async (req: any, res: any) => {

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await userModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).json({
            status: true,
            message: 'Data updated successfully...',
            data: result
        })
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }

}

export const deleteOneUserById = async (req: any, res: any) => {

    try {
        const id = req.params.id;
        const data = await userModel.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: `Document with ${data.username} has been deleted..`,
            data: data
        })
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }

}
