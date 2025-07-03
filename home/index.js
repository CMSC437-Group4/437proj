document.addEventListener('DOMContentLoaded', function() {
    // Different flight metrics
    const flightData = {
        altitudes: [36000, 35500, 36500, 35000], 
        speeds: [540, 560, 550, 530],             
        temperatures: [62, 60, 58, 55],           
        times: ["4h 15m", "4h 00m", "3h 45m", "3h 30m"]
    };

    let currentIndex = 0;

    function updateFlightMetrics() {
        // Update all metrics using the same index
        document.getElementById('altitude').textContent = flightData.altitudes[currentIndex] + ' ft';
        document.getElementById('speed').textContent = flightData.speeds[currentIndex] + ' mph';
        document.getElementById('temperature').textContent = flightData.temperatures[currentIndex] + '°F';
        document.getElementById('time-remaining').textContent = flightData.times[currentIndex];

        // Move to next position (loops back after 4)
        currentIndex = (currentIndex + 1) % 4;

        // Update every 10 seconds
        setTimeout(updateFlightMetrics, 10000);
    }

    updateFlightMetrics();
});