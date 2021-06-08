import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import Response from '../utils/network/response';

class AppController {
  static getStatus(req, res) {
    const dbIsAlive = dbClient.isAlive();
    const redisIsAlive = redisClient.isAlive();

    return dbIsAlive && redisIsAlive
      ? Response.success(res, 200, { redis: redisIsAlive, db: dbIsAlive })
      : Response.error(res, 500, { redis: redisIsAlive, db: dbIsAlive });
  }

  static async getStats(req, res) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    return Response.success(res, 200, { users: numUsers, files: numFiles });
  }
}

export default AppController;
