import classnames from 'classnames'
import React, { ReactNode } from 'react'

const styles = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: '',
  h5: '',
  h6: '',
}

const alignment = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

type Props = {
  children: ReactNode
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  align?: 'left' | 'center' | 'right'
}

const Heading = ({ type: Tag = 'h1', children, align = 'center' }: Props) => {
  return (
    <Tag className={classnames(['font-bold', styles[Tag], alignment[align]])}>
      {children}
    </Tag>
  )
}

export default Heading
