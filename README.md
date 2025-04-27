# Products Platform API

This is the **Products Platform API**, a backend service built using the [NestJS](https://nestjs.com/) framework. It provides functionality for managing users, products, and categories with authentication and role-based access control.

## Features

- **User Management**: CRUD operations for users.
- **Product Management**: Manage products with categories, pricing, and inventory.
- **Category Management**: Organize products into hierarchical categories.
- **Authentication**: Secure JWT-based authentication with login and registration endpoints.
- **Role-Based Access Control**: User roles (`user`, `admin`) to restrict access to resources.
- **Database Integration**: PostgreSQL database with Prisma ORM for schema management.
- **Validation**: DTO-based validation using `class-validator` and `class-transformer`.
- **Error Handling**: Centralized error handling with custom exceptions and filters.
- **Scalability**: Modular architecture for easy feature expansion.

## Project Structure

```
src/
├── auth/          # Authentication module
├── base/          # Base service and controller for CRUD operations
├── category/      # Category module
├── error/         # Custom error handling
├── prisma/        # Prisma service and module
├── product/       # Product module
├── user/          # User module
├── app.module.ts  # Root module
├── main.ts        # Application entry point
```

## Prerequisites

- **Node.js** (v18+)
- **PostgreSQL** (v13+)
- **Docker** (optional, for running PostgreSQL locally)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Products-Platform-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Run the database migrations:

   ```bash
   npx prisma migrate dev
   ```

## Running the Application

### Development

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`.

### Production

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

- `POST /auth/login`: Login with email and password.
- `POST /auth/register`: Register a new user.

### Users

- `GET /user`: Get all users.
- `GET /user/:id`: Get a specific user by ID.
- `POST /user`: Create a new user.
- `PUT /user/:id`: Update a user.
- `DELETE /user/:id`: Delete a user.

### Products

- `GET /product`: Get all products.
- `GET /product/:id`: Get a specific product by ID.
- `POST /product`: Create a new product.
- `PUT /product/:id`: Update a product.
- `DELETE /product/:id`: Delete a product.

### Categories

- `GET /category`: Get all categories.
- `GET /category/:id`: Get a specific category by ID.
- `POST /category`: Create a new category.
- `PUT /category/:id`: Update a category.
- `DELETE /category/:id`: Delete a category.

## Docker Setup

To run the PostgreSQL database using Docker:

1. Create a `docker-compose.yml` file (if not already present) and configure the PostgreSQL service.
2. Start the database:

   ```bash
   docker-compose up -d
   ```

3. Update the `DATABASE_URL` in the `.env` file to match the Docker configuration.

## Environment Variables

| Variable       | Description                          | Default Value       |
|----------------|--------------------------------------|---------------------|
| `DATABASE_URL` | Connection string for PostgreSQL     | `None`              |
| `JWT_SECRET`   | Secret key for JWT authentication    | `None`              |
| `PORT`         | Port on which the app will run       | `3000`              |

## License

This project is licensed under the **UNLICENSED** license.

## Contact

For any questions or feedback, please contact the project maintainer.
