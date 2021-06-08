import sha1 from 'sha1';
import dbClient from '../utils/db';

const postNew = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send('Missing email');
  if (!password) return res.status(400).send('Missing password');

  const userExist = await dbClient.users.findOne({ email });
  if (userExist) return res.status(400).send('Already exist');

  const pwdSha = sha1(password);
  const { ops } = await dbClient.users.insertOne({ email, password: pwdSha });

  return res.status(201).send({ id: ops[0]._id, email: ops[0].email });
};

export default {
  postNew,
};
