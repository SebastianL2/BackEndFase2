import { UserModel } from './model.js'
// import { UserModel } from '../models/database/User.js'
import { validateUser, validatePartialUser } from './schema.js'

export class UserController {
  static async getAll (req, res) {
    const { genre } = req.query
    const Users = await UserModel.getAll({ genre })
    res.json(Users)
  }

  static async getById (req, res) {
    const { id } = req.params
    const User = await UserModel.getById({ id })
    if (User) return res.json(User)
    res.status(404).json({ message: 'User not found' })
  }

  static async create (req, res) {
    const result = validateUser(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await UserModel.create({ input: result.data })

    res.status(201).json(newUser)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await UserModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ message: 'User deleted' })
  }

  static async update (req, res) {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedUser = await UserModel.update({ id, input: result.data })

    return res.json(updatedUser)
  }
}
