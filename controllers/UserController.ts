import User from '../models/User.ts';
import { hash, compare } from 'https://deno.land/x/bcrypt/mod.ts';
import { create, verify } from 'https://deno.land/x/djwt/mod.ts';
import { Context } from 'https://deno.land/x/oak/mod.ts';

class UserController {
  static async register(context: Context) {
    try {
      const { name, email, password, role } = await context.request.body().value;
      const hashedPassword = await hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      context.response.status = 201;
      context.response.body = { message: 'User registered successfully' };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  static async login(context: Context) {
    try {
      const { email, password } = await context.request.body().value;
      const user = await User.findOne({ email });
      if (!user) {
        context.response.status = 404;
        context.response.body = { message: 'User not found' };
        return;
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        context.response.status = 400;
        context.response.body = { message: 'Invalid credentials' };
        return;
      }
      const token = await create({ alg: "HS256", typ: "JWT" }, { userId: user._id, role: user.role }, Deno.env.get('JWT_SECRET'));
      context.response.status = 200;
      context.response.body = { token };
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }

  static async updateProfile(context: Context) {
    try {
      const { userId } = context.params;
      const updates = await context.request.body().value;
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!user) {
        context.response.status = 404;
        context.response.body = { message: 'User not found' };
        return;
      }
      context.response.status = 200;
      context.response.body = user;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { error: error.message };
    }
  }
}

export default UserController;
