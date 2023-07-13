// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentStory } from '@storybook/react'

import {
  Loading,
  Empty,
  Failure,
  Success,
} from './UsersReportQuery'
import { standard } from './UsersReportQuery.mock'

export const loading = () => {
  return Loading ? <Loading /> : <></>
}

export const empty = () => {
  return Empty ? <Empty /> : <></>
}

export const failure: ComponentStory<typeof Failure> = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
}

export const success: ComponentStory<typeof Success> = (args) => {
  return Success ? (
    <Success {...standard().completed_deliveriesReportQuery} {...args} />
  ) : (
    <></>
  )
}

export default { title: 'Cells/CompletedDeliveriesReportQuery' }
