# Lost and Found Application

A comprehensive full-stack web application for reporting and recovering lost items, developed as an academic project.

## Team Members

- Akshat Srivastava (RA2411003030069)
- Atharva Kumar (RA2411003030079)
- Abhinav Chauhan (RA2411003030093)
- Arush Anand Singh (RA2411003030097)
- Pradeepto Pal (RA2411003030104)

## Overview

The Lost and Found Application is a modern web platform designed to streamline the process of reporting lost items and facilitating their recovery. Built with industry-standard technologies, the application features secure user authentication, a responsive user interface, and robust backend services powered by Spring Boot and PostgreSQL.

## Key Features

- **User Authentication**: Secure registration and login system with password hashing
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **RESTful Architecture**: Well-structured API endpoints for seamless communication
- **Cloud Database**: Managed PostgreSQL instance hosted on Supabase
- **Real-time Updates**: Efficient data handling and retrieval

## Technology Stack

### Frontend
- **React** - UI library for building component-based interfaces
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing solution

### Backend
- **Spring Boot** - Enterprise-grade Java framework
- **JDBC** - Database connectivity and operations
- **Maven** - Dependency management and build automation

### Database
- **PostgreSQL** - Relational database management system
- **Supabase** - Cloud database hosting platform

### Development Tools
- **Git** - Version control system
- **GitHub** - Code repository and collaboration platform

## Architecture

```
Lost-And-Found-APP-Project/
├── README.md
├── my-app/                    # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── lib/             # Utility functions
│   │   └── assets/          # Images and media
│   ├── package.json
│   └── vite.config.js
└── backend/                   # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/example/  # Java source code
    │   │   └── resources/         # Application configuration
    │   └── test/             # Unit and integration tests
    ├── pom.xml
    └── create_tables.sql     # Database schema definitions
```

## Getting Started

### System Requirements

Ensure the following software is installed on your development machine:

- **Node.js** (version 16.x or higher) - [Download](https://nodejs.org/)
- **Java Development Kit** (version 17.x or higher) - [Download](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- **Apache Maven** (version 3.6.x or higher) - [Download](https://maven.apache.org/download.cgi)
- **Git** - [Download](https://git-scm.com/)

Verify installations by running:
```bash
node --version
java --version
mvn --version
git --version
```

### Database Configuration

#### 1. Create Supabase Project

1. Register for an account at [supabase.com](https://supabase.com)
2. Create a new project with the following details:
   - Project name
   - Secure database password
   - Preferred geographical region
3. Wait for project initialization to complete

#### 2. Obtain Database Credentials

Navigate to **Settings > Database** in your Supabase dashboard and record:
- Host address
- Database name (default: `postgres`)
- Username (default: `postgres`)
- Password (as configured during setup)

#### 3. Initialize Database Schema

1. Access the SQL Editor in your Supabase dashboard
2. Execute the following SQL script from `backend/create_tables.sql`:

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Backend Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure database connection in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://[SUPABASE_HOST]:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=[SUPABASE_PASSWORD]
   ```

3. Build the application:
   ```bash
   mvn clean install
   ```

4. Start the server:
   ```bash
   mvn spring-boot:run
   ```
   
   The API will be accessible at `http://localhost:8080`

### Frontend Installation

1. Navigate to the frontend directory:
   ```bash
   cd my-app
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "phone": "+1234567890",
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "User registered successfully"
}
```

#### Login User
```
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Login successful"
}
```

#### Get User Profile
```
GET /api/users/profile?email=user@example.com

Response: 200 OK
{
  "id": 1,
  "username": "johndoe",
  "phone": "+1234567890",
  "email": "user@example.com"
}
```

### Posts Endpoints

#### Create Post
```
POST /api/users/posts
Content-Type: application/json

{
  "userId": 1,
  "title": "Lost iPhone",
  "description": "Black iPhone 12 lost near library",
  "imageUrl": "https://example.com/image.jpg",
  "itemType": "lost",
  "location": "Library",
  "contactInfo": "555-0123"
}

Response: 200 OK
{
  "message": "Post created successfully"
}
```

#### Get All Posts
```
GET /api/users/posts

Response: 200 OK
[
  {
    "id": 1,
    "userId": 1,
    "username": "johndoe",
    "title": "Lost iPhone",
    "description": "Black iPhone 12 lost near library",
    "imageUrl": "https://example.com/image.jpg",
    "itemType": "lost",
    "location": "Library",
    "contactInfo": "555-0123",
    "createdAt": "2025-10-06T10:30:00",
    "updatedAt": "2025-10-06T10:30:00"
  }
]
```

#### Get Post by ID
```
GET /api/users/posts/{id}

Response: 200 OK
{
  "id": 1,
  "userId": 1,
  "username": "johndoe",
  "title": "Lost iPhone",
  "description": "Black iPhone 12 lost near library",
  "imageUrl": "https://example.com/image.jpg",
  "itemType": "lost",
  "location": "Library",
  "contactInfo": "555-0123",
  "createdAt": "2025-10-06T10:30:00",
  "updatedAt": "2025-10-06T10:30:00"
}
```

#### Update Post
```
PUT /api/users/posts/{id}
Content-Type: application/json

{
  "userId": 1,
  "title": "Found iPhone",
  "description": "Found black iPhone 12",
  "itemType": "found",
  "location": "Library"
}

Response: 200 OK
{
  "message": "Post updated successfully"
}
```

#### Delete Post
```
DELETE /api/users/posts/{id}?userId=1

Response: 200 OK
{
  "message": "Post deleted successfully"
}
```

### Comments Endpoints

#### Create Comment
```
POST /api/users/comments
Content-Type: application/json

{
  "postId": 1,
  "userId": 1,
  "commentText": "I found a similar phone!"
}

Response: 200 OK
{
  "message": "Comment created successfully"
}
```

#### Get Comments by Post ID
```
GET /api/users/posts/{postId}/comments

Response: 200 OK
[
  {
    "id": 1,
    "postId": 1,
    "userId": 1,
    "username": "johndoe",
    "commentText": "I found a similar phone!",
    "createdAt": "2025-10-06T10:35:00"
  }
]
```

#### Delete Comment
```
DELETE /api/users/comments/{id}?userId=1

Response: 200 OK
{
  "message": "Comment deleted successfully"
}
```

## User Guide

1. **Launch Application**: Ensure both backend and frontend servers are running
2. **Access Interface**: Navigate to `http://localhost:5173` in your web browser
3. **Create Account**: Register using a valid email address and secure password
4. **Authenticate**: Log in with your credentials
5. **Access Dashboard**: Upon successful authentication, you'll be directed to the main application interface

## Deployment Guide

### Frontend Deployment (Vercel)

1. Sign in to [Vercel](https://vercel.com) using your GitHub account
2. Import your repository
3. Configure build settings:
   - **Root Directory**: `my-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy the application

### Backend Deployment Options

#### Option 1: Railway

1. Create an account at [Railway](https://railway.app)
2. Connect your GitHub repository
3. Configure environment variables with Supabase credentials
4. Deploy the application (automatic build and deployment)

#### Option 2: Render

1. Sign up at [Render](https://render.com)
2. Create a new Web Service
3. Configure service settings:
   - **Runtime**: Java
   - **Build Command**: `./mvnw clean install`
   - **Start Command**: `./mvnw spring-boot:run`
4. Add environment variables for database credentials
5. Deploy the application

### Post-Deployment Configuration

1. Update API endpoints in frontend components (`src/components/logpg.jsx` and `src/components/signpg.jsx`) to reference deployed backend URL
2. Configure CORS settings in backend to allow requests from deployed frontend domain

## Troubleshooting

### Backend Issues

**Server fails to start**
- Verify port 8080 availability
- Confirm Supabase credentials in `application.properties`
- Ensure Maven dependencies are properly installed

**Database connection failures**
- Validate Supabase credentials
- Confirm `users` table exists in database
- Check network connectivity and firewall settings

### Frontend Issues

**Application fails to load**
- Verify Node.js version compatibility (v16+)
- Ensure all npm packages are installed
- Confirm backend server is running

**CORS errors**
- Add frontend URL to backend's allowed origins
- Restart backend service after configuration changes

### Additional Support

For issues not addressed in this documentation:
- Review console logs for detailed error messages
- Verify all prerequisites are correctly installed
- Ensure setup steps are followed sequentially

## Contributing

We welcome contributions to improve this project:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for complete details.

## Acknowledgments

This project was developed as part of our academic curriculum, demonstrating practical application of full-stack web development principles and modern software engineering practices.
