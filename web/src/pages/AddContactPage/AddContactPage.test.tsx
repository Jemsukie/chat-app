import { render } from '@redwoodjs/testing/web'

import AddContactPage from './AddContactPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddContactPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddContactPage />)
    }).not.toThrow()
  })
})
