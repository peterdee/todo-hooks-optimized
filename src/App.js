import React, { useState, useCallback } from 'react';

import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  
  const [input, handleInput] = useState('');

  const addTodo = useCallback((input) => {
    if (input) {
      return setTodos([ ...todos, { id: Date.now(), todo: input } ]);
    }
  }, [todos]);

  const deleteTodo = useCallback((id) => setTodos(todos.filter(todo => todo.id !== id)), [todos, setTodos]);

  const handleChange = useCallback(value => handleInput(value), [handleInput]);

  return (
    <>
      <div>TODO LIST</div>
      <Form addTodo={addTodo} handleChange={handleChange} input={input} />
      { todos.map(todo => <Todo key={todo.id} item={todo} deleteTodo={deleteTodo} />) }
    </>
  );
}

const Form = React.memo((props) => {
  console.log('form rendered', Date.now());
  const addTodo = (e) => {
    e.preventDefault();
    return props.addTodo(props.input);
  }

  const handleChange = (e) => props.handleChange(e.target.value);

  return (
    <form onSubmit={addTodo}>
      <input type="text" onChange={handleChange} value={props.input} />
      <button onClick={addTodo} type="submit">Add</button>
    </form>
  );
});

const Todo = React.memo((props) => {
  console.log('render todo', props.item.id, props.item.todo);
  return (
    <>
      <div>{props.item.todo}</div>
      <button onClick={() => props.deleteTodo(props.item.id)} type="button">Delete</button>
    </>
  );
});

export default App;
