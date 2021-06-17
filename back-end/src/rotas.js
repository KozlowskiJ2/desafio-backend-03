const express = require('express');
const cadastrarUsuario = require('./controladores/cadastro');
const loginUsuario = require('./controladores/login');
const perfil = require('./controladores/perfil');
const produtos = require('./controladores/produtos')
const verificaToken = require('./filtros/verificaToken');
const rotas = express();

//cadastro

rotas.post('/usuarios', cadastrarUsuario);

//login

rotas.post('/login', loginUsuario);

//filtro

rotas.use(verificaToken);

//perfil

rotas.get('/perfil', perfil.consultarPerfil);
rotas.put('/perfil', perfil.atualizarPerfil);

//Produtos

rotas.get('/produtos', produtos.consultarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos',produtos.verificarProduto, produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.verificarProduto, produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);


module.exports = rotas;