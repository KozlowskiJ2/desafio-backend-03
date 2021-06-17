const conexao = require('../conexao');
const {verificaNome, verificaEstoque,verificaPreco,verificaDescricao} = require('../filtros/verificaCampos');


const consultarProdutos = async (req,res) => {
    const usuario = req.usuario;
    try {
        const selecionaProdutos = 'select * from produtos where usuario_id = $1';
        const {rows,rowCount} = await conexao.query(selecionaProdutos,[usuario.id]);

        if(rowCount === 0){
            return res.status(404).json('Não existem produtos para o usuário!');
        }

        return res.status(200).json(rows);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterProduto = async (req,res) => {
    const usuario = req.usuario;
    const {id} = req.params;
    try {
        const selecionaProdutos = 'select * from produtos where usuario_id = $1 and id = $2';
        const {rows,rowCount} = await conexao.query(selecionaProdutos,[usuario.id, id]);

        if(rowCount === 0){
            return res.status(404).json('Você não tem produtos com esse ID.');
        }

        return res.status(200).json(rows[0]);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const verificarProduto = async(req,res,next) =>{
    const{nome,estoque,preco,descricao} = req.body;
    verificaNome(nome,res);
    verificaEstoque(estoque,res);
    verificaPreco(preco,res);
    verificaDescricao(descricao,res);
    next();
}

const cadastrarProduto = async (req,res) => {
    const usuario = req.usuario;
    const{nome,estoque,preco,descricao,categoria,imagem} = req.body;
    try {
        const cadastro = 'insert into produtos (usuario_id,nome,estoque,categoria,preco,descricao,imagem) values ($1,$2,$3,$4,$5,$6,$7)';
        const {rowCount} = conexao.query(cadastro,[usuario.id,nome,estoque,categoria,preco,descricao,imagem]);

        if(rowCount === 0){
            return res.status(400).json('Erro ao cadastrar produto!');
        }

        res.status(200).json('Produto cadastrado com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const atualizarProduto = async (req,res) => {
    const usuario = req.usuario;
    const{nome,estoque,preco,descricao,categoria,imagem} = req.body;
    const {id} = req.params;
    try {
        const atualizar = 'update produtos set nome = $1, estoque = $2, categoria = $3, preco = $4,descricao = $5, imagem = $6 where id = $7';
        const {rowCount} = conexao.query(atualizar,[nome,estoque,categoria,preco,descricao,imagem,id]);

        if(rowCount === 0){
            return res.status(400).json('Erro ao atualizar produto!');
        }

        res.status(200).json('Produto atualizado com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message)
    }
}


const deletarProduto = async (req,res) => {
    const usuario = req.usuario;
    const {id} = req.params;
    try {
        const selecionaProdutos = 'delete from produtos where usuario_id = $1 and id = $2';
        const {rowCount} = await conexao.query(selecionaProdutos,[usuario.id, id]);

        if(rowCount === 0){
            return res.status(404).json('Erro ao deletar produto!');
        }

        return res.status(200).json('Produto deletado com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    consultarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto,
    verificarProduto
}