document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('parental-toggle');
    const status = document.getElementById('parental-status-text');

    if (toggle && status) {
        // Set the initial state on page load
        status.textContent = toggle.checked ? 'Enabled' : 'Disabled';

        // Add one change listener
        toggle.addEventListener('change', function () {
            status.textContent = this.checked ? 'Enabled' : 'Disabled';
        });
    }
});
