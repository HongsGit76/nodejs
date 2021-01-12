const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const fs = require('fs');
//const https = require('https');

var app = express();
app.use(bodyParser.json());

/* https 보안키
const options = {
    key: fs.readFileSync('./private/private.pem'),
    cert: fs.readFileSync('./private/public.pem')
}
*/

// 서버 시작
/* https로 시작하기
const server = https.createServer(options, app).listen(3000, function(){
    console.log("start! express server on port 3000!!");
});
*/

const server = app.listen(3000, function(){
    console.log("start! express server on port 3000!!");
});

// mysql 로그인
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'manager',
    password: '1234',
    database: 'hongs_members',
    multipleStatements: true // 여러 sql 명령어 가능하게 하는 도구
})

// mysql 연결
mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed \n ERROR: ' + JSON.stringify(err, undefined, 2));
});

// static 폴더 사용법
app.use(express.static('private'))

// DB에 접근해 한개의 열을 도메인을 통해 GET함
app.post('/login',(req, res)=>{
    let emp = req.body;
    let success = false;
    let sql_query = 'SELECT * FROM user WHERE userID = ? AND userPassword = ?';

    mysqlConnection.query(
            sql_query,
            [emp.userID, emp.userPassword],
            (err, rows, fields)=>{
                if(!err){
                    // 로그인 확인
                    if(rows[0] != undefined){
                        success = true;
                        rows[0].success = true;
                        res.send(rows[0]);
                    }else{
                        success = false;
                        res.send(success);
                    }
                    console.log(success);
                }
                else
                    console.log(err);
            }
    );
});

app.post('/register',(req,res)=>{
    let emp = req.body;
    let success = false;
    let sql_query = 'INSERT INTO user VALUES (?, ?, ?, ?)';
    // let find_dup = 'SELECT * FROM user WHERE userID = ?';

    mysqlConnection.query(
        sql_query,
        [emp.userID, emp.userPassword, emp.userName, emp.userAge],
        (err, rows, fields)=>{
            if(!err){
                success = true;
                res.send(success);
            }else
                console.log(err);
        }
    );
});


// 공부 해야할 것 암호화, 아이디 중복 제거
