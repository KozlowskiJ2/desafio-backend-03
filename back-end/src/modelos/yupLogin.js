const yup = require('yup');

const schema = yup.object().shape({
    email:yup.string().email().required(),
    senha:yup.string().required()});

module.exports = schema;