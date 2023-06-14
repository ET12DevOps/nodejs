const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/formulario', (req, res) => {
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