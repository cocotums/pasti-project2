const router = require("express").Router();
const Cat = require("../models/cat.model");

router.get("/new", (req, res) => {
    res.render("cats/new");
});
// .../users/users
router.post("/new", (req, res) => {
    console.log(req.body);

    let catData = {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
    }


    let cat = new Cat(catData);
    console.log(cat);
    cat
        .save()
        .then(() => {
            res.send("iz workz");
        })
        .catch((err) => {
            console.log(err);
        });
});

/* show single cat */
router.get("/show/:id", (req, res) => {
    console.log(req.params.id);

    Cat.findById(req.params.id)
        .then((cat) => {
            console.log(cat);

            res.render("cats/show", { cat });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/", async(req, res) => {
    try {
        let cats = await Cat.find();

        res.render("cats/index", { cats });
    } catch (error) {
        console.log(cats);
    }
});

module.exports = router