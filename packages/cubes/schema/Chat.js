/* eslint-disable no-undef */

cube(`Chat`, {
  sql: `SELECT * FROM public."Chat"`,

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
  },

  dataSource: `default`,
})
