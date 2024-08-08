import './App.css';
import './styles.css';
import React, { useState, useEffect } from "react";
import Form from './Components/Form';
import List from './Components/List';
import fetchTodos from './API/Fetch';
import deleteTodo from './API/Delete';
import postTodo from './API/Post';
import patchTodo from './API/Patch';
// import patchTodo from './API/Patch';


const initTodos = [];


function App() {

  const [todos, setTodos] = useState(initTodos);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchTodosRequest() {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    }

    fetchTodosRequest();
  }, []);

  const update = async (e) => {
    e.preventDefault();

    const postedTodo = await postTodo(title);
    if (postedTodo) {
      setTodos([...todos, postedTodo]);
    }

    setTitle("");
  }


  const deleteTodoRequest = async (id) => {
    const deleteIsOk = await deleteTodo(id);
    if (deleteIsOk) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  }


  const completeTodo = async (todo) => {
    // const updatedTodo = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed;
    //   }
    //   return todo;
    // });
    const print = await patchTodo(todo);
    console.log(print);



    //setTodos(updatedTodo);

  }

  return (

    <>
      <header>
        <h1 id="title">My To-Do List</h1>
      </header>

      <main>
        <Form
          title={title}
          update={update}
          setTitle={setTitle} />
        <List
          todos={todos}
          completeTodo={completeTodo}
          deleteTodo={deleteTodoRequest}
        />

      </main>
    </>
  );
}

export default App;
