import { openDb } from '../dbConfig.js'
import bodyParser from 'body-parser'

let urlEncoderParser = bodyParser.urlencoded({extended: false})

export async function createTable(){
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS funcionario ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(100) NOT NULL)')
    })
}


export async function insertNome(req, res){
    let pessoa = req.body    
    
        if(pessoa.nome !== "" ){

            openDb().then(db => {
            db.run('INSERT INTO funcionario (nome) VALUES (?)', [pessoa.nome])
    
            })
            res.send(`<script>alert("cadastro enviada com sucesso"); window.location.href = "http://localhost:3000/";</script>`)
            
            
        } else {

            res.send(`<script>alert("falha no cadastro"); window.location.href = "http://localhost:3000/";</script>`)   
        }
}

export async function selectPessoas(req, res){
    openDb().then(db => {
     db.all('SELECT * FROM funcionario')
    .then(pessoas => res.json(pessoas))
})
}

export async function deletePessoa(req, res){
    let id = req.body.id        

        openDb().then(db => {
            db.get('DELETE FROM funcionario WHERE id=?', [id])
            .then(res=>res)
    })
    
   
    
    res.json({
        "statuscode": 200
    })
}


