const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  req.getConnection((e, connection) => {
    if(e) {
      console.log(e)
    } else {
      connection.query("select id_resultado, nombre_resultado from resultados", (e, result) => {
        if(e) {
          console.log(e)
        } else {
          res.render("admin/crearComponentes/actaprendizaje.hbs", {
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
      connection.query("insert into actividades_aprendizaje set ?", {
        codigo_actividad: req.body.codigo_actividad,
        nombre_actividad: req.body.nombre_actividad,
        id_resultado: req.body.id_resultado
      }, (e, result) => {
        if(e) {
          res.render("message.hbs", {
            message: "id o nombre repetidos",
            last: "/admin/crearcomponentes/actaprendizaje"
          })
        } else {
          res.render("message.hbs", {
            message: "actividad de aprendizaje guardada",
            last: "/admin/crearcomponentes/actaprendizaje"
          })
        }
      })
    }
  })
})

module.exports = router
