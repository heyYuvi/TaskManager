import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const statusType = ["Pending", "In Progress", "Completed"];
        if (status && !statusType.includes(status)) {
            return res.status(400).json({ message: "Invalid status, Please enter a valid status" });
        }

        const task = await Task.create({
            title,
            description,
            status,
            user: req.user._id
        });
        res.status(201).json({
            message: "Task Created",
            task
        });
    } catch (error) {
        console.log("Error in get taskController", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getTask = async (req, res) => {
    // try {
    //     const tasks = await Task.find({ user: req.user._id });
    //     res.status(200).json({
    //         tasks
    //     });
    // } catch (error) {
    //     console.log("Error in getTask", error.message);
    // }

    try {
        const { status, search } = req.query;

        let query = { user: req.user._id };


        if (status) {
            query.status = status;
        }
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        console.log(query);

        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const allowedStatus = ["Pending", "In Progress", "Completed"];
        if (status && !allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        task.title = title.trim() || task.title;
        task.description = description?.trim() || task.description;
        task.status = status || task.status;

        await task.save();

        res.status(200).json({
            message: "Task updated"
        });
    } catch (error) {
        console.log("Error in updateTask", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await task.deleteOne();
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        console.log("Error in deleteTask", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}