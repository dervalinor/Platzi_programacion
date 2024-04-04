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

Aceso a estos objetos: 

req - solucitud del cliente al Servidor
res - respuesta del servido al cliente
next() - funcion para pasar al siguiente middleware en la cadena 
de procesos


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

//solucitudes GET: Solicitar datos del servidor o cualquier otro contenido, entonces el servidor buscara
//el recurso requerido y envia la repuesta al cliente, aqui estan los codigo de estado como 200 para indicar "OK, encontrado" y 404 para 
//"No encontrado", el usuario con un solicitud GET no puede modificar el servidor.
//como por ejemplo cuando accedes a una URL
//este tipo de solucitudes se guardan en el historial de navegacion
app.get("/unirse", (req, res) => { //especifica un endpoint (URL especifica de servidor para acceder a informacion o otras cosas mas)
    //donde se puede acceder para un solicitud GET
    //luego sigue un callback que es una funcion que se pasa como argumento de otra funcion, tiene como argumento req (la solucitud del cliente) y
    //res (respuesta del servidor)
  const id = `${Math.random()}`//crear un identificador unico del jugador cuando accede a unirse al juego

  const jugador = new Jugador(id) //crear un objeto con id para el jugador

  jugadores.push(jugador) //agregar esto a lista de jugador

  res.setHeader("Access-Control-Allow-Origin", "*") //Este permite que cualquier solicitud se realize desde cualquier lugar aunque 
  //esto no es recomendable
  
  res.send(id) //Este envia al cliente su id de su jugador, esto es le da al usuario como informacion
})


//solucitudes post: enviar datos al servidor para ser procesados como por
//ejemplo cuando envias credenciales para iniciar session
//Con las solicitudes POST pueden enviar y modificar el servidor

//Entonce con un solicitud GET solo podemos obtener recursos del servidor 
//sin modificarlo mientras  que en un solucitud Post se envia y modifican datos del servidor
app.post("/mokepon/:jugadorId", (req, res) => { //enviar datos al servidor de id del jugador
  const jugadorId = req.params.jugadorId || "" //Extraer el id de jugador desde la URL en caso contrario solo se coloca 
  //una cadena vacia
  const nombre = req.body.mokepon || "" //extraer nombre del servidor o en caso contrario se asigna una cadena vacia
  const mokepon = new Mokepon(nombre) //crear un objeto con el nombre del personaje
  
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //buscar el id que coincida en la lista de jugadores

  if (jugadorIndex >= 0) {//verificar si se encontro el indice del jugador en la lista
    jugadores[jugadorIndex].asignarMokepon(mokepon) //asigna el personaje creado a la lista de jugadores
  }
  
  console.log(jugadores)
  console.log(jugadorId)
  res.end() //indicar al cliente el fin de la solucitud POST
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => { //enviar datos al servidor de la posicion del jugador
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

app.listen(8080, () => {//escuchar el puerto 8080 el cual puede enviar o recibir
  console.log("Servidor funcionando") //mostrar que el Servidor esta funcionando
})
