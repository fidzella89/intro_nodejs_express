const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 2000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); 

let todos = [];

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {
    const { todo } = req.body;
        if (todo) {
            todos.push(todo);
            res.status(201).json({ message: "Todo added successfully" });
        } else {
            res.status(400).json({ error: "Invalid todo" });
        }
});

app.put("/todos/:index", (req, res) => {
    const { index } = req.params;
    const { todo } = req.body;

        if (todos[index]) {
            todos[index] = todo;
            res.json({ message: "Todo updated successfully" });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
});

app.delete("/todos/:index", (req, res) => {
    const { index } = req.params;

        if (todos[index]) {
            todos.splice(index, 1);
            res.json({ message: "Todo deleted successfully" });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});