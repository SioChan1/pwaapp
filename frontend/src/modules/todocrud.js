import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'

const getTodos = () => {

  const route = useRoute();
  const router = useRouter();

  const todoId = computed(() => route.params.id)
  //console.log("todoId: ", todoId)

  const state = ref({
    newAuthor: '',
    newTodoItem: '',
    todos: {},
    newNickname: ''
  })

  const GetAllTodos = async () => {
    try {
      await fetch("https://ppwa-api-exam.onrender.com/todos", {
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(data => {
        state.value.todos = data
        // debugger
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }
  
  const newTodo = () => { 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        author: state.value.newAuthor,
        todo: state.value.newTodoItem,
        creator: state.value.newNickname
      }) 
    }
    fetch("https://ppwa-api-exam.onrender.com/todos/new", 
      requestOptions
    ).then(GetAllTodos())
  }
  

  const deleteTodo = (_id) => {
    console.log(_id)
    fetch("https://ppwa-api-exam.onrender.com/todos/delete/" + _id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    })
    .then(GetAllTodos())
  }



  const editTodo = (id) => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        author: state.value.newAuthor,
        todo: state.value.newTodoItem
      }) 
    }
    fetch("https://ppwa-api-exam.onrender.com/todos/update/" + /* todoId.value */ id, 
    requestOptions)
     // .then(GetAllTodos())
      .then(() => router.push('/todos'))
      
  }




  const todo = ref({})

  const GetSpecificTodo = async (id) => {
    try {
        let result = null
        await fetch("https://ppwa-api-exam.onrender.com/todos", {
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          }
        })
        .then(res =>  res.json() ) 
        .then(data => {
            result = data.filter(t => t._id === id)[0]
        })
        return result
    }
    catch(error) {
      console.log(error)
    }
  }


  return {
    todo,
    todoId,
    GetSpecificTodo,
    state,
    GetAllTodos, 
    newTodo,
    deleteTodo,
    editTodo
  }
}

export default getTodos