const express = require('express');
const mysql = require('mysql2');
const app = express();
let cors = require('cors')

app.use(cors())

const db = mysql.createConnection({
    host: '35.194.85.1',
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
        if(req.headers.token){
            let access_token = req.headers.token;
            let sqlSelect = 'SELECT email FROM user_state WHERE access_token ="' + access_token + '";';
            let querySelect = db.query(sqlSelect, (err, result) => {
                console.log(result);
                if(result.length > 0){
                    let email = result[0].email;
                    let userName="";
                        let sql = 'SELECT name from user_details as ud join user_state as us where us.state="online" and us.email = ud.email and us.email != "'+email+'";';
                        console.log(sql);
                        let query = db.query(sql, (err, users) => {
                            if (err) {
                                throw err;
                                }
                        let sql1 = 'SELECT name from user_details where email = "'+email+'";';
                        console.log(sql1);
                        let query1 = db.query(sql1, (err, username) => {
                            if (err) {
                                throw err;
                                } 
                        console.log('username'+ username[0].name);    
                        res.setHeader('Content-Type', 'text/html');
                        console.log(users);
                        res.json({userName: username[0].name,
                            msg: `Here are other users who are online`,
                            onlineUsers: users
                        })
                    });
                        });   
                }else{
                    res.send('You are Unauthorized User');
                }
            });
        }else{
            res.send("You are Unauthorized User");
        }
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log('listening on port....' + 3003));