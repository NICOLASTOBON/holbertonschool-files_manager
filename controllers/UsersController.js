import sha1 from 'sha1';
import { ObjectId } from 'mongodb';

/* Databases */
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/* Response Handler HTTP */
import ErrorHandler from '../utils/network/error';
import SuccessHandler from '../utils/network/success';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return ErrorHandler.badRequest(res, 'Missing email');
    if (!password) return ErrorHandler.badRequest(res, 'Missing password');

    const userExist = await dbClient.users.findOne({ email });
    if (userExist) return ErrorHandler.badRequest(res, 'Already exist');

    const pwdSha = sha1(password);
    const { ops } = await dbClient.users.insertOne({ email, password: pwdSha });

    return SuccessHandler.created(res, { id: ops[0]._id, email: ops[0].email });
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    const userID = await redisClient.get(`auth_${token}`);
    if (!userID) return ErrorHandler.unauthorized(res);
    const user = await dbClient.users.findOne({ _id: ObjectId(userID) });
    if (!user) return ErrorHandler.unauthorized(res);
    return SuccessHandler.ok(res, { id: user._id, email: user.email });
  }
}

export default UsersController;
