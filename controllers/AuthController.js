import { v4 as uuidv4 } from 'uuid';
import User from '../utils/users/user';
import redisClient from '../utils/redis';

/* response http */
import Response from '../utils/network/response';

class AuthController {
  static async getConnect(req, res) {
    try {
      const credentials = req.header('Authorization');
      const { _id } = await User.validUser(credentials);

      const token = uuidv4();
      const expire = 24 * 60 * 60;

      await redisClient.set(`auth_${token}`, _id.toString(), expire);
      return Response.success(res, 200, { token });
    } catch (err) {
      return Response.error(res, 401, err.message);
    }
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-Token');
    if (!token) return Response.error(res, 401, 'Unauthorized');

    try {
      const tokenKey = `auth_${token}`;

      await User.getUserByToken(tokenKey);
      await redisClient.del(tokenKey);

      return res.status(204).end();
    } catch (err) {
      return Response.error(res, 401, err.message);
    }
  }
}

export default AuthController;
