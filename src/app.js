const express =  require('express');
const { engine } = require('express-handlebars');
const myconnection =  require("express-myconnection");
const mysql = require ('mysql');
const session = require ('express-session');
const bodyParser =  require ('body-parser');

const loginRoutes = require ('./routes/login'); 





const app = express();
app.set('port',4000);

app.set('views',__dirname+'/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}));

app.set('views engine','hbs');

app.use(bodyParser.json());

//conentaremos la base de datos de mysql
//con el servidor directo de mysql worbech
app.use(myconnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: 'adminroot',
    port: 3306,
    database: 'nodelogin'

}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'),()=>{
    console.log('Listening on port', app.get('port'));
});
app.use('/', loginRoutes);

app.get('/', (req, res)=>{
    res.render('home');
});