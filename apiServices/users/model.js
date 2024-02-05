import client from '../../database/mongoDb/data.js'
import { server, mongoDb, logger } from '../../config/production.js';
import bcrypt from 'bcryptjs'
async function connect () {
  try {
    await client.connect()
    const database = client.db(mongoDb.dbname)
    return database.collection('users')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}


export class UserModel {
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

  static async create ({ input }) {
    console.log("input:", input)
    const db = await connect()
    
    const { insertedId } = await db.insertOne(input)
    
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