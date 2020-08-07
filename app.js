const express = require("express")
const app = express()
const hbs = require("express-handlebars")
const morgan = require("morgan")
const mysql = require("mysql")
const connection = require("express-myconnection")

// Body parser de express
app.use(express.urlencoded({ extended: false }))

// configuracion de la carpeta global
app.use(express.static("./public"))

// configurar handlebars
app.engine("hbs", hbs({
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials",
    extname: ".hbs"
}))
app.set("view engine", "hbs")

//Mensajes en consola
app.use(morgan('dev'))

//Conexion con MySQL
app.use(connection(mysql,{
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sgef'
},'single'))

//Rutas
app.use("/", require("./routes/index.js"))
//Rutas Admin
app.use("/admin", require("./routes/admin/admin.js"))
app.use("/admin/crearcomponentes", require("./routes/admin/crearcomponentes.js"))

app.use("/admin/crearcomponentes/programa", require("./routes/admin/crearComponentes/programa.js"))

app.use("/admin/crearcomponentes/ficha", require("./routes/admin/crearComponentes/ficha.js"))
app.use("/admin/crearcomponentes/competencia", require("./routes/admin/crearComponentes/competencia.js"))
app.use("/admin/crearcomponentes/resultado", require("./routes/admin/crearComponentes/resultado.js"))
app.use("/admin/crearcomponentes/ambiente", require("./routes/admin/crearComponentes/ambiente.js"))
app.use("/admin/crearcomponentes/instructor", require("./routes/admin/crearComponentes/instructor.js"))
app.use("/admin/crearcomponentes/actaprendizaje", require("./routes/admin/crearComponentes/actaprendizaje.js"))
app.use("/admin/crearcomponentes/actproyecto", require("./routes/admin/crearComponentes/actproyecto.js"))
app.use("/admin/crearcomponentes/proyecto", require("./routes/admin/crearComponentes/proyecto.js"))

/*
excel
guia
diapositivas
*/

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto... ${port}`)
})
