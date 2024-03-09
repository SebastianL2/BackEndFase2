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
  static async getAll ({ genre }) {
    console.log('getAll')

    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      return []
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    return movies
  }
  static async validatePassword( password,recivedPassword ) {

   
    return await bcrypt.compare(recivedPassword,password)
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
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
  
      // Obtener el usuario recién creado
      const [usersdb] = await connection.query(
        `SELECT username, email, registeredAt, role
          FROM usersdb
          WHERE email = ?;`,
        [email]
      );
  
      return usersdb[0]; // Retorna el primer usuario (debería ser el recién creado)
   
  }
  static async  getByEmail({ email }) {
    try {
        // Conectar a la base de datos
        const connection = await pool.getConnection();
        
        // Consulta SQL para buscar el usuario por su correo electrónico
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        // Liberar la conexión
        connection.release();
        
        if (rows.length === 0) {
            return null; // Devuelve null si no se encontró ningún usuario con ese correo electrónico
        }
        
        return rows[0]; // Devuelve el primer usuario encontrado
    } catch (error) {
        console.error("Error al buscar usuario por email:", error);
        return null; // Devuelve null en caso de error
    }
}





  static async delete ({ id }) {
   
  }

  static async update ({ id, input }) {
   
  }
}