import React from "react";

const Form = ({ title, setTitle, update }) => {
    return (
        <form action="" onSubmit={update}>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="todo-input"
                value={title}
            />
            <button className="todo-button" type="submit">
                <i className="fas fa-plus-circle fa-lg"></i>
            </button>
            <div className="select">
                <select name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
        </form>
    );
};

export default Form;
