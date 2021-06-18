const conexao = require('../conexao');

const filtroProdutos = async (req,res) => {
    const usuario = req.usuario;
    const { categoria, precoInicial, precoFinal } = req.query;
    let selecionaProdutos = '', parametros = [];
    if(categoria && precoInicial && precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1 and categoria = $2 and preco > $3 and preco < $4';
        parametros = [categoria,precoInicial,precoFinal];
    }
    if(categoria && precoInicial && !precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1 and categoria = $2 and preco > $3';
        parametros = [categoria,precoInicial];
    }
    if(categoria && !precoInicial && precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1 and categoria = $2 and preco < $3';
        parametros = [categoria,precoFinal];
    }
    if(!categoria && precoInicial && precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1 and preco > $2 and preco < $3';
        parametros = [precoInicial,precoFinal];
    }
    if(!categoria && !precoInicial && precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1 and preco < $2';
        parametros = [precoFinal];
    }
    if(!categoria && precoInicial && !precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1 and preco > $2';
        parametros = [precoInicial];
    }
    if(categoria && !precoInicial && !precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1 and categoria = $2';
        parametros = [categoria];
    }
    if(!categoria && !precoInicial && !precoFinal){
        selecionaProdutos = 'select * from produtos where usuario_id = $1';
    }
    try {

        const { rows, rowCount } = await conexao.query(selecionaProdutos, [usuario.id,...parametros]);
    

        if (rowCount === 0) {
            return res.status(404).json('Não existem produtos para o usuário com os parametros selecionados.');
        }

        return res.status(200).json(rows);

    } catch (error) {
        return res.status(400).json(error.message);
    }
    }

module.exports = filtroProdutos;