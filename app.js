const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require("path");
const Sequelize = require("sequelize");
const db = require("./models/index");
const Shop = require('./models').User;
const Coffee = require('./models').Coffee;


//models
// Shop.create({
//     name: 'Starbucks',
// }, {}).then(shop => {
//     console.log(shop);
//     shop.createCoffee({
//         name: 'Colombian',
//         type: 'Dark',
//     }).then(() => {
//         console.log('worked');
//     });
// });

// Shop.findAll({
//     include: [Coffee],
// }).then(shops => {
//     console.log(shops[0].Coffees);
// })

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    Shop.findAll({
        include: [Coffee],
    }).then(shops => {
        res.render('index', {shops: shops});
    })
})

app.post('/shops', (req, res) => {
    Shop.create(req.body)
        .then(() => res.redirect('/'));
});

app.post('/coffee/:shop_id', (req, res) => {
    Coffee.create({...req.body, UserId: req.params.shop_id})
        .then(() => res.redirect('/'));
})

// allow front end access to public folder
app.use(express.static(path.join(__dirname, 'public')));

// server set up
app.listen('3000', (req, res) => {
    console.log('Listening on port 3000');
});

// view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');




// Testing Database Connection
db.sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});