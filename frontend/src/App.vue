<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

const loggedIn = ref(false)

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  localStorage.removeItem('nickname')
  document.location.href="/";
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if(token){
    loggedIn.value = true
  }
})
</script>

<template>
  <div class="app">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <template v-if="loggedIn">  
            <RouterLink to="/todos">Todos</RouterLink>
            <a @click="logout()">Logout</a>
          </template>
          <template v-else>
            <RouterLink to="/login">Login</RouterLink>
          </template>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app{
  display: flex;
  flex-direction: column;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: rem;
}

nav a.router-link-exact-active {
  color: palevioletred;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {

  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: palevioletred;
  
}

nav a:first-of-type {
  border: 1px;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;
    color: palevioletred;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
