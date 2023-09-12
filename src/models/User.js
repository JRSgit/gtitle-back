import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

},
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 9)
  this.password = hash
})


const UserModel = mongoose.model("User", UserSchema)

export default UserModel