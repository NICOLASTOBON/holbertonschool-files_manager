import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const dbIsAlive = dbClient.isAlive();
    const redisIsAlive = redisClient.isAlive();

    const statusCode = dbIsAlive && redisIsAlive ? 200 : 500;
    res.status(statusCode).send({ redis: redisIsAlive, db: dbIsAlive });
  }

  static async getStats(req, res) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    res.send({ users: numUsers, files: numFiles });
  }
}

export default AppController;
