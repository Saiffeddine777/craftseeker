const express = require("express")
const reviewRouter = express.Router()
const conn = require("../database/index.js")


reviewRouter.get('/getallreviews',(req,res)=>{
    const sql = `SELECT * FROM reviews`
    conn.query(sql,(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})
reviewRouter.delete('/deleteonereview/:rId',(req,res)=>{
    const{rId}= req.params
    const sql = `DELETE FROM reviews WHERE reviewId = ? ;`
    conn.query(sql,[rId],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})
reviewRouter.put('/updatereview/:rId',(req,res)=>{
    const{rId}= req.params
    const {reviewText} = req.body
    const sql = `UPDATE reviews SET reviewText = ? WHERE reviewId = ?;`
    conn.query(sql,[reviewText,rId],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

reviewRouter.get('/getreview/:cId/:wId/:rId',(req,res)=>{
    const{cId,wId,rId}= req.params
    const sql = `SELECT * FROM reviews WHERE reviewId=? AND clients_clientId = ? AND workers_workersId = ? `
    conn.query(sql,[rId,cId,wId],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
}) 

reviewRouter.post('/makeareview/:cId/:wId',(req,res)=>{
    const wId = req.params.wId
    const cId = req.params.cId
    const {reviewText} = req.body
    const reviewDate = new Date().toISOString().slice(0,19).replace('T',' ')
    const sql = `INSERT INTO reviews (clients_clientId, workers_workersId, reviewText, reviewDate)
    VALUES (?, ?, ?, ?);`
    conn.query(sql ,[cId,wId,reviewText,reviewDate],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})


module.exports = reviewRouter