document.addEventListener("DOMContentLoaded", function () {
    const cart = {};
    const cartContainer = document.querySelector('.your-cart');

    // aren't the users supposed to see what they ordered?! 
    function updateCartDisplay() {
        cartContainer.innerHTML = '';
        let total = 0;
        if (Object.keys(cart).length === 0) {
            cartContainer.innerHTML = '<p class="text-center text-muted">Cart is empty.</p>';
            return;
        }
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

    updateCartDisplay();
});