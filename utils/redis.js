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

  /**
   * Check if the Redis server is connected or active
   * @return {boolean} true if alive, false if not
   */
  isAlive () {
    return this.client.connected;
  }

  /**
   * Get the value given the key
   * @key {string} the key to search for
   * @return {string} the value based on the key
   */
  async get (key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * Set a new key and value record in Redis
   * @key {string} a key to set
   * @value {string} the value to add
   */
  async set (key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Delete a key from redis db
   * @key {string} the key to delete
   */
  async del (key) {
    this.client.del(key);
  }
}
const redisClient = new RedisClient();
export default redisClient;
