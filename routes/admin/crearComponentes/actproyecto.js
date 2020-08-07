const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  req.getConnection((e, connection) => {
    if(e) {
      console.log(e)
    } else {
      connection.query("select id_programa, nombre_programa from programas", (e, result) => {
        if(e) {
          console.log(e)
        } else {
          res.render("admin/crearComponentes/actproyecto.hbs", {
            programas: result
          })
        }
      })
    }
  })
})

router.post("/", (req, res) => {
  req.getConnection((e, connection) => {
    if(e) {
      console.log(e)
    } else {
      connection.query("insert into actividades_proyecto set ?", {
        nombre_actividad: req.body.nombre_actividad,
        fase_actividad: req.body.fase_actividad,
        id_programa: req.body.id_programa
      }, (e, result) => {
        if(e) {
          res.render("message.hbs", {
            message: "nombre repetidos",
            last: "/admin/crearcomponentes/actproyecto"
          })
        } else {
          res.render("message.hbs", {
            message: "actividad de aprendizaje guardada",
            last: "/admin/crearcomponentes/actproyecto"
          })
        }
      })
    }
  })
})

module.exports = router
