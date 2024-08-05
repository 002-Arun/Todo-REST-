const express = require('express');
const { Todo } = require('./db');
const app = express();

app.use(express.json());

app.post("/createTodo", async (req, res) => {
    const createPayload = req.body;

    try {
        await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        });
        res.status(200).json({
            msg: "Todo created successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error creating todo",
            error
        });
    }
});

app.get("/getTodo", async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({
            todos
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching todos",
            error
        });
    }
});

app.put("/updateTodo/:id", async (req, res) => {
    const { id } = req.params;
    const updatePayload = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, updatePayload, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({
                msg: "Todo not found"
            });
        }

        res.status(200).json({
            msg: "Todo updated successfully",
            updatedTodo
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating todo",
            error
        });
    }
});

app.delete("/deleteTodo/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                msg: "Todo not found"
            });
        }

        res.status(200).json({
            msg: "Todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error deleting todo",
            error
        });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
