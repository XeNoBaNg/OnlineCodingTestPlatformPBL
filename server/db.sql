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

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    test_id INT REFERENCES tests(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(10) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    test_cases JSONB NOT NULL, 
    max_score INT NOT NULL
);

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    question_id INT REFERENCES questions(id),
    language VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Accepted', 'Wrong Answer', 'Compilation Error', 'Runtime Error')),
    score INT DEFAULT 0,
    execution_time FLOAT,
    memory_used FLOAT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (id, username, email, password_hash, role) 
VALUES 
(gen_random_uuid(), 'XeNo', 'xeno@example.com', '$2b$10$.9A5ueD2teyh1FllvkUB6.eKHKIgbOZGvcPJffTadk/O4M19xFfkq', 'admin');
