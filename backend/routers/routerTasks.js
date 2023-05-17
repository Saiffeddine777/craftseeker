const express = require("express")
const taskRouter = express.Router()
const conn = require ("../database/index.js")

taskRouter.post('/addatask',(req,res)=>{
    const {clients_clientId, workers_workersId ,taskTitle,taskText } = req.body
    const taskStatus = "Pending"
    const taskDate = new Date().toISOString().slice(0,19).replace('T',' ')
    const sql = `INSERT INTO tasks (clients_clientId, workers_workersId, taskTitle, taskText, taskDate,taskStatus)
    VALUES (?,?, ?,?, ?,?);`
    conn.query(sql ,[clients_clientId, workers_workersId, taskTitle, taskText, taskDate, taskStatus],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

taskRouter.get("/getworkeroffers/:workerId",(req,res)=>{
    const {workerId} = req.params
    const sql = `SELECT tasks.taskId, tasks.taskTitle, tasks.taskText, clients.clientId, clients.clientFirstName, clients.clientLastName
    FROM tasks 
    INNER JOIN clients ON clients.clientId = tasks.clients_clientId  
    WHERE tasks.workers_workersId = ? AND tasks.taskStatus = 'Pending';
    `
    conn.query(sql,[workerId],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        console.log(results)
        res.status(200).json(results)
    })
})




taskRouter.get("/getworkscompeleted/:workerId",(req,res)=>{
    const {workerId} = req.params
    const sql = `SELECT tasks.taskId, tasks.taskTitle, tasks.taskText, clients.clientId, clients.clientFirstName, clients.clientLastName
    FROM tasks 
    INNER JOIN clients ON clients.clientId = tasks.clients_clientId  
    WHERE tasks.workers_workersId = ? AND tasks.taskStatus = 'Completed';
    `
    conn.query(sql,[workerId],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        console.log(results)
        res.status(200).json(results)
    })
})


taskRouter.get('/alltasks',(req,res)=>{
    const sql = `SELECT * FROM tasks;`
    conn.query(sql ,(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})


taskRouter.put('/updateatask/:id',(req,res)=>{
    const id = req.params.id
    const {taskTitle,taskText} = req.body
    const taskDate = new Date().toISOString().slice(0,19).replace('T',' ')
    const sql =`UPDATE tasks SET taskTitle = ?, taskText = ?, taskDate = ? WHERE taskId = ?;`
    conn.query(sql ,[taskTitle, taskText, taskDate,id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})


taskRouter.get('/getonetask/:id',(req,res)=>{
    const id = req.params.id
    const sql =`SELECT * FROM tasks where taskId = ?;`
    conn.query(sql,[id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

taskRouter.delete('/deletetask/:id',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM tasks WHERE taskId = ?;`
    conn.query(sql ,[id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})
taskRouter.get("/getclientacceptedoffers/:clientId",(req,res)=>{
    const {clientId} = req.params
    const sql = `SELECT tasks.taskId, tasks.taskTitle, tasks.taskText, workers.workersId, workers.workerFirstName, workers.workerLastName
    FROM tasks
    INNER JOIN workers ON workers.workersId = tasks.workers_workersId
    WHERE tasks.clients_clientId = ? AND tasks.taskStatus = 'in Progress';
    `
    conn.query(sql,[clientId],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        console.log(results)
        res.status(200).json(results)
    })
})

taskRouter.get("/getclientcompletedoffers/:clientId",(req,res)=>{
    const {clientId} = req.params
    const sql = `SELECT tasks.taskId, tasks.taskTitle, tasks.taskText, workers.workersId, workers.workerFirstName, workers.workerLastName
    FROM tasks
    INNER JOIN workers ON workers.workersId = tasks.workers_workersId
    WHERE tasks.clients_clientId = ? AND tasks.taskStatus = 'Completed';
    `
    conn.query(sql,[clientId],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        console.log(results)
        res.status(200).json(results)
    })
})

taskRouter.put('/changetaskstatus/:id',(req,res)=>{
    const id = req.params.id
    const sql=`update tasks 
       set taskStatus ="Completed"
       where taskId = ? ;`
       conn.query(sql,[id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        console.log(results)
        res.status(200).json(results)
    })
})

module.exports = taskRouter