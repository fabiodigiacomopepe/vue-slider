/* RICHIESTA
Partendo dal markup della versione svolta in js plain, rifare lo slider ma questa volta usando Vue.

Bonus:
1-al click su una thumb, visualizzare in grande l’immagine corrispondente
2-applicare l’autoplay allo slider: ogni 3 secondi, cambia immagine automaticamente
3-quando il mouse va in hover sullo slider, bloccare l’autoplay e farlo riprendere quando esce
*/

document.getElementById('items-container').innerHTML +=
`<div v-for="n in this.card.image.length" class="item">
    <img :src="this.card.image[n-1]" :alt="this.card.image[n-1]">
    <div class="title-container">
        <div class="title">{{card.title[n-1]}}</div>
        <div class="subtitle">{{card.text[n-1]}}</div>
    </div>   
</div>`

document.querySelector('.slider-laterale').innerHTML +=
`<div v-for="n in this.card.image.length" class="card">
    <div class="layer"></div>
    <img class="img-card" :src="this.card.image[n-1]" :alt="this.card.image[n-1]">
</div>`



const {createApp} = Vue;

createApp ({
    data () {
        return {
            card: {
                image: [
                    "img/01.webp",
                    "img/02.webp",
                    "img/03.webp",
                    "img/04.webp",
                    "img/05.webp"
                ],
                title: [
                    "Marvel's Spiderman Miles Morale",
                    "Ratchet & Clank: Rift Apart",
                    "Fortnite",
                    "Stray",
                    "Marvel's Avengers",
                ],
                text: [
                    "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
                    "Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.",
                    "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
                    "Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city.",
                    "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
                ]
            }
        }
    },
    methods: {

    }
}).mount ("#items-container")




// Setto ATTIVO di base il primo elemento (riquadro principale)
let primoItem = document.querySelector('.item');
primoItem.classList.add("active");

// Setto ATTIVO di base il primo elemento (riquadro laterale)
let primoLayer = document.querySelector('.layer');
primoLayer.classList.add("hidden");

// Collego costante ITEMS a elenco ITEM
const items = document.querySelectorAll('.item');

// Collego costante LAYERS a elenco LAYER
const layers = document.querySelectorAll('.layer');

// Setto item ATTIVO al momento
let itemAttivo = 0;

// Seleziono pulsante NEXT
const next = document.querySelector(".next");

// Seleziono pulsante PREVIOUS
const previous = document.querySelector(".previous");

// Dichiaro variabile globale REVERSE
let reverse;

// Collego funziona al click dei pulsanti NEXT e PREVIOUS
next.addEventListener("click", function() {changePhoto((items.length -1), -1, +1, false)});
previous.addEventListener("click", function() {changePhoto(0, items.length, -1, true)});

function changePhoto(A, B, C, D) {
    reverse = D;                                    // Reverse diventa FALSE/TRUE
    items[itemAttivo].classList.remove("active");   // Rimuovo classe ACTIVE all'ITEM attualmente attivo
    layers[itemAttivo].classList.remove("hidden");  // Rimuovo classe HIDDEN al LAYER attualmente attivo
    if (itemAttivo === A) {                         // SE mi trovo nell'ULTIMA/PRIMA foto
        itemAttivo = B;                             // Setto valore ITEM ATTIVO a -1 (così incrementato diventa 0)/a ITEMS.LENGTH (5) (così decrementato diventa 4, cioè ultima foto)
    }
    itemAttivo = itemAttivo + C;                    // Incremento/Decremento valore dell' ITEM ATTIVO
    items[itemAttivo].classList.add("active");      // Assegno classe ACTIVE all'elemento (attualmente) successivo
    layers[itemAttivo].classList.add("hidden");     // Assegno classe HIDDEN all'elemento (attualmente) successivo
}

// Setto i secondi
let secondi = 3 * 1000;

// Imposto intervallo ogni 3 secondo che dovrà far partire "nextFunction" (cambio foto automatico)
var clock = setInterval(function() {changePhoto((items.length -1), -1, +1, false)}, secondi);

// Setto funzione avanti (cambio foto IN AVANTI)
function avanti() {
    clock = setInterval(function() {changePhoto((items.length -1), -1, +1, false)}, secondi);
}

// Setto funzione indietro (cambio foto ALL'INDIETRO)
function indietro () {
    clock = setInterval(function() {changePhoto(0, items.length, -1, true)}, secondi);
}

// Collego pulsanti dall'HTML
const start = document.getElementById("start").addEventListener("click", startF);
const stop = document.getElementById("stop").addEventListener("click", stopF);
const inverti = document.getElementById("inverti").addEventListener("click", invertiF);

// Funzione collegata a pulsante START
function startF() {
    if (reverse == true) {                  // SE reverse = true
        indietro();                         // Procedi all'indietro
    } else {                                // Altrimenti
        avanti();                           // Procedi in avanti
    }
}

// Funzione collegata a pulsante STOP
function stopF() {
    clearInterval(clock);                   // Tolgo il contatore
}

// Funzione collegata a pulsante INVERTI
function invertiF() {
    clearInterval(clock);                   // Tolgo il contatore ATTUALE
    if (reverse == true) {                  // SE reverse = true
        avanti();                           // Procedi in avanti
    } else {                                // Altrimenti
        indietro();                         // Procedi all'indietro
    }
}