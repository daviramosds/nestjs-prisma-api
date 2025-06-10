# `nestjs-prisma-api`

This repository presents a robust API built with **NestJS** and **Prisma**, demonstrating a solid foundation for backend development in TypeScript. It includes modules for managing users and posts, showcasing efficient data handling with an **SQLite** database.

---

## ✨ Features

This API provides comprehensive functionalities for user and post management, including:

### User Management

* **Create User**: Register new users with a unique username and optional display name. Default user settings (SMS enabled, notifications off) are created automatically.
    * `POST /users`
        * **Body**:
            ```json
            {
              "username": "string", // Required
              "displayName": "string" // Optional
            }
            ```
* **Get All Users**: Retrieve a list of all registered users, including their settings and associated posts.
    * `GET /users`
* **Get User by ID**: Fetch a specific user by their unique ID, including selected user settings and posts.
    * `GET /users/:id`
* **Update User**: Modify existing user details like username or display name. Ensures username uniqueness.
    * `PATCH /users/:id`
        * **Body**:
            ```json
            {
              "username": "string", // Optional
              "displayName": "string" // Optional
            }
            ```
* **Update User Settings**: Adjust user notification preferences (SMS and general notifications).
    * `PATCH /users/:id/settings`
        * **Body**:
            ```json
            {
              "smsEnabled": "boolean", // Optional
              "notificationsOn": "boolean" // Optional
            }
            ```
* **Delete User**: Remove a user and their associated data from the system.
    * `DELETE /users/:id`

### Post Management

* **Create Post**: Create a new post linked to a single user.
    * `POST /posts`
        * **Body**:
            ```json
            {
              "title": "string", // Required, max 200 characters
              "description": "string", // Required
              "userId": "number" // Required
            }
            ```
* **Create Group Post**: Create a post associated with multiple users (a group post).
    * `POST /posts/group`
        * **Body**:
            ```json
            {
              "title": "string", // Required, max 200 characters
              "description": "string", // Required
              "userId": ["number"] // Required, array of user IDs
            }
            ```
* **Get All Group Posts**: Retrieve all group posts, including the users associated with them.
    * `GET /posts/group`

---

## 🚀 Technologies Used

* **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
* **Prisma**: An open-source ORM that simplifies database access, providing type-safe queries and a modern development experience.
* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
* **pnpm**: A fast, disk space efficient package manager for Node.js.
* **SQLite**: A self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine.
* **Class-Validator**: A library for declarative validation of class instances.

---

## ⚙️ Prerequisites

Make sure you have the following tools installed in your development environment:

* Node.js (v18.19.1, v20.11.1, or >=v22.0.0 recommended)
* pnpm (v6.11.0, v7.5.6, or >=v8.0.0 recommended)
* Git

---

## 💻 Installation

Follow the steps below to set up the project locally:

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/daviramosds/nestjs-prisma-api.git](https://github.com/daviramosds/nestjs-prisma-api.git)
    cd nestjs-prisma-api
    ```

2.  **Install dependencies** using pnpm:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root of the project based on `.env.example`.

    ```dotenv
    # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
    # See the documentation for all the connection string options: [https://pris.ly/d/connection-strings](https://pris.ly/d/connection-strings)
    DATABASE_URL="file:./dev.db"
    PORT=3000
    ```

    The project uses SQLite, so the default `DATABASE_URL` points to a local file database.

4.  **Generate Prisma Client & Run Migrations**:
    ```bash
    pnpm prisma generate
    pnpm prisma migrate dev
    ```
    This will generate the Prisma client and apply the necessary database schema to your SQLite database.

---

## ▶️ Running the Application

### Development Mode

To run the application in development mode with hot-reload:

* **pnpm:**
    ```bash
    pnpm run start:dev
    ```

The application will be available at `http://localhost:3000` (or the port defined in `.env`).

### Production Mode

To compile and run the application in production mode:

1.  **Compile the TypeScript code:**
    * **pnpm:**
        ```bash
        pnpm build
        ```

2.  **Start the application:**
    * **pnpm:**
        ```bash
        pnpm start
        ```

---

## 🌐 API Endpoints

The API exposes the following endpoints for managing users and posts. It is recommended to use tools like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension for testing.

**Base URL:** `http://localhost:3000` (or your configured port)

### User Endpoints

#### `POST /users` - Create a new user

Creates a new user account with a username and optional display name.
* **Request Body:**
    ```json
    {
      "username": "unique_username",
      "displayName": "User Display Name"
    }
    ```
* **Success Response (201 Created):** Returns the created user object, including `id`, `username`, `displayName`, and `userSetting`.
    ```json
    {
      "id": 1,
      "username": "unique_username",
      "displayName": "User Display Name",
      "userSetting": {
        "id": 1,
        "userId": 1,
        "smsEnabled": false,
        "notificationsOn": false
      }
    }
    ```

#### `GET /users` - Get all users

Retrieves a list of all registered users, including their settings and posts.
* **Response (200 OK):** Returns an array of user objects.
    ```json
    [
      {
        "id": 1,
        "username": "user1",
        "displayName": "User One",
        "userSetting": {
          "id": 1,
          "userId": 1,
          "smsEnabled": false,
          "notificationsOn": false
        },
        "posts": []
      }
    ]
    ```

#### `GET /users/:id` - Get a single user by ID

Retrieves information about a specific user by their ID.
* **Response (200 OK):** Returns a single user object.
    ```json
    {
      "id": 1,
      "username": "user1",
      "displayName": "User One",
      "userSetting": {
        "id": 1,
        "userId": 1,
        "smsEnabled": false,
        "notificationsOn": false
      },
      "posts": []
    }
    ```

#### `PATCH /users/:id` - Update a user by ID

Updates existing user details such as username or display name.
* **Request Body:**
    ```json
    {
      "username": "updated_username", // Optional
      "displayName": "Updated Display Name" // Optional
    }
    ```
* **Response (200 OK):** Returns the updated user object.
    ```json
    {
      "id": 1,
      "username": "updated_username",
      "displayName": "Updated Display Name",
      "userSetting": {
        "id": 1,
        "userId": 1,
        "smsEnabled": false,
        "notificationsOn": false
      }
    }
    ```

#### `PATCH /users/:id/settings` - Update user settings by ID

Updates a user's SMS and notification settings.
* **Request Body:**
    ```json
    {
      "smsEnabled": true,     // Optional
      "notificationsOn": true // Optional
    }
    ```
* **Response (200 OK):** Returns the updated user settings object.
    ```json
    {
      "id": 1,
      "userId": 1,
      "smsEnabled": true,
      "notificationsOn": true
    }
    ```

#### `DELETE /users/:id` - Delete a user by ID

Deletes a user and their associated data (e.g., settings, posts).
* **Response (200 OK):** Returns a confirmation message or the deleted user object.
    ```json
    {
      "id": 1,
      "username": "user_to_be_deleted",
      "displayName": "Deleted User",
      "userSetting": { ... },
      "posts": [...]
    }
    ```

### Post Endpoints

#### `POST /posts` - Create a new post

Creates a new post linked to a single user.
* **Request Body:**
    ```json
    {
      "title": "My New Post Title",
      "description": "This is a detailed description of my new post.",
      "userId": 1
    }
    ```
* **Success Response (201 Created):** Returns the created post object.
    ```json
    {
      "id": 1,
      "title": "My New Post Title",
      "description": "This is a detailed description of my new post.",
      "createdAt": "2025-06-10T18:00:00.000Z",
      "updatedAt": "2025-06-10T18:00:00.000Z",
      "userId": 1
    }
    ```

#### `POST /posts/group` - Create a new group post

Creates a post associated with multiple users.
* **Request Body:**
    ```json
    {
      "title": "Group Event Announcement",
      "description": "Details about the upcoming group event.",
      "userId": [1, 2, 3]
    }
    ```
* **Success Response (201 Created):** Returns the created group post object, including associated users.
    ```json
    {
      "id": 1,
      "title": "Group Event Announcement",
      "description": "Details about the upcoming group event.",
      "createdAt": "2025-06-10T18:00:00.000Z",
      "updatedAt": "2025-06-10T18:00:00.000Z",
      "users": [
        { "id": 1, "username": "user1" },
        { "id": 2, "username": "user2" },
        { "id": 3, "username": "user3" }
      ]
    }
    ```

#### `GET /posts/group` - Get all group posts

Retrieves a list of all group posts, including the users associated with each post.
* **Response (200 OK):** Returns an array of group post objects.
    ```json
    [
      {
        "id": 1,
        "title": "Group Event Announcement",
        "description": "Details about the upcoming group event.",
        "createdAt": "2025-06-10T18:00:00.000Z",
        "updatedAt": "2025-06-10T18:00:00.000Z",
        "users": [
          { "id": 1, "username": "user1" },
          { "id": 2, "username": "user2" }
        ]
      }
    ]
    ```

---

## 🏗️ Project Structure (Example)

```text
.
├── .vscode/
├── dist/
├── node_
