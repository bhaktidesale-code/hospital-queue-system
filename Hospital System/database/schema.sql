CREATE DATABASE IF NOT EXISTS hospital_queue;
USE hospital_queue;

CREATE TABLE IF NOT EXISTS Departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(50) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Queue (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    severity INT CHECK (severity BETWEEN 1 AND 5),
    status ENUM('Waiting', 'Completed') DEFAULT 'Waiting',
    arrival_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Patients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS History (
    id INT PRIMARY KEY AUTO_INCREMENT,
    queue_id INT NOT NULL,
    served_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (queue_id) REFERENCES Queue(id) ON DELETE CASCADE
);

-- Seed Data for Departments
INSERT IGNORE INTO Departments (name) VALUES 
('Cardiology'),
('Orthopedics'),
('General'),
('Neurology'),
('Pediatrics');
