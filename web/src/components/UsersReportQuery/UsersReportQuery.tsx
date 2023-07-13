import { UseCubeQueryResult } from '@cubejs-client/react'

import type { TCubesQuery } from 'src/lib/ReportQuery'

export const beforeQuery = (props) => {
  return props
}

export const QUERY = (): TCubesQuery => {
  /* Add ya query here */
  return {
    measures: ['Chat.count'],
  }
}

export const Loading = () => <>Loading...</>
export const Failure = ({ error }: { error: Error }) => (
  <>{error.message || 'Error'}</>
)

export const isEmpty = (args: UseCubeQueryResult<unknown>) => {
  return args.resultSet.tablePivot().length === 0
}

export const Empty = () => <>Empty</>

export const Success = (props: UseCubeQueryResult<unknown>) => {
  const { resultSet } = props

  // const colNames = {
  //   'Delivery.id': t('ReportPage.DeliveryId'),
  //   'Delivery.deliverystatus': 'Status',
  //   'Delivery.deliverydatetime': 'Date And Time',
  // }

  const data = resultSet.tablePivot()
  console.log('--this is data', JSON.stringify(data))
  // const columns = Object.keys(colNames).map((cn) => ({
  //   ...resultSet.tableColumns().find((rCol) => rCol.key === cn),
  //   shortTitle: colNames[cn],
  // }))

  return <>{JSON.stringify(data)}</>
}
