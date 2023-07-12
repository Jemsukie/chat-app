import * as dataServices from 'src/data-services/contacts/contacts'

export const contacts = async () => {
  return await dataServices.contacts()
}

export const searchContacts = async ({ searchTerm }) => {
  return await dataServices.searchContacts({ searchTerm })
}

export const contactPage = async ({ page = 1 }) => {
  return await dataServices.contactPage({ page })
}

export const createContact = async ({ id }) => {
  return await dataServices.createContact({ id })
}

export const deleteContact = async ({ id }) => {
  return await dataServices.deleteContact({ id })
}

export const checkContact = async ({ id }) => {
  return await dataServices.checkContact({ id })
}
