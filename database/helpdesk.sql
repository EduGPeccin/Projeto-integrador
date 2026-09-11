create database helpdesk;
use helpdesk;

create table solicitantes(
	id_solicitante int primary key,
    nome varchar(100),
    email varchar(100),
    setor varchar(50)
    );
    
create table categorias(
	id_categoria int primary key,
    nome varchar(30),
    descricao varchar(100)    
    );
    
create table tecnicos(
	id_tecnico int primary key,
    nome varchar(100),
    email varchar(100)
    );
    
create table chamados(
	id_chamado int primary key,
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


    