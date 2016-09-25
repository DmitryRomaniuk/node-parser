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
        //console.log('http://us2.internet-radio.com:8137/listen.pls'.match(/http\:\/\/[0-9a-zA-Z.:-]{1,}/gi)[0]);
        //console.log(arrRadio);
        /*callNextStep({
        hostname: arrRadio[0].match(/http:*+?(d+)/gi),
        port: 80,
        path: '/upload',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
            }
        });*/
    })
})
.then(function (value, resolve, reject) {
    //arrRadio = arrRadio.map(function (arg1, index) {
    function callNextStep() {
        var url = arrRadio[i].match(/http:[^:]+/gi)[0];
        var port = arrRadio[i].match(/\d+$/gi)[0];
        url = url.match(/[^/]+$/gi)[0];
        //console.log(url+' '+ port);
        var options = {
        hostname: url,
        port: port,
        path: "/listen.pls",
        method: 'GET'
        };

        var req = http.request(options, (res) => {
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                    let bodyFile = chunk.toString();
                    fs.writeFile(`${url}.pls`, bodyFile, 'utf8', (err) => {
                        if (err) throw err;
                        console.log(`${url}:${port} - It\'s saved!`);
                        });
            });
        res.on('end', () => {
            //console.log('No more data in response.');
        });
        });

        req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.end(()=>{
            i++
            if (i<arrRadio.length) {callNextStep()}
        });
    }
    callNextStep();
    //})
})

/*
var options = {
hostname: "192.184.9.158",
port: "8674",
path: "/listen.pls",
method: 'GET'
};

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
            let bodyFile = chunk.toString();
            let nowTime = Date.now();
            nowTime = nowTime + ".pls";
            fs.writeFile(nowTime, bodyFile, 'utf8', (err) => {
                if (err) throw err;
                console.log(`It\'s saved!`);
                });
    });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.end();
*/
/*
http.get('http://192.184.9.158:8674/listen.pls', (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
            let bodyFile = chunk.toString();
            let nowTime = Date.now();
            nowTime = nowTime + ".pls";
            fs.writeFile(nowTime, bodyFile, 'utf8', (err) => {
                if (err) throw err;
                console.log(`It\'s saved!`);
                });
    });
    res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});

/*
            http.get(val[a], (res) => {
                //console.log(`Got response: ${res.statusCode}`);
                res.on('data', (text) => {
                    let bodyFile = text.toString();
                    let nowTime = Date.now();
                    nowTime = nowTime + ".pls";
                    fs.writeFile(nowTime, bodyFile, 'utf8', (err) => {
                        if (err) throw err;
                    });
                })
                console.log(a + 'connection closed')
                res.resume();
            }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);
            });
*/