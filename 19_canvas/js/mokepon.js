/* CREAR UN GITHUB PAGES PARA ESTE SITIO WEB
Explicacion de chatSonic: En JavaScript, "Canvas" se refiere a un elemento HTML que se utiliza 
para dibujar gráficos, animaciones o imágenes mediante scripts en el navegador. 
Proporciona una manera de dibujar gráficos dinámicos y manipular píxeles de forma programática.

Explicacion de platzi: es como un plano cartesiano, moviendose en unidades de pixeles
Puedes dibujar lo que sea.
*/


const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
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
const contenedorAtaques = document.getElementById('contenedorAtaques')

//agregar la constante para el canvas
//seleccion de elemento de canvas por id
const  sectionVerMapa = document.getElementById("ver-mapa")
//constante para el mapa
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones = []
let vidasJugador = 3
let vidasEnemigo = 3
let ataquesMokeponEnemigo = []

let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador = 0
let victoriasEnemigo = 0

//ahora creamos un variable para poder trabajar con canvas
let lienzo = mapa.getContext("2d");//vamos a trabajar en dos dimensiones

/* getContext("2d"): Este es un método de la interfaz HTMLCanvasElement que se utiliza para 
obtener el contexto de dibujo 2D del canvas. Cuando se llama con el argumento "2d", 
devuelve un objeto CanvasRenderingContext2D que representa el contexto de renderizado 2D del canvas.

*/

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        //para canvas modificar la clase mokepon en sus propiedades
        this. x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        //tambie podemos colocar la foto del mapa y del  nuestro personaje con parametro de esta objeto
        this.mapaFoto = new Imagen()
        this.mapaFoto.src = foto
        
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

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'

    sectionVerMapa.style.display  = 'none'

    mokepones.forEach((mokepon) => {
        //modificar esta html para poder personalizar tarjetas mokepon
        //desde css
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
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
    
    
    //sectionSeleccionarAtaque.style.display = 'flex'
    /*
    mostrar la seccion de ver el mapa
    */
    sectionVerMapa.style.display = 'flex'
    
    /*Podemos colocar imagenes en canvas, por ejemplo la imagen de un personaje */
    //imagenDeCapipeto.src = capipepo.foto

    //tambien podemos mover a nuestro personaje

    /*Nota: Ahora vamos a dibujar en canvas*/
    //lienzo.fillRect(5, 15, 20, 40) /*pequeño rectangulo ubicado en x = 5 y y = 15 con ancho del rectangulo 20 y  alto 40*/

    /*función fillRect():


    5: Es la coordenada x del punto de inicio del rectángulo. En este caso, el rectángulo comenzará en la posición x = 5.

    15: Es la coordenada y del punto de inicio del rectángulo. En este caso, el rectángulo comenzará en la posición y = 15. 

    20: Es el ancho del rectángulo. En este caso, el rectángulo tendrá un ancho de 20 unidades.

    40: Es la altura del rectángulo. En este caso, el rectángulo tendrá una altura de 40 unidades.

*/

    
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
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
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}


function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'  
                boton.disabled = true 
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true 
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true 
            }
            ataqueAleatorioEnemigo()    

        })
    })
    
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataqueAleatorioEnemigo.length -1 )
  
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){

        ataqueEnemigo.push('FUEGO')        
    } else if(ataqueAleatorio == 3 || ataqueAleatorio  == 4){
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log("ATAQUE ENEMIGO: " + ataqueEnemigo)
 
    iniciarPelea()
}


function iniciarPelea(){
 
    if (ataqueJugador.length === 5) {
        combate()
    }
}


function indexAmbosOponente(jugador, enemigo){

    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let i=0;i<ataqueJugador.length && ataqueEnemigo.length; i++) {
   
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponente(i,i)
            crearMensaje("EMPATE")    
     
        } else if(ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA') {
            indexAmbosOponente(i,i)
            crearMensaje("GANASTE")
            victoriasJugador ++
      
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO') {
            indexAmbosOponente(i,i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA') {
            indexAmbosOponente(i,i)
            crearMensaje("GANASTE")
            victoriasJugador
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(i,i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    
    

    revisarVictorias()
}


function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATE")
    } else if (victoriasJugador  > victoriasEnemigo) {
        crearMensajeFinal('GANASTE !!!')
    }  else { 
        crearMensajeFinal('PERDISTE !!!')
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
  
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal

  

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarPersonaje() {

    lienzo.clearRect(0, 0, mapa.width, mapa.height) //limpiar nuestro canvas desde la posicion (0, 0) hasta el 
    //final del mapa

    /*ahora mostrar imagen */
    lienzo.drawImage(
        //imagen de capipepo
        capipepo.mapaFoto, //objeto capipepo con sus parametros
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
}

//Tarea: mover el personaje verticalmente

//ahora creamos una funcion para mover personaje
function moverCapipepo(){
    //actualizar la posicion de nuestro personaje
    capipepo.x = capipepo.x + 5 //mover nuestro personaje de la posicion inicial 5 unidades
    pintarPersonaje()
}

window.addEventListener('load', iniciarJuego)