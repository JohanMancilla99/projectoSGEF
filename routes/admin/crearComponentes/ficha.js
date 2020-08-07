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

  req.getConnection((e, conexion) => {
    conexion.query("select id_programa, nom a from programas", (e, result) => {
      res.render("admin/crearComponentes/ficha.hbs", {
        programa: result
      });
    })
  })
});













router.post("/", (req, res) => {

  const nuevaFicha = {
    codigo_ficha: req.body.codigo_ficha,
    cantidad_aprendices: req.body.cantidad_aprendices,
    id_programa: req.body.id_programa,
    programacion_ficha: crearProgramacion()
  }

  req.getConnection((e, conexion) => {

    conexion.query("insert into fichas set ?", nuevaFicha, (e, result) => {
      if(e) {
        res.render("message.hbs", {
          message: "El codigo de ficha ya esta registrado",
          last: "/admin/crearcomponentes/ficha"
        })
      } else {
        res.render("message.hbs", {
          message: "Ficha Guardada",
          last: "/admin/crearcomponentes/ficha"
        })
      }
    })

  })

})

module.exports = router
