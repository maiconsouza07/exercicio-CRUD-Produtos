const express = require("express")
const router = express.Router()
const Produto = require("../models/produto") // Correção no caminho para o arquivo

// Criar novo produto (POST)
router.post("/", async (req, res) => {
    const dados = req.body

    try {
        const novoProduto = new Produto(dados)
        const produtoSalvo = await novoProduto.save()

        res.status(201).send(produtoSalvo)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao criar produto" }) 
    }
})

// Deletar produto (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const produtoExcluido = await Produto.findByIdAndDelete(id)
        if (!produtoExcluido) {
            return res.status(404).send("Produto não encontrado")
        }

        res.send("Produto deletado com sucesso")
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao deletar produto" })
    }
})

// Obter todos os produtos (GET)
router.get("/", async (req, res) => {
    try {
        const produtos = await Produto.find()
        res.status(200).send(produtos)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao listar produtos" })
    }
})

// Obter produto por ID (GET /:id)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const produto = await Produto.findById(id)
        if (!produto) {
            return res.status(404).send("Produto não encontrado")
        }

        res.status(200).send(produto)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao buscar produto" })
    }
})

// Atualizar produto (PUT /:id)
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const dados = req.body

    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, dados, { new: true })
        if (!produtoAtualizado) {
            return res.status(404).send("Produto não encontrado")
        }

        res.status(200).send(produtoAtualizado)
    } catch (err) {
        res.status(500).send({ mensagem: "Erro ao atualizar produto" })
    }
})

module.exports = router
