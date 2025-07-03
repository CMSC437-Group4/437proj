document.addEventListener("DOMContentLoaded", function () {
    const phoneNumberDiv = document.getElementById('phoneNumber');
    let phoneNumber = "";

    function formatPhoneNumber(num) {
        // only digits
        num = num.replace(/\D/g, '').slice(0, 10);
        if (num.length === 0) return "";
        if (num.length < 4) return `(${num}`;
        if (num.length < 7) return `(${num.slice(0,3)}) ${num.slice(3)}`;
        return `(${num.slice(0,3)}) ${num.slice(3,6)}-${num.slice(6)}`;
    }

    document.querySelectorAll('.keypad button').forEach(btn => {
        btn.addEventListener('click', function () {
            if (phoneNumber.replace(/\D/g, '').length < 10) { 
                phoneNumber += btn.textContent;
                phoneNumberDiv.textContent = formatPhoneNumber(phoneNumber);
            }
        });
    });

    document.querySelector('.clear-btn').addEventListener('click', function () {
        phoneNumber = "";
        phoneNumberDiv.textContent = "";
    });

    document.querySelector('.call-btn').addEventListener('click', function () {
        if (phoneNumber.replace(/\D/g, '').length > 0) {
            alert("Dialing: " + formatPhoneNumber(phoneNumber));
        }
    });

    // --- Customizable duration and cost calculation ---
    const rate = 0.25; 
    const durationInput = document.getElementById('durationInput');
    const costValue = document.getElementById('costValue');
    const rateValue = document.getElementById('rateValue');
    if (rateValue) rateValue.textContent = rate;

    function updateCost() {
        const mins = parseInt(durationInput.value, 10) || 0;
        const cost = (mins * rate).toFixed(2);
        costValue.textContent = cost;
    }

    if (durationInput) {
        durationInput.addEventListener('input', updateCost);
        updateCost();
    }

    // Limit MM/YY and CVC fields to 4 digits
    const mmInput = document.querySelector('.card-inputs input[placeholder="MM/YY"]');
    const cvcInput = document.querySelector('.card-inputs input[placeholder="CW/CVC"]');
    const cardNumberInput = document.querySelector('.card-inputs input[placeholder^="Ex:"]');

    function limitTo4Digits(e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    }
    function limitTo3Digits(e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    }
    function limitTo16Digits(e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16);
    }
    if (mmInput) mmInput.addEventListener('input', limitTo4Digits);
    if (cvcInput) cvcInput.addEventListener('input', limitTo3Digits);
    if (cardNumberInput) cardNumberInput.addEventListener('input', limitTo16Digits);

    const payNowBtn = document.getElementById('payNowBtn');
    const paypalRadio = document.getElementById('paypal');
    const cardRadio = document.getElementById('card');
    const cardInputs = document.querySelectorAll('.card-inputs input');

    function checkPaymentFields() {
        if (paypalRadio.checked) {
            payNowBtn.disabled = true;
            return;
        }
        // check all fields are filled and MM/YY and CVC are 4 digits
        let allFilled = true;
        cardInputs.forEach(input => {
            if (!input.value.trim()) allFilled = false;
        });
        if (
            !mmInput.value.match(/^\d{4}$/) ||
            !cvcInput.value.match(/^\d{3}$/)
        ) {
            allFilled = false;
        }
        payNowBtn.disabled = !allFilled;
    }

    paypalRadio.addEventListener('change', checkPaymentFields);
    cardRadio.addEventListener('change', checkPaymentFields);
    cardInputs.forEach(input => input.addEventListener('input', checkPaymentFields));

    checkPaymentFields();

    payNowBtn.addEventListener('click', function() {
        alert('Payment processed!');
    });
});