import { useCubeQuery } from '@cubejs-client/react'

export type TCubesQuery = {
  measures?: (keyof ICubesMeasures)[]
  dimensions?: (keyof ICubesDimensions)[]
  limit?: number
  offset?: number
  // TODO: order : can be a record or array
  // https://cube.dev/docs/query-format/#query-properties-alternative-order-format
} & Record<string, unknown>

export const ReportQuery = (
  props: {
    QUERY: (unknown) => TCubesQuery
  } & {
    Loading: React.ElementType
    Failure: React.ElementType
    Empty: React.ElementType
    Success: React.ElementType
    beforeQuery: (args: unknown) => Record<string, unknown> | void
    isEmpty?: (args: unknown) => boolean
  } & Record<string, unknown>
) => {
  const { QUERY, Loading, Empty, Failure, Success, beforeQuery, isEmpty } =
    props

  const beforeQueryResult = beforeQuery(props)
  const result = useCubeQuery(QUERY(beforeQueryResult))
  const { isLoading, resultSet, progress, error } = result

  if (isLoading) {
    return <Loading progress={progress}></Loading>
  }
  if (error) {
    return <Failure error={error}></Failure>
  }

  if (!resultSet) {
    return <Empty></Empty>
  }

  if (
    typeof isEmpty === 'function' &&
    isEmpty({ ...result, ...props, ...beforeQueryResult })
  ) {
    return <Empty></Empty>
  }

  return <Success {...result} {...props} {...beforeQueryResult}></Success>
}
