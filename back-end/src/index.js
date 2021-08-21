require('dotenv').config();
const cors = require('cors');
const express = require('express');
const rotasProduto = require('./rotas/rotasProduto.js');
const rotasUsuario = require('./rotas/rotasUsuarios.js');
const app = express();
app.use(express.json());
app.use(cors);
app.use(rotasUsuario);
app.use(rotasProduto);
app.listen(3000);
