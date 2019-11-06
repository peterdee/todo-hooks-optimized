import React, { useCallback, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  
  const [input, handleInput] = useState('');

  const addTodo = useCallback((event) => {
    event.preventDefault();
    if (input) {
      return setTodos(list => [ ...list, { done: false, id: Date.now(), todo: input } ]);
    }
  }, [input]);

  const deleteTodo = useCallback(id => setTodos(list => list.filter(item => item.id !== id)), []);

  const handleChange = useCallback(event => handleInput(event.target.value), []);

  const handleStatus = useCallback(
    id => setTodos(list => list.map(item => item.id === id ? { ...item, done: !item.done } : item)),
    [],
  );

  return (
    <>
      <div>TO-DO LIST</div>
      <Form addTodo={addTodo} handleChange={handleChange} input={input} />
      { todos.map(todo => <Todo key={todo.id} item={todo} deleteTodo={deleteTodo} handleStatus={handleStatus} />) }
    </>
  );
}

const Form = React.memo((props) => {
  return (
    <form onSubmit={props.addTodo}>
      <input type="text" onChange={props.handleChange} value={props.input} />
      <button type="submit">Add</button>
    </form>
  );
});

const Todo = React.memo((props) => {
  return (
    <>
      <div
        onClick={() => props.handleStatus(props.item.id)}
        style={{ textDecoration: props.item.done ? 'line-through' : 'none' }}
      >
        {props.item.todo}
      </div>
      <button onClick={() => props.deleteTodo(props.item.id)} type="button">Delete</button>
    </>
  );
});

export default App;
