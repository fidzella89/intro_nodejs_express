const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const API_URL = "/todos";

function fetchTodos() {
        fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch todos");
                return response.json();
        })
        .then(todos => renderTodos(todos))
        .catch(error => {
            todoList.innerHTML = `<li style="color: red;">Error: ${error.message}</li>`;
    });
}

function renderTodos(todos) {
    todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
                li.className = "todo-item";
                li.innerHTML = `
                    <span>${todo}</span>
                    <button onclick="editTodo(${index})">Edit</button>
                    <button onclick="deleteTodo(${index})">Delete</button>
                `;
        todoList.appendChild(li);
        });
}

function addTodo(event) {
    event.preventDefault();
        const newTodo = todoInput.value.trim();
        if (!newTodo) {
            alert("Todo cannot be empty!");
            return;
        }
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ todo: newTodo })
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add todo");
                    return response.json();
            })
            .then(() => {
                todoInput.value = "";
                fetchTodos();
            })
            .catch(error => alert(error.message));
        }

function editTodo(index) {
    const updatedTodo = prompt("Edit your todo or task:");
        if (!updatedTodo) return;
    fetch(`${API_URL}/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: updatedTodo.trim() })
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to update todo");
            return response.json();
    })
    .then(() => fetchTodos())
    .catch(error => alert(error.message));
}

function deleteTodo(index) {
    if (!confirm("Are you sure you want to delete this todo?")) return;
        fetch(`${API_URL}/${index}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete todo");
                return response.json();
        })
        .then(() => fetchTodos())
        .catch(error => alert(error.message));
}

todoForm.addEventListener("submit", addTodo);
fetchTodos();