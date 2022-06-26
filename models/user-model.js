import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  screenName: String,
  teamId: String,
  teamName: String,
  slackId: String,
  profileImageUrl: String
  
},{ strict: false });

const User = mongoose.model("user", userSchema);

export default User;