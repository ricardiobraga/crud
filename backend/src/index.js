import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createTable, selectPessoas, deletePessoa, deleteTable, insertFuncionario } from './Controller/cadastro.js'

import { openDb } from './dbConfig.js'



//deleteTable("funcionario")


const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

let urlEncoderParser = bodyParser.urlencoded({extended: false})


app.get('/', (req, res) => {    
    res.send( 'hello' );
})

app.post('/cadastro', urlEncoderParser , insertFuncionario)
app.get('/funcionarios', urlEncoderParser ,selectPessoas )
app.delete('/deleteFuncionario',urlEncoderParser, deletePessoa )

app.listen(3001, () => console.log("rodando back"))