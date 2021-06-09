import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import Token from '../token';

/* database clients */
import dbClient from '../db';
import redisClient from '../redis';

class User {
  static async validUser(authToken) {
    const token = Token.validToken(authToken);
    if (!token) throw new Error('Unauthorized');

    const credential = Token.getCredentials(token);
    const [email, password] = credential.split(':');

    const user = await dbClient.users.findOne({ email, password: sha1(password) });
    if (!user) throw new Error('Unauthorized');

    return user;
  }

  static async getUserByToken(token) {
    const userId = await redisClient.get(token);
    const user = await dbClient.users.findOne({ _id: ObjectId(userId) });
    if (!userId || !user) throw new Error('Unauthorized');

    return user;
  }
}

export default User;
