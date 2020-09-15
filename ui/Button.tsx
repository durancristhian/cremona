import React, { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className="border bg-blue-200 border-blue-500 flex items-center px-4 py-2 disabled:opacity-50 focus:outline-none focus:shadow-outline"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
