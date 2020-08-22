import React, { AnchorHTMLAttributes, forwardRef, ReactNode, Ref } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

const A = forwardRef(
  ({ children, ...rest }: Props, ref: Ref<HTMLAnchorElement>) => {
    return (
      <a ref={ref} {...rest} className="text-blue-700">
        {children}
      </a>
    )
  },
)

A.displayName = 'A'

export default A
