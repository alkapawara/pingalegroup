// script.js
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = [
        {
            id: 1,
            name: 'Product 1',
            price: 10.99,
            image: './assets/img/fwd-images/211110.instant.pot.carrots-6928.jpg',
            rating: 4,
            review: 'This is a great product!',
            quantity: 1
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15.49,
            image: './assets/img/fwd-images/211110.instant.pot.carrots-6928.jpg',
            rating: 5,
            review: 'Excellent quality and fast delivery.',
            quantity: 1
        }
    ];

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    function updateTotalPrice() {
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        totalPriceElement.textContent = totalPrice;
    }

    function createCartItemHTML(item) {
        return `
            <div class="col-12">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${item.image}" class="card-img" alt="Product Image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">$${item.price.toFixed(2)}</p>
                                <div class="rating">
                                    ${[...Array(5)].map((_, i) => i < item.rating ? '<span class="fa fa-star checked"></span>' : '<span class="fa fa-star"></span>').join('')}
                                </div>
                                <p class="review">${item.review}</p>
                                <div class="quantity d-flex align-items-center">
                                    <button class="btn btn-secondary btn-sm mr-2" onclick="updateQuantity(${item.id}, -1)">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="btn btn-secondary btn-sm ml-2" onclick="updateQuantity(${item.id}, 1)">+</button>
                                </div>
                                <button class="btn btn-danger btn-sm mt-3" onclick="removeItem(${item.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = cartItems.map(createCartItemHTML).join('');
        updateTotalPrice();
    }

    window.updateQuantity = function(id, delta) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, item.quantity + delta);
            renderCartItems();
        }
    };

    window.removeItem = function(id) {
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            renderCartItems();
        }
    };

    renderCartItems();
});
