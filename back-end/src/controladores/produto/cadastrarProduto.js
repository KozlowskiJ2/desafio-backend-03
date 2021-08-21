const conexao = require('../conexao');
const yup = require('yup');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
setLocale(pt);

const cadastrarProduto = async (req, res) => {
    const usuario = req.usuario;
    const { nome, estoque, preco, descricao, categoria, imagem } = req.body;
    const schema = yup.object().shape({
        nome: yup.string().required(),
        estoque: yup.number().required(),
        categoria: yup.string().required(),
        preco: yup.number().required(),
        descricao: yup.string(),
        imagem: yup.string().url()
    })

    try {
        await schema.validate(req.body);
        const cadastro = 'insert into produtos (usuario_id,nome,estoque,categoria,preco,descricao,imagem) values ($1,$2,$3,$4,$5,$6,$7)';
        const { rowCount } = conexao.query(cadastro, [
            usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

        if (rowCount === 0) {
            return res.status(400).json('Erro ao cadastrar produto!');
        }

        res.status(200).json('Produto cadastrado com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = cadastrarProduto;