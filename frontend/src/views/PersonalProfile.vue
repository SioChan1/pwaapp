<template>
    <div>
        <img src="../assets/profile.png" alt="profile picture in pink">
        <p>
            {{ data.name }}
        </p>
        <p>
            {{ data.email }}
        </p>

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

        <button >Edit Task</button>
      </router-link>
      <button @click="deleteAndUpdateTodo(todo._id)">Delete Task</button>
    </div>
</div>
</template>

<style lang="css" scoped>

    img{
        height: 185px;
        width: 185px;
        margin: 5%;
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

    fetch('http://localhost:3000/specificUserData/' + route.params.id)
    .then(fetchData => {
        fetchData.json().then(UserData => {
            UserData = UserData[0]
            
            data.value.name = UserData.nickname
            data.value.email = UserData.username
            fetch('http://localhost:3000/todos/taskByNickname/' + UserData.nickname)
            .then(fetchTodo => {
                fetchTodo.json().then(Todos => {
                    data.value.todos = Todos
                })
            })
        })
    })


</script>