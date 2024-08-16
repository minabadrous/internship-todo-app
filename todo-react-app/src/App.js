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
import Chart from './Components/Chart';



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

  const patchRequest = async (todo) => {
    try {
      const updatedTodo = await patchTodo({ ...todo, completed: !todo.completed });

      setTodos((oldTodos) =>
        oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  }
  const editTitle = async (id, newTitle) => {
    const editedTodo = await patchTodo({ id, title: newTitle });
    setTodos((oldTodos) =>
      oldTodos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );
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
  // must edit so it doesnt just call patch request in general
  const completeTodo = async (todo) => {
    if (patchRequest(todo)) {
      completionUIupdate(todo);
    }
  };

  useEffect(() => {
    async function fetchTodosRequest() {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
      setFilteredTodos(fetchedTodos);
    }
    fetchTodosRequest();
  }, []);

  useEffect(() => {
    async function fetchHistory() {
      const fetchedTodos = await fetchTodos({ filter: history });
      setHistory(fetchedTodos);
    }
    fetchHistory();
  }, []);

  useEffect(() => {
    handleOptionChange()
  }, [todos, handleOptionChange])



  const getCompletedCount = (todos) => {
    //loop over todos and get count
    let count = 0;
    todos.forEach((todo) => todo.completed ? count++ : "")
    return count;
  }


  const getCompletedPercentage = (todos) => {
    const totalCount = todos.length;
    const completedCount = getCompletedCount(todos);
    const completePercentage = (completedCount / totalCount) * 800;
    return completePercentage;
  }

  const setData = (todos) => {
    let data = [
      { name: "completed", value: getCompletedPercentage(todos) },
      { name: "incomplete", value: 800 - getCompletedPercentage(todos) }
    ]

    return data;
  }
  return (
    //CHANGE DATAT BEING PASSED INTO THE CHART TO ITS RESPECTIVE VALUE
    <div id='content'>
      <header>
        <h1 id="title">My To-Do List</h1>
      </header>
      <div id="tabs">
        <button className={isCurrentTab ? "tabButton active" : "tabButton"} onClick={() => setIsCurrentTab(true)}>Current</button>
        <button className={!isCurrentTab ? "tabButton active" : "tabButton"} onClick={() => setIsCurrentTab(false)}>History</button>
      </div>


      <main id='mainSection'>
        {isCurrentTab ? (
          <>

            <div>
              <Chart
                data={setData(filteredTodos)}></Chart>
            </div>
            <div>
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
                editTodo={editTitle}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Chart
                data={setData(history)}></Chart>
            </div>
            <div id='historySection'>
              <h1>History</h1>
              <List
                todos={history}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
