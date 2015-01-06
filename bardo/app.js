var express = require('express'), 
    app     = express(),
    exphbs  = require('express-handlebars');


handlebars = exphbs.create({
    defaultLayout: 'main',
    extname      : '.html' 
});

app.engine('html', handlebars.engine);
app.set('view engine', 'html');

app.use('/static', express.static(__dirname + '/public'))
// app.use(require('./middlewares/users'))
// app.use(require('./controllers'))

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(8000, function() {
  console.log('Bardo server running and listening on port 8000');
})