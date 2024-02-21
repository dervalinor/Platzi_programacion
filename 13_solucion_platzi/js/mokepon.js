const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonTierra = document.getElementById('boton-tierra')
sectionReiniciar.style.display = 'none'
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas') 

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3
let inputHipodoge
//creamos un variable para guardar la mascota seleccionada por el jugador para luego seleccionar ataques
let mascotaJugador
//lo que hay que hacer es aparezca todos lo ataque de personaje seleccionado

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

    
    botonFuego.addEventListener('click', ataqueFuego)
    
    botonAgua.addEventListener('click', ataqueAgua)
    
    botonTierra.addEventListener('click', ataqueTierra)

    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    
    
    sectionSeleccionarAtaque.style.display = 'flex'
   //esta linea consiste en ataques escritos, debe ser
  //replazodo por el metodo de ataques de los objetos
  //Recorda que los ataques esta en lista, hay que recorrerla y colocar
  //cada ataque, creo que se debe colocar un ciclo
  
    //aqui en este codigo nosotros seleccionamos segun el checked el personje debemos guardar en un variable el 
    //el personaje seleccionado y con esto poder recorrer su metodo de ataques
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id //aqui solo imprimimos el id
        mascotaJugador = inputHipodoge.id //aqui ya podemos utilizar como un variable
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

    //ahora debemos crear un funcion que no permita ver los ataque de nuestro personaje
    //crear un funcion que tenga como paramento el variable que almacena el personaje y nos permite
    //este funcion no permitira ver lo ataque del personaje
    extraerAtaques(mascotaJugador)    

    seleccionarMascotaEnemigo()
}

//crear la funcion de extraer ataques para poder ver los poderes de nuestro personaje
function extraerAtaques(mascotaJugador){
    //creamos un variable para guardar lo ataques
    let ataques
    //ahora recorremos todos lo ataques tambien se puede usar un For Loop

    /*
    codigo en forma de un for loop para iterar los ataque del personaje selecionado
    recorrer el arreglo de mokepones

    for (let i = 0; i < mokepones.length; i++) {
        //validar nombre del personaje para luego poder
        //extraer sus poderes  
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
        
    } */

    mokepones.forEach((mokepon) => {
        if (mascotaJugador === mokepon.nombre) {
            ataques = mokepon.ataques
        }

        //imprimos en consola para saber si imprime los ataques
        console.log(ataques)
        //Tarea: ahora debemos crear un funcion que muestre los ataques de personaje
        //mostrarAtaques(ataques)
    })

}

//funcion de mostrarAtaques 



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
	
    //iterar sobre el arreglo ataques
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
