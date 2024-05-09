import { createApp } from "../app.js";
import { UserModel } from "../modelsDB/mysql/users.js";
import { VideoModel } from "../modelsDB/mysql/videos.js";
createApp ({userModel: UserModel, videoModel: VideoModel})
