import List from './Components/List';

function History({ todos, completeTodo, deleteTodo, editTodo }) {
    return (
        <>
            <List
                todos={todos}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
                editTitle={editTodo}
            />
        </>
    )
}