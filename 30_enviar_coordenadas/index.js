/* 
Transmitir nuestras coordenadas de los jugadores en 
cuando se conectan al servidor
*/

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

  //Este metodo permite actualizar la posicion de nuestros jugador
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

    
app.post("/mokepon/:jugadorId/posicion", (req, res) => { //segun el id del jugador obtener su posicion, esta direcciones las podemos inventar
  const jugadorId = req.params.jugadorId || "" //
  const x = req.body.x || 0 //obtener la posicion en "x" o en caso que no exista un valor entonces 0
  const y = req.body.y || 0 //obtener la posicion en "y" o por defecto 0

  //buscar y actualizar las coordenadas del jugador en el mapa
  //recordar tener en la clase de mokepon el metodo actualizarPosicion
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y)
  }
  //respuesta despues de hacer llenado los datos
  res.end()
})

app.listen(8080, () => {
  console.log("Servidor funcionando")
})
