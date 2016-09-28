var fs = require('fs');
const https = require('https');
const http = require('http');
var htmlparser = require("htmlparser2");
var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "a" && attribs.title === "M3U Playlist File"){
            let asd = attribs.href.match(/http\:\/.+?.pls/gi);
            if (asd) {arr1.push(asd[0]);}
        }
    }
}, {decodeEntities: true});

var arr1=[];
var pages = new Array(30);
var i=0;
callNextStep();
function callNextStep() {
    let j=i+1;
    var options = {
    hostname: 'www.internet-radio.com',
    port: 443,
    path: `/stations/dance/page${j}`,
    method: 'GET'
    };

    var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (d) => {
            //process.stdout.write(d);
            parser.write(d);
            parser.end();
        });
        res.on('error', (e) => {
        console.log(`problem with chunk: ${e.message}`);
        });
        res.on('end', () =>{
        if (i===pages.length-1) {
            //process.stdout.write(arr1);
            fs.writeFile('radio.txt',  arr1, 'utf8', (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
                    });
            }
        });
    });

    req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
    });
    
    req.end(()=>{
        i++
        if (i<pages.length) {setTimeout(()=>{callNextStep()},1000)}
    });
}
/*
for (let i=0;i<pages.length;i++) {
    let j=i+1;
    var options = {
    hostname: 'www.internet-radio.com',
    port: 443,
    path: `/stations/top%2040/page${j}`,
    method: 'GET'
    };

    var req = https.request(options, (res) => {

    res.on('data', (d) => {
        //process.stdout.write(d);
        parser.write(d);
        parser.end();
    });
    res.on('end', () =>{
    if (i===pages.length-1) {
        fs.writeFile('radio.txt',  arr1, 'utf8', (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
                });
        }
    });
    });
    req.end();

    req.on('error', (e) => {
    console.error(e);
    });
}*/