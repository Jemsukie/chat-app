import * as nodemailer from 'nodemailer'

type TOptionsProps = {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export const sendEmail = async ({ to, subject, text, html }: TOptionsProps) => {
  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.BREVO_KEY,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Your Name" <your@email.com>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}
