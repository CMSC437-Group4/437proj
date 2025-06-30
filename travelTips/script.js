// Simulated state
const destinationSet = true; // change to false to simulate "No destination"
const isOffline = false;     // change to true to simulate offline mode

const attractions = [
  {
    name: "City Art Museum",
    category: "Museum",
    distance: 5,
    popularity: 90,
    photo: "https://via.placeholder.com/300x150?text=Art+Museum",
    hours: "9 AM - 5 PM",
    admission: "$12",
    transport: "Bus, Taxi"
  },
  {
    name: "Central Bistro",
    category: "Restaurant",
    distance: 3,
    popularity: 95,
    photo: "https://via.placeholder.com/300x150?text=Central+Bistro",
    hours: "11 AM - 11 PM",
    admission: "Free",
    transport: "Walk, Metro"
  },
  {
    name: "History Archive Center",
    category: "Museum",
    distance: 7,
    popularity: 85,
    photo: "https://via.placeholder.com/300x150?text=Archive+Center",
    hours: "10 AM - 6 PM",
    admission: "$10",
    transport: "Metro"
  }
];

// Cached data if offline
const cachedAttractions = attractions.map(a => ({
  ...a,
  photo: isOffline ? null : a.photo
}));

const renderAttractions = (filtered) => {
  const list = document.getElementById('attractionsList');
  list.innerHTML = '';

  if (!filtered.length) {
    list.innerHTML = '<p>No attractions found.</p>';
    return;
  }

  filtered.forEach(attraction => {
    const card = document.createElement('div');
    card.className = 'attraction';
    card.innerHTML = `
      <h3>${attraction.name}</h3>
      ${attraction.photo ? `<img src="${attraction.photo}" alt="${attraction.name}">` : '<p>(Photo unavailable offline)</p>'}
      <p><strong>Category:</strong> ${attraction.category}</p>
      <p><strong>Distance:</strong> ${attraction.distance} km</p>
      <p><strong>Popularity:</strong> ${attraction.popularity}%</p>
      <p><strong>Hours:</strong> ${attraction.hours}</p>
      <p><strong>Admission:</strong> ${attraction.admission}</p>
      <p><strong>Transport:</strong> ${attraction.transport}</p>
    `;
    list.appendChild(card);
  });
};

const applyFilters = () => {
  let filtered = [...cachedAttractions];

  const category = document.getElementById('categoryFilter').value;
  const sort = document.getElementById('sortFilter').value;

  if (category !== 'all') {
    filtered = filtered.filter(a => a.category === category);
  }

  filtered.sort((a, b) => {
    if (sort === 'distance') return a.distance - b.distance;
    if (sort === 'popularity') return b.popularity - a.popularity;
  });

  renderAttractions(filtered);
};

window.onload = () => {
  const status = document.getElementById('destinationStatus');

  if (!destinationSet) {
    status.innerHTML = `<p>Coming soon! Estimated attractions based on flight path.</p>`;
  } else if (isOffline) {
    status.innerHTML = `<p>You are offline. Showing cached attraction data. Some features may be limited.</p>`;
  }

  document.getElementById('categoryFilter').addEventListener('change', applyFilters);
  document.getElementById('sortFilter').addEventListener('change', applyFilters);

  applyFilters();
};