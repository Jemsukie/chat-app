/* eslint-disable no-undef */

cube(`User`, {
  sql: `SELECT * FROM public."User"`,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [id],
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true,
    },
    name: {
      sql: `name`,
      type: `string`,
    },
  },

  dataSource: `default`,
})
