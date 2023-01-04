import React from 'react'

import { Link } from '../Link'
import styles from './Navigation.module.css'

export type Props = {}

/**
 * Native link is needed when moving to another zone
 * https://nextjs.org/docs/api-reference/next.config.js/basepath#links
 */
export const Navigation: React.FC<Props> = () => {
  return (
    <nav className={styles.navigation}>
      <Link native href="/">
        Home
      </Link>
      <Link native href="/docs">
        Docs
      </Link>
      <Link native href="/store">
        Store
      </Link>
    </nav>
  )
}
Navigation.displayName = 'Navigation'
