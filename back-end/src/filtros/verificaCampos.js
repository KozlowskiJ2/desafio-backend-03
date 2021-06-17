const verificaNome = (input, res) => {
    if(!input){
        return res.status(404).json('O campo nome é obrigatório!');
    }
}
const verificaEmail = (input, res) => {
    if(!input){
        return res.status(404).json('O campo email é obrigatório!');
    }
}
const verificaSenha = (input, res) => {
    if(!input){
        return res.status(404).json('O campo senha é obrigatório!');
    }
}
const verificaLoja = (input, res) => {
    if(!input){
        return res.status(404).json('O campo nome_loja é obrigatório!');
    }
}
const verificaEstoque = (input, res) => {
    if(!input){
        return res.status(404).json('O campo estoque é obrigatório!');
    }
}
const verificaDescricao = (input, res) => {
    if(!input){
        return res.status(404).json('O campo descrição é obrigatório!');
    }
}
const verificaPreco = (input, res) => {
    if(!input){
        return res.status(404).json('O campo preço é obrigatório!');
    }
}


module.exports = {
    verificaEmail,
    verificaNome,
    verificaSenha,
    verificaLoja,
    verificaEstoque,
    verificaPreco,
    verificaDescricao
}