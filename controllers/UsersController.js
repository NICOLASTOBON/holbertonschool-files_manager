import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const userExist = await dbClient.users.findOne({ email });
    if (userExist) return res.status(400).send({ error: 'Already exist' });

    const pwdSha = sha1(password);
    const { ops } = await dbClient.users.insertOne({ email, password: pwdSha });

    return res.status(201).send({ id: ops[0]._id, email: ops[0].email });
  }
}

export default UsersController;
