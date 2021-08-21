require('dotenv').config();
const cors = require('cors');
const express = require('express');
const rotas = require('./rotas.js');
const app = express();
app.use(express.json());
app.use(cors);
app.use(rotas);
app.listen(3000);
