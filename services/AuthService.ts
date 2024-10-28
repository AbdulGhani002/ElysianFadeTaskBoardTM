import User from '../models/User.ts';
import { compare, hash } from 'https://deno.land/x/bcrypt/mod.ts';
import { create, verify } from 'https://deno.land/x/djwt/mod.ts';

class AuthService {
  static async authenticate(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      const token = await create({ alg: "HS256", typ: "JWT" }, { userId: user._id, role: user.role }, Deno.env.get('JWT_SECRET'));
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async authorize(token) {
    try {
      const decoded = await verify(token, Deno.env.get('JWT_SECRET'), "HS256");
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }

  static async checkPermissions(user, requiredRole) {
    if (user.role !== requiredRole) {
      throw new Error('Insufficient permissions');
    }
    return true;
  }
}

export default AuthService;
