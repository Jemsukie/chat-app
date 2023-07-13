import { useEffect, useMemo, useState } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GenericTable from 'src/lib/GenericTable'
import { ReportQuery } from 'src/lib/ReportQuery'

import * as UsersReportQuery from '../UsersReportQuery/UsersReportQuery'

const SEARCH_CONTACTS_QUERY = gql`
  query SearchContactsQuery($searchTerm: String!) {
    searchContacts(searchTerm: $searchTerm) {
      id
      name
      username
    }
  }
`

const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContactMutation($id: Int!) {
    createContact(id: $id) {
      id
    }
  }
`

const AddContact = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [term, setTerm] = useState(searchTerm)

  // Query for searching a contact using a keyword
  const { data, loading } = useQuery(SEARCH_CONTACTS_QUERY, {
    onCompleted: ({ searchContacts }) => {
      if (searchContacts.length > 0) {
        toast.success('User found!')
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
    variables: { searchTerm },
  })

  // Mutation for adding a user as a contact
  const [createContact] = useMutation(CREATE_CONTACT_MUTATION, {
    onCompleted: async () => {
      toast.success(`Successfully Added!`)
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (term === '') {
      setSearchTerm('')
    }
  }, [term])

  const onSearch = () => {
    setSearchTerm(term)
  }

  const onAddContact = ({ id, name }) => {
    if (confirm(`Add ${name} to contacts?`)) {
      createContact({
        variables: { id: parseInt(id) },
      })
    }
  }

  // Let's highlight the searched string
  const highlightString = (str) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = str.split(regex)
    return parts.map((part, index) =>
      part.toLowerCase() !== searchTerm.toLowerCase() ? (
        part
      ) : (
        <span key={index} className="bg-warning">
          {part}
        </span>
      )
    )
  }

  // Let's create custom headers here
  const headers = ['name', 'actions']
  const users = useMemo(
    () =>
      !data
        ? []
        : data.searchContacts.map((u) => {
            return {
              ...u,
              name: highlightString(u.name),
              actions: (
                <button
                  className="btn-primary btn-sm btn"
                  onClick={() => {
                    const { name, id } = u
                    onAddContact({ name, id })
                  }}
                >
                  Add
                </button>
              ),
            }
          }),
    [data, searchTerm]
  )

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-1/2 flex-col items-center rounded-lg bg-primary-content p-5">
        Search Contact Numbers: <ReportQuery {...UsersReportQuery} />
        <div className="form-control rounded-lg bg-info p-5">
          <label className="input-group">
            {/* <Form onSubmit={onSubmit}> */}
            <input
              type="text"
              className="input-bordered input"
              name="searchTerm"
              onChange={(e) => {
                setTerm(e.target.value)
              }}
            />
            <button
              className="btn-primary btn"
              onClick={onSearch}
              disabled={loading}
            >
              Search
            </button>
            {/* </Form> */}
          </label>
        </div>
        {loading && 'Loading...'}
        {users.length > 0 ? (
          <GenericTable data={users} headers={headers} />
        ) : (
          <>Empty</>
        )}
      </div>
    </div>
  )
}

export default AddContact
