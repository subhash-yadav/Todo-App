export function addNewTodo(newTodo) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateTodo(todo) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/todos/" + todo.id, {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}
export function deleteTodo(todoId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/todos/" + todoId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: todoId } });
  });
}

export function fetchTodoByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/todos?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchTodoById(id){
  return new Promise(async(resolve)=>{
    const response = await fetch("http://localhost:8080/todos/"+id)
    const data = await response.json();
    resolve({data})
  })
}

