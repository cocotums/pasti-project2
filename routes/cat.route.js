const router = require("express").Router();
const Cat = require("../models/cat.model");
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


router.get("/new", (req, res) => {
    res.render("cats/new");
});
// .../users/users
router.post("/new", upload.single("imgUrl"), (req, res) => {
    console.log(req.body);
    const file = req.file

    let catData = {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
    }


    let cat = new Cat(catData);
    console.log(cat);
    cat.imgUrl = "/uploads/" + file.filename
    cat
        .save()
        .then(() => {
            res.redirect("/cat");
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

router.post("/see/:id", (req, res) => {
    Cat.findByIdAndUpdate(req.params.id, { lastSeen: Date.now() })
        .then(() => {
            res.redirect(`/cat/show/${req.params.id}`)
        })
        .catch((err) => {
            console.log(err);
        });

})
router.post("/feed/:id", (req, res) => {
    Cat.findByIdAndUpdate(req.params.id, { lastSeen: Date.now(), lastFed: Date.now() })
        .then(() => {
            res.redirect(`/cat/show/${req.params.id}`)
        })
        .catch((err) => {
            console.log(err);
        });
})
router.get("/", async(req, res) => {
    try {
        let cats = await Cat.find();

        res.render("cats/index", { cats });
    } catch (error) {
        console.log(cats);
    }
});

module.exports = router