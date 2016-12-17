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

function requestTask()
{
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

            //s.sleep(1);

            sendResponse({ans: data.test + 2});

            //s.sleep(1);

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
