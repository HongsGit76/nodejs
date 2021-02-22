var express = require('express'); 
const mysql = require('mysql');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

var uuidAPIKey = require('uuid-apikey');

const server = app.listen(3000, function(){
    console.log("start! express server on port 3000");
});

// mysql로그인
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'connectuser',
    password: 'connect123!@#',
    database: 'connectdb',
    multipleStatements: true //여러 sql명령문 가능하게 하는 도구
});

// mysql 연결
mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n ERROR: '+ JSON.stringify(err, undefined, 2));
});



// API KEY 생성과정
// console.log(uuidAPIKey.create()); -> uuid-apikey 생성 
const key = {
    apiKey: '9JA4NC0-ZFG4BA5-MXG28VG-XHXAT1X',
    uuid: '4c944ab0-fbe0-45a8-a760-246eec7aad07'
};
// uuid -> db에 저장
// 사용자에게 apiKey 발급 
// 이후 체크하기 

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/form', function(req, res){
    res.sendFile(__dirname + "/public/form.html")
})

// DB에 접근하여 모든 열을 GET함
app.get('/employees',(req, res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    });
});

// DB에 접근하여 한개의 열을 도메인을 통해 GET함
app.get('/employees/:id',(req, res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE empno = ?',[req.params.id] ,(err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    });
});

// DB에 접근하여 한개의 열을 도메인을 통해 DELETE함
app.delete('/employees/:id',(req, res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE empno = ?',[req.params.id] ,(err, rows, fields)=>{
        if(!err)
            res.send('DELETE Successfully');
        else
            console.log(err);
    });
});

// DB에 접근하여 한개의 열을 POST를 통해 INSERT함
app.post('/employees',(req, res)=>{
    let emp = req.body;
    var sql = "\
        SET @empno = ?;\
        SET @name = ?;\
        SET @job = ?;\
        SET @boss = ?;\
        SET @hiredate = ?;\
        SET @salary = ?;\
        SET @comm = ?;\
        SET @deptno = ?;\
        CALL EmployeeAddOrEdit(@empno, @name, @job, @boss, @hiredate, @salary, @comm, @deptno);\
    "
    mysqlConnection.query(sql,[emp.empno, emp.name, emp.job, emp.boss, emp.salary, emp.comm, emp.deptno] ,(err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    });
});

// 간단한 api서버 생성 연습 + apikey발급
app.get('/api/users/:apikey/:type', async (req, res)=>{
    let {
        apikey,
        type
    } = req.params;

    if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)){
        res.send('apikey is not valid');
    }else{
        console.log(type);

        if(type == 'seoul'){
            let data = [
                {name:"홍길동", city:"seoul"},
                {name:"김철수", city:"seoul"},
            ];
            res.send(data);
        }else if(type == 'jeju'){
            let data = [
                {name:"박지성", city:"jeju"},
                {name:"손흥민", city:"jeju"},
            ];
            res.send(data);
        }else{
            res.send('type is not correct');
        }
    }

    
    
});
// API 서버가 모든사람에게 공개되기 꺼려짐
// uuid-apikey 사용 API key 생성 -> npm install uuid-apikey

