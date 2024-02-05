import { UserModel } from '../apiServices/users/model.js'
import config from '../apiServices/users/utils/config.js';
import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
  
    const decoded = jwt.verify(token, config.SECRET);
   
    const id= decoded.id;

 
    const user = await UserModel.getById({id});
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
 
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

