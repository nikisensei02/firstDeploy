import express from 'express';
import User from '../models/user.js';
import List from '../models/list.js';

const router = express.Router();

//add task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById( id );
        
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save();
            existingUser.list.push(list);
            existingUser.save();
            res.status(200).json({ list });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add task" });
    }
});

//update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
            const list = await List.findByIdAndUpdate(req.params.id,{title,body});
            list.save().then(()=>res.status(200).json({message:"task updated"}));
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unable to task updated" });
    }
});


//delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id,
            { $pull: { list: req.params.id } }
        );
        
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Task deleted" }); 
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to delete task" });
    }
});


//get tasks
router.get("/getTask/:id", async (req, res) => {
    try {
        const list = await List.find({user: req.params.id}).sort({createdAt:-1});
        if(list.length !== 0 ){
            res.status(200).json({list}); 
        }
        else{
            res.status(200).json({message:"no task available"});
        }
        
    } catch (error) {
        console.log(error);
    }
    
});


export default router;
