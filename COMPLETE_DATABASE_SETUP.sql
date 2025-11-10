-- Complete database setup script for Masroo3k
-- This script will create the database and all required tables with data

-- Step 1: Drop and recreate the database
DROP DATABASE IF EXISTS Masroo3k;
CREATE DATABASE Masroo3k;

-- Instructions for phpMyAdmin users:
-- 1. Execute the above statements first
-- 2. Select the "Masroo3k" database from the left panel
-- 3. Execute the remaining statements below one by one

-- Step 2: Select the database
-- USE Masroo3k;

-- Step 3: Create all tables
-- Execute each CREATE TABLE statement separately in phpMyAdmin

-- CREATE TABLE Users (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Name VARCHAR(255) NOT NULL,
--     Email VARCHAR(255) NOT NULL,
--     PasswordHash VARCHAR(255) NOT NULL,
--     Role VARCHAR(50) NOT NULL,
--     CreatedAt DATETIME,
--     PRIMARY KEY (Id)
-- );

-- CREATE TABLE Templates (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Name VARCHAR(255) NOT NULL,
--     Description TEXT,
--     Category VARCHAR(100) NOT NULL,
--     Duration INT NOT NULL,
--     IsPopular INT NOT NULL,
--     CreatedAt DATETIME,
--     PRIMARY KEY (Id)
-- );

-- CREATE TABLE Analyses (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Title VARCHAR(255) NOT NULL,
--     Content TEXT,
--     Score INT NOT NULL,
--     RiskLevel VARCHAR(50) NOT NULL,
--     SuccessPercent INT NOT NULL,
--     Investment DECIMAL(18,2) NOT NULL,
--     ExpectedROI DECIMAL(18,2) NOT NULL,
--     CreatedAt DATETIME,
--     ExecutiveSummary TEXT,
--     KeyFindings TEXT,
--     Recommendations TEXT,
--     OwnerId INT NOT NULL,
--     TemplateId INT,
--     PRIMARY KEY (Id)
-- );

-- CREATE TABLE ActivityLogs (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Action VARCHAR(100) NOT NULL,
--     EntityType VARCHAR(100) NOT NULL,
--     EntityId INT,
--     Description TEXT NOT NULL,
--     Details TEXT,
--     IpAddress VARCHAR(45) NOT NULL,
--     UserAgent TEXT NOT NULL,
--     CreatedAt DATETIME,
--     Severity VARCHAR(20) NOT NULL,
--     UserId INT,
--     PRIMARY KEY (Id)
-- );

-- CREATE TABLE Notifications (
--     Id INT NOT NULL AUTO_INCREMENT,
--     UserId INT NOT NULL,
--     Title VARCHAR(255) NOT NULL,
--     Message TEXT NOT NULL,
--     Type VARCHAR(20) NOT NULL,
--     IsRead INT NOT NULL,
--     CreatedAt DATETIME,
--     ActionUrl VARCHAR(500),
--     PRIMARY KEY (Id)
-- );

-- CREATE TABLE TemplateFields (
--     Id INT NOT NULL AUTO_INCREMENT,
--     TemplateId INT NOT NULL,
--     StageNumber INT NOT NULL,
--     FieldOrder INT NOT NULL,
--     Label VARCHAR(100) NOT NULL,
--     InputType TEXT NOT NULL,
--     FieldOptions TEXT,
--     Rationale VARCHAR(1000) NOT NULL,
--     IsRequired INT NOT NULL,
--     MinLength INT,
--     MaxLength INT,
--     MustBePositive INT NOT NULL,
--     MustBeValidUrl INT NOT NULL,
--     MustBeBetween0And100 INT NOT NULL,
--     CreatedAt DATETIME,
--     PRIMARY KEY (Id)
-- );

-- Step 4: Add indexes
-- Execute these after creating all tables

-- CREATE UNIQUE INDEX IX_Users_Email ON Users (Email);
-- CREATE INDEX IX_ActivityLogs_CreatedAt ON ActivityLogs (CreatedAt);
-- CREATE INDEX IX_ActivityLogs_Action ON ActivityLogs (Action);
-- CREATE INDEX IX_ActivityLogs_Severity ON ActivityLogs (Severity);
-- CREATE INDEX IX_Notifications_CreatedAt ON Notifications (CreatedAt);
-- CREATE INDEX IX_Notifications_IsRead ON Notifications (IsRead);
-- CREATE INDEX IX_TemplateFields_TemplateId_StageNumber_FieldOrder ON TemplateFields (TemplateId, StageNumber, FieldOrder);

-- Step 5: Add foreign key constraints
-- Execute these after creating all tables and indexes

-- ALTER TABLE Analyses
-- ADD CONSTRAINT FK_Analyses_Users_OwnerId
-- FOREIGN KEY (OwnerId) REFERENCES Users(Id) ON DELETE CASCADE;

-- ALTER TABLE Analyses
-- ADD CONSTRAINT FK_Analyses_Templates_TemplateId
-- FOREIGN KEY (TemplateId) REFERENCES Templates(Id) ON DELETE SET NULL;

-- ALTER TABLE ActivityLogs
-- ADD CONSTRAINT FK_ActivityLogs_Users_UserId
-- FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE SET NULL;

-- ALTER TABLE Notifications
-- ADD CONSTRAINT FK_Notifications_Users_UserId
-- FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE;

-- ALTER TABLE TemplateFields
-- ADD CONSTRAINT FK_TemplateFields_Templates_TemplateId
-- FOREIGN KEY (TemplateId) REFERENCES Templates(Id) ON DELETE CASCADE;

-- Step 6: Insert default data
-- Execute these after adding all constraints

-- INSERT INTO Users (Id, Name, Email, PasswordHash, Role, CreatedAt) VALUES
-- (1, 'System Administrator', 'admin@mashroo3k.com', '$2a$11$8hS8vF8mYOAbC.0vDgF0yOvZaPq4hZ2Q8lS5P9yT8nR4qZ2Q8lS5O', 'admin', NOW()),
-- (2, 'John Doe', 'john@example.com', '$2a$11$8hS8vF8mYOAbC.0vDgF0yOvZaPq4hZ2Q8lS5P9yT8nR4qZ2Q8lS5O', 'user', NOW()),
-- (3, 'Developer User', 'Developer@dev.dev', '$2a$11$8hS8vF8mYOAbC.0vDgF0yOvZaPq4hZ2Q8lS5P9yT8nR4qZ2Q8lS5O', 'developer', NOW());

-- INSERT INTO Templates (Id, Name, Description, Category, Duration, IsPopular, CreatedAt) VALUES
-- (1, 'AI Business Idea Validator', 'Validate your business idea with AI-powered analysis covering core concept, financial hypotheses, feasibility, market validation, and critical assumptions.', 'Business Validation', 25, 1, NOW()),
-- (2, 'AI-Powered SWOT & PESTEL Builder', 'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths, weaknesses, opportunities, threats, and external factors.', 'SWOT & PESTEL', 30, 1, NOW()),
-- (3, 'Building the Marketing Plan', 'Create a comprehensive marketing plan with target audience definition, budget allocation, channels, USP, and KPIs.', 'Marketing', 20, 0, NOW()),
-- (4, 'Financial Performance Assessment', 'Evaluate your financial health with detailed analysis of revenue, costs, profits, and advanced financial metrics.', 'Financial', 20, 0, NOW()),
-- (5, 'Assessing Growth Readiness', 'Determine your business readiness for growth with operational efficiency, leadership, scalability, and financial runway analysis.', 'Growth', 25, 0, NOW()),
-- (6, 'Gap Analysis', 'Identify gaps between your current state and future goals with financial baselines, operational capabilities, and market position analysis.', 'Gap Analysis', 20, 0, NOW()),
-- (7, 'AI Business Health Check', 'Comprehensive health check of your business covering identity, financial indicators, operational efficiency, market relationships, and business vitals.', 'Health Check', 15, 0, NOW()),
-- (8, 'Digital Maturity Assessment', 'Assess your digital maturity across identity, investment, tools, engagement, and dimensions of digital capability.', 'Digital', 25, 0, NOW()),
-- (9, 'AI Pitch Deck Generator', 'Create a compelling pitch deck with core idea, financial model, product details, competitive landscape, and team information.', 'Pitch Deck', 30, 1, NOW()),
-- (10, 'AI-Based Market Opportunity Analyzer', 'Analyze market opportunities with company identity, financial capacity, core competencies, strategic posture, and market evaluation.', 'Market Opportunity', 25, 0, NOW());

-- Step 7: Set AUTO_INCREMENT values
-- ALTER TABLE Users AUTO_INCREMENT = 4;
-- ALTER TABLE Templates AUTO_INCREMENT = 11;