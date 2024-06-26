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
//creamos un variable para el contenedor de ataques del personaje
const contenedorAtaques = document.getElementById("contenedorAtaques")


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

    
    botonFuego.addEventListener('click', ataqueFuego)
    
    botonAgua.addEventListener('click', ataqueAgua)
    
    botonTierra.addEventListener('click', ataqueTierra)

    
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

function extraerAtaques(mascotaJugador){
    let ataques

    mokepones.forEach((mokepon) => {
        if (mascotaJugador === mokepon.nombre) {
            ataques = mokepon.ataques
        }

        //Tarea: ahora debemos crear un funcion que muestre los ataques de personaje
        mostrarAtaques(ataques)
    })

}

/* //funcion de mostrarAtaques
function mostrarAtaques(ataques){
    //Mi solucion con ayuda: ahora recorremos el arreglo y inyectamos los ataques en HTML
    //por medio de la variable contenedorAtaques

    for (let i=0; i<ataques.length;i++){ //este codigo genera que los poderes sean undefined y son muchos mas de loa que son!!!!!
        //variable para inyectar en el html los poderes de nuestros personajes
        const ataquesPersonaje = `<button id=${ataques.id} class="btnAttack">${ataques[i]}</button>
        `
        // Agrega el código HTML generado al elemento contenedorAtaques en el documento HTML
        //contenedorAtaques.innerHTML = contenedorAtaques.innerHTML + ataquesPersonaje;
        contenedorAtaques.innerHTML += ataquesPersonaje;
    }
}*/

function mostrarAtaques(ataques) {
    // Clear existing content of contenedorAtaques before adding new attacks
    contenedorAtaques.innerHTML = '';

    // Iterate over each attack object in the ataques array
    ataques.forEach((ataque) => {
        // Generate HTML code for a button representing the current attack
        const ataquesPersonaje = `<button id="${ataque.id}" class="btnAttack">${ataque.nombre}</button>`;
        
        // Append the generated HTML code to the contenedorAtaques element in the HTML document
        contenedorAtaques.innerHTML += ataquesPersonaje;
    });
}

/*chatGPT explanation:

Let's break down `innerHTML` and the statement `contenedorAtaques.innerHTML = contenedorAtaques.innerHTML + ataquesNerd` step by step, using a real-life analogy to make it easier to understand.

### `innerHTML`:

Think of an HTML element as a box. This box can contain various things, like text, images, or even other boxes (nested elements). The `innerHTML` property is like the contents of the box.

**Example:** Imagine you have an empty box (HTML element) labeled "contenedorAtaques" (container of attacks) in your room. You can put things inside this box, like toys, books, or anything else.

htmlCopy code

`<div id="contenedorAtaques">     <!-- This is where the attacks will be displayed --> </div>`

### `contenedorAtaques.innerHTML = contenedorAtaques.innerHTML + ataquesNerd`:

Now, let's say you have some toy soldiers (representing the `ataquesNerd` HTML code) that you want to put inside the box. You can either put them directly into the box or add them to whatever is already inside the box. The statement `contenedorAtaques.innerHTML = contenedorAtaques.innerHTML + ataquesNerd` is like adding these toy soldiers to the box.

**Step by Step Explanation:**

1.  **Read the existing content of the box (`contenedorAtaques.innerHTML`):**
    
    *   You open the box and see what's already inside.
2.  **Add new content (`ataquesNerd`) to the existing content:**
    
    *   You take some toy soldiers (`ataquesNerd`) and want to put them in the box.
3.  **Combine the new content with the existing content:**
    
    *   You put the new toy soldiers into the box along with whatever is already inside.
4.  **Update the content of the box (`contenedorAtaques.innerHTML = ...`):**
    
    *   You close the box and seal it with the combined content inside.

**Analogy:** Imagine you have a treasure chest (the HTML element) in your room. You want to add some gold coins (new HTML content) to the treasure chest. First, you open the chest and see what treasures are already inside (read `contenedorAtaques.innerHTML`). Then, you take the gold coins and put them into the chest, along with the existing treasures (add `ataquesNerd` to the existing content). Finally, you close the chest, and now it contains both the existing treasures and the new gold coins (update `contenedorAtaques.innerHTML` with the combined content).

In coding terms:

javascriptCopy code

`// Read the existing content of the box let existingContent = contenedorAtaques.innerHTML;  // Add new content to the existing content let combinedContent = existingContent + ataquesNerd;  // Update the content of the box with the combined content contenedorAtaques.innerHTML = combinedContent;`

This way, the `innerHTML` property allows you to dynamically change the content of HTML elements on a web page, similar to how you can add or remove items from a box in real life.

*/

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
