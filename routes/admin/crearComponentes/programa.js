const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("admin/crearComponentes/programa.hbs")
});






router.post("/", (req, res) => {

  let duracionPrograma = 6
  if(req.body.tipo_programa == "tecnico") {
    duracion_programa = 3
  }

  const nuevoPrograma = {
    id_programa: req.body.id_programa,
    nombre_programa: req.body.nombre_programa,
    tipo_programa: req.body.tipo_programa,
    duracion_programa: duracionPrograma,
    descripcion_programa: req.body.descripcion_programa
  }

    req.getConnection((e, conexion) => {

      conexion.query("insert into programas set ?", nuevoPrograma, (e, result) => {
          if(e) {
            res.render("message.hbs", {
              message: "ID de programa o nombre ya registrado ",
              last: "/admin/crearcomponentes/programa"
            })
          } else {
            res.render("message.hbs", {
              message: "Programa Guardado",
              last: "/admin/crearcomponentes/programa"
            })
            //programa guardado
          }
      })

    })
})


module.exports = router;
