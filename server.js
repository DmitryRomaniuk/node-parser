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
var pages = new Array(26);
for (let i=0;i<pages.length;i++) {
    let j=i+1;
    var currPage='/stations/top%2040/page'+j;
    var options = {
    hostname: 'www.internet-radio.com',
    port: 443,
    path: currPage,
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
}