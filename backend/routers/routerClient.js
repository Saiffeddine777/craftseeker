const express = require("express")
const conn = require("../database/index.js")
const clientRouter = express.Router()
const bcrypt = require("bcrypt")
require('dotenv').config();
const { authenticateToken } = require("../middlewares/jwt.js");
const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const multer = require('multer')
const fs = require('fs');

clientRouter.post('/addclients',(req,res)=>{
    const data = req.body
    console.log(data)
    const sql = `INSERT INTO clients (clientFirstName, clientLastName, clientAdress, clientEmail, clientPhone, clientDateOfBirth) 
    VALUES (?, ?, ?, ?, ?, ?);`
    conn.query(sql,[data.clientFirstName,data.clientLastName,data.clientAdress,data.clientEmail,data.clientPhone,data.clientDateOfBirth],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        } 
        res.status(200).json(results)
    })
})

clientRouter.post('/addclient', async (req, res) => {
    const {
        clientId,
        clientFirstName,
        clientAdress,
        clientEmail,
        clientPhone,
        clientDateOfBirth,
        clientLastName,
        clientPassword,
        imageUrl
    } = req.body;
  
   
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(clientPassword, salt);
  
            const sql = `INSERT INTO clients (clientId,clientFirstName, clientAdress, clientEmail, clientPhone, clientDateOfBirth, clientLastName, clientPassword, imageUrl) 
            VALUES (? , ? ,?, ?, ?, ?, ?, ?, ?);`
            conn.query(sql, [clientId,clientFirstName, clientAdress, clientEmail, clientPhone, clientDateOfBirth, clientLastName,  hashedPassword ,imageUrl], (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).json(err)
                }
                res.status(200).json(results)
            })
            
        } catch (error) {
            console.log(error);
        }
  
  })


clientRouter.get('/getall',(req,res)=>{
    const sql = `SELECT * FROM clients;`
    conn.query(sql , (err,results)=>{
       if(err){
        console.log(err)
        res.status(500).json(err)
       }
       res.status(200).json(results)
    })
})

clientRouter.get('/getone/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT *  FROM clients WHERE clientId = ?;`
    conn.query(sql,[id],(err,results)=>{
        if (err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

clientRouter.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
  
    const {
      clientLastName,
      clientFirstName,
      clientAdress,
      clientEmail,
      clientPhone,
      imageUrl,
    } = req.body;
  
    const sql = `UPDATE clients SET clientAdress = ?, clientEmail = ?, clientPhone = ?, imageUrl = ?, clientLastName = ?, clientFirstName = ? WHERE clientId = ?`;
    conn.query(
      sql,
      [
        clientAdress,
        clientEmail,
        clientPhone,
        imageUrl,
        clientLastName,
        clientFirstName,
        id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
        res.status(200).json(results);
      }
    );
  });
  

clientRouter.get('/getall',(req,res)=>{
    const sql = `SELECT * FROM clients;`
    conn.query(sql , (err,results)=>{
       if(err){
        console.log(err)
        res.status(500).json(err)
       }
       res.status(200).json(results)
    })
})


clientRouter.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM clients
    WHERE clientId = ?;`
    conn.query(sql,[id],(err,results)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(results)
    })
})

clientRouter.post('/login', authenticateToken, async (req, res) => {
  console.log("sdqsdq")
    const { clientEmail, clientPassword } = req.body;
    const sql = `SELECT * FROM clients WHERE clientEmail = ?`;
    conn.query(sql, [clientEmail], async (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal ' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid email' });
        } else {
            try {
                const client = results[0];
                const match = await bcrypt.compare(clientPassword, client.clientPassword);
                if (!match) {
                    res.status(401).json({ error: 'Invalid password' });
                } else {
                    const token = jwt.sign(client, process.env.SECRET, { expiresIn: '24h' });
                    res.status(200).json({ token: token ,data: client});
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    });
  });


  clientRouter.post('/uploadFile', (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const uplDir="uploads/"
        if(!fs.existsSync(uplDir)){
            fs.mkdirSync(uplDir)
        }
        cb(null, uplDir);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    });
  
    const upload = multer({ storage }).single('profile-image');
    upload(req, res, function (err) {
      if (err) {
        return res.send(err);
      }
      console.log('File uploaded to server');
      console.log(req.file);
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2;
      cloudinary.config({
        cloud_name: 'dilwfvmbr',
        api_key: '443273299735126',
        api_secret: 'gv4yova2aVkz0IyYgwRcqAjV7EM',
        secure: true
      });
  
      const path = require('path');
      const filePath = path.resolve(req.file.path);
      const uniqueFilename = new Date().toISOString(); 
  
      cloudinary.uploader.upload(filePath, {
        public_id: `Clients/${uniqueFilename}`,
        tags: 'Clients'
      }, function (err, result) {
        if (err) {
          console.log('Error uploading file to Cloudinary');
          return res.send(err);
        }
  
        
        fs.unlinkSync(filePath);
  
        res.json(result.url);
      }).then();
    })
    
  });






module.exports= clientRouter