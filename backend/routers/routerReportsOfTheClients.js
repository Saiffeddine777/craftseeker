const express = require("express")
const reportsOftheClientRouter = express.Router()
const conn = require('../database/index')

reportsOftheClientRouter.post('/addclientreport',(req,res)=>{
    const {workersId , clientId, clientReportingWorkerTitle , clientReportingWorkerBody} =  req.body
    const clientReportDate = new Date().toISOString().slice(0,19).replace('T',' ')
    const  sql = `INSERT INTO reportsoftheclients (clientId, workersId, clientReportingWorkerTitle, clientReportingWorkerBody, clientReportDate) 
    VALUES (?, ?, ?, ?, ?);`
    conn.query(sql,[clientId, workersId, clientReportingWorkerTitle, clientReportingWorkerBody, clientReportDate],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)    
        }
        res.status(200).json(results)
    })
})

reportsOftheClientRouter.get('/getreportsofclientsbyworkerid/:workersId',(req,res)=>{
    const {workersId} = req.params
    const sql = `SELECT reportsoftheclients.* ,clients.clientFirstName ,clients.clientLastName FROM reportsoftheclients
    INNER JOIN clients ON reportsoftheclients.clientId = clients.clientId
    WHERE workersId = ?` 
    conn.query(sql,[workersId],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        console.log(results)
        res.status(200).json(results)
    })
})

reportsOftheClientRouter.get('/clientreports',(req,res)=>{
    const sql = `SELECT * FROM reportsoftheclients`
    conn.query(sql , (err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

reportsOftheClientRouter.get('/clientreport/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM reportsoftheclients where clientReportId = ?`
    conn.query(sql,[id] , (err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

reportsOftheClientRouter.put('/editclientreport/:id',(req,res)=>{
    const id = req.params.id
    const {clientReportingWorkerTitle , clientReportingWorkerBody} =  req.body
    const clientReportDate = new Date().toISOString().slice(0,19).replace('T',' ')
    const  sql = `UPDATE reportsoftheclients
                  SET clientReportingWorkerTitle = ?, clientReportingWorkerBody = ?,clientReportDate=?
                  WHERE clientReportId = ?;`
    conn.query(sql ,[clientReportingWorkerTitle, clientReportingWorkerBody, clientReportDate, id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)    
        }
        res.status(200).json(results)
    })
})

reportsOftheClientRouter.delete('/deleteclientreport/:id',(req,res)=>{
    const id = req.params.id
    const  sql = `DELETE FROM reportsoftheclients
                  WHERE clientReportId = ?;`
    conn.query(sql ,[id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)    
        }
        res.status(200).json(results)
    })
})




module.exports= reportsOftheClientRouter

  