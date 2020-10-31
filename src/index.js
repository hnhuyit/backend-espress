var express = require('express')
const bodyParser = require('body-parser')
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');
var createError = require('http-errors');
var exphbs = require('express-handlebars')

const Post = require('./models/post');


//Cau hinh bien moi truong
dotenv.config();

//config db
const db = require("./models");
const Role = db.role;
const dbConfig = require('./config/db')
const templateConfig = require('./config/template')

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

// others
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('./src/public'))
app.use(express.static('./node_modules'));
app.use(cookieParser());
app.use(logger('dev'));//HTTP request logger middleware for node.js
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// configures express to use hbs
app.engine('hbs', exphbs({
    extname: '.hbs',
    partialsDir: path.join(__dirname, "./views/partials"),
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, './views/layouts'),


    // override the default compile
    onCompile: function (exhbs, source, filename) {
        var options;
        if (filename && filename.indexOf('partials') > -1) {
            options = { preventIndent: true };
        }
        return exhbs.handlebars.compile(source, options);
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "./views"));


// base url for homepage
app.get("/", (req, res) => {
    console.log("RENDERING THE HOME PAGE");
    res.render("home.hbs"); // express looks for a file in the views directory,
    //then compiles and renders them to the client
});

app.get('/login', (req, res) => {
    console.log("RENDERING THE ABOUT PAGE")
    res.render("login", {
        title: 'Log in',
        layout: 'other'
    })
})
app.get('/register', (req, res) => {
    console.log("RENDERING THE ABOUT PAGE")
    res.render("register", {
        title: 'Registration Page',
        layout: 'other'
    })
})

app.get('/forgot-password', (req, res) => {
    console.log("RENDERING THE ABOUT PAGE")
    res.render("forgot-password", {
        title: 'Forgot Password',
        layout: 'other'
    })
})
app.get('/recover-password', (req, res) => {
    console.log("RENDERING THE ABOUT PAGE")
    res.render("forgot-password", {
        title: 'Forgot Password',
        layout: 'other'
    })
})
// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/about.html'));
// });
// app.get('/contact', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
// });

// app.get('/post', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// });

const upload = require("./middlewares/uploadMultiFiles");
app.post("/multiple-upload", async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.files);

        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }

        return res.send(`Files has been uploaded.`);
    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
    }
});

// required external
var productRouter = require('./routes/product')
var tutorialRouter = require('./routes/tutorial')
var fileRouter = require('./routes/file.route')


// var postRouter = require('./routes/post')
// app.use('', postRouter);

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
    console.log('err', err);
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        err: err
    });
});

app.listen(port, () => console.log(`Server listning on port ${port}`))