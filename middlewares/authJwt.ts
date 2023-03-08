
const jwt = require("jsonwebtoken");

export const verifyToken = (req: any, res: any, next: any) => {
    let token = req.session.token;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error:any, decoded:any) => {
        if (error) {
            return res.status(401).send({
                status: false,
                message: "Unauthorized!",
                data: null,
            });
        }
        req._id = decoded._id;
        next();
    });
};
