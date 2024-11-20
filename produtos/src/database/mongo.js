const express = require("express")
const mongoose = require("mongoose")
const produtoRouter = require("./routes/produtoRouter") // Correção no caminho para o arquivo

const app = express()

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/produtos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.log('Erro ao conectar ao MongoDB', err))

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json())

// Usando as rotas do produto
app.use("/produtos", produtoRouter)

// Inicializar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
