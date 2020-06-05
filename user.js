const express = require('express');
const mysql = require('mysql2');
const app = express();


const db = mysql.createConnection({
    host: '104.196.130.198',
    user: 'root',
    password: 'deep6844',
    database: 'assignment2'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql Connected Successful');
});

app.get('/api/user_details', (req, res) => {
    console.log("heloo");
    // console.log(req.session);
    // console.log(req);
        if(req.headers.userid){
            // console.log(req)
        let sql = 'SELECT name from user_details as ud join user_state as us where us.state="online" and us.email = ud.email;';
        let query = db.query(sql, (err, users) => {
            if (err) {
                throw err;
                }
        res.setHeader('Content-Type', 'text/html');
        console.log(users)
        res.json({
            msg: `Here are other users who are online`,
            users
        })
        });
    }
    else{
        res.send("Login First");
    }
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log('listening on port....' + port));