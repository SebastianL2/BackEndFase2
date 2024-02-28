
import { validateUser, validatePartialUser } from './schema.js'
import  Jwt  from 'jsonwebtoken'
import config from './utils/config.js'
export class UserController {
    constructor ({ userModel }){
      this.userModel = userModel
    }
    getAll  = async (req, res) => {
    const { genre } = req.query
    const Users = await this.userModel.getAll({ genre })
    res.json(Users)
  }



    getById  = async (req, res) => {
    const { id } = req.params
    const User = await this.userModel.getById({ id })
    if (User) return res.json(User)
    res.status(404).json({ message: 'User not found' })
  }

    create  = async (req, res) => {
    const result = validateUser(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await this.userModel.create({ input: result.data })

    res.status(201).json(newUser)
  }

    signUp  = async (req, res) => {
    const result = validateUser(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await this.userModel.create({ input: result.data })
  
   const token =  Jwt.sign({id: newUser._id},config.SECRET, {
      expiresIn:86400
    })
    res.status(201).json({token})
  }

    signIn  = async (req, res) => {

    const { email,password } = req.body
    
    const User =await this.userModel.getByEmail( {email} )
    if (!User) return res.status(404).json({ message: 'User not found' })

   
    const passwordValidate =await this.userModel.validatePassword( User.password, password )
    if(!passwordValidate) return res.status(401).json({token:null,message:"invalid Password"})
  
    const token =  Jwt.sign({id: User._id},config.SECRET, {
      expiresIn:86400
    })
     res.json({token})
    
  }
    delete  = async (req, res) => {
    const { id } = req.params

    const result = await this.userModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ message: 'User deleted' })
  }

    update  = async (req, res) => {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedUser = await this.userModel.update({ id, input: result.data })

    return res.json(updatedUser)
  }
}
