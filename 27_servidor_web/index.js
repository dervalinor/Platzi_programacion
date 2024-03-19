//iniciar nodejs con npm init
//ejecutar este comando con node index.js

//ejemplo ejecutar este codigo
//console.log("Hi friend")
//
//iniciar servidor web: 
//1. npm install express
//2. importar libreria de expressjs 
const express = require("express")

//crear app
const app = express()

//hacer que la app responda a peticiones
app.get("/", (req, res) =>{
    res.send("Hola, amigo")
} 
)

//Hacer que escuche las peticiones de los usuarios esto se hace por medio de un puerto
app.listen(8080, () => { //numero de puerto 8080 y la ejecucion de un funcion
    console.log("Bienvenido al servidor")
})

//ejecutar servidor con "node index.js"
//servidor local en el navegador escribir: http://localhost:8080/
