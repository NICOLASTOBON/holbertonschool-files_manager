/* utils functions */
import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';

/* databases clients */
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/* response http */
import Response from '../utils/network/response';

class AuthController {
  static async getConnect(req, res) {
    const credentials = req.header('Authorization');
    if (!credentials) return Response.error(res, 401, 'Unauthorized');

    const authoToken = credentials.slice(6);
    const [email, password] = Buffer
      .from(authoToken, 'base64')
      .toString()
      .split(':');

    const user = await dbClient.users.findOne({ email, password: sha1(password) });
    if (!user) return Response.error(res, 401, 'Unauthorized');

    const token = uuidv4();
    const expire = 24 * 60 * 60;
    await redisClient.set(`auth_${token}`, user._id.toString(), expire);
    return Response.success(res, 200, { token });
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-token');
    if (!token) return Response.error(res, 401, 'Unauthorized');

    const tokenKey = `auth_${token}`;
    const userId = await redisClient.get(tokenKey);
    if (!userId) return Response.error(res, 401, 'Unauthorized');

    await redisClient.del(tokenKey);
    return Response.success(res, 204, '');
  }
}

export default AuthController;
