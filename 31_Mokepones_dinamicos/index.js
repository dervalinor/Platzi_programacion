//Crear una forma dinamica de los personajes del juego

//express permite el manejo eficiente de un Servidor web y HTML
const express = require("express")

//Cross-Origin Resource Sharing indicar de que sitios se puede cargar, enviar o recibir
//informacion es un funcion de express es importante cuando se realizan solucitudes 
//diferentes del servidor principal
const cors = require("cors")

//creacion de un instancia de express
const app = express()

/* 
middleware: Recepcion de solucitudes de cliente y servidor, envio de respuestas desde el servidor
es un intermediario de cliente-servidor permitiendo que permite la correcta transmision de 
solucitudes entre los dos.

req - solucitud
*/


//aplicar el middleware CORS 
app.use(cors())

app.use(express.json())

const jugadores = []

class Jugador {
  constructor(id) {
    this.id = id
  }

  asignarMokepon(mokepon) {
    this.mokepon = mokepon
  }

  actualizarPosicion(x, y) {
    this.x = x
    this.y = y
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`

  const jugador = new Jugador(id)

  jugadores.push(jugador)

  res.setHeader("Access-Control-Allow-Origin", "*")
  
  res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const nombre = req.body.mokepon || ""
  const mokepon = new Mokepon(nombre)
  
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon)
  }
  
  console.log(jugadores)
  console.log(jugadorId)
  res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y)
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

  res.send({
    enemigos
  })
})

app.listen(8080, () => {
  console.log("Servidor funcionando")
})
