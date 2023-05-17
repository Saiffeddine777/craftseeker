const express = require("express")
const reportsOftheWorkerRouter = express.Router()
const conn = require('../database/index')

reportsOftheWorkerRouter.post('/addworkereport',(req,res)=>{
    const {workerId , clientId, workerReportingClientTitle , workerReportingClientBody} =  req.body
    const workerReportDate = new Date().toISOString().slice(0,19).replace('T',' ')
    const  sql = `INSERT INTO reportsoftheworkers (clientId, workersId, workerReportingClientTitle, workerReportingClientBody, workerReportDate) 
    VALUES (?, ?, ?, ?, ?);`
    conn.query(sql,[clientId, workerId, workerReportingClientTitle, workerReportingClientBody, workerReportDate],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)    
        }
        res.status(200).json(results)
    })
})

reportsOftheWorkerRouter.get('/workerreports',(req,res)=>{
    const sql = `SELECT * FROM reportsoftheworkers`
    conn.query(sql , (err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

reportsOftheWorkerRouter.get('/workerreport/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM reportsoftheworkers where workeRreportId = ?`
    conn.query(sql,[id],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

reportsOftheWorkerRouter.put('/editworkerreport/:id',(req,res)=>{
    const id = req.params.id
    const {workerReportingClientTitle, workerReportingClientBody} =  req.body
    const workerReportDate = new Date().toISOString().slice(0,19).replace('T',' ')
    const  sql = `UPDATE reportsoftheworkers
                  SET workerReportingClientTitle = ?, workerReportingClientBody = ?,workerReportDate=?
                  WHERE workerReportId = ?;`
    conn.query(sql ,[workerReportingClientTitle, workerReportingClientBody, workerReportDate, id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)    
        }
        res.status(200).json(results)
    })
})

reportsOftheWorkerRouter.delete('/deleteworkerreport/:id',(req,res)=>{
    const id = req.params.id
    const  sql = `DELETE FROM reportsoftheworkers
                  WHERE workerReportId = ?;`
    conn.query(sql ,[id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)    
        }
        res.status(200).json(results)
    })
})




module.exports= reportsOftheWorkerRouter

  