import { Theme } from '../src/themes'

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
