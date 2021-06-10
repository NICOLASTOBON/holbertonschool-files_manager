import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import { ErrorHandler, SuccessHandler } from '../utils/network/response';

class AppController {
  static getStatus(req, res) {
    const dbIsAlive = dbClient.isAlive();
    const redisIsAlive = redisClient.isAlive();

    return dbIsAlive && redisIsAlive
      ? SuccessHandler.ok(res, { redis: redisIsAlive, db: dbIsAlive })
      : ErrorHandler.badRequest(res, { redis: redisIsAlive, db: dbIsAlive });
  }

  static async getStats(req, res) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    return SuccessHandler.ok(res, { users: numUsers, files: numFiles });
  }
}

export default AppController;
