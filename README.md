# Task Management Application

This is a full-stack Task Management Application that enables users to manage their tasks efficiently based on user roles. The application has three types of users: Admin, Manager, and Regular User. Admin users can manage all tasks and users, Managers can manage tasks for their assigned Regular Users, and Regular Users can manage their own tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Roles and Management

- Admin can create new Managers and Regular Users.
- Managers can manage tasks for Regular Users they oversee.
- Regular Users can manage their own tasks.

### Task Management

- Create, edit, and delete tasks.
- Each task has a title, description, due date, and status.
- Filter tasks by status and due date.

### Authentication

- JWT-based authentication for secure access.
- Role-based access control for different user roles.

### Responsive Design

- Built using React with Tailwind CSS for a responsive user interface.

## Technologies Used

### Frontend

- React

- React Router (for routing)
- Tailwind CSS (for styling)
- Vite (for development)

### Backend

- Node.js
- Express.js
- MongoDB (for database)

## Setup Instructions

### Prerequisites

- Node.js 
- MongoDB  local 
### Frontend Setup

1. Clone the repository:
    ```bash
    git clone
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create an `.env` file in the root of the frontend directory and add the following:
    ```plaintext
    REACT_APP_API_URL=<your_backend_api_url>
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the backend directory and add the following:
    ```plaintext
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

## Usage

- Access the application by navigating to `http://localhost:3000` in your web browser.
- Use the `/signup` route to register a new Admin user.
- Admin users can manage other users and tasks from the `/admin` dashboard.
- Managers can manage their tasks and assigned Regular Users from the `/manager` dashboard.
- Regular Users can manage their own tasks from the `/user` dashboard.

## API Endpoints

### Authentication

- `POST /api/auth/login` - Logs in a user.
- `POST /api/auth/signup` - Registers a new Admin user only.

### User Management (Admin only)

- `GET /api/users` - Fetches all users.
- `POST /api/users` - Creates a new user (Manager or Regular User).
- `DELETE /api/users/:id` - Deletes a user.
- `PUT /api/users/:id` - Updates user details.

### Task Management

- `GET /api/tasks` - Fetches all tasks.
- `POST /api/tasks` - Creates a new task.
- `DELETE /api/tasks/:id` - Deletes a task.
- `PUT /api/tasks/:id` - Updates task details.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.
