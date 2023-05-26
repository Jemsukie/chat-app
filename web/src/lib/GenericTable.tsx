const GenericTable = ({ headers, data }) => {
  return (
    <table className="table-zebra table-compact mt-2 table w-full">
      <thead>
        <tr>
          {headers.map((h) => {
            return <th key={h}>{h}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((u) => {
          return (
            <tr key={u}>
              {headers.map((h) => {
                return <td key={h}>{u[h]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GenericTable
