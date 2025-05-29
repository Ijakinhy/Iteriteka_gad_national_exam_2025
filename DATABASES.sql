-- Create the database
CREATE DATABASE IF NOT EXISTS CRPMS;
USE CRPMS;

-- 1. Create Users Table 
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 2. Create Services Table 
CREATE TABLE  Services (
    ServiceCode INT AUTO_INCREMENT PRIMARY KEY,
    ServiceName VARCHAR(100) NOT NULL,
    ServicePrice DECIMAL(10,2) NOT NULL
);

-- 3. Create Car Table 
CREATE TABLE  Car (
    PlateNumber INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(50) NOT NULL,
    Model VARCHAR(50) NOT NULL,
    ManufacturingYear YEAR NOT NULL,
    DriverPhone VARCHAR(20),
    MechanicName VARCHAR(100)
);

-- 4. Create ServiceRecord Table 
CREATE TABLE  ServiceRecord (
    RecordNumber INT AUTO_INCREMENT PRIMARY KEY,
    PlateNumber INT NOT NULL,
    ServiceCode INT NOT NULL,
    ServiceDate DATE NOT NULL,
    FOREIGN KEY (PlateNumber) REFERENCES Car(PlateNumber),
    FOREIGN KEY (ServiceCode) REFERENCES Services(ServiceCode)
);

-- 5. Create Payment Table 
CREATE TABLE  Payment (
    PaymentNumber INT AUTO_INCREMENT PRIMARY KEY,
    RecordNumber INT NOT NULL,
    AmountPaid DECIMAL(10,2) NOT NULL,
    PaymentDate DATE NOT NULL,
    FOREIGN KEY (RecordNumber) REFERENCES ServiceRecord(RecordNumber)
);
