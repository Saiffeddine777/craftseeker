const express = require("express")
const conn = require("../database/index.js")
const chatroomsRouter = express.Router()

chatroomsRouter.get('/getworkerinbox/:workerId',(req,res)=>{
  const {workerId} = req.params
  const sql =`SELECT chatrooms.roomId , clients.clientFirstName , clients.clientLastName , clients.clientId
              FROM chatrooms 
              INNER JOIN clients ON clients.clientId  = chatrooms.clientId
              WHERE chatrooms.workersId = ?; ` 
  conn.query(sql,[workerId],(err,results)=>{
    if(err){
        console.log(err)
        res.status(500).json(err)
    }
    console.log(results)
    res.status(200).json(results)
  })
})


chatroomsRouter.get('/getclientinbox/:clientId',(req,res)=>{
    const {clientId} = req.params
    const sql =`SELECT chatrooms.roomId , workers.workerFirstName , workers.workerLastName,workers.workersId 
                FROM chatrooms 
                INNER JOIN workers ON workers.workersId  = chatrooms.workersId
                WHERE chatrooms.clientId = ? ;` 
    conn.query(sql,[clientId],(err,results)=>{
      if(err){
          console.log(err)
          res.status(500).json(err)
      }
      console.log(results)
      res.status(200).json(results)
    })
  })


  chatroomsRouter.get("/getchatroombymembers/:workersId/:clientId",(req,res)=>{
     const {workersId,clientId} = req.params
     const sql = "SELECT roomId FROM chatrooms WHERE clientId = ? AND workersId = ? ;"
     conn.query(sql,[clientId,workersId],(err,results)=>{
      if(err){
        console.log(err)
        res.status(500).json(err)
      }
      console.log(results)
      res.status(200).json(results)
     })
  })

module.exports=chatroomsRouter