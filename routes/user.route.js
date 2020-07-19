const router = require("express").Router();
const User = require("../models/user.model");
router.get("/", async(req, res) => {
    try {
        let users = await User.find();

        res.render("users/index", { users });
    } catch (error) {
        console.log(users);
    }
});






module.exports = router;