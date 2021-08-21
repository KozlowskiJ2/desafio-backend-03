const conexao = require('../conexao');
const {verificaEmail, verificaSenha} = require('../filtros/verificaCampos');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginUsuario = async (req, res) => {
  const {email, senha} = req.body;

  verificaEmail(email, res);
  verificaSenha(senha, res);

  try {
    const consultarEmail = 'select * from usuarios where email = $1';
    const {rows, rowCount: emailVerificado} = await conexao.query(consultarEmail, [email]);

    if (emailVerificado === 0) {
      return res.status(400).json('Usuario ou senha inválidos!');
    }

    const usuario = rows[0];

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json('Usuário ou senha inválidos!');
    }

    const token = jwt.sign({id: usuario.id}, process.env.JWT_KEY);

    return res.status(200).json({
      Usuário: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        nome_loja: usuario.nome_loja,
      },
      token: token});
  } catch (error) {
    return res.status.json(error.message);
  }
};


module.exports = loginUsuario;
