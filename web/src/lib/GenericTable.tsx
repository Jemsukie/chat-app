const GenericTable = ({ headers, data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            {headers.map((h, idx) => {
              return (
                <th className="capitalize" key={idx}>
                  {h}
                </th>
              )
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
    </div>
  )
}

export default GenericTable
