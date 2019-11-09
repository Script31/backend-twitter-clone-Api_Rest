const User = require('../models/User')

class SessionController {
  async store (req, res, next) {
    try {
      const { username, password } = req.body

      const user = await User.findOne({ username })

      if (!user) {
        return res.status(400).json({ error: 'user not found!' })
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'invalid password!!' })
      }

      return res.json({
        user,
        token: user.generateToken()
      })
    } catch (err) {
      return next(err)
    }
  }
}
module.exports = new SessionController()
