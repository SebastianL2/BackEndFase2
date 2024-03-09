import { UserModel } from './model.js'
import { validateVideo, validatePartialVideo } from './schema.js'
import { uploadFiles } from '../../services/cloudinary/index.js';
export class VideoController {
  constructor ({})
    getAll = async (req, res) =>  {
    const { genre } = req.query
    const users = await UserModel.getAll({ genre })
    res.json(users)
  }

    getById = async (req, res) =>  {
    const { id } = req.params
    const user = await UserModel.getById({ id })
    if (user) return res.json(user)
    res.status(404).json({ message: 'user not found' })
  }

    getByPrivates = async (req, res) =>  {
    const { id } = req.params
    const user = await UserModel.getByPrivates({  public_private: 'false' })
    if (user) return res.json(user)
    res.status(404).json({ message: 'user not found' })
  }
    getByPublics = async (req, res) =>  {
    
    const user = await UserModel.getByPrivates({  public_private: 'true' })
    if (user) return res.json(user)
    res.status(404).json({ message: 'user not found' })
  }
    create = async (req, res) =>  {

    const uploadedData = await uploadFiles(req.files)

    const result = validateVideo(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
     const cloudUrl= uploadedData.secure_url;
    const newUser = await UserModel.create({ input: result.data,cloudUrl})

    res.status(201).json(newUser)
  }

    delete = async (req, res) =>  {
    const { id } = req.params

    const result = await UserModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ message: 'User deleted' })
  }

    update = async (req, res) =>  {
    const result = validatePartialVideo(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedUser = await UserModel.update({ id, input: result.data })

    return res.json(updatedUser)
  }
}
