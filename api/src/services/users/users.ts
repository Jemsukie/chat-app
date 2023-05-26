import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const searchUsers = ({ searchTerm }) => {
  return db.user.findMany({
    where: {
      name: { contains: searchTerm },
    },
  })
}
