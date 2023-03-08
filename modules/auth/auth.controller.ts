const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require('../../models/user.model');

export const signin = async (req: any, res: any) => {

    const user = await userModel.find({ email: req.body.email });

    if (user.length < 1) {
        return res.status(401).json({
            status: false,
            message: "Auth failed: Email not found probably",
            data: null
        })
    } else {
        bcrypt.compare(req.body.password, user[0].password, (error: any, result: any) => {
            if (error) {
                return res.status(401).json({
                    status: false,
                    message: `Auth Failed - Error while compare password`,
                    data: null
                })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        _id: user[0]._id,
                        email: user[0].email,
                        username: user[0].username,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES,
                    }
                );

                req.session.token = token;

                return res.status(200).json({
                    status: true,
                    message: "Auth successful",
                    data: {
                        _id: user[0]._id,
                        username: user[0].username,
                        email: user[0].email,
                    },
                });
            } else {
                res.status(401).json({
                    status: false,
                    message: "Auth Failed - Password does'n match for this email",
                    data: null
                });
            }
        })
    }
};

export const signout = async (req:any, res:any) => {

    try {
      req.session = null;
      return res.status(200).send({
        status: true,
        message: "You've been signed out!",
        data: null
      });
    } catch (error:any) {
        console.log(error);
    }
    
}



