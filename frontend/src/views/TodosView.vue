<template>
  <div class="Todos">
    <h1>All Todos</h1>
    
    <span> Task Creator:</span>
    <input type="text" placeholder="Author" v-model="state.newAuthor">
    
    <span> Task at hand:</span>
    <textarea placeholder="Todo" v-model="state.newTodoItem"></textarea>
    
    <button @click="makeTodo()">New Task</button>
    <br>

    <div v-for="todo in state.todos" :key="todo._id" class="todo-card">
      <router-link :to="`/todo/${todo._id}`">
        <h4>
          {{todo.author}}
        </h4>
        <p>
          {{todo.todo}}
        </p>
        
        <button >Edit Task</button>
      </router-link>
      <button @click="deleteTodo(todo._id)">Delete Task</button>
    </div>
    
  </div>
</template>

<script>
import todocrud from '../modules/todocrud'
import { onMounted } from 'vue'

  export default {
    setup() {

      const { state, GetAllTodos, newTodo, deleteTodo, editTodo  } = todocrud()

      onMounted(() => {
        GetAllTodos()

        console.log("state",state.value.todos)
      })

      const makeTodo = () =>{ 
        newTodo()
        state.value.newAuthor = ""
        state.value.newTodoItem = ""
        GetAllTodos()
      }

      return { state, GetAllTodos, newTodo, deleteTodo, editTodo, makeTodo }
    },
   
    
  }
</script>

<style lang="css" scoped>
.todos {
  min-height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
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
}

.todo-card button {
  margin-top: 10px;
}

.router-link-active {
  background-color: #e0e0e0;
}
</style>