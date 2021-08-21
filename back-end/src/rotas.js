const express = require('express');
const cadastrarUsuario = require('./controladores/usuario/cadastro');
const loginUsuario = require('./controladores/usuario/login');
const perfil = require('./controladores/usuario/perfil');
const produtos = require('./controladores/produto/produtos');
const verificaToken = require('./intermediarios/verificaToken');
const rotas = express();

// cadastro

rotas.post('/usuarios', cadastrarUsuario);

// login

rotas.post('/login', loginUsuario);

// filtro

rotas.use(verificaToken);

// perfil

rotas.get('/perfil', perfil.consultarPerfil);
rotas.put('/perfil', perfil.atualizarPerfil);

// Produtos

rotas.get('/produtos', produtos.consultarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.verificarProduto, produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.verificarProduto, produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);


module.exports = rotas;
