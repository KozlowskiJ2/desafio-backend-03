const express = require('express');
const cadastrarUsuario = require('./controladores/usuario/cadastro');
const loginUsuario = require('./controladores/usuario/login');
const perfil = require('./controladores/usuario/perfil');
const verificaToken = require('./intermediarios/verificaToken');
const rotasUsuario = express();
rotasUsuario.post('/usuarios', cadastrarUsuario);

rotasUsuario.post('/login', loginUsuario);

rotasUsuario.use(verificaToken);

rotasUsuario.get('/perfil', perfil.consultarPerfil);

rotasUsuario.put('/perfil', perfil.atualizarPerfil);

module.exports = rotasUsuario;