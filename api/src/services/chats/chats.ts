import { db } from 'src/lib/db'

// const CONTACTS_PER_PAGE = 15

const getRemarks = (chats) => {
  const ownerId = context.currentUser.id

  return chats.map((r) => {
    const { id, senderId, message, date } = r
    return {
      id,
      message,
      remark: senderId === ownerId ? 'Sent' : 'Received',
      date,
    }
  })
}

export const chatsByUser = async ({ userId }) => {
  const ownerId = context.currentUser.id

  const getChats = await db.chat.findMany({
    where: {
      OR: [
        { senderId: ownerId, receiverId: userId },
        { senderId: userId, receiverId: ownerId },
      ],
    },
    orderBy: {
      date: 'asc',
    },
  })

  return getRemarks(getChats)
}

export const createChat = async ({ input }) => {
  const { userId, message } = input

  return await db.chat.create({
    data: {
      senderId: context.currentUser.id,
      receiverId: userId,
      message,
    },
  })
}

export const chatInbox = async () => {
  const ownerId = context.currentUser.id

  const result = await db.chat.findMany({
    where: {
      OR: [{ senderId: ownerId }, { receiverId: ownerId }],
    },
    select: {
      id: true,
      senderId: true,
      receiverId: true,
      message: true,
      date: true,
      sender: {
        select: {
          name: true,
        },
      },
      receiver: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
    distinct: ['senderId', 'receiverId'],
  })

  const filterItem = result.filter((r) => {
    const findItem = result.find(
      (m) => m.senderId === r.receiverId && m.receiverId === r.senderId
    )

    return findItem ? new Date(r.date) > new Date(findItem.date) : true
  })

  return filterItem.map((r) => {
    const { id, senderId, receiverId, sender, receiver, message, date } = r
    return {
      id,
      userId: senderId === ownerId ? receiverId : senderId,
      name: senderId === ownerId ? receiver.name : sender.name,
      message,
      remark: senderId === ownerId ? 'Sent' : 'Received',
      date,
    }
  })
}
