<template>
  <div class="login-div">
    <h2>Login</h2>
    <form @submit.prevent="login" class="form">
      <div class="form-group">
        <label for="username">Email</label>
        <input type="text" id="username" v-model="data.username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="data.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="data.errorMessage" :class="[data.responseType ? 'success-message' : 'error-message']">{{ data.errorMessage }}</p>

    <h2>Register</h2>
    <form @submit.prevent="register" class="form">
      <div class="form-group">
        <label for="newNickname">Username</label>
        <input type="text" id="newNickname" v-model="data.newNickname" />
      </div>
      <div class="form-group">
        <label for="newUsername">Email</label>
        <input type="text" id="newUsername" v-model="data.newUsername" required />
      </div>
      <div class="form-group">
        <label for="newPassword">Password</label>
        <input type="password" id="newPassword" v-model="data.newPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="data.registrationMessage" :class="[data.responseTypeRegister ? 'success-message' : 'error-message']">{{ data.registrationMessage }}</p>
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
  responseType: true,
  responseTypeRegister: true
})

const login = async () => {
  try {
    const response = await fetch('https://ppwa-api-exam.onrender.com/login', {
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
        localStorage.setItem("nickname", newData.data.nickname)
        /* router.push ("/") */
        document.location.href="/";
        data.value.responseType= true
      })
    } else {
      response.json()
      .then (res =>{
      data.value.errorMessage = res.error;
      })
      data.value.responseType= false
    }
  } catch (error) {
    console.error('Error during login', error);
    data.value.errorMessage = 'An error occurred';
  }
}
const register = async () => {
  try {
    const response = await fetch('https://ppwa-api-exam.onrender.com/register', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.value.newUsername,
        password: data.value.newPassword,
        nickname: data.value.newNickname
      })
    })
    
    if (response.ok) {
      data.value.registrationMessage = "Congratulations, you registered!";
      //document.location.reload();
      data.value.responseTypeRegister= true
    } else {
      response.json()
      .then(res => {
        data.value.registrationMessage = res.error;

      })
      data.value.responseTypeRegister= false
    }
  } catch (error) {
    console.error('Error during registration', error);
    data.value.registrationMessage = 'An error occurred';
  }
}
</script>

<style lang="css" scoped>

.login-div{
  min-height: 100vh;
}

.login-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h2 {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: palevioletred;
}

.form {
  width: 300px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 8px;
  background-color: palevioletred;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>