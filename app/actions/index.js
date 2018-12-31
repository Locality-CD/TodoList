export function addTodo(id,task) {
  return {
    type: 'ADD_TODO',
    id,
    task,
    completed: false
  }
}
 export function toggleTodo(id) {
   return {
     type: 'TOGGLE_TODO',
     id
   }
 }


 export function deleteTodo(id) {
   return {
     type: 'DELETE_TODO',
     id
   }
 }

 export function loadTodo(list) {
   return {
     type: 'LOAD_TODO',
     list
   }
 }
