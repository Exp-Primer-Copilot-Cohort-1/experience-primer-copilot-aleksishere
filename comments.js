// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Set the folder that will contain our public assets (css, images, etc)
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set bodyParser to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get('/', function(req, res) {
    res.render('index');
});

// Route to get all comments
app.get('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            res.send('[]');
        } else {
            res.send(data);
        }
    });
});

// Route to add a comment
app.post('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            res.send('[]');
        } else {
            var comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                if (err) {
                    res.send('[]');
                } else {
                    res.send(comments);
                }
            });
        }
    });
});

// Start the web server on port 8080
app.listen(8080);

// Output a message to the console
console.log('Web server started on port 8080');