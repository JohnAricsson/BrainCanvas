import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      // ONLY require password if there is no googleId or facebookId
      // (This is a "Conditional Required" field)
      return !this.googleId && !this.facebookId;
    },
  },
  googleId: { type: String },
  facebookId: { type: String },
});

export default mongoose.model("User", userSchema);
