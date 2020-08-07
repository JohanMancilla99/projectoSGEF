const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("admin/crearcomponentes.hbs")
});


module.exports = router
