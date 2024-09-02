import Chart from "./Chart";
import ListItem from "./ListItem";

function List({ todos, handleDeleteTodo, handleCheckTodo, handleTitleChange }) {
  const pieChartData = [
    { name: "Completed", value: todos.filter((todo) => todo.completed).length },
    { name: "Pending", value: todos.filter((todo) => !todo.completed).length },
  ];
  return (
    <>
      <div id="chart-container">
        <Chart pieChartData={pieChartData} />
      </div>

      <div id="task-container">
        <ul id="initialTodosList">
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onCheck={handleCheckTodo}
              onTitleChange={handleTitleChange}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
export default List;
