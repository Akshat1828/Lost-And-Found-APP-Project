# Lost-And-Found-APP-Project

A Lost and Found Project for APP made by:
- Akshat Srivastava (RA2411003030069)
- Atharva Kumar (RA2411003030079)
- Abhinav Chauhan (RA2411003030093)
- Arush Anand Singh (RA2411003030097)
- Pradeepto Pal (RA2411003030104)

## Description

This is a full-stack web application designed to help users report and find lost items. The application features user authentication, allowing users to sign up and log in to access the platform. The frontend is built with React and styled with Tailwind CSS, while the backend is powered by Spring Boot with JDBC for database interactions. The database is hosted on Supabase, providing a managed PostgreSQL instance.

## Features

- User registration and login
- Secure authentication with password hashing
- Responsive UI with modern design
- RESTful API for backend communication
- Database integration with Supabase

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Spring Boot, JDBC, Maven
- **Database**: PostgreSQL (via Supabase)
- **Version Control**: Git, GitHub

## Project Structure

```
Lost-And-Found-APP-Project/
├── README.md
├── my-app/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utility functions
│   │   └── assets/           # Static assets
│   ├── package.json
│   └── vite.config.js
└── backend/                   # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/example/  # Java source files
    │   │   └── resources/         # Configuration files
    │   └── test/
    ├── pom.xml
    └── create_tables.sql      # Database schema
```

## Project Setup

This guide will walk you through setting up the project locally for development.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher): Download from [nodejs.org](https://nodejs.org/)
- **Java** (v17 or higher): Download from [oracle.com](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- **Maven** (v3.6 or higher): Download from [maven.apache.org](https://maven.apache.org/download.cgi)
- **Git**: Download from [git-scm.com](https://git-scm.com/)

You can verify installations with:
```bash
node --version
java --version
mvn --version
git --version
```

### Database Setup

1. **Create a Supabase Account**: Go to [supabase.com](https://supabase.com) and sign up for a free account.

2. **Create a New Project**:
   - Click "New Project"
   - Fill in your project details (name, database password, region)
   - Wait for the project to be set up (this may take a few minutes)

3. **Get Database Credentials**:
   - In your Supabase dashboard, go to Settings > Database
   - Note down the following:
     - Host
     - Database name (usually 'postgres')
     - Username (usually 'postgres')
     - Password (the one you set during project creation)

4. **Create the Users Table**:
   - In your Supabase dashboard, go to the SQL Editor
   - Copy and paste the contents of `backend/create_tables.sql`:
     ```sql
     CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
     );
     ```
   - Click "Run" to execute the query

### Backend Setup

1. **Navigate to Backend Directory**:
   ```bash
   cd backend
   ```

2. **Configure Database Connection**:
   - Open `src/main/resources/application.properties`
   - Update the following lines with your Supabase credentials:
     ```
     spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_HOST]:5432/postgres
     spring.datasource.username=postgres
     spring.datasource.password=[YOUR_SUPABASE_PASSWORD]
     ```
     Replace `[YOUR_SUPABASE_HOST]` and `[YOUR_SUPABASE_PASSWORD]` with your actual values.

3. **Build the Backend**:
   ```bash
   mvn clean install
   ```
   This will download dependencies and compile the project.

4. **Run the Backend**:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will start on `http://localhost:8080`.

### Frontend Setup

1. **Navigate to Frontend Directory**:
   ```bash
   cd my-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This will install all required Node.js packages.

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or another port if 5173 is occupied).

## API Endpoints

The backend provides the following REST API endpoints:

- `POST /api/users/register` - Register a new user
  - Body: `{"email": "string", "password": "string"}`
  - Response: `{"message": "User registered successfully"}` or error message

- `POST /api/users/login` - Login user
  - Body: `{"email": "string", "password": "string"}`
  - Response: `{"message": "Login successful"}` or error message

## Usage

1. **Start Both Servers**: Ensure both backend and frontend are running.

2. **Access the Application**: Open `http://localhost:5173` in your web browser.

3. **Sign Up**: Click on the signup link and fill in your email and password.

4. **Log In**: Use your credentials to log in.

5. **Main Page**: After successful login, you'll be redirected to the main page where you can access the lost and found features.

## Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**: Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.

2. **Import Project**: Click "Import Project" and select your GitHub repository.

3. **Configure Build Settings**:
   - Root Directory: `my-app`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**: Click "Deploy" to host your frontend.

### Backend Deployment (Railway)

1. **Create Railway Account**: Sign up at [railway.app](https://railway.app).

2. **Connect Repository**: Link your GitHub repository.

3. **Add Environment Variables**: Set your Supabase database credentials as environment variables.

4. **Deploy**: Railway will automatically build and deploy your Spring Boot application.

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [render.com](https://render.com).

2. **Create New Web Service**: Connect your GitHub repository.

3. **Configure Service**:
   - Runtime: Java
   - Build Command: `./mvnw clean install`
   - Start Command: `./mvnw spring-boot:run`

4. **Add Environment Variables**: Include your database credentials.

5. **Deploy**: Render will build and host your backend.

### Post-Deployment Configuration

After deploying both frontend and backend:

1. Update the API base URL in your frontend code (in `src/components/logpg.jsx` and `src/components/signpg.jsx`) to point to your deployed backend URL.

2. Ensure CORS is properly configured in your backend for the deployed frontend domain.

## Troubleshooting

### Common Issues

1. **Backend Won't Start**:
   - Check if port 8080 is available
   - Verify Supabase credentials in `application.properties`
   - Ensure Maven dependencies are installed

2. **Frontend Won't Load**:
   - Confirm Node.js version is v16+
   - Check if all npm packages are installed
   - Verify the backend is running

3. **Database Connection Errors**:
   - Double-check Supabase credentials
   - Ensure the `users` table exists in your Supabase database
   - Check network connectivity

4. **CORS Errors**:
   - Add your frontend's deployed URL to the allowed origins in the backend
   - Restart the backend after configuration changes

### Getting Help

If you encounter issues not covered here:
- Check the console logs for error messages
- Verify all prerequisites are correctly installed
- Ensure you're following the setup steps in order

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
