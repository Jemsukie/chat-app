import { render } from '@redwoodjs/testing/web'

import BlastPage from './BlastPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BlastPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlastPage />)
    }).not.toThrow()
  })
})
