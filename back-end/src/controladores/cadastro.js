const conexao = require('../conexao');
const yup = require('yup');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
setLocale(pt);
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
  const {nome, email, senha, nome_loja: nomeLoja} = req.body;

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required(),
    nome: yup.string().required(),
    nome_loja: yup.string().required()});


  try {
    await schema.validate(req.body);

    const consultarEmail = 'select * from usuarios where email = $1';
    const {rowCount: emailDuplicado} = await conexao.query(consultarEmail, [email]);

    if (emailDuplicado) {
      return res.status(400).json('O email informado já existe!');
    }

    const senhaCrypt = await bcrypt.hash(senha, 10);
    const criarUsuario = 'insert into usuarios (nome,email,senha,nome_loja) values($1,$2,$3,$4)';
    const usuarioCadastrado = await conexao.query(criarUsuario, [nome, email, senhaCrypt, nomeLoja]);

    if (usuarioCadastrado.rowCount === 0) {
      return res.status(400).json('Não foi possível cadastrar o usuário!');
    }
    return res.status(200).json('Usuário cadastrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = cadastrarUsuario;
