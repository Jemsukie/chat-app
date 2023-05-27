import { db } from 'src/lib/db'

const CONTACTS_PER_PAGE = 15

export const contacts = () => {
  return db.contact.findMany({
    where: {
      ownerId: context.currentUser.id,
    },
    select: {
      user: true,
    },
  })
}

export const searchContacts = async ({ searchTerm }) => {
  if (searchTerm === '') return []

  return await db.user.findMany({
    where: {
      id: { not: context.currentUser.id },
      name: { contains: searchTerm, mode: 'insensitive' },
      contactUser: {
        none: {
          ownerId: context.currentUser.id,
        },
      },
    },
  })
}

export const contactPage = async ({ page = 1 }) => {
  const offset = (page - 1) * CONTACTS_PER_PAGE

  const contacts = await db.contact.findMany({
    take: CONTACTS_PER_PAGE,
    skip: offset,
    where: {
      ownerId: context.currentUser.id,
    },
    include: {
      user: true,
    },
  })

  return {
    contacts,
    count: contacts.length,
  }
}

export const createContact = async ({ id }) => {
  return await db.contact.create({
    data: {
      ownerId: context.currentUser.id,
      userId: id,
    },
  })
}

export const deleteContact = async ({ id }) => {
  return await db.contact.delete({
    where: {
      id,
    },
  })
}

export const checkContact = async ({ id }) => {
  const ownerId = context.currentUser.id
  const result = await db.contact.findFirst({
    where: {
      ownerId,
      userId: id,
    },
  })

  return result ? true : false
}
