import { UseCubeQueryResult } from '@cubejs-client/react'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  completed_deliveriesReportQuery: {
    resultSet: {
      tablePivot: () => [{ 'Chat.count': '4' }],
      tableColumns: () => [
        {
          key: 'Chat.count',
          title: 'Count',
          shortTitle: 'Count',
          type: 'string',
          dataIndex: 'Chat.count',
        },
      ],
    },
  } as unknown as UseCubeQueryResult<unknown>,
})
