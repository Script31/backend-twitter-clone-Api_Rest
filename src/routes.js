const express = require('express')

const routes = express.Router()

const userController = require('./controllers/UserController')
const SessionController = require('./controllers/SessionController')
const tweetController = require('./controllers/TweetController')
const LikeController = require('./controllers/LikeController')
const followersController = require('./controllers/followController')

const updateUser = require('./controllers/UpdateController')

const authMiddleware = require('./middlewares/auth')

routes.post('/users', userController.store)
routes.post('/login', SessionController.store)

/** rottas autenticas; middleware */

routes.use(authMiddleware)

/** Rotas de tweet */

/** users  update */
routes.put('/update', updateUser.update)

/** users profile me */
routes.get('/me', userController.me)

/** feeds */
routes.get('/feed', userController.feed)

routes.post('/tweets', tweetController.create)
routes.delete('/tweets/:id', tweetController.destroy)

/** likes controller */
routes.post('/likes/:id', LikeController.toggle)

/** followers */

routes.post('/follow/:id', followersController.create)
routes.delete('/unfollow/:id', followersController.destroy)

module.exports = routes
