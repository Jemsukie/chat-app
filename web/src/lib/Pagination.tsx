import { navigate, routes } from '@redwoodjs/router'

import GenericTable from './GenericTable'

const Pagination = ({ headers, data, link, count }) => {
  const ITEMS_PER_PAGE = 15
  const items = []

  for (let i = 0; i < Math.ceil(count / ITEMS_PER_PAGE); i++) {
    items.push(
      <li key={i}>
        <button
          className="btn-ghost btn-sm btn"
          onClick={() => {
            navigate(routes[link]({ page: i + 1 }), { replace: true })
          }}
        >
          {i + 1}
        </button>
      </li>
    )
  }

  if (data.length === 0) {
    return <>Empty</>
  }

  return (
    <div className="w-full">
      <GenericTable headers={headers} data={data} />
      <div>
        <h2>Pagination</h2>
        <ul
          style={{
            display: 'inline-flex',
          }}
        >
          {items}
        </ul>
      </div>
    </div>
  )
}

export default Pagination
