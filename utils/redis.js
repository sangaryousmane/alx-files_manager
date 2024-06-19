import redis from 'redis';
import { promisify } from 'util';

/**
 * This class is use performing operations with Redis service
 */
class RedisClient {
  constructor () {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => console.error('Redis Client Error:', err.message));

    this.client.on('connect', () => console.log('Redis Client has been connected'));
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    const value = await this.getAsync(key);
    return value;
  }

  async set (key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del (key) {
    this.client.del(key);
  }
}
const redisClient = new RedisClient();
export default redisClient;
