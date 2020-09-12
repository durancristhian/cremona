import Link from 'next/link'
import React, { ReactNode } from 'react'
import A from '../ui/A'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 shadow">
        <div className="container mx-auto w-full">
          <div className="flex items-center justify-between">
            <Link href="/" passHref>
              <A href="#!">
                <img src="/logo.png" alt="Cremona" className="h-12" />
              </A>
            </Link>
            <div className="flex">{user ? <LoggedOut /> : <LoggedIn />}</div>
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
  )
}

export default Layout

function LoggedIn() {
  const { googleSignIn } = useAuth()

  return (
    <>
      <button
        onClick={() => {
          googleSignIn()
        }}
        className="text-blue-700 focus:outline-none focus:shadow-outline"
      >
        Google Login
      </button>
    </>
  )
}

function LoggedOut() {
  const { signout } = useAuth()

  return (
    <>
      <button
        onClick={() => {
          signout()
        }}
        className="text-blue-700 focus:outline-none focus:shadow-outline"
      >
        Sign out
      </button>
    </>
  )
}
