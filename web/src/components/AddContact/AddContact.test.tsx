import { render } from '@redwoodjs/testing/web'

import AddContact from './AddContact'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddContact', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddContact />)
    }).not.toThrow()
  })
})
