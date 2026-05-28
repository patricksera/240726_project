/* ═══════════════════════════════════════════════
   PASSWORD — cambia CORRECT_PIN con il tuo codice
   ═══════════════════════════════════════════════ */
const CORRECT_PIN = '240724';   // ← MODIFICA QUI

let currentPin = '';

function pressKey(digit) {
  if (currentPin.length >= 6) return;
  currentPin += digit;
  updateDots();
  if (currentPin.length === 6) {
    setTimeout(submitPin, 150);
  }
}

function clearPin() {
  currentPin = '';
  updateDots();
  hideError();
}

function updateDots() {
  for (let i = 0; i < 6; i++) {
    const dot = document.getElementById(`dot-${i}`);
    dot.classList.toggle('filled', i < currentPin.length);
  }
}

function submitPin() {
  if (currentPin === CORRECT_PIN) {
    unlockApp();
  } else {
    showError();
    const box = document.querySelector('.lock-box');
    box.classList.remove('shake');
    void box.offsetWidth; // reflow to restart animation
    box.classList.add('shake');
    setTimeout(() => { currentPin = ''; updateDots(); }, 400);
  }
}

function showError() {
  document.getElementById('lock-error').classList.add('visible');
}

function hideError() {
  document.getElementById('lock-error').classList.remove('visible');
}

function unlockApp() {
  const lockScreen = document.getElementById('lock-screen');
  lockScreen.style.transition = 'opacity 0.5s';
  lockScreen.style.opacity = '0';
  setTimeout(() => {
    lockScreen.style.display = 'none';
    const app = document.getElementById('app');
    app.style.display = 'flex';
    initMap();
  }, 500);
}

/* ═══════════════════════════════════════════════
   MAPPA
   ═══════════════════════════════════════════════ */

/* ── LUOGHI ─────────────────────────────────────
   Per trovare le coordinate di un posto:
   1. Vai su https://www.google.com/maps
   2. Cerca il luogo e clicca sul punto esatto
   3. In basso appare una scheda: copia le coordinate
      (es. 45.4654, 9.1859 = Milano)
   OPPURE:
   1. Vai su https://www.openstreetmap.org
   2. Cerca il luogo, fai clic destro → "Mostra indirizzo"
   3. Le coordinate appaiono nell'URL dopo #map=
   ────────────────────────────────────────────── */
const places = [
  {
    title: "Quartiere Juvarra",
    coords: [45.00138159993268, 7.638987057144637],
    images: [
      { src: "images/1.jpg", caption: "Dove tutto è iniziato" }
    ]
  },
  {
    title: "Mondojuve",
    coords: [44.98302797708124, 7.620662254366506],
    images: [
      { src: "images/2.jpeg", caption: "Il nostro primo appuntamento" }
    ]
  },
  {
    title: "Boschetto",
    coords: [45.00682838717714, 7.6333242217053545],
    images: [
      { src: "images/3.JPG", caption: "La nostra prima grigliata" },
      { src: "images/38.JPG", caption: "" },
      { src: "images/39.JPG", caption: "" },
      { src: "images/40.JPG", caption: "" }
    ]
  },
  {
    title: "Tiger - Torino",
    coords: [45.066291523863576, 7.676321562527939],
    images: [
      { src: "images/4.JPG", caption: "La mia regina" }
    ]
  },
  {
    title: "Casa Marty",
    coords: [44.99826486108839, 7.64202861023141],
    images: [
      { src: "images/5.JPG", caption: "La prima notte insieme" },
      { src: "images/7.jpeg", caption: "Primo Natale insieme" },
      { src: "images/13.jpeg", caption: "Primo anno insieme" }
    ]
  },
  {
    title: "Torino Lingotto",
    coords: [45.033104521857304, 7.665247597469243],
    images: [
      { src: "images/6.jpeg", caption: "Halloween" }
    ]
  },
  {
    title: "Casa Khon",
    coords: [44.99767921931386, 7.660424696694355],
    images: [
      { src: "images/8.JPG", caption: "Primo Capodanno inseme" }
    ]
  },
  {
    title: "Piazza Vittorio",
    coords: [45.06501727849406, 7.695172774922611],
    images: [
      { src: "images/9.jpeg", caption: "Il mio San Valentino" }
    ]
  },
  {
    title: "Casa Pat",
    coords: [44.980786041248386, 7.458732316461946],
    images: [
      { src: "images/10.jpeg", caption: "La donna della mia vita" }
    ]
  },
  {
    title: "Inalpi Arena",
    coords: [45.0416952513335, 7.652222983206163],
    images: [
      { src: "images/11.jpeg", caption: "Primo concerto insieme (e sei bella wow!)" }
    ]
  },
  {
    title: "JC Maxwell",
    coords: [45.0008738112772, 7.634905508329781],
    images: [
      { src: "images/12.JPG", caption: "Maturi insieme (io di più)" }
    ]
  },
  {
    title: "Bardonecchia",
    coords: [45.079460448018146, 6.697739120995503],
    images: [
      { src: "images/14.jpeg", caption: "Passeggiata in montanga" },
      { src: "images/44.JPG", caption: "Lancio del prosciutto" },
      { src: "images/43.jpeg", caption: "L'amore mio" }
    ]
  },
  {
    title: "Conca del Pra",
    coords: [44.771269973516766, 7.0388633393605655],
    images: [
      { src: "images/15.jpeg", caption: "" },
      { src: "images/16.JPG", caption: "" },
      { src: "images/17.JPG", caption: "" }
    ]
  },
  {
    title: "Autogrill direzione Toscana",
    coords: [44.96256847807697, 9.90501404644652],
    images: [
      { src: "images/18.jpeg", caption: "Il nostro primo viaggio" }
    ]
  },
  {
    title: "La nostra prima Vacanza",
    coords: [43.25050010467763, 10.531817943716941],
    images: [
      { src: "images/19.jpeg", caption: "Passeggiata serale in spiaggia" },
      { src: "images/21.jpeg", caption: "Post piscina" },
      { src: "images/26.jpeg", caption: "Noi" },
      { src: "images/27.jpeg", caption: "La mia campionessa" },
      { src: "images/28.jpeg", caption: "Te e il tramonto 😍" },
      { src: "images/29.jpeg", caption: "La mia principessa" }
    ]
  },
  {
    title: "San Marino",
    coords: [43.93791172968929, 12.446011573314342],
    images: [
      { src: "images/22.jpeg", caption: "Funivia" },
      { src: "images/23.jpeg", caption: "" },
      { src: "images/25.jpeg", caption: "La mia diva" }
    ]
  },
  {
    title: "Gardaland",
    coords: [45.45454137795561, 10.713949788814105],
    images: [
      { src: "images/30.JPG", caption: "" },
      { src: "images/31.JPG", caption: "" },
      { src: "images/32.JPG", caption: "Halloween" }
    ]
  },
  {
    title: "La Thuile",
    coords: [45.71038651236714, 6.948895836263359],
    images: [
      { src: "images/33.JPG", caption: "La neveeee" },
      { src: "images/34.JPG", caption: "" },
      { src: "images/35.JPG", caption: "Il nostro piccolo" }
    ]
  },
  {
    title: "Palavela",
    coords: [45.02356232833534, 7.66914575020416],
    images: [
      { src: "images/36.JPG", caption: "" },
      { src: "images/37.JPG", caption: "La mia pattinatrice preferita" }
    ]
  },
  {
    title: "Zoom",
    coords: [44.932409265009, 7.420601654363811],
    images: [
      { src: "images/36.JPG", caption: "La mia scimmietta" },
      { src: "images/37.JPG", caption: "Ellie (versione più bella)" }
    ]
  }
];

function initMap() {
  /* Centrata sull'Italia, zoom 6 mostra tutta la penisola */
  const map = L.map('map').setView([42.5, 12.5], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  places.forEach((place, index) => {

    const slides = place.images.map(img => `
      <div class="swiper-slide">
        <img src="${img.src}" alt="${place.title}" />
        <div class="slide-caption">${img.caption}</div>
      </div>
    `).join('');

    const popupContent = `
      <div class="popup-content">
        <h2>${place.title}</h2>
        <div class="swiper swiper-${index}">
          <div class="swiper-wrapper">
            ${slides}
          </div>
        </div>
      </div>
    `;

    const marker = L.marker(place.coords).addTo(map);
    marker.bindPopup(popupContent, { maxWidth: 360 });

    marker.on('popupopen', () => {
      new Swiper(`.swiper-${index}`, {
        loop: true,
        autoHeight: true,
        autoplay: { delay: 2500 }
      });
    });
  });
}