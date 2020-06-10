import { useCallback, useContext } from 'react'

import { Appearance } from '../types'
import { ThemeContext } from '../Context'

/**
 * Get value for current appearance
 * @param values - Values for each appearance
 */
const useThemeControls = () => {
  const { state, setAppearanceState } = useContext(ThemeContext)

  const setManualAppearance = useCallback(
    (manualAppearance: Appearance) => setAppearanceState({ ...state, manualAppearance }),
    [state, setAppearanceState]
  )

  const setUseSystemAppearance = useCallback(
    (useSystemAppearance: boolean) => setAppearanceState({ ...state, useSystemAppearance }),
    [state, setAppearanceState]
  )

  return { setManualAppearance, setUseSystemAppearance }
}

export default useThemeControls
