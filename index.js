const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const tabelas = require('./infraestrutura/tabelas')

const con = new Promise((resolve, reject) => {
    conexao.connect(erro => {
        if (!erro) {
            resolve('Servidor conectado com sucesso')
        } else {
            reject(erro)
        }
    })
})

con
    .then(message => {
        console.log(message)

        tabelas.init(conexao)
        const app = customExpress()
        
        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    })
    .catch(err => {
        console.log(err)
    })

/*
conexao.connect((erro) => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')

        const app = customExpress()

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
}) 
*/