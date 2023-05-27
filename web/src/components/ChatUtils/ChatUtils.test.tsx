import { render } from '@redwoodjs/testing/web'

import ChatUtils from './ChatUtils'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatUtils', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatUtils refresh={() => {}} userId={1} />)
    }).not.toThrow()
  })
})
