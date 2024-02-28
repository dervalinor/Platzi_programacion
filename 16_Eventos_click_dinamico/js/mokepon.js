//solucion del problema que los botones repetidos de poderes no funcionan al dar click

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


const contenedorAtaques = document.getElementById("contenedorAtaques")


let ataquesMokepon


let botonTierra 
let botonFuego 
let botonAgua 
//los botones de los poderes los guardamos en un arreglo
let botones = []
//variables para guardar la secuencia de ataques
let jugadorAtaque = []

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

    mostrarAtaques(ataques);
}


function  mostrarAtaques(ataques){

    ataques.forEach((ataque) => {
        //para obtener que cada boton creado por OOP puede funcionar al dar click 
        //debemos crear un clase para esta caso se llamara BAtaque, luego debemos selecionar
        //este boton por esta clase
        ataquesMokepon = ` 
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
      | `
      contenedorAtaques.innerHTML += ataquesMokepon
    })

  
     botonFuego = document.getElementById('boton-fuego');
     botonAgua = document.getElementById('boton-agua');
     botonTierra = document.getElementById('boton-tierra');
     //seleccion de los botones que tiene la clase BAtaque para luego agregar el evento de click
     //document.querySelectorAll: Esta función es especialmente útil cuando necesitas seleccionar múltiples elementos que coinciden con un criterio específico en lugar de solo uno.
     //para esta caso selecionar los botones con la clase BAtaque
     botones = document.querySelectorAll('.BAtaque')
 
     // Esto tampoco es util - explicar
     /*botonFuego.addEventListener('click', ataqueFuego);
     botonAgua.addEventListener('click', ataqueAgua);
     botonTierra.addEventListener('click', ataqueTierra);*/

}

//creamos un funcion para la secuencia de ataques segun el numero de ataques son las rondas para jugar
//ademas hacer de si un boton se ha selecionado ya no se pueda volver a selecionar
function secuenciaAtaque(){
    //guardar la secuencia de ataques con la cual se quiera jugar
    //primero recorremos nuestro arreglo de botones
    
    botones.forEach((boton) => {
        //agregar el evento de click y que valor se esta seleccionando
        boton.addEventListener('click', (e) =>{
            //validacion de los ataques apartir del evento llamado e si es igual al nombre de los poderes
            if (e.target.textContent === '🔥') {
                //generar una secuencia de ataques para esto debemos crear un variable llamada ataque jugador
                //agregar los poderes al arreglo
                jugadorAtaque.push('FUEGO')
                //mostrar el consola la secuencia de ataques
                console.log(jugadorAtaque)
                //tambien podemos modificar el color del boton despues de ser seleccionado
                boton.style.background = '#31DCD0'
                //este codigo dice que recorra el evento 'e' y si su contenido interno es 🔥 agregar al arreglo
                //de secuencia de ataques el ataque 'FUEGO', luego muestralo en consola y cambia su color de fondo
                //despues de seleccionarlo esto es similar para los demas poderes
            } else if(e.target.textContent === '💧'){
                jugadorAtaque.push('AGUA')
                console.log(jugadorAtaque)
                boton.style.backgroundColor='#31DCD0'
            } else {
                jugadorAtaque.push('TIERRA')
                console.log(jugadorAtaque)
                boton.style.backgroundColor='#31DCD0'
            } 
            
        })
    })

}



function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1) 
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre 
 }


 //esta funciones no son necesarias
/*function ataqueFuego() {
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
}*/

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
