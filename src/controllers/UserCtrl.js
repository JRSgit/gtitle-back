import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserCtrl {
  async store(req, res) {
    try {
      const user = await UserModel.create({
        name: 'Ronaldo',
        email: 'jrs@hotmail.com',
        password: '123456',
      })
      return res.json(user)

    } catch (error) {
      return res.send("Error")
    }
  }

  async indexOne(req, res) {
    const { email } = req.query
    console.log(email)
    try {
      const user = await UserModel.find({ email })
      return res.json(user)

    } catch (error) {
      return res.send(error.message)
    }
  }

  async session(req, res) {
    const data = req.body
    const { email, password } = data
    try {
      const user = await UserModel.findOne({ email })
      console.log(user)
      if (!user) {
        return res.status(400).json({ error: "User is not found" })
      }
      const isPassword = await bcrypt.compare(password, user.password)
      if (!isPassword) {
        return res.status(400).json({ error: 'Password is invalid' })
      }
      const id = user.id
      const token = jwt.sign({ id }, 'hajhdjfadkfjdshlkfha$hdfjhdsj%shfjsdf',
        {
          expiresIn: '7d'
        })

      return res.json({ user, token })

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}


export default new UserCtrl()