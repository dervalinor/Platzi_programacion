const express = require("express")
const cors = require("cors")

const app = express()

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

  asignarAtaques(ataques) {
    this.ataques = ataques
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

//El servidor recibe los ataques del jugador en la URL dada 
//y de esta extrae el Id del jugador y del objeto de JSON extrae el 
//ataque del jugador
app.post("/mokepon/:jugadorId/ataques", (req, res) => {//Aqui se da URL donde se recibe los datos de 
    //ataques del jugador, solicitud del cliente (req) y luego la respuesta del servidor (res)
  const jugadorId = req.params.jugadorId || "" //extraer de la URL el id del jugador
  const ataques = req.body.ataques || [] //extraer de objeto JSON los ataques del jugador
  
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //Buscar al jugador 
    //en la lista de jugadores donde previamente el jugador se unio a esta.

  if (jugadorIndex >= 0) { //verifica si el usuario existe en la lista por que cuando 
      //no existe se devuelve un -1 como respuesta
    jugadores[jugadorIndex].asignarAtaques(ataques) //asignar los ataques al objeto de jugador 
      //de la lista.
  }

  res.end() //no se envia nada mas que decirle al cliente que su solicitud se ha aceptado.
})

app.listen(8080, () => {
  console.log("Servidor funcionando")
})
