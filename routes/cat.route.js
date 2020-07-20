const router = require("express").Router();
const Cat = require("../models/cat.model");


router.get("/", async(req, res, next) => {
    try {
        let cats = await Cat.find();

        return res.status(200).json({
            success: true,
            count: cats.length,
            data: cats
        })
    } catch (error) {
        console.log(users);
    }
});

module.exports = router