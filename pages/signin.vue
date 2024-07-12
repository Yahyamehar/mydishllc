<template>
    <section class="login-section section-ptb">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb--30 mb-lg-0">
                    <div class="eflux-login-form-area">
                        <h2>Login</h2>
                        <p>Welcome back! Please sign in to your account.</p>

                        <form @submit.prevent="handleLogin" class="eflux-login-form">
                            <div class="input-item">
                                <label for="email">Email</label>
                                <input v-model="formData.email" type="email" id="email" name="email"
                                    placeholder="Enter your Email Address" required />
                            </div>

                            <div class="input-item">
                                <label for="password">Password</label>
                                <input v-model="formData.password" type="password" id="password" name="password"
                                    placeholder="Enter your Password" required />
                            </div>

                            <div>
                                <button type="submit" class="submit">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="new-customer-container">
                        <h2>New Customer</h2>
                        <div class="new-customer-box">
                            <h6>Create a New Account</h6>
                            <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                                able to order from our shop. To start shopping, click register.</p>
                            <NuxtLink to="signup" class="signup-btn">Sign Up</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
  <!-- Add a loading state -->
  <script setup>
  import { ref, getCurrentInstance } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  const formData = ref({
    email: '',
    password: '',
  });
  
  const { proxy } = getCurrentInstance();
  const router = proxy.$router;
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData.value);
  
      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      // Redirect to the profile route or another appropriate route after successful login
      router.push('/dashboardprofile');
  
      // Display a success message with SweetAlert
      await Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
  
      // Display a more informative error message
      await Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: error.response?.data?.error || 'An unexpected error occurred',
      });
    }
  };
  </script>
  