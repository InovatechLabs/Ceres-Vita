CREATE SCHEMA users;

CREATE TABLE users.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Executar os comandos abaixo no psql:

-- CREATE USER users with password '123';

-- CREATE DATABASE users_auth;

-- GRANT ALL PRIVILEGES ON DATABASE users_auth TO users;