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
  doj: { type: Date },
  skills: [
    {
      name: String,
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  resume: {
    url: String,
    filename: String,
  },
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
  empID: { type: String, required: true },
  fullName: { type: String, required: true },
  mailID: { type: String, required: true },
  company: { type: String, default: "Infosys" },
  jobLevel: { type: String, required: true },
  role_category: {
    type: String,
    enum: [
      "Developer",
      "Support",
      "Admin",
      "Architect",
      "Tester",
      "Domain Consultant",
      "Business Analyst",
      "Data Analyst",
      "Manager",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
