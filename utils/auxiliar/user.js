import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import dbClient from '../db';
import redisClient from '../redis';
import Token from './token';

class User {
  static async validUser(credentials) {
    const userInfo = Token.getValidInfo(credentials);
    if (!userInfo) return null;

    const [email, password] = userInfo.split(':');
    if (!email || !password) return null;

    const user = await dbClient.users.findOne({ email, password: sha1(password) });
    if (!user) return null;
    return user;
  }

  static async findUserByToken(token) {
    const userID = await redisClient.get(`auth_${token}`);
    if (userID === null) {
      return null;
    }
    const user = await dbClient.users.findOne({ _id: ObjectId(userID) });
    if (!user) return null;
    return user;
  }

  static async checkAuthorization(request) {
    const token = request.header('X-Token');
    const user = await this.findUserByToken(token);
    if (!user) return null;
    return user;
  }
}

export default User;
