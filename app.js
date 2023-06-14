const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'telesca1234',
    database: 'usuarios'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/usuarios', (req, res) => {
    connection.query(
        'select * from persona',
        function (err, results, fields) {
            console.log(results);
            res.render('usuarios', { usuarios: results })
        }
    );
})

app.get('/formulario', (req, res) => {
    res.render('formulario')
})

app.post('/formulario', (req, res) => {
    console.log(req.body)

    connection.execute(
        `insert into Persona (nombre, email) values ('${req.body.nombre}', '${req.body.email}')`,
        function (err, results, fields) {
            console.log(results);
        }
    );

    res.render('completo', { nombre: req.body.nombre, email: req.body.email })
})

app.set('views', './views')
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`listen to ${port}`)
})