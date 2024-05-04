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

export class UserModel {
  static async getAll () {

    const [users] = await connection.query(
      'SELECT * FROM usersdb;'
    )

    return users
  }
  static async validatePassword( password,recivedPassword ) {

   
    return await bcrypt.compare(recivedPassword,password)
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT * FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create({ input }) {
    const { username, email, password, registeredAt, role } = input;
  

      await connection.query(
        `INSERT INTO usersdb (username, email, password, registeredAt, role)
          VALUES (?, ?, ?, ?, ?);`,
        [username, email, password, registeredAt, role]
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
    try {
        
        const connection = await pool.getConnection();
        
        
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        
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
   
  }

  static async update ({ id, input }) {
   
  }
}