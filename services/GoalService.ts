import { MongoClient } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';
import { connectToDatabase } from '../utils/database.ts';

class GoalService {
  static async createGoal(goalData) {
    const db = await connectToDatabase();
    const goalsCollection = db.collection('goals');
    const result = await goalsCollection.insertOne(goalData);
    return result;
  }

  static async getGoals() {
    const db = await connectToDatabase();
    const goalsCollection = db.collection('goals');
    const goals = await goalsCollection.find({}).toArray();
    return goals;
  }

  static async getGoalById(id: string) {
    const db = await connectToDatabase();
    const goalsCollection = db.collection('goals');
    // Find by string ID directly instead of using ObjectId
    const goal = await goalsCollection.findOne({ _id: id });
    return goal;
  }

  static async updateGoal(id: string, goalData: any) {
    const db = await connectToDatabase();
    const goalsCollection = db.collection('goals');
    // Update by string ID
    const result = await goalsCollection.updateOne({ _id: id }, { $set: goalData });
    return result;
  }

  static async deleteGoal(id: string) {
    const db = await connectToDatabase();
    const goalsCollection = db.collection('goals');
    // Delete by string ID
    const result = await goalsCollection.deleteOne({ _id: id });
    return result;
  }
}

export default GoalService;
