const jwt = require('jsonwebtoken');
require("dotenv").config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null) {
     next();
      return;
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        res.status(200).json(user);
        return ;
    });
}
module.exports={
    authenticateToken
}

