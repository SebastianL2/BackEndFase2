
import { server, mongoDb, logger } from '../../config/production.js';
import { serverTest, mongoDbtest } from '../../config/testPu.js';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'


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

async function connect () {
  try {
    await client.connect()
    const database = client.db(mongitoDb.dbname)
    return database.collection('video')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}


export class VideoModel {
  static async getAll ({ genre }) {
    const db = await connect()

    if (genre) {
      return db.find({
        genre: {
          $elemMatch: {
            $regex: genre,
            $options: 'i'
          }
        }
      }).toArray()
    }

    return db.find({}).toArray()
  }

  static async getById ({ id }) {
     
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }
 
  
  static async getByPrivates ({ public_private }) {
     
    const db = await connect()
    return db.find({ isPublic: public_private }).toArray();
  }

  static async create ({ input,cloudUrl }) {
    const db = await connect()

    
    const inputWithHashedPassword = {
      ...input,
      url: cloudUrl
    };
    
    const { insertedId } = await db.insertOne(inputWithHashedPassword)
    
    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}