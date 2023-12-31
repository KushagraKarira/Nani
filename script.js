$(document).ready(function () {
    // Initialize Leaflet map
    var map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Load CSV data and process
    $.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });

    function processData(allText) {
        var allTextLines = allText.split('\n');
        var headers = allTextLines[0].split('\t');

        for (var i = 1; i < allTextLines.length; i++) {
            var data = allTextLines[i].split('\t');
            if (data.length === headers.length) {
                createMarker(data);
                createNewsEntry(data, headers);
            }
        }
    }

    function createMarker(data) {
        var location = [parseFloat(data[1]), parseFloat(data[2])];
        L.marker(location).addTo(map)
            .bindPopup(`<b>${data[4]}</b><br>${data[3]}`);
    }

    function createNewsEntry(data, headers) {
        var newsEntry = `<div class="news-item">
                            <h3>${data[2]}</h3>
                            <p><strong>${headers[2]}:</strong> ${data[2]}</p>
                            <p><strong>${headers[4]}:</strong> ${data[4]}</p>
                            <p><strong>${headers[5]}:</strong> ${data[5]}</p>
                         </div>`;
        $('#news').append(newsEntry);
    }
});

