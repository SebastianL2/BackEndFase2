import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { server, mongoDb, logger } from '../../config/production.js';

const uri = `mongodb+srv://${mongoDb.username}:${mongoDb.password}@${mongoDb.cluster}/${mongoDb.dbname}?retryWrites=true&w=majority`;
       
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})




export default client;