<template>
    <section class="contact-section section-ptb">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 mb-4 mb-lg-0">
                    <div class="contact-info-wrapper">
                        <div class="contact-info">
                            <h4>Get In Touch</h4>
                            <p>{{ companyInfo?.contact_information }} </p>
                            <ul class="contact-details">
                                <li>
                                    <span class="title">Address</span>
                                    <span class="desc"> {{ companyInfo?.address }}
                                        </span>
                                </li>
                                <li>
                                    <span class="title">Phone</span>
                                    <span class="desc"> {{ companyInfo?.phone_number }} - Office <br> {{ companyInfo?.phone_number }} - Fax</span>
                                </li>
                                <li>
                                    <span class="title">Email</span>
                                    <span class="desc"> {{ companyInfo?.email }} <br> {{ companyInfo?.email }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="contact-form-area">
                        <form action="#" class="contact-form">
                            <div class="input-item">
                                <input type="text" name="name" placeholder="Full Name">
                                <i class="fas fa-user"></i>
                            </div>

                            <div class="input-item">
                                <input type="text" name="phone" placeholder="Your Phone Number">
                                <i class="fas fa-mobile-alt"></i>
                            </div>

                            <div class="input-item">
                                <input type="email" name="email" placeholder="Email Address">
                                <i class="fas fa-envelope"></i>
                            </div>

                            <div class="input-item">
                                <input type="text" name="website" placeholder="Your Website">
                                <i class="fas fa-globe"></i>
                            </div>

                            <div class="input-item">
                                <textarea name="message" placeholder="Type Here Message"></textarea>
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <div>
                                <button type="submit" class="submit">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';

const companyInfo = ref(null);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/companydetails');
        companyInfo.value = response.data.companyInfo;
    } catch (error) {
        console.error('Error fetching company information:', error.message);
    }
});

</script>

<style scoped></style>