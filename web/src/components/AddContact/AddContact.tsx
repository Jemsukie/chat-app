import { useEffect, useMemo, useState } from 'react'

import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import GenericTable from 'src/lib/GenericTable'

const SEARCH_CONTACTS_QUERY = gql`
  query SearchContactsQuery($searchTerm: String!) {
    searchContacts(searchTerm: $searchTerm) {
      id
      name
      username
    }
  }
`

const AddContact = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [term, setTerm] = useState(searchTerm)

  const { data, loading } = useQuery(SEARCH_CONTACTS_QUERY, {
    onCompleted: () => {
      toast.success('User found!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    variables: { searchTerm },
  })

  useEffect(() => {
    if (term === '') {
      setSearchTerm('')
    }
  }, [term])

  const users = useMemo(
    () =>
      !data
        ? []
        : data.searchContacts.map((u) => {
            const regex = new RegExp(`(${searchTerm})`, 'gi')
            const parts = u.name.split(regex)
            const highlightedName = parts.map((part, index) =>
              part.toLowerCase() !== searchTerm.toLowerCase() ? (
                part
              ) : (
                <span key={index} className="bg-warning">
                  {part}
                </span>
              )
            )

            return {
              ...u,
              name: highlightedName,
              actions: <button className="btn-primary btn-sm btn">Add</button>,
            }
          }),
    [data, searchTerm]
  )
  const headers = ['name', 'actions']

  const onSearch = () => {
    setSearchTerm(term)
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        Search Contact
        <div className="form-control">
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
