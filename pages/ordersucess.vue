<template>
    <!-- Product order success section start -->
    <section class="product-order-success-section section-ptb">
        <div class="container">
            <div class="product-order-success-container">
                <div class="product-order-success">
                    <div class="iconimage">
                        <img src="assets/images/checkicon.png" alt="icon">
                    </div>
                    <h2>Your order has been received. To see your order details, you must sign in.</h2>
                    <NuxtLink to="/signin" class="order-btn">View Order Details</NuxtLink>
                </div>
                <div class="order-description">
                    <ul class="order-info">
                        <li>
                            <h6>Your Order Number</h6>
                            <span>:</span>
                            <p>Order#{{ $route.query.orderNumber || 'N/A' }}</p>
                        </li>
                        <li>
                            <h6>Your Order Date </h6>
                            <span>:</span>
                            <p>{{ getCurrentDate() }}</p>
                        </li>
                        <li>
                            <h6>Price</h6>
                            <span>:</span>
                            <p>${{ $route.query.price || 'N/A' }}</p>
                        </li>
                        <!-- Remove tax details section -->
                        <!-- ... (any other content you want to keep) ... -->
                    </ul>
                    <NuxtLink to="/orderprocess" class="view-summery">View a summary of your order</NuxtLink>
                </div>
            </div>
        </div>
    </section>
    <!-- Product order success section end -->
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// Remove the calculateTax and calculateTotalAmount functions
</script>

<style scoped>
/* Your existing styles */
</style>
