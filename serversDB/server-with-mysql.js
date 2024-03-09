import { createApp } from "../app.js";
import { UserModel } from "../modelsDB/mysql/users.js";
import { VideoModel } from "../modelsDB/MongoDb/videos.js";

createApp ({userModel: UserModel})
