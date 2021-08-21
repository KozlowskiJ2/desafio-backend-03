const deletarProduto = async (req, res) => {
    const usuario = req.usuario;
    const {id} = req.params;
    try {
      await verificaPropriedade(usuario.id, id, res);
      const selecionaProdutos = 'delete from produtos where id = $1';
      const {rowCount} = await conexao.query(selecionaProdutos, [id]);
  
      if (rowCount === 0) {
        return res.status(404).json('Erro ao deletar produto!');
      }
  
      return res.status(200).json('Produto deletado com sucesso!');
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };