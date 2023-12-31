fetch('news-data.csv')
  .then(response => response.text())
  .then(data => {
    const csvData = Papa.parse(data, { header: true });

    // Create Leaflet map
    const map = L.map('map').setView([37.09024, -95.712891], 8); // Adjust initial center as needed
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers
    csvData.forEach(row => {
      L.marker([row.latitude, row.longitude])
        .addTo(map)
        .on('click', () => {
          // Display news content
          document.getElementById('news-content').innerHTML = `
            <h2>${row.time}</h2>
            <p>${row.location}</p>
            <p>${row.content}</p>
          `;
        });
    });
  });

