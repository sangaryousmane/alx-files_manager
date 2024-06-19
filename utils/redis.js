/* Make a redis client */

const redis = require("redis")

class RedisClient {

	constructor() {
		this.client = redis.createClient();
		this.client.on('error', (err) => console.error('Redis Client Error:', err));
	}

	isAlive() {
		return this.client.connected;
	}

	async get(key) {
		try {
			const value = await this.client.get(key);
			return value;
		} catch ( err ) {
			console.error(`Error getting key: ${key}, ${err}`)
			return null;_
		}
	}

	async set(key, value, duration) {
		try {
			await this.client.set(key, value, "EX", duration);
		} catch ( err ) {
			console.error(`Error setting key: ${key}, ${error}`)
		}
	}

	async del (key) {
		try {
			await this.client.del(key);
		} catch ( err ) {
			console.error(`Error deleting key ${key}, ${err}`)
		}
	}
}
const redisClient = new RedisClient()
module.exports = redisClient;
