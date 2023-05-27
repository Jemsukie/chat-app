import { render } from '@redwoodjs/testing/web'

import ChatWithUserPage from './ChatWithUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ChatWithUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatWithUserPage userId={1} />)
    }).not.toThrow()
  })
})
