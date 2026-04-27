import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    job: String,
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;