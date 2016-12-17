var express = require("express");
var http = require("http");
var s = require("sleep");

var options = {
    host: 'localhost',
    port: 8080,
    path: '/task',
    method: 'GET',
    json: true
};

var post_options = JSON.parse(JSON.stringify(options));
post_options.method = 'POST';
post_options.headers = {
    'Content-Type': 'application/json'
};

var tasker = require("../Task.js")();

function requestTask()
{
    console.log('requestTask');
    http.get(options, function (res)
    {
        var body = '';

        res.on('data', function (chunk)
        {
            body += chunk;
        });

        res.on('end', function ()
        {
            var data = JSON.parse(body);
            console.log(data.test);

            var result = tasker.doTask(data);
            sendResponse(result);

            requestTask();
        })


    }).on("error", function (e)
    {
        console.log("Error: " + e.message);
    });
}

function sendResponse(answer)
{
    post_options.json = JSON.stringify(answer);
    var req = http.request(post_options);

    req.write(post_options.json);
    req.end();
}

requestTask();
