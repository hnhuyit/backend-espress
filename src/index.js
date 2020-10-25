var express = require('express')
const bodyParser = require('body-parser')
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');
var createError = require('http-errors');


//Cau hinh bien moi truong
dotenv.config();

//config db
const db = require("./models");
const Role = db.role;
const dbConfig = require('./config/db')

//connect database
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}



var app = express();
global.__basedir = __dirname;
var port = process.env.PORT || 3000

// view engine setup
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.set('views', './src/views')


// others
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/static', express.static('./src/public'))
app.use(cookieParser());
app.use(logger('dev'));//HTTP request logger middleware for node.js
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//test route
app.get('/', (req, res) => {
    res.render('home');
})

// required external
var productRouter = require('./routes/product')
var tutorialRouter= require('./routes/tutorial')
var fileRouter= require('./routes/file.route')

// routes
require('./routes/auth')(app);
require('./routes/user')(app);

//Defined routes
app.use('/api/products', productRouter);
app.use('/api/tutorials', tutorialRouter);
app.use('/api/files', fileRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => console.log(`Server listning on port ${port}`))