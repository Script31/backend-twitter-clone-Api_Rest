const sendMail = require('../services/mailer')
const User = require('../models/User')
const Tweet = require('../models/tweet')

class UserController {
  async me (req, res, next) {
    try {
      const user = await User.findById(req.userId)
      const tweetCount = await Tweet.find({ user: user.id }).count()

      return res.json({
        user,
        tweetCount,
        followersCount: user.followers.length,
        followingCount: user.following.length
      })
    } catch (err) {
      return next(err)
    }
  }

  async feed (req, res, next) {
    try {
      const user = await User.findById(req.userId)
      const { following } = user

      const tweets = await Tweet.find({
        user: { $in: [user.id, ...following] }
      })
        .limit(30)
        .sort('-createdAt')

      return res.json(tweets)
    } catch (err) {
      return next(err)
    }
  }

  async store (req, res, next) {
    try {
      const { email, username } = req.body

      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ error: 'user already exist' })
      }
      const user = await User.create(req.body)

      await sendMail({
        from: 'scripttrindade@gmail.com',
        to: user.email,
        subject: `Bem-vindo ao ElvesTweet ${user.name}`,
        tamplate: 'auth/register',
        context: {
          name: user.name,
          username: user.username
        }
      })

      return res.json({
        user,
        token: user.generateToken()
      })
    } catch (err) {
      return next(err)
    }
  }
}
module.exports = new UserController()
