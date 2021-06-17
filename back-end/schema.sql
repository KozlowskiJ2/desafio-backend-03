DROP DATABASE market_cubos;
CREATE DATABASE market_cubos;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    nome_loja TEXT NOT NULL
);

CREATE TABLE produtos(
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id),
    nome TEXT NOT NULL,
    estoque int NOT NULL,
    categoria TEXT,
    preco INT NOT NULL,
    descricao TEXT,
    imagem TEXT
);