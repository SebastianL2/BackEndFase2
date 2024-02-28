import { createApp } from "../app.js";
import { UserModel } from "../modelsDB/MongoDb/users.js";

createApp ({userModel: UserModel})
