const express = require('express')
const auth = require('../middleware/user_jwt')

const Todo = require('../models/Todo')

const router = express.Router()
router.post('/', auth , async(req,res,next)=>
{
    try
    {
        const toDo = await Todo.create(
            {title: req.body.title
            ,description: req.body.description
            ,deadline: req.body.deadline
            ,time: req.body.time
            ,user: req.user.id
            });
        if(!toDo)
        {
            return res.status(400).json({
                success: false,
                msg: 'Something went wrong'
            })
        }

        return res.status(200).json({
            success: true,
            todo: toDo,
            msg:'Tasked it. Do it!'
        })
    }
    catch(error)
    {
        next(error)
    }

})

router.get('/', auth, async(req, res, next)=>{
    try{
        const todo = await Todo.find({user: req.user.id, finished: false})
        if(!todo)
        {
            return res.status(400).json({
                success: false,
                msg:"Error! Relax..Solving the problem"
            })
        }
        res.status(200).json({
            success: true,
            count:todo.length,
            todos: todo,
            msg: 'Tasks fetched! Time to do it'
        })

    }
    catch(error)
    {
        next(error)
    }
})

router.get("/finished", auth, async(req, res, next)=>
{
    try
    {
        const todo = await Todo.find({user: req.user.id, finished: true})
        if(!todo)
        {
            return res.status(400).json({success: false, msg: 'Pfff! Technical faults'})
        }

        res.status(200).json({success: true,count: todo.length, todos: todo, msg: 'Fetched Finished task'})
    }
    catch(error)
    {
        next(error)
    }
    
})

router.put('/:id', async(req, res, next)=>
{
    try
    {
        let toDo = await Todo.findById(req.params.id)
        if(!toDo)
        {
            return res.status(400).json({success: false, msg: 'Task not found!'})
        }

        toDo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })

        return res.status(200).json({success: true, todo: toDo, msg: 'Updated Tasks! Time to work!'})

    }
    catch(error)
    {
        next(error)
    }
})

router.delete('/:id', async(req,res,next)=>
{
    try
    {
        let toDo = await Todo.findById(req.params.id)
        if(!toDo)
        {
            return res.status(400).json({success: false, msg: "Task not found!"})
        }
        toDO = await Todo.findByIdAndDelete(req.params.id)

        res.status(200).json({success: true, msg:'Task deleted succesfully'})

    }
    catch(error)
    {
        next(error)
    }
})

module.exports = router
