DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'nobuzztest') THEN
    CREATE USER nobuzztest WITH PASSWORD 'nobuzztest';
  END IF;

  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nobuzztest') THEN
    CREATE DATABASE nobuzztest OWNER nobuzztest;
  END IF;
END $$;
