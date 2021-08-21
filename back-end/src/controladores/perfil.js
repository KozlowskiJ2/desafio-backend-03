const conexao = require('../conexao');
const { verificaEmail, verificaNome, verificaSenha, verificaLoja } = require('../filtros/verificaCampos');
const yup = require('yup');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
const bcrypt = require('bcrypt');

const consultarPerfil = (req, res) => {
  const usuario = req.usuario;

  res.status(200).json(usuario);
};

const atualizarPerfil = async (req, res) => {
  const usuario = req.usuario;
  const { nome, email, senha, nome_loja: nomeLoja } = req.body;
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required(),
    nome: yup.string().required(),
    nome_loja: yup.string().required()});

  try {
    await schema.validate(req.body);
    const verificarEmail = 'select * from usuarios where email = $1 and id <> $2';
    const { rowCount: validaEmail } = await conexao.query(verificarEmail, [email, usuario.id]);

    if (validaEmail) {
      res.status(400).json('Email não disponível');
    }

    const senhaCrypt = await bcrypt.hash(senha, 10);

    const atualização = 'update usuarios set nome = $1, email = $2,senha = $3,nome_loja = $4 where id = $5';

    const { rowCount } = await conexao.query(atualização, [nome, email, senhaCrypt, nomeLoja, usuario.id]);

    if (rowCount === 0) {
      return res.status(400).json('Não foi possível atualizar seus dados.');
    }

    res.status(200).json('Dados atualizados com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message).status(400);
  }
};

module.exports = {
  consultarPerfil,
  atualizarPerfil,
};
