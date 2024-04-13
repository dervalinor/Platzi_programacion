//vamos hacer que cualquier celular se pueda conectar a nuestro juego !!!
//mientras esten en la mismo red wifi
//INTENTAR ROMPER EL CODIGO PARA HACKEARLO !!!!!!!  

const express = require("express")
const cors = require("cors")

const app = express()

//para esto llamamos a una funcion de nodejs de express llamada static
//Aqui estamos corriendo nuestro frontend desde el backend
app.use(express.static('public')) //crear carpeta donde se guardan los 
//archivos de nuestro juego es decir el estilos css, html, frontend js e
//imagenes de nuestros personajes
//Ahora debemos hacer nuestro localhost:8080 hacerlo publico para poder
//acceder desde nuestro servidor
//Para windows ejecutar el comando ipconfig, encontrar Address IPv4 (Importante debe ser de las red inhalambrica) y copiar esta ip y ahora entrar desde el celular
//a la direccion numberIPv4:8080
//Para linux ejecutar comando hostname y copiar nombre del computador y http://name_computer.local:8080 
//Para el caso de codespace github es codespaces-51e6f3
//Importante tener el servidor encendido

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

  asignarAtaques(ataques) { //Este metodo lo usamos 
      //para guardar los ataques que no envia el jugador al 
      //servidor
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

//se solicita al servidor los ataques del enemigo para asi saber como se
//dara la batalla

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || "" //encontrar el id del jugador
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId) //buscar jugador en la lista segun su id
  res.send({
    ataques: jugador.ataques || [] //enviar como respuesta los ataques del jugador el videojuego
  })
})

app.listen(8080, () => {
  console.log("Servidor funcionando")
})
