const reducer = (state = [], action) => {
  let newTodos, newTodo;

  switch(action.type) {
    case 'ADD_TODO':
      newTodos = [...state];
      newTodo = {
        id: action.id,
        task: action.task,
        completed: action.completed,
      }
      newTodos.push(newTodo);
      return newTodos;


    case 'TOGGLE_TODO':
      newTodos = [...state];
      newTodos.forEach((todo) =>{
        if (todo._id === action.id)
        {
          todo.completed = !todo.completed
        }
      })
      return newTodos;

    case 'LOAD_TODO':
      newTodos = [...action.list];
      return newTodos;

    case 'DELETE_TODO':
       newTodos = [...state]
       let tre = newTodos.filter((todo) => action.id !== todo._id)
       return tre;


    default:
      return state;
  }
}

export default reducer;
