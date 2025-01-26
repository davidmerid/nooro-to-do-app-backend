# To-Do App Backend

This is the backend for a simple To-Do application built using **Node.js**, **Express**, **Prisma**, and **MySQL**. It provides endpoints for managing tasks, including CRUD operations.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or later) - JavaScript runtime
- **MySQL** (v5.7 or later) - Database system
- **Prisma CLI** - To manage database migrations and generate Prisma client

### Install Node.js

You can download and install Node.js from the official website:  
[https://nodejs.org](https://nodejs.org)

### Install MySQL

You can download and install MySQL from the official website:  
[https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

### Install Prisma CLI

You can install Prisma globally using npm:

```bash
npm install -g prisma
```

## Setup Instructions

1. #### Clone the Repository

   Clone this repository to your local machine:

   ```bash
   https://github.com/davidmerid/nooro-to-do-app-backend.git
   cd nooro-to-do-app-backend
   ```

2. #### Install Dependencies

   Install the necessary dependencies:

   ```bash
   npm install
   ```

3. #### Set Up the MySql Database

   **Step 1:**: Ensure that the MySQL service is running. This can vary depending on your operating system:

   - **On Linux/macOS**: You can start the MySQL service using:

     ```bash
     sudo service mysql start
     ```

   - **On Windows**: You can start MySQL from the XAMPP Control Panel or by using the MySQL Workbench.

   **Step 2:**: Log in to MySQL

   ```bash
   mysql -u root -p
   ```

   - You will be prompted for your MySQL root user password

   **Step 3**: Create a Database for the Application

   Once logged into MySQL, create a new database for your application:

   ```sql
   CREATE DATABASE todo_db;
   ```

   **Step 4**: Verify the Database Creation

   To check that your database has been created successfully, use the following command:

   ```sql
   SHOW DATABASES;
   ```

   **Step 5**: Create `.env` file:

   In your project directory, make sure you have a .env file. This file contains sensitive information like database credentials. Add or update the DATABASE_URL with the correct credentials, based on the database name and the MySql user you are using. You can refer the `.env.example` file for a better understanding.

   ```dotenv
   DATABASE_URL="mysql://todo_user:your_password@localhost:3306/todo_db"
   ```

   Replace `todo_user` and `your_password` with the correct values you used when setting up MySQL. `localhost:3306` refers to your local MySQL instance and port.

   **Step 6**: Test the Connection

   Test the connection to the database by running:

   ```bash
   npm run prisma:migrate
   ```

   This will run the Prisma migrations and verify that your app can connect to the MySQL database.

   **Step 7** Generate Prisma Client
   Run the following command to generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

4. #### Start the Application

   To start the app in development mode, use the following command:

   ```bash
   npm run dev
   ```

   This will start the server on http://localhost:3001.

### Project Structure

```graphql
todo-backend/
│
├── prisma/
│   └── schema.prisma         # Prisma schema file for defining models and database setup
│
├── src/
│   ├── controllers/
│   │   └── task.controller.ts    # Controller functions for handling task-related requests
│   │
│   ├── middleware/
│   │   └── validate.ts          # Custom middleware for request validation using Zod
│   │
│   ├── routes/
│   │   └── task.routes.ts       # Express routes for the task endpoints
│   │
│   ├── schemas/
│   │   └── task.schema.ts       # Zod validation schemas for task operations (create, update, delete)
│   │
│   ├── validation.schema.ts     # General validation schemas for various parts of the request (body, params, query)
│   │
│   ├── services/
│   │   └── task.service.ts      # Business logic for interacting with the database (CRUD operations)
│   │
│   └── types/
│       └── server.ts            # Custom TypeScript types for server configuration (e.g., RequestHandler types)
│
├── .env                        # Environment variables file (used for configuration like DB connection)
├── .env.example                # Example environment variables file (template for .env)
├── .gitignore                  # Git ignore file to exclude node_modules, logs, etc.
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Lock file for consistent dependency management
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration file
```

### API Endpoints

- #### `GET /api/health`

  Checks if the server and database are running.

  Response:

  ```json
  {
    "status": "OK",
    "database": "Connected"
  }
  ```

- #### `GET /api/tasks`

  Fetches all tasks.

  Response:

  ```json
  {
    "id": "uuid",
    "title": "Task Title",
    "color": "gray",
    "completed": false,
    "createdAt": "2022-01-01T00:00:00.000Z",
    "updatedAt": "2022-01-01T00:00:00.000Z"
  }
  ```

- #### `POST /api/tasks`

  Creates a new task.

  Request Body:

  ```json
  {
    "title": "New Task",
    "color": "blue"
  }
  ```

  Response:

  ```json
  {
    "id": "uuid",
    "title": "New Task",
    "color": "blue",
    "completed": false,
    "createdAt": "2022-01-01T00:00:00.000Z",
    "updatedAt": "2022-01-01T00:00:00.000Z"
  }
  ```

- #### `PUT /api/tasks/:id`

  Updates a task by its ID.

  Request Body:

  ```json
  {
    "title": "Updated Task",
    "color": "red",
    "completed": true
  }
  ```

  Response:

  ```json
  {
    "id": "uuid",
    "title": "Updated Task",
    "color": "red",
    "completed": true,
    "createdAt": "2022-01-01T00:00:00.000Z",
    "updatedAt": "2022-01-01T00:00:00.000Z"
  }
  ```

- #### `DELETE /api/tasks/:id`

  Deletes a task by its ID.

  Response:

  ```json
  {
    "message": "Deleted <task_id> task successfully"
  }
  ```
