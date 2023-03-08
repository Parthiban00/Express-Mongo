import express from "express";
var router = express.Router();

// welcome route
router.get("/", (req: any, res: any) => {
  res.json({ message: "Welcome to node-express application." });
});

// auth route
router.use("/auth", require("../modules/auth/auth.route"));
// user route
router.use("/user", require("../modules/user/user.route"));

module.exports = router;
