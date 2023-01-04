import React, { HTMLAttributes } from 'react'
import NextLink from 'next/link'

import styles from './Link.module.css'

export type Props = HTMLAttributes<HTMLAnchorElement> & {
  native?: boolean
  href: string
}

export const Link = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, href, native }, ref) => {
    if (native) {
      return (
        <a href={href} className={styles.link} ref={ref}>
          {children}
        </a>
      )
    }
    return (
      <NextLink href={href} className={styles.link} ref={ref}>
        {children}
      </NextLink>
    )
  },
)
Link.displayName = 'Link'
