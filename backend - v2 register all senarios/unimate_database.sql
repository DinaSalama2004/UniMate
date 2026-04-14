CREATE DATABASE unimate;
GO

USE unimate;
GO

-- Note: The Python app (SQLAlchemy) is the source of truth; it adds password, full_name, etc.
-- If this script is older than your models, add missing columns, e.g.:
-- ALTER TABLE users ADD full_name VARCHAR(255) NULL;
-- ALTER TABLE users ADD password VARCHAR(500) NULL;

CREATE TABLE users (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    full_name VARCHAR(255) NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(10) NOT NULL CHECK (role IN ('student', 'admin', 'super_admin')),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);


CREATE TABLE students (
    user_id UNIQUEIDENTIFIER PRIMARY KEY
        FOREIGN KEY REFERENCES users(id),
    university VARCHAR(255),
    college VARCHAR(255),
    academic_year INT,
    major VARCHAR(255),
    GPA FLOAT,
    profile_completion_percentage INT,
);


CREATE TABLE admins (
    user_id UNIQUEIDENTIFIER PRIMARY KEY
        FOREIGN KEY REFERENCES users(id),
    full_name VARCHAR(255),
    department VARCHAR(255),
);

