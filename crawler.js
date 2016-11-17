
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

if (process.argv[2] != undefined) {
    var START_URL = process.argv[2];
} else {
    throw "lack of url in argument call";
}

var pagesVisited = {};
var numPagesVisited = 0;
var MAX_PAGES = 20;
var pagesToVisit = [];

var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);

do();

function do() {
    if(numPagesVisited >= MA) {
        console.log("The maximum number of pages for this thread was reached");
    }
    else {
        
    }
}
