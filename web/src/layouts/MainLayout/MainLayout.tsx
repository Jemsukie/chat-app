import { navigate, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { logOut, isAuthenticated } = useAuth()

  const logOff = () => {
    if (confirm('Are you sure to logout?')) {
      logOut()
    }
  }

  return (
    <>
      <Toaster />
      <div className="drawer">
        {isAuthenticated && (
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        )}
        <div className="drawer-content h-full">
          {/* <!-- Page content here --> */}
          <Navbar />
          {children}
          {/* <!-- Page content here --> */}
        </div>

        {isAuthenticated && (
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay">
              {''}
            </label>

            <div className="menu w-80 bg-neutral-focus p-4 text-white">
              <ul>
                {/* <!-- Sidebar content here --> */}
                <li>
                  <button
                    onClick={() => {
                      navigate(routes.users())
                    }}
                  >
                    Contacts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate(routes.chats())
                    }}
                  >
                    Chats
                  </button>
                </li>
                <li>
                  <button onClick={logOff}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const MenuIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  )
}

const Navbar = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="navbar  bg-primary text-white">
      <div className="flex w-full">
        <div className="flex w-full justify-start">
          {isAuthenticated && (
            <div>
              <label className="btn-ghost btn-circle btn" htmlFor="my-drawer">
                <MenuIcon />
              </label>
            </div>
          )}
        </div>
        <div className="flex w-full justify-end">
          <button className="btn-ghost btn text-xl normal-case">
            Chat App
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
