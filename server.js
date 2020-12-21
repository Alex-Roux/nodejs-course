const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('New request');
    console.log("url: " + req.url + ", method: " + req.method);

    // Response preparation
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    
    let path = "./htdocs/";
    switch(req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/about-me':
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
    }

    // Read the file and send it
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end("500 Internal Server Error");
        } else {
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log("Listening on port 3000...");
});