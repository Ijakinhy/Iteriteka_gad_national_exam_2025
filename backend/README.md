## Prerequisites

- make sure you have Node.js installed run `node -v` to check if you have node installed
- start mysql server in xampp

## Getting Started

1. create a database in mysql use the DATABASES.sql file
   open CMD and then in mysql run: `source /your location/DATABASES.sql`

2. Navigate to the project directory:

   ```
   cd backend
   ```

3. Install the required dependencies:

   For MySQL: `npm install`

## Usage

1. Open the `src/db.js` file and configure your database connection settings:

   ```javascript
   const dbConfig = {
     host: "localhost",
     user: "your_username",
     password: "your_password",
     database: "your_database",
   };
   ```

2. Run the application using: `npm start`
3. The application will establish a connection to the database and perform database operations.
