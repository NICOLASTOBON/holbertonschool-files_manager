import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const getStatus = (req, res) => {
  const dbIsAlive = dbClient.isAlive();
  const redisIsAlive = redisClient.isAlive();

  const statusCode = dbIsAlive && redisIsAlive ? 200 : 500;

  res.status(statusCode).send({ redis: redisIsAlive, db: dbIsAlive });
};

const getStats = async (req, res) => {
  const numUsers = await dbClient.nbUsers();
  const numFiles = await dbClient.nbFiles();

  res.send({ users: numUsers, files: numFiles });
};

export default {
  getStatus,
  getStats,
};
