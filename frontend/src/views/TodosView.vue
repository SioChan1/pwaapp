<template>
<div class="Todos">
  <h1>All Todos</h1>

  <span> Name of the task:</span>
  <input style="display: none" type="text" v-model="state.newNickname">
  <input type="text" placeholder="Task name" v-model="state.newAuthor">

  <span> Task at hand:</span>
  <textarea placeholder="Description of task" v-model="state.newTodoItem"></textarea>

  <button @click="makeTodo()">New Task</button>
  <br>

  <div class="todo-card-container">
    <div v-for="todo in state.todos" :key="todo" class="todo-card">
      <router-link v-if="UserData.length != 0" :to="`/profile/` + convertNicknameToId(todo.creator)">
        <h3>
          {{ todo.creator }}
        </h3>
      </router-link>
      <router-link :to="`/todo/${todo._id}`">
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
</div>
</template>

<script>
import todocrud from '../modules/todocrud'
import { onMounted, ref } from 'vue'

  export default {
    setup() {

      const { state, GetAllTodos, newTodo, deleteTodo, editTodo  } = todocrud()

      const UserData = ref([])

      const localNickname = ref(localStorage.getItem('nickname'))


      GetAllTodos()
      .then(() => {
        getIds()
      })

      
      onMounted(() => {
        state.value.newNickname = localStorage.getItem("nickname")
      })

      const convertNicknameToId = (nickname) =>{
        const index = UserData.value
        .map(user => user.nickname)
        .indexOf(nickname)

        return UserData.value[index].id
      }

      const makeTodo = () =>{ 
        newTodo()
        state.value.newAuthor = ""
        state.value.newTodoItem = ""
        
        GetAllTodos()
        .then(() => {
          getIds()
        })
      }

      const deleteAndUpdateTodo = (id) => {
        deleteTodo(id)
        GetAllTodos()
      }

      const getIds = () => {
        const users = []
          
          state.value.todos.forEach(todo => {
            if(users.indexOf(todo.creator) == -1){
              users.push(todo.creator)
            }
          });
  
          fetch('https://ppwa-api-exam.onrender.com/convertNicknamesToIds', {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
              users
            })
          })
          .then(data => {
            data.json().then(convertion => {
              UserData.value = convertion
            })
          })
      }
      return { state, GetAllTodos, newTodo, deleteAndUpdateTodo, deleteTodo, editTodo, makeTodo, convertNicknameToId, UserData, localNickname }
    },
  }
</script>

<style lang="css" scoped>

.greyButton{
  background-color: grey;
  color: darkslategrey;
}
.todos {
  min-height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
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