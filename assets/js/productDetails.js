// script.js
document.addEventListener('DOMContentLoaded', function() {
    const product = {
        id: 1,
        name: 'Product 1',
        price: 19.99,
        image: './assets/img/fwd-images/211110.instant.pot.carrots-6928.jpg',
        rating: 4,
        description: 'This is a detailed description of the product. It provides all the information a customer would need.',
        reviews: [
            {
                user: 'John Doe',
                rating: 5,
                comment: 'Excellent product, highly recommend!'
            },
            {
                user: 'Jane Smith',
                rating: 4,
                comment: 'Very good, but could be improved in some areas.'
            }
        ]
    };

    function renderProductDetails(product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-description').textContent = product.description;

        const ratingElement = document.getElementById('product-rating');
        ratingElement.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = i < product.rating ? 'fa fa-star' : 'fa fa-star-o';
            ratingElement.appendChild(star);
        }

        const reviewsElement = document.getElementById('product-reviews');
        reviewsElement.innerHTML = '';

        product.reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'list-group-item';

            const reviewUser = document.createElement('h5');
            reviewUser.className = 'mb-1';
            reviewUser.textContent = review.user;

            const reviewRating = document.createElement('div');
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.className = i < review.rating ? 'bi bi-star-fill' : 'bi bi-star';
                reviewRating.appendChild(star);
            }

            const reviewComment = document.createElement('p');
            reviewComment.className = 'review mb-1';
            reviewComment.textContent = review.comment;

            reviewItem.appendChild(reviewUser);
            reviewItem.appendChild(reviewRating);
            reviewItem.appendChild(reviewComment);

            reviewsElement.appendChild(reviewItem);
        });
    }

    renderProductDetails(product);

    document.getElementById('submit-comment').addEventListener('click', function() {
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        if (rating && comment) {
            const newReview = {
                user: 'Anonymous',
                rating: parseInt(rating),
                comment: comment
            };

            product.reviews.push(newReview);
            renderProductDetails(product);

            document.getElementById('rating').value = '';
            document.getElementById('comment').value = '';
        }
    });
});
