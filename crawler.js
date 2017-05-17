
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

if (process.argv[2] != undefined) {
    var START_URL = process.argv[2];
} else {
    throw "lack of url in argument call";
}

var pagesVisited = {};
var externalLinks = [];
var numPagesVisited = 0;
var MAX_PAGES = 300;
var pagesToVisit = [];

var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);

search();

function search() {
    if (numPagesVisited >= MAX_PAGES) {
        console.log("The maximum number of pages for this thread was reached");
        return;
    }
    var nextPage = pagesToVisit.pop();
    if (nextPage in pagesVisited) {
        search();   //Repeat the crawl
    } else {
        visitPage(nextPage, search); //Go to the new page
    }
}

function visitPage(url, callback) {
    pagesVisited[url] = true;   //add to visited pages
    numPagesVisited++;  //increment visited pages


    console.log("Visiting page " + url);
    request(url, function(error, response, body) {  //HTML Request and Parse
        if (response.statusCode !== 200) {
            callback();
            return;
        }
        var $ = cheerio.load(body); //Parse

        searchForLinks($, url);
        collectInternalLinks($);

        callback(); //Callback to do()
    });
}

function searchForLinks($, url) {
    var absoluteLinks = $("a[href^='http']");
    console.log("Found " + absoluteLinks.length + " relative links on page");
    absoluteLinks.each(function() {
        var absURL = new URL($(this).attr('href'));
        var curURL = new URL(url);
        if (absURL.hostname == url.hostname) {
            pagesToVisit.push(absURL.href);
        } else {
            externalLinks.push(absURL.href);
        }
    });
}

function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
}



//Push these results to the webpage from which the request was made
console.log("\n\n\n\tHere are the results of the script.\n");
console.log("The script visited " + numPagesVisited + " in total.");
console.log("Of those, " + externalLinks.length + " were external links.")
