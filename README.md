# Elysian Fade Task BoardTM

## Project Description

Elysian Fade Task BoardTM is a feature-rich task management system built using Deno as the runtime, MongoDB for data storage, EJS templates for the front end, and MVC architecture. The system is designed with best practices for security, modularity, and scalability.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ElysianFadeTaskBoardTM.git
   cd ElysianFadeTaskBoardTM
   ```

2. Install dependencies:
   ```sh
   deno run -A --unstable https://deno.land/x/install/install.ts
   deno install -qAf --unstable https://deno.land/x/denon/denon.ts
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
   deno task start
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

To debug errors in Deno, follow these steps:

1. **Use the `--inspect` flag**:
   Start your Deno application with the `--inspect` flag to enable debugging. This will start a debugging session and provide a URL to open in Chrome DevTools.
   ```sh
   deno run --inspect app.ts
   ```

2. **Use the `--inspect-brk` flag**:
   If you want to break on the first line of your code, use the `--inspect-brk` flag.
   ```sh
   deno run --inspect-brk app.ts
   ```

3. **Use the `console.log` statements**:
   Add `console.log` statements in your code to print variables and track the flow of execution.

4. **Use the Deno Debugger**:
   Deno has a built-in debugger that you can use to set breakpoints, step through code, and inspect variables. You can access the debugger by opening the provided URL in Chrome DevTools.

5. **Check the Deno documentation**:
   Refer to the [Deno documentation](https://deno.land/manual/tools/debugger) for more information on debugging tools and techniques.
