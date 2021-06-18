const conexao = require('../conexao');
const key = require('../jwt');
const jwt = require('jsonwebtoken');

const verificaToken = async (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    res.status(404).json('Token não informado.');
  }
  try {
    const token = authorization.replace('Bearer', '').trim();
    const {id} = jwt.verify(token, key);
    const query = 'select * from usuarios where id = $1';
    const {rows, rowCount} = await conexao.query(query, [id]);

    if (rowCount === 0) {
      res.status.json('Usuário não encontrado!');
    }

    // eslint-disable-next-line no-unused-vars
    const {senha, ...dadosUsuario} = rows[0];


    req.usuario = dadosUsuario;

    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = verificaToken;
