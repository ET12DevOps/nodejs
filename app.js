const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/formulario', (req, res) => {

    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();

    res.render('formulario')
})

app.post('/formulario', (req, res) => {
    console.log(req.body)
    res.render('completo', { nombre: req.body.nombre, email: req.body.email })
})

app.set('views', './views')
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`listen to ${port}`)
})