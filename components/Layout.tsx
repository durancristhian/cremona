import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
import A from '../ui/A'
import { useAuth, useUser } from '../hooks/useAuth'
import ChevronRight from '../icons/ChevronRight'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { user } = useAuth()

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col min-h-screen">
        <header className="bg-white p-4 shadow">
          <div className="container mx-auto w-full">
            <div className="flex items-center justify-between">
              <Link href="/" passHref>
                <A href="#!">
                  <img src="/logo.png" alt="Cremona" className="h-12" />
                </A>
              </Link>
              <div className="flex">{user && <Menu />}</div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">
          <div className="container mx-auto w-full">{children}</div>
        </main>
        <footer className="p-4">
          <div className="container mx-auto w-full">
            <p className="text-center">
              <span>Created by </span>
              <Link href="/signin" passHref>
                <A
                  href="http://twitter.com/durancristhian"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @durancristhian
                </A>
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout

function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const { signout } = useAuth()
  const user = useUser()

  return (
    <div className="relative inline-block">
      <div>
        <span className="shadow-sm">
          <button
            type="button"
            className="flex items-center w-full border px-4 py-2 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            {user.displayName}
            <ChevronRight className="h-6 ml-4" />
          </button>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-1 w-56">
          <div className="bg-white border">
            <div
              className="px-4 py-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                onClick={() => {
                  signout()
                }}
                className="focus:outline-none focus:shadow-outline w-full text-left"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
