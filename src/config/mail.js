const path = require('path')
module.exports = {
  /** configurar o auth */
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,

  /** templates path */
  templatesPath: path.resolve('./resources/mail')
}
