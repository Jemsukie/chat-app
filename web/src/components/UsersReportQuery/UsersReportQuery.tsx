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

  const data = resultSet.tablePivot()

  return <>{JSON.stringify(data)}</>
}
