import * as dataServices from 'src/data-services/chats/chats'

export const chatsByUser = async ({ userId }) => {
  return await dataServices.chatsByUser({ userId })
}

export const createChat = async ({ input }) => {
  return await dataServices.createChat({ input })
}

export const updateChat = async ({ input }) => {
  return await dataServices.updateChat({ input })
}

export const deleteChat = async ({ id }) => {
  return await dataServices.deleteChat({ id })
}

export const chatInbox = async () => {
  return await dataServices.chatInbox()
}
