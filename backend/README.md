# Node.js Database Connection

This project demonstrates how to establish a connection to a database using Node.js. It includes a simple setup for connecting to a MySQL or PostgreSQL database.

## Prerequisites

- Node.js installed on your machine.
- A MySQL or PostgreSQL database server running.

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd node-db-connection
   ```

3. Install the required dependencies:

   For MySQL:
   ```
   npm install mysql
   ```

   For PostgreSQL:
   ```
   npm install pg
   ```

## Usage

1. Open the `src/db.js` file and configure your database connection settings:

   ```javascript
   const dbConfig = {
       host: 'localhost',
       user: 'your_username',
       password: 'your_password',
       database: 'your_database'
   };
   ```

2. Run the application:

   ```
   node src/index.js
   ```

## License

This project is licensed under the MIT License.