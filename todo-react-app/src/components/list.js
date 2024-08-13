import ListItem from "./listItem";

const List = ({ todos, deleteItem, completeItem }) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        todo={todo}
                        onDelete={deleteItem}
                        onCompleted={completeItem}
                    />
                ))}
            </ul>
        </div>
    );
};

export default List;
