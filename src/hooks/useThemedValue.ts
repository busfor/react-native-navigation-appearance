import { Appearance } from '../types'

import useThemeAppearance from './useThemeAppearance'

/**
 * Get value for current appearance
 * @param values - Values for each appearance
 */
const useThemedValue = <T>(values: { [s in Appearance]: T }): T => {
  const appearance = useThemeAppearance()
  return values[appearance]
}

export default useThemedValue
