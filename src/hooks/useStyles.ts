import { useMemo } from 'react'

import { NamedStyles, Appearance } from '../types'

import useThemedValue from './useThemedValue'

/**
 * Updates styles when appearance or locale has been changed
 * @param createdStyles - Created styles from createStyles
 * @returns Created a StyleSheet style reference for current appearance
 */
const useStyles = <T extends NamedStyles<T>>(createdStyles: { [s in Appearance]: T }): T => {
  const themedStyles = useThemedValue(createdStyles)
  const styles = useMemo(() => themedStyles, [themedStyles])
  return styles
}

export default useStyles
