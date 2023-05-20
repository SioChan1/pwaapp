<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="data.username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="data.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ data.errorMessage }}</p>
    
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="newUsername">Username</label>
        <input type="text" id="newUsername" v-model="data.newUsername" required />
      </div>
      <div>
        <label for="newPassword">Password</label>
        <input type="password" id="newPassword" v-model="data.newPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="registrationMessage">{{ data.registrationMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref({
  username: "",
  password: '',
  errorMessage: '',
  newUsername: '',
  newPassword: '',
  registrationMessage: '',
})

const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.value.username,
        password: data.value.password
      })
    });

    if (response.ok) {
      response.json().then(newData => {
        localStorage.setItem("id", newData.data.id)
        localStorage.setItem("token", newData.data.token)
      })
    } else {
      data.value.errorMessage = response.message;
    }
  } catch (error) {
    console.error('Error during login', error);
    data.value.errorMessage = 'An error occurred';
  }
}
const register = async () => {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.value.newUsername,
        password: data.value.newPassword
      })
    })
    if (response.success) {
      data.value.registrationMessage = response.message;
    } else {
      data.value.registrationMessage = response.message;
    }
  } catch (error) {
    console.error('Error during registration', error);
    data.value.registrationMessage = 'An error occurred';
  }
}
</script>
