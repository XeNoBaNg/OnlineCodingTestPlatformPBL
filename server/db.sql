CREATE TABLE users (
    id UUID NOT NULL PRIMARY KEY,
    username VARCHAR(50),
    regid VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('admin', 'student')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (id, username, email, password_hash, role) 
VALUES 
(gen_random_uuid(), 'XeNo', 'xeno@example.com', '$2b$10$.9A5ueD2teyh1FllvkUB6.eKHKIgbOZGvcPJffTadk/O4M19xFfkq', 'admin');
