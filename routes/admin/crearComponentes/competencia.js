const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {

  req.getConnection((e, conexion) => {
    conexion.query("insert into competencias set ?",{
      id_competencia: req.body.id_competencia,
      nombre_competencia: req.body.nombre_competencia,
      tipo_ambiente: req.body.tipo_ambiente
    }, (e, result) => {
      if(!e) {
        res.render("message.hbs", {
          message: "competencia guardada",
          last: "/admin/crearcomponentes/competencia"
        })
      } else {
        console.log(e)
        res.render("message.hbs", {
          message: "id o nombre de competencia repetidos",
          last: "/admin/crearcomponentes/competencia"
        })
      }
    })
  })
});

router.get("/", (req, res) => {
  res.render("admin/crearComponentes/competencia.hbs")
})


module.exports = router;
