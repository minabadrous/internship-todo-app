import { fetchTodos } from "./api/fetchTodos";
import "./App.css";
import Form from "./components/form";
import List from "./components/list";
import React, { useEffect, useState } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [history, setHistory] = useState([]);
    const [title, setTitle] = useState("");

    const [isOnCurrent, setIsOnCurrent] = useState(true);

    const update = (e) => {
        e.preventDefault();

        const newTodo = {
            id: todos.length + 1,
            title,
            completed: false,
        };

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        setTitle("");
    };

    const deleteItem = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const completeItem = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });

        setTodos(updatedTodos);
    };

    useEffect(() => {
        fetchTodos().then((data) => {
            setTodos(data);
        });

        fetchTodos({ filter: "history" }).then((data) => {
            setHistory(data);
        });
    }, []);

    return (
        <div>
            <div className="header">
                <button
                    className={`${isOnCurrent ? "active" : ""}`}
                    onClick={() => setIsOnCurrent(true)}
                >
                    CURRENT
                </button>
                <button
                    className={`${!isOnCurrent ? "active" : ""}`}
                    onClick={() => setIsOnCurrent(false)}
                >
                    HISTORY
                </button>
            </div>

            {isOnCurrent ? (
                <div>
                    <Form title={title} setTitle={setTitle} update={update} />

                    <List
                        todos={todos}
                        completeItem={completeItem}
                        deleteItem={deleteItem}
                    />
                </div>
            ) : (
                <div className="history">
                    <List todos={history} />
                </div>
            )}
        </div>
    );
}

export default App;
