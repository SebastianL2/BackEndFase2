import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { server, mongoDb, logger } from '../../config/production.js';
import { serverTest, mongoDbtest } from '../../config/testPu.js';

const mongitoDb = process.env.NODE_ENV === 'test' ? mongoDbtest : mongoDb;


const uri = `mongodb+srv://${mongitoDb.username}:${mongitoDb.password}@${mongitoDb.cluster}/${mongitoDb.dbname}?retryWrites=true&w=majority`;
       
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})




export default client;