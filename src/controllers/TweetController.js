const Tweet = require('../models/tweet')

class TweetController {
  async create (req, res, next) {
    console.log(req.userId)
    try {
      const tweet = await Tweet.create({ ...req.body, user: req.userId })

      return res.json(tweet)
    } catch (err) {
      return next(err)
    }
  }

  async destroy (req, res, next) {
    try {
      await Tweet.findByIdAndRemove(req.params.id)

      return res.send()
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = new TweetController()
