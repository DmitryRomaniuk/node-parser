const fs = require('fs');
const http = require('http');
const q = require('q');

var i = 0;
var arrRadio = [];
let promise = new Promise(function (resolve) {
    fs.readFile('radio.txt', 'utf8', (err, data) => {
        if (err) throw err;
        arrRadio = data.split(",");
        //console.log(arrRadio);
        resolve(arrRadio);
        console.log('https://developer.mozilla.org05646'.match(/http.+?/gi));
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
/*
    .then(function (val) {
        for (i=0; i < (arrRadio.length-1)/2; i++) {
            let a = i;
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
        }
    })
*/
//http.on('end',()=>console.log('connection closed'))



var postData = JSON.stringify({
  'msg' : 'Hello World!'
});

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};
function callNextStep(options) {
var req = http.request(options, (res) => {
  //console.log(`STATUS: ${res.statusCode}`);
  //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
        let bodyFile = chunk.toString();
        let nowTime = Date.now();
        nowTime = nowTime + ".pls";
        fs.writeFile(nowTime, bodyFile, 'utf8', (err) => {
            if (err) throw err;
            //console.log('It\'s saved!');
            });
  });
  res.on('end');
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end(() => {
    //if () {console.log('No more data in response.');}
  });
}

