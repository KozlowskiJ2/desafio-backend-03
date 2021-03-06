const conexao = require('../../servicos/conexao');
const verificaPropriedade = require("../usuario/verificaPropriedade");
const yup = require('yup');
const schema = require('../../modelos/yupCadastroProduto');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
setLocale(pt);

const atualizarProduto = async (req, res) => {
    const usuario = req.usuario;
    const { nome, estoque, preco, descricao, categoria, imagem } = req.body;
    const { id } = req.params;

    try {
        await schema.validate(req.body);
        await verificaPropriedade(usuario.id, id, res);
        const atualizar = 'update produtos set nome = $1, estoque = $2, categoria = $3, preco = $4,descricao = $5, imagem = $6 where id = $7';
        const { rowCount } = conexao.query(atualizar, [nome, estoque, categoria, preco, descricao, imagem, id]);

        if (rowCount === 0) {
            return res.status(400).json('Erro ao atualizar produto!');
        }

        res.status(200).json('Produto atualizado com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = atualizarProduto;