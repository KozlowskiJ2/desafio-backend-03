const express = require('express');
const atualizarProduto = require('../controladores/produto/atualizaProduto');
const cadastrarProduto = require('../controladores/produto/cadastrarProduto');
const consultarProdutos = require('../controladores/produto/consultaProduto');
const deletarProduto = require('../controladores/produto/deletaProduto');
const obterProduto = require('../controladores/produto/obtemProduto');

const rotasProduto = express();

rotasProduto.get('/produtos', consultarProdutos);
rotasProduto.get('/produtos/:id', obterProduto);
rotasProduto.post('/produtos', cadastrarProduto);
rotasProduto.put('/produtos/:id', atualizarProduto);
rotasProduto.delete('/produtos/:id', deletarProduto);


module.exports = rotasProduto;