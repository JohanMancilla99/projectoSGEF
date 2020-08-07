const express = require("express");
const router = express.Router();

const crearProgramacion = () => {
  let programacion = ""
  for (var i = 0; i < 96; i++) {
    programacion += "0"
  }
  return programacion
}

router.get("/", (req, res) => {
  res.render("admin/crearcomponentes/ambiente")
})

router.post("/", (req, res) => {

  req.getConnection((e, connection) => {
    if(e) {console.log(e)}
    else {
      connection.query("insert into ambientes set ?", {
        nombre_ambiente: req.body.nombre_ambiente,
        torre: req.body.torre,
        piso: req.body.piso,
        capacidad: req.body.capacidad,
        tipo_ambiente: req.body.tipo_ambiente,
        programacion_ambiente: crearProgramacion()
      }, (e, result) => {
        if(e) {
          res.render("message.hbs", {
            message: "se produjo un error",
          })
        } else {
          res.render("message.hbs", {
            message: "ambiente guardado",
            last: "/admin/crearcomponentes/ambiente"
          })
        }
      })
    }
  })
})

module.exports = router
