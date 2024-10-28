import { Bson } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';

interface ITask {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category?: string;
  isRecurring?: boolean;
  tags?: Bson.ObjectId[];
  createdBy: Bson.ObjectId;
  assignees?: Bson.ObjectId[];
  subtasks?: Bson.ObjectId[];
}

class Task implements ITask {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category?: string;
  isRecurring?: boolean;
  tags?: Bson.ObjectId[];
  createdBy: Bson.ObjectId;
  assignees?: Bson.ObjectId[];
  subtasks?: Bson.ObjectId[];

  constructor(
    title: string,    status: 'pending' | 'in-progress' | 'completed',
    createdBy: Bson.ObjectId,
    description?: string,
    dueDate?: Date,
    priority?: 'low' | 'medium' | 'high',
    category?: string,
    isRecurring?: boolean,
    tags?: Bson.ObjectId[],
    assignees?: Bson.ObjectId[],
    subtasks?: Bson.ObjectId[]
  ) {  this.title = title;
    this.status = status;
    this.createdBy = createdBy;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.isRecurring = isRecurring;
    this.tags = tags;
    this.assignees = assignees;
    this.subtasks = subtasks;
  }

  static async createTask(taskData: ITask) {
    const task = new Task(
      taskData.title,
      taskData.status,
      taskData.createdBy,
      taskData.description,     taskData.dueDate,
      taskData.priority,
      taskData.category,
      taskData.isRecurring,
      taskData.tags,
      taskData.assignees,
      taskData.subtasks
    );
    // Save task to database
    // await db.collection('tasks').insertOne(task);
    return task;
  }

  static async updateTask(taskId: Bson.ObjectId, taskData: Partial<ITask>) {
    // Update task in database
    // await db.collection('tasks').updateOne({ _id: taskId }, { $set: taskData });
    return taskData;
  }

  static async deleteTask(taskId: Bson.ObjectId) {
    // Delete task from database
    // await db.collection('tasks').deleteOne({ _id: taskId });
    return taskId;
  }
}

export { ITask, Task };
export default Task;