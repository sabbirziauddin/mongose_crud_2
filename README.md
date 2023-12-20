# Express TypeScript CRUD Project

This is a simple CRUD (Create, Read, Update, Delete) project built with Express, TypeScript, Zod for input validation, and Mongoose for MongoDB database queries.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)
- MongoDB installed locally or accessible remotely

### Installation process

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/your-repo.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root folder with the following content:

    ```env
    PORT=4001
    DATABASE_URL="mongodb://your-mongodb-url"
    ```

### Development

- To run the server in development mode with automatic restarts on file changes:

    ```bash
    npm run start:dev
    ```

- To run linting:

    ```bash
    npm run lint
    ```

- To automatically fix linting issues:

    ```bash
    npm run lint:fix
    ```

- To format code using Prettier:

    ```bash
    npm run prettier
    ```

- To automatically fix code formatting issues:

    ```bash
    npm run prettier:fix
    ```

### Production

To build the project for production:

```bash
npm run build
