<template>
    <div>
        <section class="about-section section-ptb">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7 order-lg-last pr-xl-5">
                        <div class="about-content mb-4 mb-lg-0 pr-lg-5">
                            <h2 class="section-title">Our Food Philosophy</h2>
                            <p>
                                {{ companyInfo?.short_description }}
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-5 order-lg-first">
                        <div class="about-image">
                            <img :src="companyInfo?.main_logo" alt="about image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
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
  
<style scoped>
.about-section {
    padding: 80px 0;
}

.about-content {
    max-width: 600px;
}

.about-content h2.section-title {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
}

.about-content p {
    font-size: 18px;
    line-height: 1.6;
    color: #666;
}

.about-image img {
    width: 100%;
    border-radius: 258px;
}
</style>
  