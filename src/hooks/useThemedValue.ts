import { Appearance } from '../types'

import useAppearance from './useAppearance'

/**
 * Get value for current appearance
 * @param values - Values for each appearance
 */
const useThemedValue = <T>(values: { [s in Appearance]: T }): T => {
  const appearance = useAppearance()
  return values[appearance]
}

export default useThemedValue
