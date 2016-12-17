var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var i = 0;

app.use(bodyParser.json());

app.get('/task', function (req, res)
{
    var data = {test: i++};
    console.log('Task Requested. Data: ' + data.test);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.post('/task',function (req, res)
{
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(8080);