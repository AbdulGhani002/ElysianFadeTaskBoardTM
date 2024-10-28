import { Bson } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';

interface ISubtask {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  parentTaskId: Bson.ObjectId;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}

class Subtask implements ISubtask {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  parentTaskId: Bson.ObjectId;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';

  constructor(
    title: string,
    status: 'pending' | 'in-progress' | 'completed',
    parentTaskId: Bson.ObjectId,
    description?: string,
    dueDate?: Date,
    priority?: 'low' | 'medium' | 'high'
  ) {
    this.title = title;
    this.status = status;
    this.parentTaskId = parentTaskId;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  static async createSubtask(subtaskData: ISubtask) {
    const subtask = new Subtask(
      subtaskData.title,
      subtaskData.status,
      subtaskData.parentTaskId,
      subtaskData.description,
      subtaskData.dueDate,
      subtaskData.priority
    );
    // Save subtask to database
    // await db.collection('subtasks').insertOne(subtask);
    return subtask;
  }

  static async updateSubtask(subtaskId: Bson.ObjectId, subtaskData: Partial<ISubtask>) {
    // Update subtask in database
    // await db.collection('subtasks').updateOne({ _id: subtaskId }, { $set: subtaskData });
    return subtaskData;
  }

  static async deleteSubtask(subtaskId: Bson.ObjectId) {
    // Delete subtask from database
    // await db.collection('subtasks').deleteOne({ _id: subtaskId });
    return subtaskId;
  }
}

export { ISubtask, Subtask };
export default Subtask;