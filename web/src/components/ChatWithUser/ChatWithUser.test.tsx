import { render } from '@redwoodjs/testing/web'

import ChatWithUser from './ChatWithUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatWithUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatWithUser />)
    }).not.toThrow()
  })
})
