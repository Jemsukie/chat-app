import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

const USERS_PER_PAGE = 15

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const searchUsers = async ({ searchTerm }) => {
  if (searchTerm === '') return []

  return await db.user.findMany({
    where: {
      name: { contains: searchTerm },
    },
  })
}

export const userPage = ({ page }) => {
  const offset = (page - 1) * USERS_PER_PAGE

  return {
    users: db.user.findMany({
      take: USERS_PER_PAGE,
      skip: offset,
    }),
    count: db.user.count(),
  }
}

export const emailResetPasswordLink = async ({ emailAddress, resetLink }) => {
  await sendPasswordResetLinkEmail({ emailAddress, resetLink })
}

const sendPasswordResetLinkEmail = ({ emailAddress, resetLink }) => {
  const subject = 'Chat App Password Reset Link'
  const text =
    'This is a manually triggered test email.\n\n' +
    `Your password reset link is: ${resetLink}`
  const html =
    'This is a manually triggered test email.<br><br>' +
    `Your password reset link is: ${resetLink}`

  return sendEmail({ to: emailAddress, subject, text, html })
}
