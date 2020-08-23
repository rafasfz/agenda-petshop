const atendimento = require('../models/atendimentos')
const atendimentos = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        atendimento.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const dadosAtendimento = req.body

        atendimento.adiciona(dadosAtendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        atendimento.altera(id, valores, res)
    })
}