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
          res.render("admin/crearComponentes/proyecto.hbs", {
            resultados: result
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
      connection.query("insert into proyectos set ?", {
        codigo_proyecto: req.body.codigo_proyecto,
        nombre_proyecto: req.body.nombre_proyecto,
        id_programa: req.body.id_programa
      }, (e, result) => {
        if(e) {
          res.render("message.hbs", {
            message: "id o nombre repetidos",
            last: "/admin/crearcomponentes/proyecto"
          })
        } else {
          res.render("message.hbs", {
            message: "proyecto guardado",
            last: "/admin/crearcomponentes/proyecto"
          })
        }
      })
    }
  })
})

module.exports = router
