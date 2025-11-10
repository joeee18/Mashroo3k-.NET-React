-- Complete database setup script for Masroo3k
-- This script will create the database and all required tables

-- Step 1: Drop and recreate the database
DROP DATABASE IF EXISTS Masroo3k;
CREATE DATABASE Masroo3k;

-- Instructions for manual setup:
-- 1. In phpMyAdmin, select the "Masroo3k" database
-- 2. Go to the "SQL" tab and execute the following statements one by one

-- Step 2: Create Users table
-- USE Masroo3k;
-- CREATE TABLE Users (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Name VARCHAR(255) NOT NULL,
--     Email VARCHAR(255) NOT NULL,
--     PasswordHash VARCHAR(255) NOT NULL,
--     Role VARCHAR(50) NOT NULL DEFAULT 'user',
--     CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (Id),
--     UNIQUE KEY Email (Email)
-- );

-- Step 3: Create Templates table
-- CREATE TABLE Templates (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Name VARCHAR(255) NOT NULL,
--     Description TEXT,
--     Category VARCHAR(100) NOT NULL DEFAULT 'General',
--     Duration INT NOT NULL DEFAULT 30,
--     IsPopular TINYINT(1) NOT NULL DEFAULT 0,
--     CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (Id)
-- );

-- Step 4: Create Analyses table
-- CREATE TABLE Analyses (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Title VARCHAR(255) NOT NULL,
--     Content TEXT,
--     Score INT NOT NULL DEFAULT 0,
--     RiskLevel VARCHAR(50) NOT NULL DEFAULT 'Medium',
--     SuccessPercent INT NOT NULL DEFAULT 0,
--     Investment DECIMAL(18,2) NOT NULL DEFAULT 0.00,
--     ExpectedROI DECIMAL(18,2) NOT NULL DEFAULT 0.00,
--     CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     ExecutiveSummary TEXT,
--     KeyFindings TEXT,
--     Recommendations TEXT,
--     OwnerId INT NOT NULL,
--     TemplateId INT,
--     PRIMARY KEY (Id)
-- );

-- Step 5: Add foreign key constraints to Analyses table
-- ALTER TABLE Analyses
-- ADD CONSTRAINT FK_Analyses_Users_OwnerId
-- FOREIGN KEY (OwnerId) REFERENCES Users(Id) ON DELETE CASCADE;

-- ALTER TABLE Analyses
-- ADD CONSTRAINT FK_Analyses_Templates_TemplateId
-- FOREIGN KEY (TemplateId) REFERENCES Templates(Id) ON DELETE SET NULL;

-- Step 6: Create ActivityLogs table
-- CREATE TABLE ActivityLogs (
--     Id INT NOT NULL AUTO_INCREMENT,
--     Action VARCHAR(100) NOT NULL,
--     EntityType VARCHAR(100) NOT NULL,
--     EntityId INT,
--     Description TEXT NOT NULL,
--     Details TEXT,
--     IpAddress VARCHAR(45) NOT NULL,
--     UserAgent TEXT NOT NULL,
--     CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     Severity VARCHAR(20) NOT NULL DEFAULT 'Info',
--     UserId INT,
--     PRIMARY KEY (Id)
-- );

-- Step 7: Add foreign key constraint to ActivityLogs table
-- ALTER TABLE ActivityLogs
-- ADD CONSTRAINT FK_ActivityLogs_Users_UserId
-- FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE SET NULL;

-- Step 8: Create indexes for ActivityLogs
-- CREATE INDEX IX_ActivityLogs_CreatedAt ON ActivityLogs (CreatedAt);
-- CREATE INDEX IX_ActivityLogs_Action ON ActivityLogs (Action);
-- CREATE INDEX IX_ActivityLogs_Severity ON ActivityLogs (Severity);

-- Step 9: Create Notifications table
-- CREATE TABLE Notifications (
--     Id INT NOT NULL AUTO_INCREMENT,
--     UserId INT NOT NULL,
--     Title VARCHAR(255) NOT NULL,
--     Message TEXT NOT NULL,
--     Type VARCHAR(20) NOT NULL DEFAULT 'info',
--     IsRead TINYINT(1) NOT NULL DEFAULT 0,
--     CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     ActionUrl VARCHAR(500),
--     PRIMARY KEY (Id)
-- );

-- Step 10: Add foreign key constraint to Notifications table
-- ALTER TABLE Notifications
-- ADD CONSTRAINT FK_Notifications_Users_UserId
-- FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE;

-- Step 11: Create indexes for Notifications
-- CREATE INDEX IX_Notifications_CreatedAt ON Notifications (CreatedAt);
-- CREATE INDEX IX_Notifications_IsRead ON Notifications (IsRead);

-- Step 12: Insert default users
-- USE Masroo3k;
-- INSERT INTO Users (Id, Name, Email, PasswordHash, Role, CreatedAt) VALUES
-- (1, 'System Administrator', 'admin@mashroo3k.com', '$2a$11$8hS8vF8mYOAbC.0vDgF0yOvZaPq4hZ2Q8lS5P9yT8nR4qZ2Q8lS5O', 'admin', NOW()),
-- (2, 'John Doe', 'john@example.com', '$2a$11$8hS8vF8mYOAbC.0vDgF0yOvZaPq4hZ2Q8lS5P9yT8nR4qZ2Q8lS5O', 'user', NOW());

-- Step 13: Insert default templates
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

-- Step 14: Set AUTO_INCREMENT values
-- ALTER TABLE Users AUTO_INCREMENT = 3;
-- ALTER TABLE Templates AUTO_INCREMENT = 6;