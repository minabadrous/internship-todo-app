import '../styles.css';

function Form({ title, update, setTitle }) {
    return (
        <form id="taskAdder" onSubmit={update}>
            <input type="text" name="task" id="taskInput" onChange={(e) => setTitle(e.target.value)} placeholder="Enter your task here...." value={title} />
            <div id="btnWrapper"><button type="submit" id="addBtn"><i className="fas fa-plus addBtnIcon"></i></button> </div>
        </form>
    );
}

export default Form;