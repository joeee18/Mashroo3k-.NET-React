DATABASE SETUP INSTRUCTIONS FOR MASROO3K

This folder contains several SQL scripts to help you set up the Masroo3k database:

1. RESET_DATABASE.sql
   - Drops and recreates the empty Masroo3k database
   - Contains commented instructions for manual setup

2. COMPLETE_DATABASE_SETUP.sql
   - Complete script to create database, tables, constraints, indexes, and seed data
   - Contains commented instructions for step-by-step execution

3. VERIFY_DATABASE.sql
   - Script to verify that the database setup was successful

HOW TO USE THESE SCRIPTS IN PHPMYADMIN:

Method 1: Complete Automated Setup (Recommended)
1. Open phpMyAdmin
2. Select the "Masroo3k" database (or any database)
3. Go to the "SQL" tab
4. Copy and paste the contents of COMPLETE_DATABASE_SETUP.sql
5. Execute the first two statements (DROP and CREATE DATABASE)
6. Select the "Masroo3k" database from the left panel
7. Execute the remaining statements in batches:
   - First execute all CREATE TABLE statements
   - Then execute all CREATE INDEX statements
   - Then execute all ALTER TABLE (foreign key) statements
   - Finally execute all INSERT statements

Method 2: Step-by-Step Manual Setup
1. Execute RESET_DATABASE.sql to create an empty database
2. Select the "Masroo3k" database
3. Execute each CREATE TABLE statement from COMPLETE_DATABASE_SETUP.sql one by one
4. Execute each CREATE INDEX statement
5. Execute each ALTER TABLE statement for foreign keys
6. Execute the INSERT statements to seed the data

Method 3: Verification
1. After setup, execute VERIFY_DATABASE.sql to check if everything is working

NOTES:
- All scripts are configured for MySQL with root user and empty password
- Default users and templates are included
- Passwords are pre-hashed using BCrypt