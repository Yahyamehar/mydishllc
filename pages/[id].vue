<template>
    <div>
        <div class="goback-container">
            <NuxtLink to="/" class="goback-button">
                <span></span>
            </NuxtLink>
        </div>
        <section class="product-zoom-info-section section-ptb">
            <div class="container">
                <div class="product-zoom-info-container">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <img :src="productDetails.product_image" alt="Product Image">
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details-content">
                                <a class="wish-link" href="#">
                                    <!-- Your existing heart icon code -->
                                </a>
                                <a href="#" class="cata">Category</a>
                                <h2>{{ productDetails.product_name }}</h2>
                                <p class="quantity">{{ productDetails.product_quantity }}</p>
                                <h3 class="price">${{ productDetails.product_price }} <del>${{ productDetails.discount_price }}</del></h3>
                                <div class="price-increase-decrease-group">
                                    <button @click="decrementQuantity" class="btn quantity-left-minus" data-type="minus"
                                        data-field="">-</button>
                                    <input type="text" name="quantity" class="form-controls input-number" :value="quantity"
                                        readonly>
                                    <button @click="incrementQuantity" class="btn quantity-right-plus" data-type="plus"
                                        data-field="">+</button>
                                </div>
                                <p>{{ productDetails.short_description }}</p>
                                <div class="d-flex justify-content-end">
                                    <nuxt-link
                                        :to="{ path: '/detailform', query: { price: totalPrice, product_name: productDetails.product_name } }"
                                        class="buy-now">Wanna Eat - {{ formatCurrency(totalPrice) }}</nuxt-link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="description-review-area section-ptb">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="food-description">
                            <h3>Description</h3>
                            <p>{{ productDetails.product_description }}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="food-ingredients">
                            <h3>Ingredients</h3>
                            <ul>
                                <li>{{ productDetails.product_ingredients}}</li>
                                <!-- Add more ingredients as needed -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const productDetails = ref({});
const quantity = ref(1);
const totalPrice = ref(0);

const incrementQuantity = () => {
    if (quantity.value < 10) {
        quantity.value += 1;
        updateTotalPrice();
    }
};

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value -= 1;
        updateTotalPrice();
    }
};

const updateTotalPrice = () => {
    // Use parseFloat(productDetails.value.product_price) directly
    totalPrice.value = parseFloat(productDetails.value.product_price) * quantity.value;
};

const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
};

const fetchProductDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/products/${route.params.id}`);
        console.log(response);
        productDetails.value = response.data.product;
        updateTotalPrice();
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

onMounted(() => {
    fetchProductDetails();
});
</script>
  
  
  
  
<style lang="scss" scoped>
.goback-container {
    text-align: center;
    margin-top: 20px;
}

.goback-button {
    width: 40px;
    height: 40px;
    background-color: #3498db;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.goback-button span {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 2px;
    background-color: #fff;
    display: block;
}

.goback-button:hover {
    background-color: #2980b9;
}

.product-zoom-info-section {
    img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    .product-details-content {
        /* Add any additional styling for the product details */
    }
}

.price-increase-decrease-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 120px;
}

.decrease-btn,
.increase {
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
}

.input-number {
    width: 40px;
    text-align: center;
    font-size: 16px;
}
</style>