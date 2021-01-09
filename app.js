var express = require('express');
var app = express();
var uuidAPIKey = require('uuid-apikey');

const server = app.listen(3000, function(){
    console.log("start! express server on port 3000");
});

// API KEY 생성과정
// console.log(uuidAPIKey.create()); -> uuid-apikey 생성 
const key = {
    apiKey: '9JA4NC0-ZFG4BA5-MXG28VG-XHXAT1X',
    uuid: '4c944ab0-fbe0-45a8-a760-246eec7aad07'
};


app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
})

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

