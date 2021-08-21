const conexao = require('../../servicos/conexao');

const verificaPropriedade = async (userID, prodID, res) => {
  try {
    const selecionaProduto = 'select * from produtos where usuario_id = $1 and id = $2';
    const {rowCount} = await conexao.query(selecionaProduto, [userID, prodID]);

    console.log(rowCount)
    if (rowCount === 0) {
      return res.status(404).json('Você não tem produtos com esse ID.');
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};


module.exports = verificaPropriedade;
