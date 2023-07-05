import type { ComponentStory } from '@storybook/react'

import { Loading, Empty, Failure, Success } from './ChatManyCell'

export const loading = () => {
  return Loading ? <Loading /> : <></>
}

export const empty = () => {
  return Empty ? <Empty /> : <></>
}

export const failure: ComponentStory<typeof Failure> = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : <></>
}

export const success: ComponentStory<typeof Success> = () => {
  return Success ? <Success /> : <></>
}

export default { title: 'Cells/ChatManyCell' }
