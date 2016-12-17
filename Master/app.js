var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var i = 0;

app.use(bodyParser.json());

var tasker = require("../Task.js")();

app.get('/task', function (req, res)
{
    var data = tasker.getNewTask();
    console.log('Task Requested. Data: ' + data.test);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.post('/task',function (req, res)
{
    console.log(req.body);
    tasker.taskCompleted(req.body);
    res.sendStatus(200);
});

app.get('/results', function (req, res)
{
    res.send(tasker.getResult());
});

app.listen(8080);