document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    var tabs = document.querySelectorAll('.tab');
    var contents = document.querySelectorAll('.tab-content');
    
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            // Remove active class from all
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
                contents[j].classList.remove('active');
            }
            // Add to clicked
            this.classList.add('active');
            var tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    }

     // Values for alternating flight data
    var speeds = [520, 540, 560, 580];
    var alts = [35000, 36000, 35500, 36500];
    var distances = [1800, 1842, 1885, 1920];
    var currentPosition = 0;

    function updateFlightData() {
        // Update the display with current values
        document.getElementById('speed').textContent = speeds[currentPosition] + " mph";
        document.getElementById('altitude').textContent = alts[currentPosition] + " ft";
        document.getElementById('distance').textContent = distances[currentPosition] + " mi";
        
        currentPosition++;

        // If we reached the end, start over
        if (currentPosition >= speeds.length) {
            currentPosition = 0;
        }
        // Update every 10 seconds
        setTimeout(updateFlightData, 10000);
    }
    
    updateFlightData();
});