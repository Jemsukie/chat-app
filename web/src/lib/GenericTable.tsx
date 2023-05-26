const GenericTable = ({ headers, data }) => {
  return (
    <table className="table-zebra table-compact mt-2 table w-full">
      <thead>
        <tr>
          {headers.map((h, idx) => {
            return <th key={idx}>{h}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((u, idx) => {
          return (
            <tr key={idx}>
              {headers.map((h) => {
                return <td key={`${h}`}>{u[h]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GenericTable
