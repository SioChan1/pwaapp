<template>
 <div class="container">
    <img src="../assets/profile.png" alt="profile picture in pink">
    <div class="text-container">
      <h1>{{ data.name }}</h1>
      <h2>{{ data.email }}</h2>
    </div>
  </div>
    <div class="todo-card-container">
    <div v-for="todo in data.todos" :key="todo" class="todo-card">
      <router-link :to="`/todo/${todo._id}`">
        <h3>
          {{ todo.creator }}
        </h3>
        
        <h4>
          {{todo.author}}
          <hr>
        </h4>
        
        <p>
          {{todo.todo}}
        </p>

        <button v-if="localNickname == todo.creator">Edit Task</button>
        <button v-else class="greyButton" disabled>Edit Task</button>
      </router-link>
      
      <button v-if="localNickname == todo.creator" @click="deleteAndUpdateTodo(todo._id)">Delete Task</button>
      <button v-else class="greyButton" disabled>Delete Task</button>
    </div>
</div>
</template>


<style lang="css" scoped>

.greyButton{
  background-color: grey;
  color: darkslategrey;
}
.container {
  display: flex;
  align-items: center; /* Align items vertically */
}

.text-container {
  margin-left: 10px; /* Add some spacing between the image and text */
}

img{
    height: 185px;
    width: 185px;
    margin: 5%;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #2C7DA4;
}

h2 {
    color:#2C7DA4;
}

h3 {
  text-align: right;
  font-weight: bold;
  color: palevioletred;
}

h4 {
  font-weight: bold;
  color: palevioletred;
}

button {
  padding: 8px 16px;
  background-color: palevioletred;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
}
button:first-of-type{
  margin-right: 4px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
  max-width: 100%;
}

textarea{
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
  max-width: 100%;
  resize: vertical;
}

.todo-card-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  grid-gap: 20px; /* Adjust the gap between cards */
}

.todo-card {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  max-width: 100%;
}

h4 {
  font-size: 16px;
  margin-bottom: 5px;
}

p {
  margin-top: 0;
  color: #2C7DA4;
}

.todo-card button {
  margin-top: 10px;
}

.router-link-active {
  background-color: #e0e0e0;
}
</style>

<script setup>
    import { useRoute } from 'vue-router'
    import { ref } from 'vue';
    const route = useRoute()
    console.log(route.params.id)

    const data = ref({
        name: "",
        email: "",
        todos: []
    })

    const localNickname = ref(localStorage.getItem('nickname'))

    fetch('https://ppwa-api-exam.onrender.com/specificUserData/' + route.params.id)
    .then(fetchData => {
        fetchData.json().then(UserData => {
            UserData = UserData[0]
            
            data.value.name = UserData.nickname
            data.value.email = UserData.username
            fetch('https://ppwa-api-exam.onrender.com/todos/taskByNickname/' + UserData.nickname)
            .then(fetchTodo => {
                fetchTodo.json().then(Todos => {
                    data.value.todos = Todos
                })
            })
        })
    })


</script>