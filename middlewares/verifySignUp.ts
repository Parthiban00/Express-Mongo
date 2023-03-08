const userModel = require('../models/user.model');

export const checkDuplicate = async (req: any, res: any, next: any) => {

    try {
        // Username
        let user = await userModel.find({ username: req.body.username });

        if (user.length) {
            return res.status(400).send({
                status: false,
                message: "Failed! Username is already in exist!",
                data: user
            });
        }

        // Email
        user = await userModel.find({ email: req.body.email });

        if (user.length) {
            return res.status(400).send({
                status: false,
                message: "Failed! Email is already in exist!",
                data: user
            });
        }

        next();
    } catch (error: any) {
        return res.status(500).send({
            status: false,
            message: error.message,
            data: null
        });
    }
    
}