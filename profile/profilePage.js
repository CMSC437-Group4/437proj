document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('parental-toggle');
    const status = document.getElementById('parental-status-text');

    if (toggle && status) {
        if (toggle.checked) {
            status.textContent = 'Enabled';}
        else {
            status.textContent = 'Disabled';}

        toggle.addEventListener('change', function () {
            if (this.checked) {
                status.textContent = 'Enabled';}
            else {
                status.textContent = 'Disabled';}
        });
    }

    //loads information from localStorage
    const emailKey = localStorage.getItem('currentUser'); // email used as key suffix
    if (!emailKey) {
        window.location.href = "register.html";
        return;
    } // No user logged in

    const userJson = localStorage.getItem(`user-${emailKey}`);
    if (!userJson) {
        window.location.href = "register.html";
        return;
    }  // No user data found

    const userData = JSON.parse(userJson);

    //sets the name and email on the profile page
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');

    if (profileName) {
        profileName.textContent = `${userData.firstName} ${userData.lastName}`;
    }
    if (profileEmail) {
        profileEmail.textContent = userData.email;
    }
});

