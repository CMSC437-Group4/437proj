// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const otherCheckbox = document.getElementById('other');
    const otherTextInput = document.getElementById('otherText');
    const submitBtn = document.getElementById('submitRequest');
    const cancelBtn = document.getElementById('cancelRequest');
    const formSection = document.getElementById('formSection');
    const confirmationSection = document.getElementById('confirmationSection');
    const requestDetails = document.getElementById('requestDetails');
    const urgencyItems = document.querySelectorAll('.urgency-item');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Toggle visibility of "Other" text input based on checkbox state
    otherCheckbox.addEventListener('change', function() {
        otherTextInput.style.display = this.checked ? 'block' : 'none';
        validateForm();
    });
    
    // Update validation as user inputs text
    otherTextInput.addEventListener('input', validateForm);

    // Add click handlers for urgency items to style them when selected
    urgencyItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected class from all items
            urgencyItems.forEach(i => i.classList.remove('selected'));
            // Add selected class to clicked item
            this.classList.add('selected');
            // Check the associated radio button
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            validateForm();
        });
    });
    
    // Revalidate when any checkbox changes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateForm);
    });
    
    // Handle form submission
    submitBtn.addEventListener('click', function() {
        // Collect all selected assistance categories
        const selectedCategories = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
            if (cb.value === 'Other') {
                // Include the custom text if "Other" is selected
                selectedCategories.push(`Other: ${otherTextInput.value}`);
            } else {
                selectedCategories.push(cb.value);
            }
        });
        
        // Get the selected urgency level
        const urgency = document.querySelector('input[name="urgency"]:checked').value;
        // Get time of submission 
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        
        // Hide form and show confirmation
        formSection.style.display = 'none';
        confirmationSection.style.display = 'block';
        
        // Display submission details
        requestDetails.innerHTML = `
            <strong>Request:</strong> ${selectedCategories.join(', ')}<br>
            <strong>Priority:</strong> ${urgency}<br>
            <strong>Seat:</strong> 23A <br>
            <strong>Submitted:</strong> ${formattedTime}
        `;
    });
    
    // Cancel button returns to previous page
    cancelBtn.addEventListener('click', function() {
        window.history.back();
    });
    
    // Form validation function
    function validateForm() {
        // Check if at least one checkbox is selected
        const hasSelection = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;
        // Check if urgency level is selected
        const urgencySelected = document.querySelector('input[name="urgency"]:checked') !== null;
        // If "Other" is selected, make sure text is provided
        const otherValid = !otherCheckbox.checked || (otherCheckbox.checked && otherTextInput.value.trim() !== '');
        
        // Enable submit button only if all validations pass
        submitBtn.disabled = !(hasSelection && urgencySelected && otherValid);
    }
});