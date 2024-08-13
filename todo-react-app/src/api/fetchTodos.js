export const fetchTodos = async (options) => {
    const url = `https://jsonplaceholder.typicode.com/todos/${
        options?.filter ? "history" : ""
    }`;

    return new Promise((resolve, reject) => {
        return setTimeout(() => {
            resolve(
                options?.filter
                    ? [
                          {
                              id: 1,
                              title: "Learn React",
                              completed: false,
                          },
                          {
                              id: 2,
                              title: "Learn Node",
                              completed: false,
                          },
                          {
                              id: 3,
                              title: "Learn Express",
                              completed: false,
                          },
                      ]
                    : [
                          {
                              id: 1,
                              title: "Take out the trash",
                              completed: false,
                          },
                          {
                              id: 2,
                              title: "Grocery shopping",
                              completed: true,
                          },
                          {
                              id: 3,
                              title: "Clean gecko tank",
                              completed: false,
                          },
                      ]
            );
        }, 1000);
    });
};
