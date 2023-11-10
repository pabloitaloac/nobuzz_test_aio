CREATE TABLE tasks (
    id serial PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    creation_date DATE,
    completion_date DATE
);
