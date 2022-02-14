import { openDb } from '../dbConfig.js'
import bodyParser from 'body-parser'

let urlEncoderParser = bodyParser.urlencoded({extended: false})

export async function createTable(){
    openDb().then(db => {
        db.exec(`
        CREATE TABLE IF NOT EXISTS funcionarios
        ( id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        nascimento DATE NOT NULL,
        
        hobbies_books VARCHAR(50),
        hobbies_games VARCHAR(50),
        hobbies_sports VARCHAR(50),

        cargo VARCHAR(50),
       
        mensagem VARCHAR(300)
        )
        `       
        
        )
    })
}

export async function deleteTable (tableName) {
    openDb().then(db => {
        db.exec(`DROP TABLE ${tableName}`)
    })
}


export async function insertFuncionario(req, res){
    let funcionario = req.body    
    console.log(funcionario)
        if(funcionario.nome !== "" ){

            openDb().then(db => {
            db.run(
                'INSERT INTO funcionarios (name, email, nascimento, hobbies_books, hobbies_games, hobbies_sports, cargo, mensagem) VALUES (?,?,?,?,?,?,?,?)', 
                [
                funcionario.name,
                funcionario.email,
                funcionario.nascimento,

                funcionario.hobbiesBooks,
                funcionario.hobbiesGames,
                funcionario.hobbiesSports,

                funcionario.cargo,
                funcionario.mensagem,

                ]
                )
            
            
            
            
    
            })
            res.send(`<script>alert("cadastro enviada com sucesso"); window.location.href = "http://localhost:3000/form";</script>`)
            
            
        } else {

            res.send(`<script>alert("falha no cadastro"); window.location.href = "http://localhost:3000/form";</script>`)   
        }
}

export async function selectPessoas(req, res){
    openDb().then(db => {
     db.all('SELECT * FROM funcionarios')
    .then(pessoas => res.json(pessoas))
})
}

export async function deletePessoa(req, res){
    let id = req.body.id        

        openDb().then(db => {
            db.get('DELETE FROM funcionarios WHERE id=?', [id])
            .then(res=>res)
    })
    
   
    
    res.json({
        "statuscode": 200
    })
}


