import { render } from '@redwoodjs/testing/web'

import ChatUtils from './ChatUtils'
import { standard } from './ChatUtils.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatUtils', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatUtils {...standard()} />)
    }).not.toThrow()
  })
})
