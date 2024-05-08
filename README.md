# Flipr Backend Task Express Application

## Features

- User Authentication:
  - User registration with username, email, and password
  - User login with JWT token generation for secure authentication
- Expense Categories Management:
  - Retrieve all expense categories for the authenticated user
  - Add new expense categories
  - Delete existing expense categories
- Expense Management:
  - Add new expenses with details like title, date, amount, and category
  - Retrieve a paginated list of the user's expenses
  - Group user expenses by expense category, with optional filtering by month
  - Retrieve monthly expense data for a specific expense category
- Data Validation:
  - Validate input data in request payloads to ensure data integrity and security
- Authentication Middleware:
  - Secure routes that require authentication using JWT token validation
- Pagination:
  - Implement pagination for efficient retrieval of expenses
- API Documentation:
  - Comprehensive API documentation using Postman

## Getting Started

To get started with the Flipr Backend Task Express Application, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/flipr-backend-task.git
   ```

2. Navigate to the project directory:
   ```
   cd flipr-backend-task
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm run start
   ```

The application will be running on `http://localhost:3000`.

## API Documentation

The API documentation for the Flipr Backend Task Express Application is available on Postman. You can access it using the following link:

[API Documentation](https://documenter.getpostman.com/view/30665072/2sA3JKcMrF)

The documentation provides detailed information about each API endpoint, including request formats, response formats, and authentication requirements.

## Deployment

The Flipr Backend Task Express Application is deployed on Vercel for easy access and testing. You can access the deployed application using the following link:

[Vercel Deployment](https://flipr-backend-task-git-verceldeployment-selfishhenrys-projects.vercel.app/)

To test the API endpoints on the Vercel deployment, make sure to update the base URL in your API requests to:
```
https://flipr-backend-task-git-verceldeployment-selfishhenrys-projects.vercel.app/
```

## Technologies Used

The Flipr Backend Task Express Application is built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt
- Joi
