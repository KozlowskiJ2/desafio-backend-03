const conexao = require('../conexao');
const {verificaNome, verificaEstoque,verificaPreco,verificaDescricao} = require('../filtros/verificaCampos');
const key = require('../jwt');
const jwt = require('jsonwebtoken');


const consultarProdutos = async (req,res) => {
    const usuario = req.usuario;
}

const obterProduto = async (req,res) => {
    const usuario = req.usuario;
}

const cadastrarProduto = async (req,res) => {
    const usuario = req.usuario;
    const{nome,estoque,preco,descricao} = req.body;
    verificaNome(nome,res);
    verificaEstoque(estoque,res);
    verificaPreco(preco,res);
    verificaDescricao(descricao,res);
}

const atualizarProduto = async (req,res) => {
    const usuario = req.usuario;
    const{nome,estoque,preco,descricao} = req.body;
    verificaNome(nome,res);
    verificaEstoque(estoque,res);
    verificaPreco(preco,res);
    verificaDescricao(descricao,res);
}

const deletarProduto = async (req,res) => {
    const usuario = req.usuario;
    
}

module.exports = {
    consultarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto
}