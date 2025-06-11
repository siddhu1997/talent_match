import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee",
  },
  dpURL: { type: String },
  name: { type: String },
  doj: { type: Date },
  repositories: [
    {
      name: String,
      url: String,
    },
  ],
  github: {
    accessToken: String,
    refreshToken: String,
    username: String,
    connected: { type: Boolean, default: false },
  },

  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
