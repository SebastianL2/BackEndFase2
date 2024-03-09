import { createApp } from "../app.js";
import { UserModel } from "../modelsDB/MongoDb/users.js";
import { VideoModel } from "../modelsDB/MongoDb/videos.js";

createApp ({userModel: UserModel, videosModel: VideoModel})
