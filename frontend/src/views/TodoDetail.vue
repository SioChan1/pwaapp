<template>
  <div class="edit-form">
    <h1>Editing a ToDo</h1>
     <div class="form">
      <span> Task name: </span>
      <input type="text" placeholder="Task name" v-model="state.newAuthor">
      <br>
      <span> Task: </span>
      <br>
      <textarea placeholder="Task describtion" v-model="state.newTodoItem"></textarea>
      <br>
      <button @click="editTodo(paramId)">Update Item</button>
    </div>
  </div>
</template>
  
<script>
import { useRoute } from 'vue-router'
import todocrud from '../modules/todocrud'
import { ref } from 'vue'

export default {
  setup() {
    const { editTodo, state, GetSpecificTodo, todo, todoId } = todocrud()

    const item = ref({
      author: "",
      todo: ""
    })
    
    const route = useRoute()
    const paramId = ref(route.params.id)

    const loadData = async () => {
      const data = await GetSpecificTodo(route.params.id)
        
      console.log(data)

      item.value.author = data.author
      item.value.todo = data.todo
      state.value.newAuthor = item.value.author
      state.value.newTodoItem = item.value.todo
    }

    loadData()

    return {
      todo,
      todoId,
      editTodo,
      state,
      item,
      paramId
    }
  }
}
</script>
  
<style lang="css" scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.todo-details {
  width: 100%;
  max-width: 400px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.detail {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.detail-label {
  font-weight: bold;
  margin-right: 10px;
}

.form {
  width: 100%;
  max-width: 400px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
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

button {
  width: 100%;
  padding: 8px;
  background-color: pink;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-top: 1px solid #ccc;
  width: 100%;
}
</style>
