const conexao = require('../conexao');

const verificaNome = (input, res) => {
    if(!input){
        return res.status(404).json('O campo nome é obrigatório!');
    }
}
const verificaEmail = async  (input, res) => {
    if(!input){
        return res.status(404).json('O campo email é obrigatório!');
    }
}
const verificaSenha = async  (input, res) => {
    if(!input){
        return res.status(404).json('O campo senha é obrigatório!');
    }
}
const verificaLoja = async  (input, res) => {
    if(!input){
        return res.status(404).json('O campo nome_loja é obrigatório!');
    }
}
const verificaEstoque = async  (input, res) => {
    if(!input){
        return res.status(404).json('O campo estoque é obrigatório!');
    }
}
const verificaDescricao = async  (input, res) => {
    if(!input){
        return res.status(404).json('O campo descrição é obrigatório!');
    }
}
const verificaPreco = async (input, res) => {
    if(!input){
        return res.status(404).json('O campo preço é obrigatório!');
    }
}
const verificaPropriedade = async  (userID,prodID,res) => {
    try {
        const selecionaProduto = 'select * from produtos where usuario_id = $1 and id = $2';
        const {rowCount} = await conexao.query(selecionaProduto,[userID, prodID]);

        if(rowCount === 0){
            return res.status(404).json('Você não tem produtos com esse ID.');
        }

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    verificaEmail,
    verificaNome,
    verificaSenha,
    verificaLoja,
    verificaEstoque,
    verificaPreco,
    verificaDescricao,
    verificaPropriedade
}