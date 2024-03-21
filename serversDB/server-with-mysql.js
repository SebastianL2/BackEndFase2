import { createApp } from "../app.js";
import { UserModel } from "../modelsDB/mysql/users.js";

createApp ({userModel: UserModel})
