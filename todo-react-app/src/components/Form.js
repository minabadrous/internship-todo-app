function Form({ updateTodos, setTitle, title }) {
  return (
    <div id="form-header">
      <form id="myForm" action="" onSubmit={updateTodos}>
        <input
          id="todo-input"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button id="todo-button" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="21"
            viewBox="0 0 448 512"
          >
            <path
              fill="#74C0FC"
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Form;
