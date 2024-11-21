CREATE TABLE IF NOT EXISTS users(
 id SERIAL PRIMARY KEY,
 fullname VARCHAR(100) NOT NULL,
 email VARCHAR(100) NOT NULL,
 password_hash TEXT NOT NULL,
 created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks(
 id SERIAL PRIMARY KEY,
 title VARCHAR(100) NOT NULL,
 description TEXT NOT NULL,
 is_active BOOLEAN,
 created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);