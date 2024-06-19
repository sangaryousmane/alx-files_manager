import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import Queue from 'bull';
import dbClient from '../utils/db';
import userDetail from '../utils/userDetail';
const userQueue = new Queue('userQueue');

class UsersController {
  static async postNew (request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).send({ error: 'Missing email' });

    if (!password) { return response.status(400).send({ error: 'Missing password' }); }

    const emailExists = await dbClient.usersCollection.findOne({ email });

    if (emailExists) { return response.status(400).send({ error: 'Already exist' }); }

    const sha1Password = sha1(password);

    let result;
    try {
      result = await dbClient.usersCollection.insertOne({
        email,
        password: sha1Password
      });
    } catch (err) {
      await userQueue.add({});
      return response.status(500).send({ error: 'Error creating user.' });
    }

    const user = {
      id: result.insertedId,
      email
    };

    await userQueue.add({
      userId: result.insertedId.toString()
    });

    return response.status(201).send(user);
  }

  static async getMe (req, res) {
    const { ID } = await userDetail.getUserIdAndKey(req);

    const user = await userDetail.getUser({
      _id: ObjectId(ID)
    });

    if (!user) return res.status(401).send({ error: 'Unauthorized' });
    const userData = { id: user._id, ...user };
    delete userData._id;
    delete userData.password;

    return res.status(200).send(userData);
  }
}

export default new UsersController();
