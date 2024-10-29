# Technical Documentation

## API Documentation

### Authentication API

#### Register User
- **Endpoint**: `POST /register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "User"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User
- **Endpoint**: `POST /login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

### Task API

#### Create Task
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

#### Get Tasks
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

#### Get Task by ID
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

#### Update Task
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

#### Delete Task
- **Endpoint**: `DELETE /tasks/:id`
- **Description**: Deletes a task by its ID.
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Architecture Documentation

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

## Code Documentation

### AuthService

The `AuthService` class provides methods for user authentication and authorization.

#### Methods

- **authenticate(email, password)**: Authenticates a user with the provided email and password. Returns a JWT token if successful.
- **authorize(token)**: Authorizes a user with the provided JWT token. Returns the user object if successful.
- **checkPermissions(user, requiredRole)**: Checks if the user has the required role. Throws an error if the user does not have sufficient permissions.
- **storeSessionData(req, user)**: Stores user session data in the request object.
- **getSessionData(req)**: Retrieves user session data from the request object.
- **clearSessionData(req)**: Clears user session data from the request object.

### GoalService

The `GoalService` class provides methods for managing goals.

#### Methods

- **createGoal(goalData)**: Creates a new goal with the provided goal data. Returns the created goal.
- **getGoals()**: Retrieves all goals. Returns an array of goals.
- **getGoalById(id)**: Retrieves a goal by its ID. Returns the goal if found.
- **updateGoal(id, goalData)**: Updates a goal with the provided goal data. Returns the updated goal if found.
- **deleteGoal(id)**: Deletes a goal by its ID. Returns the deleted goal if found.

### NotificationService

The `NotificationService` class provides methods for sending notifications.

#### Methods

- **sendTaskReminder(taskId, userId)**: Sends a task reminder notification to the user for the specified task.
- **sendDeadlineNotification(taskId, userId)**: Sends a deadline notification to the user for the specified task.
- **notifyTeam(teamId, message)**: Sends a notification to the team with the specified message.

## Database Documentation

### Task Schema

The `Task` schema defines the structure of the task documents in the MongoDB database.

#### Fields

- **title**: The title of the task (String, required).
- **description**: The description of the task (String, required).
- **dueDate**: The due date of the task (Date, required).
- **priority**: The priority of the task (String, enum: ['Low', 'Medium', 'High'], required).
- **status**: The status of the task (String, enum: ['Pending', 'In Progress', 'Completed'], required).
- **category**: The category of the task (String, required).
- **isRecurring**: Indicates if the task is recurring (Boolean, default: false).
- **tags**: An array of tag IDs associated with the task (Array of ObjectId).
- **createdBy**: The user ID of the task creator (ObjectId, required).
- **assignees**: An array of user IDs assigned to the task (Array of ObjectId).

#### Example

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

### User Schema

The `User` schema defines the structure of the user documents in the MongoDB database.

#### Fields

- **name**: The name of the user (String, required).
- **email**: The email address of the user (String, required, unique).
- **password**: The hashed password of the user (String, required).
- **role**: The role of the user (String, enum: ['Admin', 'User'], required).
- **permissions**: An array of permissions assigned to the user (Array of String, default: []).
- **team**: The team ID associated with the user (ObjectId).

#### Example

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
