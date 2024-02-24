const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
sectionReiniciar.style.display = 'none'


const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas') 
const botonReiniciar = document.getElementById('boton-reiniciar')

//crear un funcion que inyecte los botones de los personajes en el HTML
//crear variable para selecionar el contenedor donde estaran los botones de los poderes del jugador
const contenedorAtaques = document.getElementById("contenedorAtaques")

//luego creamos un variable para guardar y luego mostrar lo ataques de los personajes
let ataquesMokepon


//los botones son ahora variables ya que se crean de forma dinamica
let botonTierra 
let botonFuego 
let botonAgua 

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3
let inputHipodoge

let mascotaJugador

let inputCapipepo
let inputRatigueya

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', 'https://i.imgur.com/F6IZstF.jpg', 5)

let capipepo = new Mokepon('Capipepo', 'https://i.imgur.com/6rdQP6l.jpg', 5)

let ratigueya = new Mokepon('Ratigueya', 'https://i.imgur.com/oioTlmZ.jpg', 5)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)


mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
	    opcionDeMokepones = ` 
	              <input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >

                  <div class="personaje-container">
                      <p class="titulo-personaje">${mokepon.nombre} </p>
                      <!--Agregar imagenes de los personajes -->
                      <img src=${mokepon.foto} alt=${mokepon.nombre} >

                  </div>  

	    `
       contenedorTarjetas.innerHTML += opcionDeMokepones 
       inputHipodoge = document.getElementById('Hipodoge')
       inputCapipepo = document.getElementById('Capipepo')
       inputRatigueya = document.getElementById('Ratigueya')

    })

    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    
    
    sectionSeleccionarAtaque.style.display = 'flex'
  
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id 
        mascotaJugador = inputHipodoge.id 
	mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }


    extraerAtaques(mascotaJugador)    

    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    //IMPORTANTE: llamar la funcion
    mostrarAtaques(ataques);
}
//funcion de mostrarAtaques 
function  mostrarAtaques(ataques){
    //ahora recorremos los ataques con la funcion de forEach
    ataques.forEach((ataque) => {
        //aqui creamos el boton de que tendra el id del ataque y el nombre del ataque
        ataquesMokepon = ` 
        <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
      | `
      //Agregar el código HTML generado al contenido HTML del elemento contenedorAtaques
      //se encarga de añadir el código HTML generado al contenido HTML del elemento con el identificador contenedorAtaques. 
      //El operador += se utiliza para agregar el nuevo código HTML al contenido existente del elemento sin sobrescribirlo. 
      //Esto asegura que los botones de ataques se agreguen al final de los ya existentes, si los hay.
      //contenedorAtaques.innerHTML = contenedorAtaques.innerHTML + ataquesPersonaje
      contenedorAtaques.innerHTML += ataquesMokepon
    })

    //ahora podemos borrar los botones en HTML


    //ahora debemos crear un eventos para selecion de los botones creados aqui}
    //para esto debemos cambiar las const de los botones a let
     // Seleccionar botones luego de crearlos
     botonFuego = document.getElementById('boton-fuego');

     //aqui hay un problema con el boton de agua solo funciona el primer boton y no el segundo ni el tercero
     //debemos creo crear poderes diferentes y no repetidos
     botonAgua = document.getElementById('boton-agua');
     botonTierra = document.getElementById('boton-tierra');
 
     
 
     // Agregar evento a los botones
     botonFuego.addEventListener('click', ataqueFuego);
     botonAgua.addEventListener('click', ataqueAgua);
     botonTierra.addEventListener('click', ataqueTierra);
   

}



function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1) 
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre 
 }


function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
	
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal

    
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
    botonTierra.disabled = true

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
