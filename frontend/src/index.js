import express from 'express'
import path from 'path'



const app = express()
app.use(express.json())
app.use(express.static('src'))



app.get('/', (req, res) => {    
    res.sendFile( path.resolve('src/pages/index.html') );
})

app.get('/form', (req, res) => {    
    res.sendFile( path.resolve('src/pages/formulario.html') );
})

app.listen(3000, () => console.log("rodando front"))