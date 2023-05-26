import { db } from 'src/lib/db'

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

export const userPage = ({ page = 1 }) => {
  const offset = (page - 1) * USERS_PER_PAGE

  return {
    users: db.user.findMany({
      take: USERS_PER_PAGE,
      skip: offset,
    }),
    count: db.user.count(),
  }
}
