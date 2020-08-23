const atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))

    app.post('/atendimentos', (req, res) => {
        const dadosAtendimento = req.body

        atendimento.adiciona(dadosAtendimento)
        res.send('Você está na rota de atendimentos e está realizando um POST')
    })
}