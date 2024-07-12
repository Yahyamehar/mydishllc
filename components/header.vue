<template>
    <header class="header">
        <!-- Mobile Header -->
        <div class="mobile-header d-md-none">
            <div class="logo-container">
                <NuxtLink to="/" class="logo"><img :src="companyInfo?.main_logo" alt="logo" height="70" width="70"
                        style="border-radius: 34px;"></NuxtLink>
            </div>
            <div class="menu-container">
                <ul class="site-action">
                    <li class="site-phone" @click="confirmCall">
                        <a><i class="fas fa-phone"></i> {{ companyInfo?.phone_number }}</a>
                    </li>
                    <li class="site-help">
                        <NuxtLink to="contact"><i class="fas fa-question-circle"></i> Help & More</NuxtLink>
                    </li>
                    <li class="auth" v-if="isLoggedIn">
                        <a @click="logout"><i class="fas fa-user mr-2"></i>Logout</a>
                    </li>
                    <li class="auth" v-else>
                        <NuxtLink to="/signin"><i class="fas fa-user mr-2"></i>Sign In</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Desktop Header -->
        <div class="desktop-header d-none d-md-flex">
            <div class="logo-container">
                <NuxtLink to="/" class="logo"><img src="assets/mydish.jpeg" alt="logo" height="70" width="70"
                        style="border-radius: 34px;"></NuxtLink>
            </div>
            <div class="menu-container">
                <ul class="site-action">
                    <li class="site-phone" @click="confirmCall">
                        <a><i class="fas fa-phone"></i> {{ companyInfo?.phone_number }}</a>
                    </li>
                    <li class="site-help">
                        <NuxtLink to="contact"><i class="fas fa-question-circle"></i> Help & More</NuxtLink>
                    </li>
                    <li class="auth" v-if="isLoggedIn">
                        <a @click="logout"><i class="fas fa-user mr-2"></i>Logout</a>
                    </li>
                    <li class="auth" v-else>
                        <NuxtLink to="/signin"><i class="fas fa-user mr-2"></i>Sign In</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <hr>

        <!-- Header Bottom -->
        <div class="header-bottom">
            <div class="row m-0 align-items-center mega-menu-relative">
                <div class="col-md-2 p-0 d-none d-xl-block"></div>
                <div class="col-md-10">
                    <div class="menu-area d-none d-xl-flex justify-content-between align-items-center">
                        <ul class="menu d-xl-flex flex-wrap list-unstyled">
                            <li class="item-has-children">
                                <NuxtLink to="/">Home</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/about">About Us</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/contact">Contact Us</NuxtLink>
                            </li>
                            <li v-if="isLoggedIn">
                                <NuxtLink to="/dashboard">My Dashboard</NuxtLink>
                            </li>
                            <li v-if="!isLoggedIn">
                                <NuxtLink to="/signin">Sign In</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import axios from 'axios';

const isLoggedIn = ref(false);
const router = useRouter();
const companyInfo = ref(null);

// Function to fetch phone number and logo from the API

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/companydetails');
        companyInfo.value = response.data.companyInfo;
    } catch (error) {
        console.error('Error fetching company information:', error.message);
    }
});

const confirmCall = () => {
    Swal.fire({
        title: 'Do you want to make a call?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        icon: 'question',
    }).then((result) => {
        if (result.isConfirmed) {
            // Implement the logic to make a call
            router.push('/contact');
        }
    });
};

const logout = () => {
    // Implement the logout logic here
    // For example, clear user data from local storage
    localStorage.removeItem('user');
    isLoggedIn.value = false;

    // Display a confirmation message with SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Logout successful!',
        showConfirmButton: false,
        timer: 1500,
    });

    // Redirect to the home page or another appropriate route
    router.push('/');
};

// Check user authentication status when the component is mounted
onMounted(async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
        isLoggedIn.value = true;
    }

    // Fetch phone number and logo from the API
    await fetchCompanyInfo();
});

// Computed property to dynamically update UI when isLoggedIn changes
const showLogout = computed(() => isLoggedIn.value);
</script>



<style scoped>
.header {
    /* Add any global header styles here */
}

.mobile-header,
.desktop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
}

.menu-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

.logo-container,
.menu-container {
    flex: 1;
}

.site-action {
    list-style: none;
    display: flex;
    gap: 10px;
}

.site-phone a {
    display: flex;
    align-items: center;
}

.site-phone i {
    margin-right: 5px;
}

/* Media Query for Mobile */
@media only screen and (max-width: 767px) {
    .desktop-header {
        display: none;
    }

    .mobile-header {
        flex-direction: column;
    }
}
</style>
