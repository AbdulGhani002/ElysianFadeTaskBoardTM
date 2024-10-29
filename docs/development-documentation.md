# Development Documentation

## Installation Guides

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- npm (v6.x or higher)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ElysianFadeTaskBoardTM.git
   cd ElysianFadeTaskBoardTM
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   PORT=3000
   ```

4. Start the application:
   ```sh
   npm start
   ```

## Contribution Guidelines

### Fork the repository
Click the "Fork" button at the top right corner of the repository page to create a copy of the repository in your GitHub account.

### Clone the repository
Clone the forked repository to your local machine.
```sh
git clone https://github.com/yourusername/ElysianFadeTaskBoardTM.git
cd ElysianFadeTaskBoardTM
```

### Create a new branch
Create a new branch for your feature or bug fix.
```sh
git checkout -b feature/your-feature-name
```

### Make your changes
Implement your feature or bug fix.

### Commit your changes
Commit your changes with a descriptive commit message.
```sh
git add .
git commit -m "Add feature: your feature name"
```

### Push your changes
Push your changes to your forked repository.
```sh
git push origin feature/your-feature-name
```

### Create a pull request
Open a pull request from your forked repository to the main repository. Provide a clear description of your changes and any relevant information.

### Review and merge
Your pull request will be reviewed by the project maintainers. Once approved, it will be merged into the main repository.

## Testing Documentation

### Running Tests
To run the tests, use the following command:
```sh
npm test
```

### Test Categories
- **Unit Tests**: Test individual functions and methods in isolation.
- **Integration Tests**: Test the interaction between different components of the application.
- **End-to-End Tests**: Test the entire application from the user's perspective.

### Test Coverage
The test coverage report provides information about the percentage of code covered by tests. To generate a test coverage report, use the following command:
```sh
npm run coverage
```

The coverage report will be generated in the `coverage` directory.

## Build and Deployment Guides

### Build
To build the application, use the following command:
```sh
npm run build
```

### Deployment
To deploy the application, follow these steps:

1. **Set up the server**: Ensure that the server has Node.js and MongoDB installed.

2. **Clone the repository**: Clone the repository to the server.
   ```sh
   git clone https://github.com/yourusername/ElysianFadeTaskBoardTM.git
   cd ElysianFadeTaskBoardTM
   ```

3. **Install dependencies**: Install the project dependencies.
   ```sh
   npm install
   ```

4. **Set up environment variables**: Create a `.env` file in the root directory and add the necessary environment variables.

5. **Build the application**: Build the application using the following command:
   ```sh
   npm run build
   ```

6. **Start the application**: Start the application using a process manager like PM2.
   ```sh
   pm2 start app.js
   ```

7. **Monitor the application**: Use PM2 to monitor the application and ensure it is running smoothly.
   ```sh
   pm2 monit
   ```

8. **Set up a reverse proxy**: Set up a reverse proxy using Nginx or Apache to route traffic to the Node.js application.

9. **Configure SSL**: Configure SSL certificates for secure communication.

10. **Test the deployment**: Test the deployment to ensure that the application is running correctly.

