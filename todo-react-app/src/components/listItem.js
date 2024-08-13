function ListItem({ todo, onDelete, onCompleted }) {
    return (
        <div className={`todo ${todo.completed ? "completed" : ""}`}>
            <li className="todo-item">{todo.title}</li>

            {onCompleted && (
                <button
                    className="complete-btn"
                    onClick={() => onCompleted(todo.id)}
                >
                    <i className="fas fa-check-circle"></i>
                </button>
            )}

            {onDelete && (
                <button className="trash-btn" onClick={() => onDelete(todo.id)}>
                    <i className="fas fa-trash"></i>
                </button>
            )}
        </div>
    );
}

export default ListItem;
