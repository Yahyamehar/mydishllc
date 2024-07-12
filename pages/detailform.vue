<template>
    <!-- dashboard-section start -->
    <section class="dashboard-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-7">
                    <div class="form-item billing-item bg-color-white box-shadow p-3 p-lg-5 border-radius5">
                        <h6>Billing Detail</h6>
                        <form @submit.prevent="submitForm" class="billing-form">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="input-item">
                                        <label>First Name*</label>
                                        <input v-model="firstName" type="text" name="name" required />
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-item">
                                        <label>Last Name*</label>
                                        <input v-model="lastName" type="text" name="name" required />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-item">
                                        <label>Address*</label>
                                        <input v-model="address" type="text" placeholder="Write your address" name="address"
                                            required />
                                    </div>
                                    <div class="input-item">
                                        <label>Postal Code*</label>
                                        <input v-model="postalCode" type="text" placeholder="0000-000" name="postal-code"
                                            required />
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-item">
                                        <label>Email*</label>
                                        <input v-model="email" type="text" placeholder="enter your email" name="email"
                                            required />
                                        <span v-if="!email">Email is required</span>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-item">
                                        <label>Mobile*</label>
                                        <input v-model="mobile" type="text" placeholder="+49 " name="mobile" required />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="form-item payment-item bg-color-white box-shadow p-3 p-lg-5 border-radius5">
                        <h6>Payment</h6>
                        <!-- <form action="#" class="payment-form">
                            <div class="card-details">
                                <div class="input-item">
                                    <label>Card Holder Name*</label>
                                    <input v-model="cardName" type="text" placeholder="John Doe" required />
                                </div>
                                <div class="input-item">
                                    <label>Card Number*</label>
                                    <input v-model="cardNumber" type="text" placeholder="**** **** **** ****" required />
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-item">
                                            <label>Expiry Date*</label>
                                            <input v-model="expireDate" type="text" placeholder="MM/YY" required />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-item">
                                            <label>CVV*</label>
                                            <input v-model="cvv" type="text" placeholder="***" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form> -->
                        <div class="payment-image">
                            <img src="assets/images/payment/01.png" alt="payment" />
                        </div>
                        <div class="text-right">
                            <NuxtLink @click="submitForm" :disabled="isSubmitting" class="place-order-btn">
                                {{ isSubmitting ? 'Placing Order...' : 'Place Order' }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="cart-item sitebar-cart bg-color-white box-shadow p-3 p-lg-5 border-radius5">
                        <div class="cart-footer">
                            <div class="cart-total">
                                <p class="total-amount d-flex justify-content-between">
                                    <span>Price</span>
                                    <span>${{ $route.query.price }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- dashboard-section end -->
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isSubmitting = ref(false);

const firstName = ref('');
const lastName = ref('');
const address = ref('');
const postalCode = ref('');
const email = ref('');
const mobile = ref('');

const cardName = ref('');
const cardNumber = ref('');
const expireDate = ref('');
const cvv = ref('');

const submitForm = async () => {
    if (isSubmitting.value) {
        return;
    }

    if (!validateForm()) {
        return;
    }

    isSubmitting.value = true;

    let orderNumber;

    try {
        // Show loading feedback
        Swal.fire({
            title: 'Submitting...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });

        // Generate a random order number
        orderNumber = Math.floor(100000 + Math.random() * 900000);

        await axios.post('http://localhost:5000/api/paymentdetail', {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            postalCode: postalCode.value,
            email: email.value,
            mobile: mobile.value,
            paymentMethod: 'Check Payment',
            price: route.query.price,
            cardName: cardName.value,
            cardNumber: cardNumber.value,
            expireDate: expireDate.value,
            cvv: cvv.value,
        });

        // Close loading feedback and show success message
        Swal.fire({
            icon: 'success',
            title: 'Order Placed Successfully!',
            text: 'Thank you for your purchase.',
            confirmButtonText: 'OK',
        });

        // Redirect to order success page
        router.push({
            path: '/orderprocess',
            query: {
                orderNumber: orderNumber,
                email: email.value,
                price: route.query.price,
            },
        });
    } catch (error) {
        console.error('Error submitting form:', error);

        // Show error message
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again later.',
            confirmButtonText: 'OK',
        });
    } finally {
        // Close loading feedback
        Swal.close();
        isSubmitting.value = false;
    }
};

const validateForm = () => {
    const requiredFields = [
        { field: firstName, label: 'First Name' },
        { field: lastName, label: 'Last Name' },
        { field: address, label: 'Address' },
        { field: postalCode, label: 'Postal Code' },
        { field: email, label: 'Email' },
        { field: mobile, label: 'Mobile' },
        { field: cardName, label: 'Card Holder Name' },
        { field: cardNumber, label: 'Card Number' },
        { field: expireDate, label: 'Expiry Date' },
        { field: cvv, label: 'CVV' },
    ];

    const emptyFields = requiredFields.filter((field) => !field.field.value);

    if (emptyFields.length > 0) {
        const errorMessage = `Please fill out all required fields:\n${emptyFields.map((field) => `- ${field.label}`).join('\n')}`;
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            confirmButtonText: 'OK',
        });
        return false;
    }

    // Additional validations
    if (!/^\d{14}$/.test(cardNumber.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Card number must be 14 digits.',
            confirmButtonText: 'OK',
        });
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expireDate.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Expiry date must be in the format MM/YY.',
            confirmButtonText: 'OK',
        });
        return false;
    }

    if (!/^\d{3}$/.test(cvv.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'CVV must be 3 digits.',
            confirmButtonText: 'OK',
        });
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid email address.',
            confirmButtonText: 'OK',
        });
        return false;
    }

    if (!/^\d{5}(-\d{4})?$/.test(postalCode.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid postal code. Must be in the format XXXXX or XXXXX-XXXX.',
            confirmButtonText: 'OK',
        });
        return false;
    }

    return true;
};
</script>



  
<style scoped>
.billing-form .submit-btn {
    background-color: #007bff;
    /* Blue color, you can customize */
    color: #fff;
    /* White text, you can customize */
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
}

.billing-form .submit-btn:hover {
    background-color: #0056b3;
    /* Darker blue on hover, you can customize */
}

.payment-form {
    margin-top: 20px;
}

.card-details {
    margin-top: 20px;
}

.card-details .input-item {
    margin-bottom: 15px;
}

.card-details label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
}

.card-details input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    margin-bottom: 15px;
}

.place-order-btn {
    background-color: #00ff5e;
    /* Green color, you can customize */
    color: #ffffff;
    /* White text, you can customize */
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 5px;
    text-decoration: none;
    cursor: pointer;
}

.place-order-btn:hover {
    background-color: #218838;
    /* Darker green on hover, you can customize */
}
</style>
  