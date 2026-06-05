CREATE TABLE users (
                     userId INT AUTO_INCREMENT PRIMARY KEY,
                     avatar VARCHAR(200),
                     name VARCHAR(50)
);

CREATE TABLE tasks (
                     id INT AUTO_INCREMENT PRIMARY KEY,
                     userId INT,
                     title VARCHAR(50),
                     description VARCHAR(100),
                     completed BOOLEAN,

                     CONSTRAINT fk_user
                       FOREIGN KEY (userId)
                         REFERENCES users(userId)
                         ON DELETE CASCADE
);
