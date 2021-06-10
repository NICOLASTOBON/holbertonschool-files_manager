import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import ErrorHandler from '../utils/network/response';

class AppController {
  static getStatus(req, res) {
    const dbIsAlive = dbClient.isAlive();
    const redisIsAlive = redisClient.isAlive();

    return dbIsAlive && redisIsAlive
      ? res.status(200).send({ redis: redisIsAlive, db: dbIsAlive })
      : ErrorHandler.badRequest(res, { redis: redisIsAlive, db: dbIsAlive });
  }

  static async getStats(req, res) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    return res.status(200).send({ users: numUsers, files: numFiles });
  }
}

export default AppController;
