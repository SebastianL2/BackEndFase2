import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'usersdb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class VideoModel {
  static async getAll () {

    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, username, email, password,registeredAt,role FROM videosdb;'
    )

    return users
  }
  static async validatePassword( password,recivedPassword ) {

   
    return await bcrypt.compare(recivedPassword,password)
  }

  static async getById ({ id }) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, username, email, password,registeredAt,role FROM videosdb WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (users.length === 0) return null

    return users[0]
  }

  static async create({ input }) {
    const { username, email, password, registeredAt, role } = input;
  
      const [uuidResult]= await connection.query('SELECT UUID() uuid;')
      const [{uuid}] = uuidResult
     
      await connection.query(
        `INSERT INTO videosdb (ID, username, email, password, registeredAt, role)
          VALUES (UUID_TO_BIN(?),?, ?, ?, ?, ?);`,
        [uuid, username, email, password, registeredAt, role]
      );
  
      
      const [videosdb] = await connection.query(
        `SELECT username, email, registeredAt, role
          FROM videosdb
          WHERE email = ?;`,
        [email]
      );
  
      return videosdb[0]; 
   
  }
  static async  getByEmail({ email }) {
    try {
        const [rows] = await connection.query('SELECT * FROM videosdb WHERE email = ?', [email]);
        
        
        connection.release();
        
        if (rows.length === 0) {
            return null; 
        }
        
        return rows[0]; 
    } catch (error) {
        console.error("Error al buscar usuario por email:", error);
        return null; 
    }
}


  static async delete ({ id }) {
   
    const [users] = await connection.query(
      `DELETE  FROM videosdb WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (users.length === 0) return null

    return users[0]
  }

  static async update ({ id, input }) {
    
    const columns = Object.keys(input)
    const values = Object.values(input)
    const setConsult = columns.map(key => `${key} = ?`).join(", ")
    
    const sqlQr = `UPDATE  videosdb SET ${setConsult} WHERE id = UUID_TO_BIN(?);`
    const [result]= await connection.query(sqlQr,[...values, id])
    

    if (result.length === 0) return null;

    return result[0];
  }
}