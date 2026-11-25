## API REST para gerenciar solicitações.

Tecnologias
Node.js
Express
MySQL
REST Client

## Script SQL
create database helpdesk;
use helpdesk;

create table solicitantes(
	id_solicitante int primary key AUTO_INCREMENT,
    nome varchar(100),
    email varchar(100),
    setor varchar(50)
    );
    
create table categorias(
	id_categoria int primary key AUTO_INCREMENT,
    nome varchar(30),
    descricao varchar(100)    
    );
    
create table tecnicos(
	id_tecnico int primary key AUTO_INCREMENT,
    nome varchar(100),
    email varchar(100)
    );
    
create table chamados(
	id_chamado int primary key AUTO_INCREMENT,
    titulo varchar(100),
    descricao text,
    prioridade varchar(50),
    status varchar(30),
    solucao text,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    solicitante_id int,
    categoria_id int,
    tecnico_id int,
    
    foreign key (solicitante_id) references solicitantes(id_solicitante),
    foreign key (categoria_id) references categorias(id_categoria),
    foreign key (tecnico_id) references tecnicos(id_tecnico)
    );

  -- Exemplos de solicitantes
INSERT INTO solicitantes (id_solicitante, nome, email, setor) VALUES
(1, 'João Silva', 'joao@empresa.com', 'Financeiro'),
(2, 'Maria Oliveira', 'maria@empresa.com', 'Recursos Humanos'),
(3, 'Pedro Santos', 'pedro@empresa.com', 'TI'),
(4, 'Ana Souza', 'ana@empresa.com', 'Vendas'),
(5, 'Carlos Lima', 'carlos@empresa.com', 'Administrativo');

-- Exemplos de categorias
INSERT INTO categorias (id_categoria, nome, descricao) VALUES
(1, 'Hardware', 'Problemas com computadores e periféricos'),
(2, 'Software', 'Erros em programas e aplicativos'),
(3, 'Rede', 'Problemas de conexão com a internet'),
(4, 'Acesso', 'Problemas com login e senhas'),
(5, 'Impressora', 'Problemas de impressão e equipamentos');

-- Exemplos de técnicos
INSERT INTO tecnicos (id_tecnico, nome, email) VALUES
(1, 'Roberto Almeida', 'roberto@empresa.com'),
(2, 'Fernanda Costa', 'fernanda@empresa.com'),
(3, 'Lucas Ferreira', 'lucas@empresa.com'),
(4, 'Juliana Martins', 'juliana@empresa.com'),
(5, 'Marcos Ribeiro', 'marcos@empresa.com');


## Instruções de instalação
npm install
node server.js
