import redisClient from './redis';
import dbClient from './db';

const userUtils = {
  
  async getUserIdAndKey(request) {
    const obj = { userId: null, key: null };

    const token = request.header('X-Token');

    if (!token) return obj;

    obj.key = `auth_${token}`;

    obj.userId = await redisClient.get(obj.key);

    return obj;
  },

  async getUser(query) {
    const user = await dbClient.usersCollection.findOne(query);
    return user;
  },
};

export default userUtils;
