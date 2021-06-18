const conexao = require('../conexao');
const {verificaEmail, verificaNome, verificaSenha, verificaLoja} = require('../filtros/verificaCampos');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
  const {nome, email, senha, nome_loja: nomeLoja} = req.body;

  verificaEmail(email, res);
  verificaNome(nome, res);
  verificaSenha(senha, res);
  verificaLoja(nomeLoja, res);

  try {
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
