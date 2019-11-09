const User = require('../models/User')

class UpdateUser {
  async update (req, res, next) {
    try {
      const id = req.userId

      const { name, username, password, confirmPassword } = req.body

      if (password && password !== confirmPassword) {
        return res.status(400).json({ error: 'password doesnt exists!' })
      }

      const user = await User.findByIdAndUpdate(
        id,
        { name, username },
        { new: true }
      )

      if (password) {
        user.password = password
        await user.save()
      }

      return res.json(user)
    } catch (err) {
      return next(err)
    }
  }
}
module.exports = new UpdateUser()
