import React, { HTMLAttributes } from 'react'

import styles from './Button.module.css'

export type Props = HTMLAttributes<HTMLButtonElement> & {}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children }, ref) => {
    return (
      <button className={styles.button} ref={ref}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
