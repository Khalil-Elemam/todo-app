# Superlist Todo Application - Backend

Welcome to the backend of the Superlist Todo application, built with Spring Boot and Java. This API handles user authentication, authorization, and manages the todo items for the app.

## Features

- **User Authentication**: Allows users to sign up, log in, and authenticate using JWT (JSON Web Tokens).
- **Email Activation**: Sends a verification email to users after signing up for account activation.
- **Todo Management**: Users can create, update, delete, and retrieve todos.
- **Secure API**: All endpoints require authentication via JWT tokens.

## Environment Variables

Set the following environment variables:

- **DB_HOST**: Host of the database.

- **DB_USERNAME**: Username for database authentication.

- **DB_PASSWORD**: Password for database authentication.

- **DB_NAME**: Name of the database.

- **DB_PORT**: Port for connecting to the database.

- **MAIL_HOST**: The mail server host for sending verification emails.

- **MAIL_PORT**: Port for the mail server.

- **MAIL_USERNAME**: Email service username for authentication.

- **MAIL_PASSWORD**: Email service password for authentication.

- **ACTIVATE_ACCOUNT_URL**: URL for activating the user's account (used in the verification email).

- **FRONTEND_URL**: URL of the frontend application for authentication requests.

## Getting Started

1. Clone this repository.
2. Navigate to the `todo-api` directory.
3. Run `mvn clean install` to build the project.
4. Set the required environment variables.
5. Run the application using your IDE or command line.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](../LICENSE) file for details.
