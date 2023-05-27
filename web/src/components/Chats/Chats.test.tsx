import { render } from '@redwoodjs/testing/web'

import Chats from './Chats'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Chats', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Chats userId={1} />)
    }).not.toThrow()
  })
})
