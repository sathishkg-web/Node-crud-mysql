const express=require('express');
const app =express();
const bodyParser=require('body-Parser');
const exphbs=require('express-handlebars');
const mysql = require('mysql');
const path=require('path');
const session = require('express-session');

require('dotenv').config();

const port = process.env.PORT || 3000;

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/home');
const loginRoute=require('./routes/login');
const logoutRoute=require('./routes/logout');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//static Files
app.use(express.static("public"));
// Template Engine
const handlebars=exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");
//MYSQL
/*
const con=mysql.createPool({
    connectionLimit : 10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

con.getConnection((err,connection)=>{
    if(err) throw err
    console.log("Database connection success");
})
*/

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(loginRoute);
app.use(logoutRoute);

app.get('/product',(req,res)=>{res.send('<h1>Product</h1>')});

app.post('/product',(req,res)=>{res.send('<h1>post product</h1>')});

app.use((req,res,next)=>{ 
    //res.status(404).send('<h1>Page not found</h1>')
    res.status(404).render('404');
});

app.listen(port,()=>console.log("server running sucessfully at port "+port));

