document.addEventListener("DOMContentLoaded", function () {
    const cart = {};
    const cartContainer = document.querySelector('.your-cart');

    // aren't the users supposed to see what they ordered?! 
    function updateCartDisplay() {
        cartContainer.innerHTML = '';
        let total = 0;
        const checkoutBtn = document.querySelector('.checkout-btn .checkout-btn');
        if (Object.keys(cart).length === 0) {
            cartContainer.innerHTML = '<p class="text-center text-muted">Cart is empty.</p>';
            if (checkoutBtn) checkoutBtn.disabled = true;
            // Remove credit card form if cart is empty
            const ccForm = document.getElementById('cart-cc-form');
            if (ccForm) ccForm.remove();
            return;
        }
        if (checkoutBtn) checkoutBtn.disabled = false;

        const ul = document.createElement('ul');
        ul.className = "list-group mb-3";
        for (const [item, info] of Object.entries(cart)) {
            const li = document.createElement('li');
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>
                    <strong>${item}</strong>
                    <button class="btn btn-sm btn-outline-secondary ms-2 decrement-btn" data-item="${item}">−</button>
                    <span class="mx-2">${info.qty}</span>
                    <button class="btn btn-sm btn-outline-secondary increment-btn" data-item="${item}">+</button>
                </span>
                <span>$${(info.price * info.qty).toFixed(2)}</span>
            `;
            ul.appendChild(li);
            total += info.price * info.qty;
        }
        cartContainer.appendChild(ul);

        const totalDiv = document.createElement('div');
        totalDiv.className = "text-end fw-bold";
        totalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
        cartContainer.appendChild(totalDiv);

        // Credit Card Form
        const ccForm = document.createElement('form');
        ccForm.id = 'cart-cc-form';
        ccForm.innerHTML = `
            <div class="mb-2">
                <input type="text" class="form-control mb-2" id="cc-number" placeholder="Card Number (16 digits)" maxlength="16" pattern="\\d{16}" required>
                <div class="d-flex">
                    <input type="text" class="form-control me-2" id="cc-exp" placeholder="MM/YY" maxlength="5" required>
                    <input type="text" class="form-control" id="cc-cvc" placeholder="CVC" maxlength="4" required>
                </div>
                <input type="text" class="form-control mt-2" id="cc-name" placeholder="Name on Card" required>
            </div>
        `;
        cartContainer.appendChild(ccForm);

        // add event listeners for increment/decrement
        cartContainer.querySelectorAll('.increment-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const item = btn.getAttribute('data-item');
                cart[item].qty += 1;
                updateCartDisplay();
            });
        });
        cartContainer.querySelectorAll('.decrement-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const item = btn.getAttribute('data-item');
                cart[item].qty -= 1;
                if (cart[item].qty <= 0) {
                    delete cart[item];
                }
                updateCartDisplay();
            });
        });

        // Enable/disable checkout button based on credit card fields
        setTimeout(() => { // Wait for DOM to update
            const ccNumber = document.getElementById('cc-number');
            const ccExp = document.getElementById('cc-exp');
            const ccCvc = document.getElementById('cc-cvc');
            const ccName = document.getElementById('cc-name');
            const checkoutBtn = document.querySelector('.checkout-btn .checkout-btn');
            function validateCC() {
                const valid =
                    ccNumber.value.trim().length === 16 &&
                    /^\d{16}$/.test(ccNumber.value.trim()) &&
                    ccExp.value.trim().match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
                    ccCvc.value.trim().length >= 3 && ccCvc.value.trim().length <= 4 &&
                    /^\d{3,4}$/.test(ccCvc.value.trim()) &&
                    ccName.value.trim().length > 0;
                checkoutBtn.disabled = !valid;
            }
            [ccNumber, ccExp, ccCvc, ccName].forEach(input => {
                input.addEventListener('input', validateCC);
            });
            validateCC();
        }, 0);
    }

    // show the items that the user has selected
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = btn.closest('.card');
            const name = card.querySelector('.card-title').textContent.trim();
            const price = parseFloat(card.querySelector('.card-text').textContent.replace('$', ''));
            if (!cart[name]) {
                cart[name] = { price: price, qty: 1 };
            } else {
                cart[name].qty += 1;
            }
            updateCartDisplay();
        });
    });

    // nice and smooth scroll to menu sections
    document.querySelector('#meals button').addEventListener('click', function() {
        document.querySelector('.meal-menu').scrollIntoView({ behavior: 'smooth' });
    });
    document.querySelector('#snacks button').addEventListener('click', function() {
        document.querySelector('.snack-menu').scrollIntoView({ behavior: 'smooth' });
    });
    document.querySelector('#drinks button').addEventListener('click', function() {
        document.querySelector('.drink-menu').scrollIntoView({ behavior: 'smooth' });
    });

    // checkout confirmation
    document.querySelector('.checkout-btn .checkout-btn').addEventListener('click', function () {
        const cartContainer = document.querySelector('.your-cart');
        let orderList = '<ul class="list-group mb-3">';
        for (const [item, info] of Object.entries(cart)) {
            orderList += `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span><strong>${item}</strong></span>
                <span>Qty: ${info.qty}</span>
            </li>`;
        }
        orderList += '</ul>';

        cartContainer.innerHTML = `
            <div class="alert alert-success text-center" role="alert">
                <h5 class="mb-2">Order Placed!</h5>
                <p>Thank you!<br>The crew will deliver your order momentarily.</p>
                <div class="mt-3">
                    <strong>Your Order:</strong>
                    ${orderList}
                </div>
            </div>
        `;
        // disable the checkout button...why should they checkout twice? they shouldn't, exactly, 
        // so im disabling this before they break something.
        this.disabled = true;
    });

    updateCartDisplay();
});