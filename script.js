const places = [
  {
    title: "Venezia",
    coords: [45.4408, 12.3155],
    description: "Il nostro weekend più bello.",
    images: [
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    title: "Lago di Garda",
    coords: [45.6049, 10.6351],
    description: "Tramonto incredibile e pizza gigante.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

const map = L.map('map').setView([45.6, 10.5], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

places.forEach((place, index) => {

  const slides = place.images.map(img => `
    <div class="swiper-slide">
      <img src="${img}" alt="${place.title}" />
    </div>
  `).join("");

  const popupContent = `
    <div class="popup-content">
      <h2>${place.title}</h2>

      <div class="swiper swiper-${index}">
        <div class="swiper-wrapper">
          ${slides}
        </div>
      </div>

      <div class="description">
        ${place.description}
      </div>
    </div>
  `;

  const marker = L.marker(place.coords).addTo(map);

  marker.bindPopup(popupContent);

  marker.on('popupopen', () => {
    new Swiper(`.swiper-${index}`, {
      loop: true,
      autoplay: {
        delay: 2500
      }
    });
  });
});
