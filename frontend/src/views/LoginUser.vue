<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="newUsername">Username</label>
        <input type="text" id="newUsername" v-model="newUsername" required />
      </div>
      <div>
        <label for="newPassword">Password</label>
        <input type="password" id="newPassword" v-model="newPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="registrationMessage">{{ registrationMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      newUsername: '',
      newPassword: '',
      registrationMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        });

        if (response.data.success) {
          // Handle successful login
          console.log(response.data.message);
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        console.error('Error during login', error);
        this.errorMessage = 'An error occurred';
      }
    },
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username: this.newUsername,
          password: this.newPassword,
        });

        if (response.data.success) {
          this.registrationMessage = response.data.message;
        } else {
          this.registrationMessage = response.data.message;
        }
      } catch (error) {
        console.error('Error during registration', error);
        this.registrationMessage = 'An error occurred';
      }
    },
  },
};
</script>
