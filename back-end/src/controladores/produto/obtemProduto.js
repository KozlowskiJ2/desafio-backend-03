const conexao = require('../../servicos/conexao');
const verificaPropriedade = require("../usuario/verificaPropriedade");
const obterProduto = async (req, res) => {
    const {usuario} = req;
    const {id} = req.params;
  
    try {
      verificaPropriedade(usuario.id, id, res);
      const selecionaProduto = 'select * from produtos where id = $1';
      const {rows, rowCount} = await conexao.query(selecionaProduto, [id]);
  
      
  
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };

module.exports = obterProduto;