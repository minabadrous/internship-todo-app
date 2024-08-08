import '../styles.css';

function ListItem({ todo, onComplete, onDelete }) {

    return (
        <li data-uid={todo.id} className={`taskItem ${todo.completed ? "done" : ""}`}>
            <p className="taskTitle">{todo.title}</p>
            <button className="checkBtn actionBtn" type="button" onClick={() => onComplete(todo.id)}>
                <i className="fas fa-check-circle icons"></i>
            </button>
            <button className="delBtn actionBtn" type="button" onClick={() => onDelete(todo.id)}>
                <i className="fas fa-trash icons"></i>
            </button>
        </li>
    );
}

export default ListItem;