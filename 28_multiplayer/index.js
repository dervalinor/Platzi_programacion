/*
Como comunicar el frontend y el backend cuando nuestros 
usuarios accedan a nuestro juego
Que se conecten a un lista de jugadores donde esten
todos conectados, he indicarle a cada jugador su 
identificador unico
*/

const express = require("express")

const app = express()

//lista de jugadores en para el multijugador
const lista_jugadores = []

//crear un clase para cada jugador
class Jugador {
   constructor(id){
    this.id = id
   } 
}

app.get("/unirse", (req, res) =>{//cambiar url por un seccion para indicar al servidor que esto
    //indica que los jugadores se estan uniendo
    const id = `${Math.random()}` //por simplicidad vamos a generar un id por medio de un numero aleatorio

    //ahora creamos al jugador
    const jugador = new Jugador(id)

    //agregar a la lista de jugadores
    lista_jugadores.push(jugador)

    //permitir ejecutar el html Mokepon.html o sea 
    //desde que origen se pueden hacer peticiones
    res.setHeader("Access-Control-Allow-Origin", "*") //indica cualquier origen es 
    //valido
    res.send(id) //responder con el id del jugador
} 
)

//ahora ir al url de nuestros servidor local: http://localhost:8080/unirse
app.listen(8080, () => { 
    console.log("Bienvenido al servidor")
})

