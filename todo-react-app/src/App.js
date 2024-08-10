import './App.css';
import './styles.css';
import React, { useState, useEffect } from "react";
import Form from './Components/Form';
import List from './Components/List';
import fetchTodos from './API/Fetch';
import deleteTodo from './API/Delete';
import postTodo from './API/Post';
import patchTodo from './API/Patch';



function App() {

  const [todos, setTodos] = useState([]);
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

  const completionUIupdate = (todoo) => {
    // Toggle the completed status locally for immediate UI feedback
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);// Update the state immediately
  }

  const patchRequest = async (todoo) => {
    try {
      const updatedTodo = await patchTodo(todoo);
      setTodos((oldTodos) =>
        oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      // Revert the state if the patch fails
      setTodos(todos);
    }
  }


  const completeTodo = async (todoo) => {
    if (patchRequest(todoo)) {
      completionUIupdate(todoo);
    }
  };

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
