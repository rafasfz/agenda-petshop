const moment = require('moment')

const conexao = require('../infraestrutura/conxeao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS')
        
        const dateIsValid = moment(data).isSameOrAfter(dataCriacao)
        const clientIsValid = atendimento.cliente.length >= 3

        const validacoes = [
            {
                nome: data,
                valido: dateIsValid,
                mensagem: 'A data do atendimento deve ser maior ou igual a data atual.'
            },
            {
                nome: atendimento.cliente,
                valido: clientIsValid,
                mensagem: 'O nome do cliente deve ter pelo menos três caracteres.'
            }
        ]
        
        const erros = validacoes.filter(validacao => !validacao.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO Atendimentos SET ?'
            
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }
}

module.exports = new Atendimento