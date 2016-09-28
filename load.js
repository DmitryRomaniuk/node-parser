const fs = require('fs');
const http = require('http');
const q = require('q');

var i = 0;
var arrRadio = [];
let promise = new Promise(function (resolve) {
    fs.readFile('radio.txt', 'utf8', (err, data) => {
        if (err) throw err;
        arrRadio = data.split(",");
        arrRadio = arrRadio.map( function (val, index) {
           return val.match(/http\:\/\/[0-9a-zA-Z.:-]{1,}/gi)[0];
        })
        resolve(arrRadio);
    })
})
.then(function (value, resolve, reject) {
    callNextStep();
})


function callNextStep() {
    console.log(arrRadio[i]);
    var url = arrRadio[i].match(/http:[^:]+/gi)[0];
    var port = arrRadio[i].match(/\d+$/gi)[0];
    url = url.match(/[^/]+$/gi)[0];
    var options = {
        hostname: url,
        port: port,
        path: "/listen.pls",
        method: 'GET'
    };

    var req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            let bodyFile = chunk.toString();
            fs.writeFile(`${url}.pls`, bodyFile, 'utf8', (err) => {
                    if (err) throw err;
            });
        });
        res.on('end',()=>{console.log(`${url}:${port} - It\'s saved!`);});
    });

    req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
    });
    
    req.end(()=>{
        i++
        if (i<arrRadio.length) {promise.then(callNextStep())}
    });
}