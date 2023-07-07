import * as dataServices from 'src/data-services/users'

export const users = async () => {
  return await dataServices.users()
}

export const user = async ({ id }) => {
  return await dataServices.user({ id })
}

export const searchUsers = async ({ searchTerm }) => {
  return await dataServices.searchUsers({ searchTerm })
}

export const userPage = async ({ page = 1 }) => {
  return await dataServices.userPage({ page })
}

export const emailResetPasswordLink = async ({ username, resetLink }) => {
  const emailAddress = username

  return await dataServices.emailResetPasswordLink({ emailAddress, resetLink })
}
