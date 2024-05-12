import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'usersdb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class UserModel {
  static async getAll () {

    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(_id) _id, username, email, password,registeredAt,role FROM usersdb;'
    )

    return users
  }
  
  static async validatePassword( password,recivedPassword ) {
    
   
    return await bcrypt.compare(recivedPassword,password)
  }

  static async getById ({ id }) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(_id) _id, username, email, password,registeredAt,role FROM usersdb WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (users.length === 0) return null

    return users[0]
  }

  static async create({ input }) {
    const { username, email, password, registeredAt, role } = input;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    
      const [uuidResult]= await connection.query('SELECT UUID() uuid;')
      const [{uuid}] = uuidResult
      
      await connection.query(
        `INSERT INTO usersdb ( _id, username, email, password, registeredAt, role)
          VALUES (UUID_TO_BIN(?),?, ?, ?, ?, ?);`,
        [uuid, username, email, hashedPassword, registeredAt, role]
      );
  
      
      const [usersdb] = await connection.query(
        `SELECT username, email, registeredAt, role
          FROM usersdb
          WHERE email = ?;`,
        [email]
      );
  
      return usersdb[0]; 
   
  }
  static async  getByEmail({ email }) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(_id) _id, username, email, password,registeredAt,role FROM usersdb WHERE email =(?);`,
      [email]
    )

    if (users.length === 0) return null

    return users[0]
}


  static async delete ({ id }) {
   
    const [users] = await connection.query(
      `DELETE  FROM usersdb WHERE _id = UUID_TO_BIN(?);`,
      [id]
    )

    if (users.length === 0) return null

    return users[0]
  }

  static async update ({ id, input }) {
    
    const columns = Object.keys(input)
    const values = Object.values(input)
    const setConsult = columns.map(key => `${key} = ?`).join(", ")
    
    const sqlQr = `UPDATE  usersdb SET ${setConsult} WHERE _id = UUID_TO_BIN(?);`
    const [result]= await connection.query(sqlQr,[...values, id])
    

    if (result.length === 0) return null;

    return result[0];
  }
}