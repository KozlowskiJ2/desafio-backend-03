const yup = require('yup');

const schema = yup.object().shape({
    nome: yup.string().required(),
    estoque: yup.number().required(),
    categoria: yup.string().required(),
    preco: yup.number().required(),
    descricao: yup.string(),
    imagem: yup.string().url()
})

module.exports = schema;