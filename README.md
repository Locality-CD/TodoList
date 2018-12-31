# Todo App: React with Redux

 Last week, we built our first end-to-end React Todo App. This week, we will build a similar Todo app, but this time, we'll use Redux! In this repo, there's a functioning vanilla React Todo app like the one you built before. Our goal is to take this working app and migrate the code base so that all of our state is managed by Redux. Along the way, we will learn how to structure a simple Redux app and some more about the cast of characters in a typical application. 
 
 Remember, Redux is not something that can be mastered in a day or even a week! But don't worry that you will never get it.  Be patient and enjoy the journey. Please remember that a large portion of the benefit of an exercise is lost if you just copy and paste the code. So please copy and paste responsibly!

## Step 0: Checking our starting point

 Clone this repo and get the app to run as is. Notice that the `package.json` has a `npm start` script that runs the `webpack-dev-server`. Don't forget to `npm install`! Once you are done, you should be able to play around with it. Be sure to look at the code and familiarize yourself with its inner workings.

 ![](https://cl.ly/3b3V1e2l3629/Screen%20Recording%202017-07-04%20at%2010.02%20PM.gif)

## Step 1: Preparing for Redux

 Now that our app is up and running, let's take a look at what needs to be done for our migration to Redux. 
 
 Let's setup folders to house actions, reducers, and components. 
 
 1. Since the components folder already exists, create the `/reducers` folder and the `/actions` folder in the same directory as the `/components` folder. 
 1. Create two blank `index.js` files, one in the `/reducers` directory and one in the `/actions` directory. The file in the `/reducers` folder will be where we define our root reducer, which is where you would normally combine all your reducers (thus, when you call `createStore` you only need to pass in the combined reducer). Since the Todo App we are building will only have one reducer, we will just write it directly in the `index.js` file. Meanwhile, the `index.js` file in the `/actions` folder will house our "action creators." Action creators are functions that return actions. More on action creators below. 
 
 ![](https://cl.ly/3A2i253d2B2k/Screen%20Shot%202017-07-04%20at%2010.30.15%20PM.png) 
 
## Step 2: Action creators

 Action creators seem strange at first. Why do I want a function that returns the action instead of just creating the action directly? It turns out to be quite useful in many programming situations to make everything into functions. See the technical note below. Today, we will use action creators as the convenient starting point for implementing features in Redux.
 
 1. Open the `index.js` file inside the `/actions` folder, then add an action creator for the `ADD_TODO` action that will be responsible for new todos. 
 1. Since an action object must contain everything needed by the reducer to change the current state to whatever we want the new state to be, we must include the text of the new todo (`task`), the `id` of the new todo, and the `completed` status of the new todo.
 1. That's everything, right? Oops! We must always have a "type" field for every action. The type is just a string that makes it easy for use to identify the purpose of the action. In this case `'ADD_TODO'` seems like a clear enough type string. The todos will look the `typicalTodoAction` object (see below), so our action creator for `'ADD_TODO'` needs only to be given the `text` and `id` values to form and return this kind of action object. 
 1. Now add the `addTodo()` action creator defined below to the `index.js` file in the actions folder. 
 
 ```javascript
  // typical action shape for ADD_TODO
  const typicalTodoAction = {
    type: 'ADD_TODO'
    id: 5,
    task: 'Build A Todo App',
    completed: false
  }
  addTodo(5,'Build A Todo App') // returns the todo action above
 ```
  
  
 ```javascript
 // Inside /app/actions/index.js
 export function addTodo(id,task) {
  return {
   type: 'ADD_TODO',
   id,
   task,
   completed: false
  };
 }
 ```
 Reminder: `{ something }` in ES2015/ES6 is just shorthand for `{ something : something }`.
 
 So far, we have not needed anything from the `redux` npm package, because we have just been writing functions that return objects. Redux will interpret these functions as actions, but that doesn't mean that they are anything more than functions. Now that we have our action creator for `ADD_TODO`, we are ready to begin writing the reducer logic for that specific action or action creator. 
 
 - Side note: It's typical to conflate the terms "actions" and "action creators," since the latter are merely a means of creating specific actions. So, in later portions of this exercise, the terms will be used interchangably.
 - Technical note: Action creators also allow other parts of Redux (see [redux middleware](http://redux.js.org/docs/advanced/Middleware.html)) to be less complex.
 
 ## Step 3: Writing the reducer

 The next step is to write reducer logic to handle the action. Since this is the first action we are writing, we also have to set up the basic reducer structure as well. Recall that a reducer takes in the current state and a given action object and returns the next/new state. So let's start with the skeleton below:

 ```javascript
 // Inside app/reducers/index.js
const reducer = (state, action) => {
    switch (action.type) {
        // Missing cases
        default:
            return state;
    }
};

export reducer;
 ```
Since the Redux `store` runs the root reducer to figure out the starting state, we need to decide what the default state of our app should be. In this case, our application state depends on which todos are in the todo list, and todos are easily stored in an array. 
 1. Update the `reducer` above so that the default state is an empty array by using the ES2015/ES6 default parameters feature. Now we can get back to implementing the reducer logic for the `'ADD_TODO'` action type.
 1. What should the reducer do in the case of an `'ADD_TODO'` action? Since it automatically gets passed the current state and the action object, all we need to do is create and return a new state. The new state should have one more todo, and since the action object contains all the necessary information, we can simply create the todo from the action object and add it to the todos in the current state.

 ```javascript
 // Inside app/reducers/index.js
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            // copy new state so no mutations to old state
            const newState = [ ...state ];
            // create the todo from the action object
            const newTodo = {
                id: action.id,
                task: action.task,
                completed: action.completed
            };
            // okay to mutate our own copy
            newState.push(newTodo);
            return newState
        default:
            return state;
    }
};

export default reducer;
 ```
Now our reducer is ready to handle `dispatch(addTodo(id, task))` calls made by the UI! The only problem is that we still have React managing all the state in our components right now. Let's fix this.

Side note: You might start with an idea for the structure of your application state and then discover that you need to add something or change the shape of the state in order to accomodate more features. This is a fairly easy process, so don't worry about creating the perfect state structure before you begin to code. This is one of the superpowers of the Redux approach. 

## Step 4: Take state control of todos out of React's hands

We have four components in our application: `InputLine.js`, `Todo.js`, `TodoApp.js`, and `TodoList.js`. Let's vastly simplify the latter three components by moving all the state and logic out of as many components as possible. We can start top down with `TodoApp.js` or bottom up with `Todo.js` - both are valid approaches once you get the hang of Redux-ification. For this app, it's slightly easier to go bottom up - so let's take a look at `Todo.js` first.

```javascript
import React from 'react';

class Todo extends React.Component {
  render() {
    return (
      <li>
        <span onClick={() => this.props.toggleTodo()}>
          {this.props.completed ? <strike> {this.props.task}</strike> : this.props.task}
        </span>
      </li>
    );
  }
}

export default Todo;
```

This component only has a render method, so it's actually a presentational component in disguise. Lets unmask its true nature by using a function to represent it.

```javascript
import React from 'react';

const Todo = ({task, completed, handleOnClick}) => {
  return (
    <li>
      <span onClick={handleOnClick}>
        {completed ? <strike> {task} </strike> : task}
      </span>
    </li>
  );
}

export default Todo;
```
Much better! Now we don't do any logic inside the component. Instead, `<Todo />` relies on being passed everything it needs. Next up we go to the component using `<Todo />` which is in `TodoList.js`. Now this component is more reusable in the future.

```javascript
import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.todos.map((todo, index) => (
            <Todo
              key={todo.id}
              task={todo.task}
              completed={todo.completed}
              toggleTodo={() => this.props.toggleTodo(index)}
            />
          ))
        }
      </ul>
    )
  }
}

export default TodoList;
```
In this component we again have just a render method - so we will make changes similiar to those we made for `Todo.js`. Be sure to take note of the comment in the code below. You may find it useful when implementing `dispatch(toggleTodo())` UI updates later in the the exercise.

```javascript
import React from 'react';
import Todo from './Todo';

const TodoList =({ todos, handleToggleTodo }) => {
  return (
    <ul>
      {
        todos.map((todo) => (
          <Todo
            key={todo.id}
            task={todo.task}
            completed={todo.completed}
            // Now we will use matching by id's instead of index
            handleOnClick={() => handleToggleTodo(todo.id)}
          />
        ))
      }
    </ul>
  )
}

export default TodoList;
```
Once again, we have moved much of the complexity out of the component. We are now ready to move one more level up and begin cleaning out `TodoApp.js`. `<TodoApp />` holds almost all of the state, so let's roll up our sleeves and begin. Read the comments in the code block below so you can see the rationale behind removing each piece.

```javascript
import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';


let id = 0;

class TodoApp extends React.Component {
  // should remove state so Redux can be the
  // single source of truth
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }
  // the reducer (not the component) should handle creating
  // a new state after a 'TOGGLE' action
  toggleTodo(index) {
    const newTodo = Object.assign(
      {},
      this.state.todos[index],
      { completed: !this.state.todos[index].completed }
    );
    const newTodos = [ 
      ...this.state.todos.slice(0, index),
      newTodo,
      ...this.state.todos.slice(index + 1)  
    ];
    this.setState({ todos: newTodos });
  }
  // the reducer (not the component) should handle creating
  // a new state after a 'TOGGLE' action
  addTodo(task) {
    const newTodo = { 
      id: id++,
      task: task,
      completed: false 
    };
    const newTodos = [ ...this.state.todos ]
    newTodos.push(newTodo);
    this.setState({ todos: newTodos });
  }
  render() {
    return (
      <div>
        {/* leave this alone for now */}
        <InputLine
          addTodo={(task) => this.addTodo(task)}
        />
        {/*this.state.todos will not exist, so we need to fix this*/}
        <TodoList
          todos={this.state.todos}
          handleToggleTodo={(id) => this.toggleTodo(id)}
        />
      </div>
    );
  }
}

export default TodoApp;
```

Now that we have figured out what to do with this component and why we're doing it, let's go ahead and remove the pieces we marked for removal.

```javascript
import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';


let id = 0;

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        {/* leave this alone for now */}
        <InputLine
          addTodo={(task) => this.addTodo(task)}
        />
        {/*this.state.todos will not exist so we need to fix this*/}
        <TodoList
          todos={this.state.todos}
          handleToggleTodo={(id) => this.toggleTodo(id)}
        />
      </div>
    );
  }
}

export default TodoApp;
```
Wasn't that satisfying? We now see that the `<TodoApp />` itself can be a presentational component. When we make the same changes once again, we also solve the problem of `this.state.todos` not being defined anymore (since state was removed) by passing in the todos.

```javascript
import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';

let id = 0;

const TodoApp =({ todos, addTodoClick, toggleTodoClick }) => {
    return (
        <div>
        {/* leave this alone for now */}
        <InputLine
            addTodo={(text) => addTodoClick(id++, text)}
        />
        <TodoList
            todos={todos}
            handleToggleTodo={(id) => toggleTodoClick(id)}
        />
        </div>
    );
}

export default TodoApp;
```
Okay, looking good! Now we just have to go up to the next component up to pass todos into the `<TodoApp />` component. Unfortunately, we run into an issue ... there is no component higher up that can pass `<TodoApp />` the todos or the handlers it needs. Instead, we'll have Redux manage our state, no passing down needed! Let's refresh:

 - We started out with our React-only todo app working with toggling and add functionality
 - We decided to move the `add new todo` functionality to Redux
 - We made an action creator `addTodo()` that can be used to start these kinds of actions
 - We set up the reducer to set the default state to be an empty array and to update the state when an `ADD_TODO` action comes in by adding the new todo to the todos array
 - Since the reducer was ready to handle adding todos, we removed all the states React was managing for us so that we could hook up our app to Redux and see that adding todos with the reducer was working
 - Now we removed all the states from `<Todo />`, `<TodoList />`, and `<TodoApp />` and hooked up the reducer to `<TodoApp />` so it can handle adding todos in our app.

 ## Step 5: Powering our components with our reducer using the Redux store
 
 Our goal of hooking up our state-managing reducer to our (now devoid of state handling) React components will be achieved through the Redux store.
 1. Inside of `app.js`, we import `createStore` from `redux` (`npm install redux --save` first). 
 1. `createStore` needs a reducer as an argument before it can create a store, so we need to import the `reducer` from the `index.js` file in `/reducers`. Once we import our reducer and pass it to `createStore`, we have accomplished linking our reducer to our store (reducer <-> store). 
 1. Now we need to link the `store` to our components (store <-> components), which is linking React to Redux, just like we practiced in the first exercise. See if you can do this part yourself before you peek at the code below. Hint: `npm install react-redux --save`.

 ```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import reducer from './reducers/index'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>
    ,
    document.getElementById('root')
);
```

Hopefully, you were able to do that part on your own. Now that the `store` is provided to `<TodoApp />`, we can do the next part, which involves connecting the `<TodoApp />` component to the `props` and `dispatch` methods it needs. Once again, refer to Exercise 1 to see if you can make `TodoApp.js` dispatch the right actions and access the correct `props` inside it. Hint: `connect` from `react-redux`.

```javascript
import React from 'react';
import InputLine from './InputLine';
import TodoList from './TodoList';
// import connect to connect TodoApp to the
// resources it needs from Redux store (which
// is available because the app is wrapped
// by <Provider> in app.js
import { connect } from 'react-redux';
// import the action creator for dispatch usage
import { addTodo } from '../actions/index';

let id = 0;

// have to change to let from const because overwriting below
// with connected TodoApp
let TodoApp =({ todos, addTodoClick, toggleTodoClick  }) => {
  return (
      <div>
        <InputLine
            addTodo={(task) => addTodoClick(id++, task)}
        />
        <TodoList
            todos={todos}
            toggleTodo={(id) => toggleTodoClick(id)}
        />
      </div>
  );
}

const mapStateToProps = state => {
  return {
    todos: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodoClick: (id, task) => {
      dispatch(addTodo(id, task))
    }
  }
}

TodoApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);

export default TodoApp;
```

## Step 6: Verify that the `add todo` functionality is fully working again

 Now we have finished setting up our Todo App to work with Redux and moved all the state out of React, except for one little thing: If you look at the `InputLine.js` file, it still has its state managed by React. In this case, this is actually fine, since the form logic and state is very simple and including it into our Redux state would needlessly complicate our state (going from this: `[]` to this: `{ todos: [] , formText:'' }`). 
 The most important thing is that each piece of state in your application is in one place. In other words, we have what's called a "single source of truth."

## Step 7: Get toggle working again

You may have noticed that the toggle function isn't working anymore, and clicking on a todo no longer toggles the strike-through style. Try getting the functionality for toggle up and running again with Redux.

- Add a new action creator
- Add a case in the reducer for your new action creator (& create a new state from the current state)
- Supply a handler to the correct component via mapDispatchToProps. The handler should dispatch the appropiate action. (Make sure you're passing in the props correctly to each component!) 
- Check that the functionality is back

## Step 8: Removing Todos

Create your own outline and add functionality to remove todos by double clicking and/or pressing an X button and/or pressing delete or backspace. As long as it works, it's ok!


## Step 9: (Optional) Filtering

Add the ability to filter todos based on completed status via any reasonable UI mechanism of your choosing.
