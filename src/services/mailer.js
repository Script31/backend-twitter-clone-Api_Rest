const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const { host, port, user, pass, templatePath } = require('../config/mail')

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
})

module.exports = ({ tamplate, context, ...options }) => {
  let hbsTemplates
  if (template) {
    const file = fs.readFileSync(
      path.join(templatePath, `${template}.hbs`),
      'utf8'
    )
    hbsTemplates = hbs.compile(file)(context)
  }
  const mailHtml = hbsTemplate || options.html
  return transport.sendMail({
    ...options,
    html: mailHtml
  })
}
