const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("../library/passportConfig");
const saltRounds = 10;
const multer = require("multer")
const path = require('path')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function(req, file, cb) {
        //file with unique names
        let fileExtension = path.extname(file.originalname).split(".")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
    }
});
var upload = multer({ storage: storage });

router.get("/register", (req, res) => {
    res.render("users/new");
});

router.post("/register", async(req, res) => {
    try {
        let { name, email, username, password } = req.body;

        //hash password dont save password in plain text
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        let user = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        let savedUser = await user.save();

        if (savedUser) {
            res.redirect("/auth/login");
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: "Invalid Username/Password, Please enter correct details",
    })
);



router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Oh no!!! dont leave me!!!");
    res.redirect("/auth/login");
});


module.exports = router;