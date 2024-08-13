import './App.css';
import './styles.css';
import React, { useState, useEffect, useCallback } from "react";
import Form from './Components/Form';
import List from './Components/List';
import ActivityStatus from './Components/ActivityStatus';
import fetchTodos from './API/Fetch';
import deleteTodoRequest from './API/Delete';
import postTodo from './API/Post';
import patchTodo from './API/Patch';



function App() {


  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [title, setTitle] = useState("");

  const [isCurrentTab, setIsCurrentTab] = useState(true);

  const handleOptionChange = useCallback(() => {
    let selectElement = document.querySelector('#todoStatus');
    let selected = selectElement.value;

    if (selected === "all") {
      setFilteredTodos(todos);

    } else if (selected === "active") {
      const activeTodos = todos.filter((todo) => todo.completed === false);
      setFilteredTodos(activeTodos);

    } else if (selected === "done") {
      const doneTodos = todos.filter((todo) => todo.completed === true);
      setFilteredTodos(doneTodos);
    }
    return selected;
  }, [todos]);

  useEffect(() => {
    async function fetchTodosRequest() {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
      setFilteredTodos(fetchedTodos)

    }
    fetchTodosRequest();
  }, []);

  useEffect(() => {
    async function fetchHistory() {
      const fetchedTodos = await fetchTodos({ filter: history });
      setHistory(fetchedTodos);
    }
    fetchHistory();
  }, [history]);

  useEffect(() => {
    handleOptionChange()
  }, [todos, handleOptionChange])

  const update = async (e) => {
    e.preventDefault();

    const postedTodo = await postTodo(title);
    if (postedTodo) {
      setTodos([...filteredTodos, postedTodo]);
    }
    setTitle("");
  }


  const deleteTodo = async (id) => {

    const deleteIsOk = await deleteTodoRequest(id);
    if (deleteIsOk) {
      setTodos(todos.filter((todo) => todo.id !== id))
      // setFilteredTodos(todos.filter((todo) => todo.id !== id));
      //DO: add that deleted to do in the history table
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
  const editTitle = async (todo) => {
    const editedTodo = await patchTodo(todo);
    setTitle(editedTodo.title);
  }

  const patchRequest = async (todo) => {
    try {
      const updatedTodo = await patchTodo(todo);
      console.log("Updated todo", updatedTodo);

      setTodos((oldTodos) =>
        oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  // must edit so it doesnt just call patch request in general
  const completeTodo = async (todo) => {
    if (patchRequest(todo)) {
      completionUIupdate(todo);
    }
  };

  return (

    <>
      <header>
        <h1 id="title">My To-Do List</h1>
      </header>

      <div id="tabs">
        <button className={isCurrentTab ? "tabButton active" : "tabButton"} onClick={() => setIsCurrentTab(true)}>Current</button>
        <button className={!isCurrentTab ? "tabButton active" : "tabButton"} onClick={() => setIsCurrentTab(false)}>History</button>
      </div>

      <main>
        {isCurrentTab ? (
          <>
            <Form
              title={title}
              update={update}
              setTitle={setTitle} />
            <ActivityStatus
              getOption={handleOptionChange} />

            <List
              todos={filteredTodos}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              editTitle={editTitle}
            />
          </>
        ) : (
          <div>
            History

            <List
              todos={history}
            />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
