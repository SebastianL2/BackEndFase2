import { UserModel } from './model.js'
import { validateVideo, validatePartialVideo } from './schema.js'
import { uploadFiles } from '../../services/cloudinary/index.js';
export class VideoController {
  static async getAll (req, res) {
    const { genre } = req.query
    const users = await UserModel.getAll({ genre })
    res.json(users)
  }

  static async getById (req, res) {
    const { id } = req.params
    const user = await UserModel.getById({ id })
    if (user) return res.json(user)
    res.status(404).json({ message: 'user not found' })
  }

  static async getByPrivates (req, res) {
    const { id } = req.params
    const user = await UserModel.getByPrivates({  public_private: 'false' })
    if (user) return res.json(user)
    res.status(404).json({ message: 'user not found' })
  }
  static async getByPublics (req, res) {
    
    const user = await UserModel.getByPrivates({  public_private: 'true' })
    if (user) return res.json(user)
    res.status(404).json({ message: 'user not found' })
  }
  static async create (req, res) {
    console.log(req.body)
    console.log(req.files)
    const uploadedData = await uploadFiles(req.files);
    console.log("se ha subido el video:",uploadedData)
    const result = validateVideo(req.body)

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
    const result = validatePartialVideo(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedUser = await UserModel.update({ id, input: result.data })

    return res.json(updatedUser)
  }
}
