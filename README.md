# Elysian Fade Task BoardTM

## Project Description

Elysian Fade Task BoardTM is a feature-rich task management system built using Node.js as the runtime, MongoDB for data storage, EJS templates for the front end, and MVC architecture. The system is designed with best practices for security, modularity, and scalability.

## Setup Instructions

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
   PORT=3000
   ```

4. Start the application:
   ```sh
   npm start
   ```

## Usage Instructions

- Access the application at `http://localhost:3000`
- Use the dashboard to manage tasks, subtasks, tags, users, teams, notifications, goals, and analytics.

## Features List

### Task Management Core
- **ITask Interface**: Defines task properties (title, description, dueDate, priority, status, category, isRecurring, tags, createdBy, assignees, etc.).
- **Task Class**: Implements ITask. Methods: `createTask()`, `editTask()`, `deleteTask()`, `markAsComplete()`, `setPriority()`, `assignToUser()`.

### Subtask and Dependency Management
- **ISubtask Interface**: Defines properties for subtasks (title, parentTaskId, status, etc.).
- **Subtask Class**: Implements ISubtask. Methods: `addSubtask()`, `updateStatus()`, `deleteSubtask()`.
- **TaskDependency Class**: Links tasks with dependency methods (`setDependency()`, `checkDependencyStatus()`).

### Tag and Label Management
- **ITag Interface**: Specifies tag properties (name, color, description).
- **Tag Class**: Implements ITag. Methods: `createTag()`, `assignTagToTask()`, `removeTagFromTask()`.

### User and Authentication Management
#### User Management
- **IUser Interface**: Defines user properties (name, email, role, permissions, team).
- **User Class**: Implements IUser. Methods: `register()`, `login()`, `logout()`, `updateProfile()`, `assignRole()`.
- **Session Class**: Manages user sessions. Methods: `createSession()`, `destroySession()`, `refreshSession()`.

#### Authentication & Authorization
- **AuthService Class**: Provides user authentication. Methods: `authenticate()`, `authorize()`, `checkPermissions()`.
- **SecurityService Class**: Provides security functions. Methods: `hashPassword()`, `validatePassword()`, `twoFactorAuth()`, `logActivity()`.

### Team and Collaboration Management
- **ITeam Interface**: Defines team properties (teamName, members, permissions).
- **Team Class**: Implements ITeam. Methods: `createTeam()`, `addMember()`, `removeMember()`, `assignRole()`.

### Task Management & Display
#### Task Status and Notification System
- **Notification Class**: Manages notifications. Methods: `sendTaskReminder()`, `sendDeadlineNotification()`, `notifyTeam()`.
- **StatusService Class**: Handles task status updates. Methods: `updateStatus()`, `getStatusHistory()`.

#### Dashboard and Board View
- **Dashboard Class**: Contains widgets for task tracking, calendar view, and user metrics.
- **Board Class**: A draggable task board that supports sorting and filtering. Methods: `filterTasks()`, `sortTasks()`, `addTaskToBoard()`, `removeTaskFromBoard()`.

#### Task Views and Filtering
- **ITaskFilter Interface**: Specifies filtering criteria (priority, dueDate, status).
- **TaskFilter Class**: Implements ITaskFilter. Methods: `filterByPriority()`, `filterByCategory()`, `filterByDate()`.

### Data and Persistence
#### Database Management
- **Database Class**: Sets up MongoDB connection, creates schema definitions, and manages CRUD operations.
- **TaskRepository Class**: Interacts with the database to save and retrieve tasks. Methods: `saveTask()`, `getTaskById()`, `updateTask()`, `deleteTask()`.
- **UserRepository Class**: Manages user data storage. Methods: `saveUser()`, `getUserByEmail()`, `updateUser()`, `deleteUser()`.

#### Backup and Data Restore
- **BackupService Class**: Manages data backup and restore. Methods: `backupDatabase()`, `restoreDatabase()`.

### Customization and User Settings
#### User Settings and Personalization
- **Settings Class**: Stores and retrieves user-specific settings (theme, notificationPreferences, taskView).
- **ThemeService Class**: Manages theme preferences. Methods: `applyDarkMode()`, `applyLightMode()`.

### API and External Integration
#### API for Third-Party Integration
- **ITaskAPI Interface**: Defines the API structure for external applications.
- **TaskAPI Class**: Implements ITaskAPI. Methods: `createTaskAPI()`, `updateTaskAPI()`, `getTaskAPI()`, `deleteTaskAPI()`.

#### Calendar and Notification Integrations
- **CalendarSync Class**: Manages external calendar sync. Methods: `syncWithGoogleCalendar()`, `syncWithOutlookCalendar()`.
- **ExternalNotificationService Class**: Sends notifications through SMS, email, or push. Methods: `sendSMSNotification()`, `sendEmailNotification()`, `sendPushNotification()`.

### Task Analytics and Reporting
#### Analytics and Reporting
- **AnalyticsService Class**: Generates productivity reports. Methods: `generateDailyReport()`, `generateWeeklySummary()`, `generateTeamPerformanceReport()`.

#### Goal Tracking and Insights
- **Goal Class**: Sets long-term goals for users. Methods: `createGoal()`, `updateGoalProgress()`, `markGoalComplete()`.

### AI and Automation
#### AI Task Management
- **SmartTaskSuggester Class**: Uses AI for task recommendations. Methods: `suggestTasks()`, `analyzeTaskPatterns()`.

#### Natural Language Processing (NLP)
- **NLPService Class**: Provides natural language task creation. Methods: `parseTaskFromText()`, `extractDueDateFromText()`.

#### Data De-Duplication and Cleanup
- **DataCleaner Class**: Detects and removes duplicates. Methods: `findDuplicateTasks()`, `deleteDuplicateTasks()`.

### Frontend and Template Rendering
#### Frontend (EJS Templates)
- **HomePage Template**: Displays the main board view.
- **TaskModal Template**: Popup for task creation and editing.
- **SettingsPage Template**: User settings and preferences page.

## Debugging Instructions

To debug errors in Node.js, follow these steps:

1. **Use the `--inspect` flag**:
   Start your Node.js application with the `--inspect` flag to enable debugging. This will start a debugging session and provide a URL to open in Chrome DevTools.
   ```sh
   node --inspect app.js
   ```

2. **Use the `--inspect-brk` flag**:
   If you want to break on the first line of your code, use the `--inspect-brk` flag.
   ```sh
   node --inspect-brk app.js
   ```

3. **Use the `console.log` statements**:
   Add `console.log` statements in your code to print variables and track the flow of execution.

4. **Use the Node.js Debugger**:
   Node.js has a built-in debugger that you can use to set breakpoints, step through code, and inspect variables. You can access the debugger by opening the provided URL in Chrome DevTools.

5. **Check the Node.js documentation**:
   Refer to the [Node.js documentation](https://nodejs.org/en/docs/guides/debugging-getting-started/) for more information on debugging tools and techniques.

## Frontend Features

### Enhanced Design and Responsiveness

The frontend of the Elysian Fade Task BoardTM has been enhanced to provide a charming and great look, along with improved responsiveness. The following changes have been made:

- **CSS Styles**: The CSS styles in `public/css/styles.css` have been enhanced to improve the overall look and feel of the application. New CSS classes have been added for improved design elements.
- **Responsive Design**: Media queries have been added to `public/css/styles.css` to ensure the application is mobile-friendly and responsive.
- **EJS Templates**: The EJS templates in the `views` directory have been updated to reflect the new design and responsiveness.
- **JavaScript Functionality**: New JavaScript functionality has been added to `public/js/main.js` to support enhanced user interactions and responsiveness.

### Using the New Frontend Features

To take advantage of the new frontend features, follow these steps:

1. **Access the Application**: Open your web browser and navigate to `http://localhost:3000` to access the Elysian Fade Task BoardTM.

2. **Responsive Design**: The application is now mobile-friendly and responsive. You can use it on various devices, including desktops, tablets, and smartphones. The layout will adjust automatically based on the screen size.

3. **Enhanced User Interactions**: The task board now supports enhanced user interactions, such as drag-and-drop functionality for tasks. You can drag tasks between columns to update their status.

4. **Improved Design Elements**: The application features a charming and great look with improved design elements. Enjoy the visually appealing interface while managing your tasks.

5. **Task Modal**: The task modal has been updated with new HTML elements for an improved user experience. You can create and edit tasks using the modal.

6. **Goal Tracking**: The goal tracking page has been updated with new design elements and responsiveness. You can create and track your goals with ease.

7. **Analytics**: The analytics page has been enhanced to provide a better user experience. View daily reports, weekly summaries, and team performance reports.

8. **User Settings**: The user settings page has been updated with new design elements and responsiveness. Customize your preferences, such as theme, notification preferences, task view, language, and timezone.

Enjoy the enhanced frontend features of the Elysian Fade Task BoardTM and experience a charming and great design with improved responsiveness.

## System Design

### Overview

The Elysian Fade Task BoardTM is designed using the Model-View-Controller (MVC) architecture. This design pattern separates the application into three main components: Models, Views, and Controllers. This separation of concerns allows for better organization, maintainability, and scalability of the application.

### Core Technologies

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It is used for building the server-side of the application.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A NoSQL database used for storing and retrieving data.
- **EJS**: A templating engine that allows for embedding JavaScript code into HTML templates.

### Directory Structure

The directory structure of the Elysian Fade Task BoardTM is organized as follows:

```
ElysianFadeTaskBoardTM/
├── app.js
├── config/
│   └── env.js
├── controllers/
│   ├── AnalyticsController.js
│   ├── GoalController.js
│   ├── NotificationController.js
│   ├── TaskController.js
│   ├── TeamController.js
│   └── UserController.js
├── models/
│   ├── Goal.js
│   ├── Subtask.js
│   ├── Tag.js
│   ├── Task.js
│   ├── Team.js
│   └── User.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── routes/
│   ├── baseRoutes.js
│   ├── goalRoutes.js
│   ├── notificationRoutes.js
│   ├── taskRoutes.js
│   ├── teamRoutes.js
│   └── userRoutes.js
├── services/
│   ├── AnalyticsService.js
│   ├── AuthService.js
│   ├── GoalService.js
│   ├── NotificationService.js
│   ├── TaskService.js
│   ├── TeamService.js
│   └── UserService.js
├── utils/
│   └── database.js
├── views/
│   ├── AnalyticsPage.ejs
│   ├── ErrorPage.ejs
│   ├── GoalPage.ejs
│   ├── HomePage.ejs
│   ├── LoginPage.ejs
│   ├── RegisterPage.ejs
│   ├── SettingsPage.ejs
│   ├── SuccessPage.ejs
│   └── TaskModal.ejs
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Interaction Flow

1. **Client Request**: The client (web browser) sends a request to the server.
2. **Routing**: The request is routed to the appropriate route handler based on the URL and HTTP method.
3. **Controller**: The route handler invokes the corresponding controller method to handle the request.
4. **Service**: The controller interacts with the service layer to perform business logic and data manipulation.
5. **Model**: The service layer interacts with the model to perform database operations.
6. **View**: The controller renders the appropriate view (EJS template) and sends the response back to the client.

### Example Interaction

Let's walk through an example interaction for creating a new task:

1. **Client Request**: The client sends a POST request to `/tasks` with the task data.
2. **Routing**: The request is routed to the `TaskController.createTask` method.
3. **Controller**: The `createTask` method in `TaskController` is invoked.
4. **Service**: The `createTask` method calls the `TaskService.createTask` method to handle the business logic.
5. **Model**: The `TaskService.createTask` method interacts with the `Task` model to save the task data to the database.
6. **Response**: The `TaskController.createTask` method sends a JSON response back to the client with the created task data.

### Database Schema

The database schema for the Elysian Fade Task BoardTM is designed to store and manage tasks, subtasks, tags, users, teams, notifications, goals, and analytics. The schema is defined using Mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js.

#### Task Schema

```js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true },
  category: { type: String, required: true },
  isRecurring: { type: Boolean, default: false },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
```

#### User Schema

```js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], required: true },
  permissions: { type: [String], default: [] },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

### API Documentation

The Elysian Fade Task BoardTM provides a RESTful API for interacting with the application. The API endpoints are defined in the `routes` directory and handled by the corresponding controllers.

#### Task API

- **Create Task**
  - **Endpoint**: `POST /tasks`
  - **Description**: Creates a new task.
  - **Request Body**:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description",
      "dueDate": "2023-12-31",
      "priority": "High",
      "status": "Pending",
      "category": "Work",
      "isRecurring": false,
      "tags": ["tagId1", "tagId2"],
      "createdBy": "userId",
      "assignees": ["userId1", "userId2"]
    }
    ```
  - **Response**:
    ```json
    {
      "task": {
        "_id": "taskId",
        "title": "Task Title",
        "description": "Task Description",
        "dueDate": "2023-12-31T00:00:00.000Z",
        "priority": "High",
        "status": "Pending",
        "category": "Work",
        "isRecurring": false,
        "tags": ["tagId1", "tagId2"],
        "createdBy": "userId",
        "assignees": ["userId1", "userId2"],
        "__v": 0
      }
    }
    ```

- **Get Tasks**
  - **Endpoint**: `GET /tasks`
  - **Description**: Retrieves all tasks.
  - **Response**:
    ```json
    {
      "tasks": [
        {
          "_id": "taskId",
          "title": "Task Title",
          "description": "Task Description",
          "dueDate": "2023-12-31T00:00:00.000Z",
          "priority": "High",
          "status": "Pending",
          "category": "Work",
          "isRecurring": false,
          "tags": ["tagId1", "tagId2"],
          "createdBy": "userId",
          "assignees": ["userId1", "userId2"],
          "__v": 0
        }
      ]
    }
    ```

- **Get Task by ID**
  - **Endpoint**: `GET /tasks/:id`
  - **Description**: Retrieves a task by its ID.
  - **Response**:
    ```json
    {
      "task": {
        "_id": "taskId",
        "title": "Task Title",
        "description": "Task Description",
        "dueDate": "2023-12-31T00:00:00.000Z",
        "priority": "High",
        "status": "Pending",
        "category": "Work",
        "isRecurring": false,
        "tags": ["tagId1", "tagId2"],
        "createdBy": "userId",
        "assignees": ["userId1", "userId2"],
        "__v": 0
      }
    }
    ```

- **Update Task**
  - **Endpoint**: `PUT /tasks/:id`
  - **Description**: Updates a task by its ID.
  - **Request Body**:
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "dueDate": "2023-12-31",
      "priority": "Medium",
      "status": "In Progress",
      "category": "Personal",
      "isRecurring": true,
      "tags": ["tagId1", "tagId3"],
      "assignees": ["userId1"]
    }
    ```
  - **Response**:
    ```json
    {
      "task": {
        "_id": "taskId",
        "title": "Updated Task Title",
        "description": "Updated Task Description",
        "dueDate": "2023-12-31T00:00:00.000Z",
        "priority": "Medium",
        "status": "In Progress",
        "category": "Personal",
        "isRecurring": true,
        "tags": ["tagId1", "tagId3"],
        "createdBy": "userId",
        "assignees": ["userId1"],
        "__v": 0
      }
    }
    ```

- **Delete Task**
  - **Endpoint**: `DELETE /tasks/:id`
  - **Description**: Deletes a task by its ID.
  - **Response**:
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

### Contribution Guidelines

We welcome contributions to the Elysian Fade Task BoardTM project. To contribute, please follow these guidelines:

1. **Fork the repository**: Click the "Fork" button at the top right corner of the repository page to create a copy of the repository in your GitHub account.

2. **Clone the repository**: Clone the forked repository to your local machine.
   ```sh
   git clone https://github.com/yourusername/ElysianFadeTaskBoardTM.git
   cd ElysianFadeTaskBoardTM
   ```

3. **Create a new branch**: Create a new branch for your feature or bug fix.
   ```sh
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**: Implement your feature or bug fix.

5. **Commit your changes**: Commit your changes with a descriptive commit message.
   ```sh
   git add .
   git commit -m "Add feature: your feature name"
   ```

6. **Push your changes**: Push your changes to your forked repository.
   ```sh
   git push origin feature/your-feature-name
   ```

7. **Create a pull request**: Open a pull request from your forked repository to the main repository. Provide a clear description of your changes and any relevant information.

8. **Review and merge**: Your pull request will be reviewed by the project maintainers. Once approved, it will be merged into the main repository.

Thank you for contributing to the Elysian Fade Task BoardTM project!

## Testing

The Elysian Fade Task BoardTM project includes a comprehensive test suite to ensure the quality and reliability of the application. The tests are organized into different categories, including unit tests, integration tests, and end-to-end tests.

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

## Continuous Integration

The Elysian Fade Task BoardTM project uses continuous integration (CI) to automatically run tests and ensure the quality of the codebase. The CI pipeline is configured to run tests on every push and pull request.

### CI Configuration

The CI configuration is defined in the `.github/workflows/ci.yml` file. The configuration includes the following steps:

1. **Install dependencies**: Install the project dependencies using `npm install`.
2. **Run tests**: Run the test suite using `npm test`.
3. **Generate coverage report**: Generate the test coverage report using `npm run coverage`.

### CI Status

The CI status is displayed on the repository page. A green checkmark indicates that the tests have passed, while a red cross indicates that the tests have failed.

## Troubleshooting

If you encounter any issues while using the Elysian Fade Task BoardTM, please refer to the following troubleshooting steps:

1. **Check the logs**: Check the server logs for any error messages. The logs can provide valuable information about the cause of the issue.

2. **Verify environment variables**: Ensure that the environment variables are correctly set in the `.env` file.

3. **Check database connection**: Verify that the MongoDB database is running and accessible. Ensure that the `MONGODB_URI` environment variable is correctly set.

4. **Update dependencies**: Ensure that all project dependencies are up to date. Run `npm update` to update the dependencies.

5. **Clear cache**: Clear the application cache and restart the server.

6. **Consult the documentation**: Refer to the project documentation for detailed information about the application and its components.

If the issue persists, please open an issue on the GitHub repository with a detailed description of the problem.

## Maintenance

The Elysian Fade Task BoardTM project is actively maintained by the project maintainers. Regular updates and bug fixes are released to ensure the stability and security of the application.

### Maintenance Tasks

- **Update dependencies**: Regularly update project dependencies to ensure compatibility and security.
- **Fix bugs**: Address reported bugs and issues in a timely manner.
- **Add new features**: Continuously improve the application by adding new features and enhancements.
- **Review pull requests**: Review and merge pull requests from contributors.

### End-of-Life

In the event that the Elysian Fade Task BoardTM project reaches its end-of-life, the following steps will be taken:

1. **Announce end-of-life**: Announce the end-of-life date to the community and provide a timeline for the transition.
2. **Provide migration path**: Provide a migration path for users to transition to an alternative solution.
3. **Archive repository**: Archive the GitHub repository to preserve the project history.

## New Libraries to be Installed with npm

The following new libraries should be installed with npm:

1. **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
   ```sh
   npm install --save-dev jest
   ```

2. **Supertest**: A library for testing Node.js HTTP servers.
   ```sh
   npm install --save-dev supertest
   ```

3. **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
   ```sh
   npm install mongoose
   ```

4. **Bcryptjs**: A library to help you hash passwords.
   ```sh
   npm install bcryptjs
   ```

5. **Dotenv**: A module that loads environment variables from a `.env` file into `process.env`.
   ```sh
   npm install dotenv
   ```

6. **Express**: A minimal and flexible Node.js web application framework.
   ```sh
   npm install express
   ```

7. **EJS**: A templating engine that allows for embedding JavaScript code into HTML templates.
   ```sh
   npm install ejs
   ```

8. **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
   ```sh
   npm install --save-dev nodemon
   ```

Thank you for using the Elysian Fade Task BoardTM!
