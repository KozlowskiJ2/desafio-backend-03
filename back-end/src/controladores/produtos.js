const conexao = require('../conexao');
const filtroProdutos = require('../filtros/filtroDeProdutos');
const {verificaNome,
  verificaEstoque,
  verificaPreco,
  verificaDescricao,
  verificaPropriedade} = require('../filtros/verificaCampos');


const consultarProdutos = async (req, res) => {
  await filtroProdutos(req, res);
};


const obterProduto = async (req, res) => {
  const {usuario} = req;
  const {id} = req.params;

  try {
    verificaPropriedade(usuario.id, id, res);
    const selecionaProduto = 'select * from produtos where id = $1';
    const {rows, rowCount} = await conexao.query(selecionaProduto, [id]);

    if (rowCount === 0) {
      return res.status(404).json('Erro ao selecionar produto!');
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const verificarProduto = async (req, res, next) => {
  const {nome, estoque, preco, descricao} = req.body;
  await verificaNome(nome, res);
  await verificaEstoque(estoque, res);
  await verificaPreco(preco, res);
  await verificaDescricao(descricao, res);
  next();
};

const cadastrarProduto = async (req, res) => {
  const usuario = req.usuario;
  const {nome, estoque, preco, descricao, categoria, imagem} = req.body;

  try {
    const cadastro = 'insert into produtos (usuario_id,nome,estoque,categoria,preco,descricao,imagem) values ($1,$2,$3,$4,$5,$6,$7)';
    const {rowCount} = conexao.query(cadastro, [
      usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

    if (rowCount === 0) {
      return res.status(400).json('Erro ao cadastrar produto!');
    }

    res.status(200).json('Produto cadastrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const usuario = req.usuario;
  const {nome, estoque, preco, descricao, categoria, imagem} = req.body;
  const {id} = req.params;

  try {
    await verificaPropriedade(usuario.id, id, res);
    const atualizar = 'update produtos set nome = $1, estoque = $2, categoria = $3, preco = $4,descricao = $5, imagem = $6 where id = $7';
    const {rowCount} = conexao.query(atualizar, [nome, estoque, categoria, preco, descricao, imagem, id]);

    if (rowCount === 0) {
      return res.status(400).json('Erro ao atualizar produto!');
    }

    res.status(200).json('Produto atualizado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};


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

module.exports = {
  consultarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
  verificarProduto,
};
