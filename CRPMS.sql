-- Create the database
CREATE DATABASE IF NOT EXISTS CRPMS;

-- Use the database
USE CRPMS;


CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL

);

-- 1. Create Services Table
CREATE TABLE Services (
    ServiceCode VARCHAR(10) PRIMARY KEY,
    ServiceName VARCHAR(100),
    ServicePrice DECIMAL(10,2)
);

-- 2. Create Car Table
CREATE TABLE Car (
    PlateNumber VARCHAR(15) PRIMARY KEY,
    Type VARCHAR(50),
    Model VARCHAR(50),
    ManufacturingYear YEAR,
    DriverPhone VARCHAR(20),
    MechanicName VARCHAR(100)
);

-- 3. Create ServiceRecord Table
CREATE TABLE ServiceRecord (
    RecordNumber INT AUTO_INCREMENT PRIMARY KEY,
    PlateNumber VARCHAR(15),
    ServiceCode VARCHAR(10),
    ServiceDate DATE,
    FOREIGN KEY (PlateNumber) REFERENCES Car(PlateNumber),
    FOREIGN KEY (ServiceCode) REFERENCES Services(ServiceCode)
);

-- 4. Create Payment Table
CREATE TABLE Payment (
    PaymentNumber INT AUTO_INCREMENT PRIMARY KEY,
    RecordNumber INT,
    AmountPaid DECIMAL(10,2),
    PaymentDate DATE,
    FOREIGN KEY (RecordNumber) REFERENCES ServiceRecord(RecordNumber)
);
