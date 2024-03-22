/*
JSON, que significa JavaScript Object Notation (Notación de Objetos JavaScript)
Forma facil de transmitir datos del Servidor web del cliente y el servidor esto se hacer por
medio de la sintasis "{key: value}". Ejemplo: {nombre: Prushka}
*/

const express = require("express") // Importa la biblioteca Express

// Instalar la librería cors: npm install cors
// Esta librería permite restringir las fuentes donde se solicita acceder al servidor y donde se adquiere datos
// como por ejemplo que se pueda recibir datos de mokepon.html
const cors = require("cors")

const app = express() // Crea una instancia de Express

// Solicita a Express utilizar la librería cors para manejar CORS
app.use(cors())
app.use(express.json()) // Permite al servidor entender solicitudes JSON
//Es decir recibir solicitudes desde JSON

const jugadores = [] // Array para almacenar los jugadores

class Jugador {
  constructor(id) {
    this.id = id
  }
  //como el jugador elige un personaje esto lo podemos asignar desde
  //el Backend
  asignarMokepon(mokepon) {
    this.mokepon = mokepon
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre
  }
}

// Define una ruta para que los clientes se unan al servidor
app.get("/unirse", (req, res) => {
  const id = `${Math.random()}` // Genera un ID de jugador aleatorio

  const jugador = new Jugador(id) // Crea un nuevo jugador con el ID generado

  jugadores.push(jugador) // Agrega el jugador a la lista de jugadores

  res.setHeader("Access-Control-Allow-Origin", "*") // Permite el acceso desde cualquier origen
  
  res.send(id) // Envía el ID del jugador de vuelta al cliente
})

// Define una ruta para que los clientes asignen Mokepones a los jugadores
// Recibir peticiones en JSON, se le coloca un nombre para asi que cada servicio se
// dedique a un sola cosa en este caso es "/mokepon" y un variable ":jugadorId" que tenga
// el id del jugador, seguido de la funcion "(req, res)" que procesa la solicitud
app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || "" // Obtiene el ID del jugador desde los parámetros de la URL
  // o algun valor por defecto indica "".
  

  //apartir de la informacion que el usuario a enviado
  const nombre = req.body.mokepon || "" // Obtiene el nombre del Mokepon desde el cuerpo de la solicitud
  const mokepon = new Mokepon(nombre) // Crea un nuevo Mokepon con el nombre proporcionado
  //asi ser podido utilizado por el backend como un objeto con sus propiedades y metodos
  
  // Busca el índice del jugador en la lista de jugadores
  //buscar que el jugador exista o no exista 
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  // Si se encuentra el jugador
  //si el elemento existe entonces no devuelve su indice en caso contrario no devuelve -1
  if (jugadorIndex >= 0) {
    // Asigna el Mokepon al jugador correspondiente
    jugadores[jugadorIndex].asignarMokepon(mokepon)
  }
 
  //con lo anterior al Backend se obtiene el id del jugador y su personaje seleccionado 
  //con sus propiedades y metodos
  console.log(jugadores) // Imprime la lista de jugadores en la consola
  console.log(jugadorId) // Imprime el ID del jugador en la consola
  res.end() // Finaliza la respuesta
})

// Inicia el servidor en el puerto 8080
app.listen(8080, () => {
  console.log("Servidor funcionando") // Imprime un mensaje en la consola indicando que el servidor está funcionando
})

