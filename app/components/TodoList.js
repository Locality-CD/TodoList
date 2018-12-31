import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, handleToggleTodo,handleDelete,all,completed }) => {
  return (
    <ul>
      {
       todos.map((todo) => {
          if (all){
            return(<Todo
               key={todo._id}
               task={todo.task}
               completed={todo.completed}
               handleOnClick={() => handleToggleTodo(todo._id)}
               handleDelete = {() => handleDelete(todo._id)}
             />)
          }
          if (completed === true){
            if (todo.completed === true){
              return (<Todo
                 key={todo._id}
                 task={todo.task}
                 completed={todo.completed}
                 handleOnClick={() => handleToggleTodo(todo._id)}
                 handleDelete = {() => handleDelete(todo._id)}
               />)

            }
          }

        if (completed === false){
          if (todo.completed === false){
          return (<Todo
             key={todo._id}
             task={todo.task}
             completed={todo.completed}
             handleOnClick={() => handleToggleTodo(todo._id)}
             handleDelete = {() => handleDelete(todo._id)}
           />)
        }
      }})
    }
    </ul>
  )
}

export default TodoList;
