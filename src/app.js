const express = require("express");
const validator = require("validator");
const path = require("path");
const hbs = require("hbs");

const app = express();

const port = process.env.PORT || 3000;

const dicStaticPath = path.join(__dirname, '../public');
const viewDirectory = path.join(__dirname, '../templates/views');
const partialDirectory = path.join(__dirname, '../templates/partials');

const emails = ['aaa@b.com', 'bbb@a.com'];

app.set('view engine', 'hbs');
app.set('views', viewDirectory);
hbs.registerPartials(partialDirectory);

app.use(express.static(dicStaticPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'This is my first express application',
        name: 'Yousef Nourizadeh'
    })
})
app.get('/checkEmail', (req, res) => {
    let result = "";
    if (!req.query.email) {
        result = { error: 'Parameter must be provided' }
    } else {
        if (!validator.isEmail(req.query.email)) {
            result = { error: 'Inputed Parameter is not a valid email' }
        } else {
            result = {
                success: (emails.find(x => x === req.query.email)) ? 'Email Found Successfully' : 'Email Not Found',
                email: req.query.email
            }
        }
    }
    res.send({
        result
    })
})


app.listen(port, () => {
    console.log('The server is up and running on port', port);
})