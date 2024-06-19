import { MongoClient } from 'mongodb';

class DBClient {
  constructor () {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    this.client.connect((err) => {
      if (err) {
        console.error(`MongoDB connection error: ${err}`);
      } else {
        console.log('Connected to MongoDB');
      }
    });
  }

  isAlive () {
    return !!this.client && this.client.isConnected();
  }

  async nbUsers () {
    try {
      const db = this.client.db();
      const usersCollection = db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (err) {
      console.error('Error counting users:', err);
      return -1;
    }
  }

  async nbFiles () {
    try {
      const db = this.client.db();
      const filesCollection = db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (err) {
      console.error('Error counting files:', err);
      return -1;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
