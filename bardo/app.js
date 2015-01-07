var express    = require('express'), 
    app        = express(),
    bodyParser = require('body-parser'),
    exphbs     = require('express-handlebars');


handlebars = exphbs.create({
    defaultLayout: 'main',
    extname      : '.html' 
});

app.engine('html', handlebars.engine);
app.set('view engine', 'html');

app.use('/static', express.static(__dirname + '/public'))
// app.use(require('./middlewares/users'))
// app.use(require('./controllers'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.render('home');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if ((!username) || (!password)) {
        res.redirect('/login');
    }

    var token;
    var credentials = {
        clientID: 'thom',
        clientSecret: 'nightworld',
        site: 'http://10.150.150.1:9001'
    };

    var oauth2 = require('simple-oauth2')(credentials);

    oauth2.password.getToken({        
        username: username,
        password: password
    }, saveToken);

    function saveToken(error, result) {
        if (error) { 
            console.log('Access Token Error', error.message); 
            res.redirect('/login');
        } else {
            token = oauth2.accessToken.create(result);
            res.send(token);
        }
        res.send('DERP');
    };
});

app.get('/viewer', function (req, res) {
    res.render('viewer');
});

app.listen(8000, function() {
  console.log('Bardo server running and listening on port 8000');
})