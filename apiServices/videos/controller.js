
import { validateVideo, validatePartialVideo } from './schema.js'
import { uploadFiles } from '../../services/cloudinary/index.js';
export class VideoController {
  constructor ({ videoModel }){
    this.videoModel = videoModel
  }
    getAll = async (req, res) =>  {
    const { genre } = req.query
    const users = await this.videoModel.getAll({ genre })
    res.json(users)
  }

    getById = async (req, res) =>  {
    const { id } = req.params
    const user = await this.videoModel.getById({ id })
    if (user) return res.json(user)
    res.status(404).json({ message: 'video not found' })
  }

    getByPrivates = async (req, res) =>  {
    
    const user = await this.videoModel.getByPrivates({  public_private: 'false' })
    if (user) return res.json(user)
    res.status(404).json({ message: 'video not found' })
  }
    getByPublics = async (req, res) =>  {
    
    const user = await this.videoModel.getByPrivates({  public_private: 'true' })
    if (user) return res.json(user)
    res.status(404).json({ message: 'video not found' })
  }
    create = async (req, res) =>  {

    const uploadedData = await uploadFiles(req.files)

    const result = validateVideo(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
     const cloudUrl= uploadedData.secure_url;
    const newUser = await this.videoModel.create({ input: result.data,cloudUrl})

    res.status(201).json(newUser)
  }

    delete = async (req, res) =>  {
    const { id } = req.params

    const result = await this.videoModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'video not found' })
    }

    return res.json({ message: 'video deleted' })
  }

    update = async (req, res) =>  {
    const result = validatePartialVideo(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedUser = await this.videoModel.update({ id, input: result.data })

    return res.json(updatedUser)
  }
}
