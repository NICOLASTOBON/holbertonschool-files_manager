import { v4 as uuidv4 } from 'uuid';
import { ErrorHandler, SuccessHandler } from '../utils/network/response';
import redisClient from '../utils/redis';
import User from '../utils/utilities/user';

class AuthController {
  static async getConnect(req, res) {
    const credentials = req.header('Authorization');
    if (!credentials) return ErrorHandler.unauthorized(res);

    const validUser = await User.validUser(credentials);
    if (validUser === null) return ErrorHandler.unauthorized(res);

    const token = uuidv4();
    await redisClient.set(`auth_${token}`, validUser._id.toString(), 60 * 60 * 24);
    return SuccessHandler.ok(res, { token });
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-Token');
    if (!token) return ErrorHandler.unauthorized(res);

    const key = `auth_${token}`;
    const user = await redisClient.get(key);
    if (!user) return ErrorHandler.unauthorized(res);
    await redisClient.del(key);
    return SuccessHandler.noContent();
  }
}

export default AuthController;
