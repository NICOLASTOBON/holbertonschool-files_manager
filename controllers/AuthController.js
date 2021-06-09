/* utils functions */
import { v4 as uuid4 } from 'uuid';
import sha1 from 'sha1';

/* databases clients */
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/* response http */
import Response from '../utils/network/response';

class AuthController {
  static async getConnect(req, res) {
    const credentials = req.headers.authorization.slice(6);
    const [email, password] = Buffer
      .from(credentials, 'base64')
      .toString()
      .split(':');

    const userExist = await dbClient.users.findOne({ email, password: sha1(password) });
    if (!userExist) return Response.error(res, 401, 'Unauthorized');

    const token = uuid4();
    const expire = 24 * 60 * 60;
    await redisClient.set(`auth_${token}`, userExist._id.toString(), expire);
    return Response.success(res, 200, { token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    const key = `auth_${token}`;

    const userTokenExist = await redisClient.get(key);
    if (!userTokenExist) return Response.error(res, 401, 'Unauthorized');

    await redisClient.del(key);
    return Response.success(res, 204, '');
  }
}

export default AuthController;
