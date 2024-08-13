import '../styles.css';
import React from "react";
import ListItem from './ListItem';

function List({ todos, completeTodo, deleteTodo, editTodo }) {
    return (
        <section id="todoTaskWrapper">
            <ul id="todoList">
                <>
                    {todos.map((TodoData) => {
                        return (
                            <ListItem
                                key={TodoData.id}
                                todo={TodoData}
                                onComplete={completeTodo}
                                onDelete={deleteTodo}
                                onEdit={editTodo}
                            />
                        )
                    })}
                </>
            </ul>
        </section>
    );
}

export default List;