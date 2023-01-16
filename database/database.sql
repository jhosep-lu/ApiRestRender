CREATE DATABASE practica;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

S
INSERT INTO usuarios (nombre, edad, email) VALUES 
    ('Juan Perez', 25, 'jp@gmail.com'), 
    ('Alejandra Cruz', 30, 'alejandrac@gmail.com'), 
    ('Paul Gonzalez', 35, 'pgonzalez@gmail.com');

select * from usuarios;
