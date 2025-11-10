-- TEST DATABASE CONNECTION
-- Run these queries in phpMyAdmin to verify the database is set up correctly

USE Masroo3k;

-- Check if default data was inserted
SELECT COUNT(*) as UserCount FROM Users;
SELECT COUNT(*) as TemplateCount FROM Templates;

-- Check specific records
SELECT Id, Name, Email, Role FROM Users;
SELECT Id, Name, Category, IsPopular FROM Templates;