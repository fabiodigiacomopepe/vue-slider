/* RICHIESTA
Partendo dal markup della versione svolta in js plain, rifare lo slider ma questa volta usando Vue.

Bonus:
1-al click su una thumb, visualizzare in grande l’immagine corrispondente
2-applicare l’autoplay allo slider: ogni 3 secondi, cambia immagine automaticamente
3-quando il mouse va in hover sullo slider, bloccare l’autoplay e farlo riprendere quando esce
*/


// Inietto all'interno di ".items-container" il DIV contenente FOTO, TITOLO e SOTTOTITOLO
document.querySelector('.items-container').innerHTML +=
`<div v-for="(item, index) in card" class="item" :class="itemAttivo === index ? 'active' : ''">
    <img :src="item.image" :alt="item.image">
    <div class="title-container">
        <div class="title">{{item.title}}</div>
        <div class="subtitle">{{item.text}}</div>
    </div>   
</div>`;

// Inietto all'interno di ".slider-laterale il DIV contenente le thumbnails
document.querySelector('.slider-laterale').innerHTML +=
`<div v-for="(item, index) in card" class="card">
    <div class="layer" :class="itemAttivo === index ? 'show' : ''"></div>
    <img class="img-card" :src="item.image" :alt="item.image">
</div>`;


// Setto in una costante la proprietà createApp presa da Vue
const {createApp} = Vue;

createApp ({
    data (){
        return {
            reverse: true,          // Setto reverse TRUE (default)
            itemAttivo: 0,          // Setto itemAttivo a 0 (il primo) (default)
            secondi: 3 * 1000,      // Setto i secondi a 3
            clock: "",              // Dichiaro clock
            card: [ 
                {
                    image: 'img/01.webp',
                    title: "Marvel's Spiderman Miles Morale",
                    text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
                },
                {
                    image: 'img/02.webp',
                    title: 'Ratchet & Clank: Rift Apart',
                    text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
                },
                {
                    image: 'img/03.webp',
                    title: 'Fortnite',
                    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
                },
                {
                    image: 'img/04.webp',
                    title: 'Stray',
                    text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
                },
                {
                    image: 'img/05.webp',
                    title: "Marvel's Avengers",
                    text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
                }
            ]
        }
    },
    methods: {
        fotoGiu() {
            this.reverse = true;                           // Reverse diventa TRUE
            this.itemAttivo++;                             // Incremento valore dell' ITEM ATTIVO
            if (this.itemAttivo === this.card.length) {    // SE mi trovo nell'ULTIMA foto
                this.itemAttivo = 0;                       // Faccio in modo di ritornare alla PRIMA foto
            }
        },
        fotoSu(){
            this.reverse = false;                          // Reverse diventa FALSE
            this.itemAttivo--;                             // Decremento valore dell' ITEM ATTIVO
            if (this.itemAttivo < 0) {                     // SE mi trovo nella PRIMA foto
                this.itemAttivo = this.card.length - 1;    // Faccio in modo di ritornare all'UTLIMA foto
            }
        },
        autoPlay() {
            clearInterval(this.clock);                                      // Elimino clock già attivi
            if (this.reverse == false) {                                    // SE reverse è false
                this.clock = setInterval(this.fotoSu, this.secondi);        // Continuo con fotoSu (precedente)
            } else {                                                        // ALTRIMENTI (reverse = true)
                this.clock = setInterval(this.fotoGiu, this.secondi);       // Continuo con fotoGiu (successiva)
            }
        },
        ferma() {
            clearInterval(this.clock);                                      // Elimino clock già attivi
        },
        inverti() {
            clearInterval(this.clock);                                      // Elimino clock già attivi
            if (this.reverse == true) {                                     // SE reverse è true
                this.clock = setInterval(this.fotoSu, this.secondi);        // Continuo con fotoSu (precedente)
            } else {                                                        // ALTRIMENTI (reverse = false)
                this.clock = setInterval(this.fotoGiu, this.secondi);       // Continuo con fotoGiu (successiva)
            }
        }
    },
    mounted() {
        this.autoPlay();                                                    // Al caricamento della pagina eseguo la funzione autoPlay
    }
}).mount("#slider")                                                         // Monto la proprietà createApp nell'ID slider nell'HTML