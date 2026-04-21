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
    user_id UNIQUEIDENTIFIER PRIMARY KEY,

    university VARCHAR(255),
    college VARCHAR(255),

    major_id INT,
    academic_year INT,
    gpa FLOAT,

    bio VARCHAR(500),
    gender VARCHAR(20),
    birthdate DATE,

    profile_completion_percentage INT DEFAULT 0,

    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (major_id) REFERENCES majors(id)
);

CREATE TABLE admins (
    user_id UNIQUEIDENTIFIER PRIMARY KEY
        FOREIGN KEY REFERENCES users(id),
    full_name VARCHAR(255),
    department VARCHAR(255),
);

CREATE TABLE majors (
    id INT IDENTITY PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO majors (name)
VALUES 
('Computer Science'),
('Information Systems'),
('Information Technology'),
('Decision Support');

CREATE TABLE courses (
    id INT IDENTITY PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    course_code VARCHAR(50) UNIQUE,

    major_id INT NOT NULL,

    category VARCHAR(100),
    difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),

    FOREIGN KEY (major_id) REFERENCES majors(id)
);

CREATE TABLE interests (
    id INT IDENTITY PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100)
);

INSERT INTO interests (name, category)
VALUES 
('Artificial Intelligence', 'Technology'),
('Machine Learning', 'Technology'),
('Data Science', 'Technology'),
('Web Development', 'Technology'),
('Mobile Development', 'Technology'),
('Cybersecurity', 'Technology'),
('Cloud Computing', 'Technology'),
('UI/UX Design', 'Design'),
('Game Development', 'Technology'),
('Software Engineering', 'Technology'),

('Entrepreneurship', 'Business'),
('Startups', 'Business'),
('Marketing', 'Business'),
('Finance', 'Business'),

('Research', 'Academic'),
('Mathematics', 'Academic'),
('Physics', 'Academic'),

('Reading', 'Personal'),
('Writing', 'Personal'),
('Public Speaking', 'Personal Development'),

('Problem Solving', 'Skills'),
('Leadership', 'Skills'),
('Teamwork', 'Skills');

CREATE TABLE student_interests (
    student_id UNIQUEIDENTIFIER,
    interest_id INT,

    created_at DATETIME DEFAULT GETDATE(),

    PRIMARY KEY (student_id, interest_id),

    FOREIGN KEY (student_id) REFERENCES students(user_id),
    FOREIGN KEY (interest_id) REFERENCES interests(id)
);

CREATE TABLE student_courses (
    student_id UNIQUEIDENTIFIER,
    course_id INT,

    grade FLOAT,
    semester INT,
    is_passed BIT DEFAULT 1,

    created_at DATETIME DEFAULT GETDATE(),

    PRIMARY KEY (student_id, course_id),

    FOREIGN KEY (student_id) REFERENCES students(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM admins;

drop table users

