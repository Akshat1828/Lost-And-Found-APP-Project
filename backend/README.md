# Lost and Found Backend

A simple Java backend for user login using MySQL and JDBC.

## Setup

1. Ensure MariaDB/MySQL is installed and running.
2. Run the SQL script to create the database and tables:
   ```bash
   mysql -u root < create_tables.sql
   ```
   If you have a password, use: `mysql -u root -p < create_tables.sql`
3. Update the USER and PASSWORD in `src/main/resources/application.properties` if needed.

## Build and Run

```bash
mvn clean compile
mvn spring-boot:run
```

The server will start on http://localhost:8080.

## Database Schema

- `users` table:
  - `id` INT AUTO_INCREMENT PRIMARY KEY
  - `email` VARCHAR(255) UNIQUE NOT NULL
  - `password` VARCHAR(255) NOT NULL

## API Endpoints

- POST `/api/users/register` - Register a new user (JSON: {"email": "...", "password": "..."})
- POST `/api/users/login` - Login (JSON: {"email": "...", "password": "..."})

Note: Passwords are stored in plain text. In production, hash them.