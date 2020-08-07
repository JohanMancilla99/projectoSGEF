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

  req.getConnection((e, connection) => {
    if(e) {
      console.log(e)
    } else {
      connection.query("select id_programa, nombre_programa from programas", (e, result) => {
        if(e) {
          console.log(e)
        } else {
          res.render("admin/crearComponentes/instructor.hbs", {
            programas: result
          })
        }
      })
    }
  })
});

router.post("/", (req, res) => {

  let horasProgramadas = 40 //no se cuantas son
  if(req.body.tipo_contrato == 1) {
    horasProgramadas = 30
  }

  let save = true

  try {
    req.body.programas.toString()
  } catch(e) {
    save = false
  }

  if(save) {
    req.getConnection((e, connection) => {
      if(e) {
        console.log(e)
      } else {
        connection.query("insert into instructores set ?", {
          id_instructor: req.body.id_instructor,
          nombre_instructor: req.body.nombre_instructor,
          programas: req.body.programas.toString(),
          tipo_contrato: req.body.tipo_contrato,
          horas_programadas: horasProgramadas,
          programacion_instructor: crearProgramacion()
        }, (e, result) => {
          if(e) {
            res.render("message.hbs", {
              message: "id de instructor ya registrado",
              last: "/admin/crearcomponentes/instructor"
            })
          } else {
            res.render("message.hbs", {
              message: "instructor guardado",
              last: "/admin/crearcomponentes/instructor"
            })
          }
        })
      }
    })
  } else {
    res.render("message.hbs", {
      message: "debe seleccionar al menos un programa",
      last: "/admin/crearcomponentes/instructor"
    })
  }
})

module.exports = router
