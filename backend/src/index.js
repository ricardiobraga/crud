import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createTable, insertNome, selectPessoas, deletePessoa } from './Controller/cadastro.js'

import { openDb } from './dbConfig.js'


createTable()

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

let urlEncoderParser = bodyParser.urlencoded({extended: false})


app.get('/', (req, res) => {    
    res.send( 'hello' );
})

app.get('/funcionarios', urlEncoderParser ,selectPessoas )
app.post('/funcionario', urlEncoderParser ,insertNome )
app.delete('/deleteFuncionario',urlEncoderParser, deletePessoa )

app.listen(3001, () => "rodando back")