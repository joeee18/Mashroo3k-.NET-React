-- Verify database setup
-- Run this script to check if the database and tables are properly set up

-- First, select the database
USE Masroo3k;

-- Check if default data was inserted
SELECT COUNT(*) as UserCount FROM Users;
SELECT COUNT(*) as TemplateCount FROM Templates;

-- Check specific records
SELECT Id, Name, Email, Role FROM Users;
SELECT Id, Name, Category, IsPopular FROM Templates;