class RedisClient {
  constructor () {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.error('Redis Client Error:', err));
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key: ${key}, ${err}`);
      return null;
    }
  }

  async set (key, value, duration) {
	  await this.client.setex(key, duration, value);
  }

  async del (key) {
    await this.client.del(key);
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
