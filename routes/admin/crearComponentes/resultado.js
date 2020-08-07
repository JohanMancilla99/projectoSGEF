const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {

    req.getConnection((e, connection) => {
      if(e) {
        console.log(e)
      } else {
        connection.query("select id_competencia, nombre_competencia from competencias", (e, result) => {
          if(e) {
            console.log(e)
          } else {
            res.render("admin/crearComponentes/resultado.hbs", {
              competencias: result
            })
          }
        })
      }
    })
})

router.post("/", (req, res) => {

  let save = true

  try {
    req.body.trimestres.toString()
  } catch (e) {
    save = false
  }
  if(save) {
    req.getConnection((e, connection) => {
      if(e) throw e
      connection.query("insert into resultados set ?", {
        id_resultado: req.body.id_resultado,
        nombre_resultado: req.body.nombre_resultado,
        horas_resultado: req.body.horas_resultado,
        trimestres: req.body.trimestres.toString(),
        id_competencia: req.body.id_competencia
      }, (e, result) => {
        if(e) {
          console.log(e)
          res.render("message", {
            message: "id o nombre de resultado repetidos"
          })
        } else {
          res.render("message", {
            message: "resultado guardado"
          })
        }
      })
    })
  } else {
    res.render("message", {
      message: "debe seleccionar al menos un trimestre"
    })
  }

})

module.exports = router;
