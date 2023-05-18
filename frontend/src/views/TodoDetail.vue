<template>
    <div>
        <h1>Editing a ToDo</h1>

        <div>
        Author: <h4>{{item.author}}</h4>
        Todo Item: <p>{{item.todo}}</p>
        </div>

        <hr>

        <input type="text" placeholder="Author" v-model="state.newAuthor">
        <span> Test: {{ item.author }} </span>
        <br>
        <input type="text" placeholder="Todo" v-model="state.newTodoItem">
        <span> Test: {{ item.todo }} </span>
        <br>
        <button @click="editTodo()">Update Item</button> 

        <hr>
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
    const loadData = async () => {
        const data = await GetSpecificTodo(route.params.id)
            
        item.value.author = data.author
        item.value.todo = data.todo

    }

    loadData()
    

    return {
        todo,
        todoId,
        editTodo,
        state,
        item
    }
    }
}
</script>
  
  <style lang="scss" scoped>
  
  </style>