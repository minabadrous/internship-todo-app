import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import List from "./components/List";
import fetchTodos from "./api/fetchTodos";
import postTodos from "./api/postTodo";
import deleteTodo from "./api/deleteTodo";
import patchTodo from "./api/patchTodo";
import TodoHead from "./components/TodoHead";

function App() {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilterTodos] = useState([]);
  const [isOnCurrent, setIsOnCurrent] = useState(true);
  const [history, setHistory] = useState([]);

  const updateTodos = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
    };
    const todo = await postTodos(newTodo);

    setTitle("");
    setTodos([...todos, todo]);
  };

  const filterTodos = useCallback(() => {
    if (filter === "all") {
      setFilterTodos(todos);
    } else if (filter === "completed") {
      const filteredTodos = todos.filter((todo) => todo.completed);
      setFilterTodos(filteredTodos);
    } else if (filter === "pending") {
      const filteredTodos = todos.filter((todo) => !todo.completed);
      setFilterTodos(filteredTodos);
    }
  }, [filter, todos]);

  const handleSuccessDeleteTodo = (todo) => {
    setTodos(todos.filter((sTodo) => sTodo.id !== todo.id));
  };

  const handleDeleteTodo = (todo) => {
    deleteTodo(todo, handleSuccessDeleteTodo);
  };

  const handleSuccessCheckTodo = (todo) => {
    const updatedTodos = todos.map((sTodo) =>
      sTodo.id === todo.id ? todo : sTodo
    );
    setTodos(updatedTodos);
  };

  const handleCheckTodo = (todo) => {
    patchTodo({ ...todo, completed: !todo.completed }, handleSuccessCheckTodo);
  };

  const handleSuccessTitleChange = (todo) => {
    const updatedTodos = todos.map((sTodo) =>
      sTodo.id === todo.id ? todo : sTodo
    );
    setTodos(updatedTodos);
  };

  const handleTitleChange = (id, title) => {
    const todo = todos.find((todo) => todo.id === id);
    patchTodo({ ...todo, title }, handleSuccessTitleChange);
  };

  useEffect(() => {
    fetchTodos().then((res) => {
      setTodos(res);
      setFilterTodos(res);
    });
    fetchTodos({ filter: "history" }).then((res) => {
      setHistory(res);
    });
  }, []);

  useEffect(() => {
    filterTodos();
  }, [filterTodos, todos, filter]);

  return (
    <div className="App">
      <header>
        <h1>NFQ To Do APP</h1>
      </header>
      <div id="optionButtons">
        <button
          onClick={() => setIsOnCurrent(true)}
          className={`${isOnCurrent ? "active" : ""}`}
        >
          Current
        </button>
        <button
          onClick={() => setIsOnCurrent(false)}
          className={`${!isOnCurrent ? "active" : ""}`}
        >
          History
        </button>
      </div>

      {isOnCurrent ? (
        <div>
          <TodoHead
            updateTodos={updateTodos}
            setTitle={setTitle}
            title={title}
            filterTodos={(filter) => setFilter(filter)}
          />

          <List
            todos={filteredTodos}
            handleDeleteTodo={handleDeleteTodo}
            handleCheckTodo={handleCheckTodo}
            handleTitleChange={handleTitleChange}
          />
        </div>
      ) : (
        <div>
          <List todos={history} handleTitleChange={handleTitleChange} />
        </div>
      )}
    </div>
  );
}

export default App;
