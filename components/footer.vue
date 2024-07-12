<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-newsletter">
                <div class="row align-items-center">
                    <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                        <div class="newsletter-heading">
                            <h5>Know it all first</h5>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex justify-content-center justify-content-md-end">
                        <div class="newsletter-form">
                            <input type="text" name="email" placeholder="E-mail Address">
                            <button class="submit-btn">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <path style="fill:#2196F3;"
                                        d="M511.189,259.954c1.649-3.989,0.731-8.579-2.325-11.627l-192-192 c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82l173.803,173.803H10.667 C4.776,245.213,0,249.989,0,255.88c0,5.891,4.776,10.667,10.667,10.667h464.917L301.803,440.328 c-4.237,4.093-4.355,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262l192-192 C509.872,262.42,510.655,261.246,511.189,259.954z" />
                                    <path
                                        d="M309.333,458.546c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571L486.251,255.88 L301.781,71.432c-4.093-4.237-3.975-10.99,0.262-15.083c4.134-3.992,10.687-3.992,14.82,0l192,192 c4.164,4.165,4.164,10.917,0,15.083l-192,192C314.865,457.426,312.157,458.546,309.333,458.546z" />
                                    <path
                                        d="M501.333,266.546H10.667C4.776,266.546,0,261.771,0,255.88c0-5.891,4.776-10.667,10.667-10.667h490.667 c5.891,0,10.667,4.776,10.667,10.667C512,261.771,507.224,266.546,501.333,266.546z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-top">
                <div class="row">
                    <div class="col-md-6 col-lg-3">
                        <div class="footer-widget">
                            <NuxtLink to="/" class="footer-logo"><img :src="companyInfo?.footer_logo" alt="logo" height="100"
                                    width="100" style="border-radius: 54px;"></NuxtLink>
                            <p> {{companyInfo?.about_us }}</p>
                            <ul class="social-media-list d-flex flex-wrap">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-vimeo-v"></i></a></li>
                                <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <div class="footer-widget">
                            <h5 class="footer-title">Product Catalog</h5>
                            <div class="widget-wrapper">
                                <ul>
                                    <li><NuxtLink to="/">Lahmacun</NuxtLink></li>
                                    <li><NuxtLink to="/">Dolma</NuxtLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <div class="footer-widget">
                            <h5 class="footer-title">Useful Links</h5>
                            <div class="widget-wrapper">
                                <ul>
                                    <li><NuxtLink to="about">About Us</NuxtLink></li>
                                    <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <div class="footer-widget">
                            <h5 class="footer-title">Download Apps</h5>
                            <div class="widget-wrapper">
                                <div class="apps-store">
                                    <a href=""><img src="assets/images/app-store/apple.png" alt="app"></a>
                                    <a href=""><img src="assets/images/app-store/google.png" alt="app"></a>
                                </div>
                                <div class="payment-method d-flex flex-wrap">
                                    <a href="#"><img src="assets/images/payment/visa.png" alt="payment"></a>
                                    <a href="#"><img src="assets/images/payment/paypal.png" alt="payment"></a>
                                    <a href="#"><img src="assets/images/payment/master.png" alt="payment"></a>
                                    <a href="#"><img src="assets/images/payment/discover.png" alt="payment"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="row">
                    <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                        <p class="copyright">Copyright &copy; 2023 <a href="">MyDIsh</a>. All Rights Reserved.
                        </p>
                    </div>

                    <div class="col-md-6 d-flex justify-content-center justify-content-md-end">
                        <ul class="footer-menu d-flex flex-wrap">
                            <li><a href="#">Privacy policies</a></li>
                            <li><a href="#">Coockies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
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