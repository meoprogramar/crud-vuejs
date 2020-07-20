const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router()

const app = express()
app.use(bodyParser.json()) // Converte o body da requisição para o formato JSON
app.use(cors()) // Permite o front-end fazer requisições

let contatos = [{
    id: 0,
    name: 'Fernando Almeida',
    phone: '99550156'
}]
let autoIncrementId = 1;

app.put('/contato/:id', function (req, res) {
    const contato = {
        ...req.body
    }

    contatos.forEach(item => {
        if (parseInt(item.id) === parseInt(req.params.id))
            Object.assign(item, contato)
    })
    res.sendStatus(204)
});

app.delete('/contato/:id', function (req, res) {
    contatos.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(req.params.id))
            contatos.splice(index, 1);
    })
    res.sendStatus(204)
});

app.get('/contato', function (req, res) {
    res.json(contatos)
});

app.post('/contato', function (req, res) {
    contatos.push({
        ...req.body,
        id: autoIncrementId
    })
    autoIncrementId += 1
    res.sendStatus(204)
});

app.listen(8081)