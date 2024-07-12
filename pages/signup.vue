<template>
  <div>
    <section class="login-section section-ptb">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="eflux-login-form-area">
              <h2>Create an Account</h2>
              <p>Welcome! Please fill in the following details to create your account.</p>

              <form @submit.prevent="handleSubmit" class="eflux-login-form">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="input-item">
                      <label for="firstName">First Name</label>
                      <input v-model="formData.firstName" type="text" id="firstName" name="firstName"
                        placeholder="Enter your First Name" required />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="input-item">
                      <label for="lastName">Last Name</label>
                      <input v-model="formData.lastName" type="text" id="lastName" name="lastName"
                        placeholder="Enter your Last Name" required />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="input-item">
                      <label for="email">Email</label>
                      <input v-model="formData.email" type="email" id="email" name="email"
                        placeholder="Enter your Email Address" required />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="input-item">
                      <label for="password">Password</label>
                      <input v-model="formData.password" type="password" id="password" name="password"
                        placeholder="Enter your Password" required />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="input-item">
                      <label for="rePassword">Re-Password</label>
                      <input v-model="formData.rePassword" type="password" id="rePassword" name="rePassword"
                        placeholder="Enter your Password Again" required />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="input-item">
                      <label for="phoneNumber">Phone Number</label>
                      <input v-model="formData.phoneNumber" type="tel" id="phoneNumber" name="phoneNumber"
                        placeholder="+49 Phone Number" required />
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" class="submit">Create Account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: '',
  phoneNumber: '',
});

const users = ref([]);
const errorMessage = ref('');

const { proxy } = getCurrentInstance();
const router = proxy.$router;

const handleSubmit = async () => {
  console.log('Form Data:', formData.value);
  errorMessage.value = ''; // Clear any previous error messages

  // Validation checks
  
console.log(formData.value);
  try {
    await axios.post('http://localhost:5000/api/register', formData.value);

    // Display a success message with SweetAlert
    await Swal.fire({
      icon: 'success',
      title: 'Account registered successfully!',
      showConfirmButton: false,
      timer: 1500,
    });

    // Clear form data
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      phoneNumber: '',
    };

    await fetchAllUsers();

    // Redirect to the signin route
    router.push('/signin');
  } catch (error) {
    console.error(error);

    // Display an error message with SweetAlert
    await Swal.fire({
      icon: 'error',
      title: 'Registration Error',
      text: 'An error occurred during registration',
    });
  }
};

const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    users.value = response.data.users;
  } catch (error) {
    console.error(error);
    errorMessage.value = 'An error occurred while fetching users';
  }
};

fetchAllUsers();
</script>

<style scoped></style>