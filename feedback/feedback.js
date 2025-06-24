// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('feedbackForm');
    const categorySelect = document.getElementById('category');
    const commentsTextarea = document.getElementById('comments');
    const submitBtn = document.getElementById('submitBtn');
    const categoryError = document.getElementById('categoryError');
    const commentsError = document.getElementById('commentsError');
    const successMessage = document.getElementById('successMessage');
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    const ratingText = document.getElementById('ratingText');

    // Star Rating Functionality
    stars.forEach(function(star) {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Update all stars (fill up to the clicked one)
            stars.forEach(function(starElement, index) {
                if (index < rating) {
                    starElement.classList.add('active'); // Filled star
                } else {
                    starElement.classList.remove('active'); // Empty star
                }
            });
            
            // Update rating text
            const ratingMessages = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
            ratingText.textContent = ratingMessages[rating];
            ratingText.style.color = "white";
        });
    });

    // Clear category error when user makes a selection
    categorySelect.addEventListener('change', function() {
        if (this.value) {
            this.classList.remove('error');
            categoryError.style.display = 'none';
        }
    });

    // Clear comments error when user starts typing
    commentsTextarea.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('error');
            commentsError.style.display = 'none';
        }
    });

    // Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        resetErrors();
        
        // Validate each field 
        let isValid = true;
        
        // Validate category selection
        if (!categorySelect.value) {
            categorySelect.classList.add('error');
            categoryError.style.display = 'block';
            isValid = false;
        }
        
        // Validate comments
        if (!commentsTextarea.value.trim()) {
            commentsTextarea.classList.add('error');
            commentsError.style.display = 'block';
            isValid = false;
        }
        
        // Validate rating
        if (ratingInput.value === "0") {
            ratingText.style.color = "#ff3333";
            ratingText.textContent = "Please select a rating";
            isValid = false;
        }
        
        // Submit form if all valid
        if (isValid) {
            submitFeedback();
        }
    });

    // Function to reset all error states
    function resetErrors() {
        // Clear category erorrs
        categorySelect.classList.remove('error');
        categoryError.style.display = 'none';

        // Clear comments errors
        commentsTextarea.classList.remove('error');
        commentsError.style.display = 'none';

        // Reset rating text to white
        ratingText.style.color = "white";
    }

    // Function to handle form submission
    function submitFeedback() {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Simulate form submission
        setTimeout(function() {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Create feedback data object
            const feedbackData = {
                category: categorySelect.value,
                rating: ratingInput.value,
                comments: commentsTextarea.value
            };
            // Log data to console
            console.log('Feedback submitted:', feedbackData);
        }, 1500);
    }
});