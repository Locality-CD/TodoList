import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';
import { connect } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo, loadTodo} from '../actions/index'
import axios from 'axios'
import '../Layout.css'

let id = 0;

class TodoApp extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      todos: [],
      all: true,
      completed: false

    }
  }
  componentDidMount(){
    const dbUrl = "http://localhost:3000/db"
    axios.get(dbUrl + '/all')
    .then((response) => {
      console.log(response);
      this.props.loadTodoList(response.data)
    })



  }

  render(){
  const dbUrl = "http://localhost:3000/db";
  console.log('props',this.props.todos)
  return (
    <div>
      <span className={'title'}> Todo List </span><br/>
      <button className={'all-button'} type={'button'} onClick={()=>this.setState({all:true})}>All</button>
      <button className={'completed-button'} type ={'button'} onClick={()=>this.setState({all:false,completed: true})}> Completed </button>
      <button className={'incompleted-button'} type ={'button'} onClick={()=>this.setState({all:false,completed: false})}> Incompleted </button>
      <InputLine
        addTodo={(task) => {
          if (task.length > 0){



          console.log('registered');
          axios.post(dbUrl + '/add', {data: {task:task}})
          .then((response) =>{
            console.log('response', response)
            this.props.addTodoClick(response.data._id, task)
            this.setState({ todos: this.state.todos.concat(response.data)})
          })

            .catch(function (error) {
              if (error)
              {
                console.log(error)
              }
            });    }}}
      />
      <TodoList
        todos={this.props.todos}
        completed = {this.state.completed}
        all = {this.state.all}
        handleToggleTodo={(id) => {
        axios.post(dbUrl + '/toggle', {id:id})
        this.props.toggleTodoClick(id)}
      }
        handleDelete = {(id) => {
          axios.post(dbUrl + '/delete', {id:id})
          this.props.deleteTodoClick(id)

        }}

      />
    </div>
  );
}
}

const mapStateToProps = (state) => {
  console.log('state',state)
  return {
    todos: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoClick: (id, task) => {
      dispatch(addTodo(id,task))
    },

    deleteTodoClick: (id) => {
      dispatch(deleteTodo(id))
    },

    toggleTodoClick: (id) => {
      dispatch(toggleTodo(id))
    },

    loadTodoList: (list) => {
      dispatch(loadTodo(list))
    }
  }
}

TodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp)

export default TodoApp;
