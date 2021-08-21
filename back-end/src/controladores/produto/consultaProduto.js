const conexao = require('../../conexao');


const consultarProdutos = async (req, res) => {
  const usuario = req.usuario;
  const {categoria, precoInicial, precoFinal} = req.query;
  let selecionaProdutos = 'select * from produtos where usuario_id = $1';
  const parametros = [usuario];
  let contador = 2;
  if (categoria) {
    selecionaProdutos += `and categoria = $${contador}`;
    parametros.push(categoria);
    contador++
  }

  if (precoInicial) {
    selecionaProdutos += `and preco>= $${contador}`;
    parametros.push(precoInicial);
    contador++
  }

  if (precoFinal) {
    selecionaProdutos += `and preco<= $${contador}`;
    parametros.push(precoFinal);
    contador++
  }
  try {
    const { rows } = await conexao.query(selecionaProdutos,parametros);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = consultarProdutos;
