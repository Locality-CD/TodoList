import React from 'react';
import '../Layout.css'

const Todo = ({ task, completed, handleOnClick, handleDelete }) => {
  return (
    <div className={'task'}>
      <div className={'delete-wrapper'}>
      <button className={'delete-button'} type={'submit'} onClick = {handleDelete}> x </button>
    </div>
      <span className={'task-text'} onClick={handleOnClick}>
        {completed ? <strike> {task} </strike> : task }

      </span>
    </div>
  );
}

export default Todo;
