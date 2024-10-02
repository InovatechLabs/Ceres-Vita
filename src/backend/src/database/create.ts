import { queryCommitRollback, query, pool } from "./connection";

async function init() {
  try {
    await queryCommitRollback(`
    DO
    $$
    BEGIN

DROP SCHEMA IF EXISTS mydb CASCADE;

CREATE SCHEMA IF NOT EXISTS mydb;
SET search_path TO mydb;

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS foods (
  id SERIAL PRIMARY KEY,
  categories_id INT NOT NULL,
  description VARCHAR(70) NOT NULL,
  moisture FLOAT,
  energy FLOAT,
  protein FLOAT,
  lipids FLOAT,
  cholesterol FLOAT,
  carbohydrate FLOAT,
  dietary_fiber FLOAT,
  ash FLOAT,
  calcium FLOAT,
  magnesium FLOAT,
  manganese FLOAT,
  phosphorus FLOAT,
  iron FLOAT,
  sodium FLOAT,
  potassium FLOAT,
  copper FLOAT,
  zinc FLOAT,
  retinol FLOAT,
  re FLOAT,
  era FLOAT,
  thiamin FLOAT,
  riboflavin FLOAT,
  pyridoxine FLOAT,
  niacin FLOAT,
  vitamin_c FLOAT,
  CONSTRAINT fk_foods_categories FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  mail VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  role SMALLINT NOT NULL
);


CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  users_id INT NOT NULL,
  birth_date DATE NOT NULL,
  weight FLOAT NOT NULL,
  height FLOAT NOT NULL,
  sex SMALLINT NOT NULL,
  CONSTRAINT fk_profiles_users FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Create Table: eat_foods
CREATE TABLE IF NOT EXISTS eat_foods (
  id SERIAL PRIMARY KEY,
  foods_id INT NOT NULL,
  users_id INT NOT NULL,
  date DATE NOT NULL,
  quantity FLOAT NOT NULL,
  CONSTRAINT fk_eat_foods_foods FOREIGN KEY (foods_id) REFERENCES foods (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_eat_foods_users FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Create Table: products
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  users_id INT NOT NULL,
  description VARCHAR(45) NOT NULL,
  serving_size FLOAT,
  serving_unit VARCHAR(10),
  quantity_serving FLOAT,
  quantity_unit VARCHAR(20),
  energy FLOAT,
  protein FLOAT,
  carbohydrate FLOAT,
  sugar FLOAT,
  dietary_fiber FLOAT,
  total_fat FLOAT,
  saturated_fat FLOAT,
  trans_fat FLOAT,
  calcium FLOAT,
  sodium FLOAT,
  CONSTRAINT fk_products_users FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Create Table: eat_products
CREATE TABLE IF NOT EXISTS eat_products (
  id SERIAL PRIMARY KEY,
  users_id INT NOT NULL,
  products_id INT NOT NULL,
  date DATE NOT NULL,
  quantity FLOAT NOT NULL,
  activity INT NOT NULL,
  imc FLOAT NOT NULL,
  CONSTRAINT fk_eat_products_users FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_eat_products_products FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Create Table: diets
CREATE TABLE IF NOT EXISTS diets (
  id SERIAL PRIMARY KEY,
  profiles_id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(70) NOT NULL,
  adjustment FLOAT NOT NULL,
  rec_kcal FLOAT NOT NULL,
  CONSTRAINT fk_diets_profiles FOREIGN KEY (profiles_id) REFERENCES profiles (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

    END;
    $$;
    `);
    // Verifique se a tabela foi criada
    const result = await query(
      `SELECT table_name
        FROM information_schema.tables
        WHERE table_catalog = $1
        AND table_schema = 'public'
        AND table_type = 'BASE TABLE'`,
      [process.env.DB_NAME]
    );
    console.log("Comandos SQL submetidos ao SGBD. Tabelas:", result);
  } catch (e: any) {
    console.error("Erro ao submeter comandos SQL:", e.message);
  } finally {
    console.log("Finalizado");
    pool.end();
  }
}

init();
