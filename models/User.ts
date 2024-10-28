import { ObjectId } from 'https://deno.land/x/mongo@v0.29.0/mod.ts';

interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  team?: ObjectId;
}

class User implements IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  team?: ObjectId;

  constructor(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'user',
    team?: ObjectId
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.team = team;
  }

  static async createUser(userData: IUser) {
    const user = new User(
      userData.name,
      userData.email,
      userData.password,
      userData.role,
      userData.team
    );
    // Save user to database
    // await db.collection('users').insertOne(user);
    return user;
  }

  static async updateUser(userId: ObjectId, userData: Partial<IUser>) {
    // Update user in database
    // await db.collection('users').updateOne({ _id: userId }, { $set: userData });
    return userData;
  }

  static async deleteUser(userId: ObjectId) {
    // Delete user from database
    // await db.collection('users').deleteOne({ _id: userId });
    return userId;
  }

  static async findByIdAndUpdate(userId: ObjectId, userData: Partial<IUser>) {
    // Find user in database and update
    // await db.collection('users').updateOne({ _id: userId }, { $set: userData });
    return userData;
  }
}

export { IUser, User };
export default User;