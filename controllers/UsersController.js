import sha1 from 'sha1';
import dbClient from '../utils/db';
import Response from '../utils/network/response';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return Response.error(res, 400, 'Missing email');
    if (!password) return Response.error(res, 400, 'Missing password');

    const userExist = await dbClient.users.findOne({ email });
    if (userExist) return Response.error(res, 400, 'Already exist');

    const pwdSha = sha1(password);
    const { ops } = await dbClient.users.insertOne({ email, password: pwdSha });

    return Response.success(res, 201, { id: ops[0]._id, email: ops[0].email });
  }
}

export default UsersController;
