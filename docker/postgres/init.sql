-- Create database if not exists
-- This is handled by POSTGRES_DB environment variable

-- Create additional user if needed
-- CREATE USER symfony_app WITH PASSWORD 'app_password';

-- Grant privileges
-- GRANT ALL PRIVILEGES ON DATABASE symfony_db TO symfony_app;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; 