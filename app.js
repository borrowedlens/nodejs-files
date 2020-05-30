const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/ErrorController')


const app = express();

/* For handlebars */

// app.engine('hbs', expressHbs({ layoutsDir: 'views/hbs/layouts', defaultLayout: 'main-layout', extname: 'hbs'}));
// Or app.engine('handlebars', expressHbs({ layoutsDir: '/views/hbs/layouts', defaultLayout: 'main-layout'})); => looks for only .handlebars files 

app.set('view engine', 'ejs');
app.set('views', 'views/ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRouter);
app.use('/', errorController.get404Error);

app.listen(3000);
