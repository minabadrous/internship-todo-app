import '../styles.css';
import React, { useState } from "react";

function ListItem({ todo, onComplete, onDelete, onEdit }) {

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    return (
        <li data-uid={todo.id} className={`taskItem ${todo.completed ? "done" : ""}`}>
            {isEditing ?
                (<input type="text" name="task" onBlur={() => { setIsEditing(false); setNewTitle(newTitle); }} onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />)
                : (

                    <p className="taskTitle" onClick={() => setIsEditing(true)}>{todo.title}</p>
                )}
            {onComplete && (
                <button className="checkBtn actionBtn" type="button" onClick={() => onComplete(todo)}>
                    <i className="fas fa-check-circle icons"></i>
                </button>)}
            {onDelete && (<button className="delBtn actionBtn" type="button" onClick={() => onDelete(todo.id)}>
                <i className="fas fa-trash icons"></i>
            </button>)}

        </li>
    );
}

export default ListItem;