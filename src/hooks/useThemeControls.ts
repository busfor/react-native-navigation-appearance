import { useCallback, useContext, useMemo } from 'react'

import { AppearanceMode, Appearance } from '../types'
import { ThemeContext } from '../Context'

const useThemeControls = () => {
  const { state, setAppearanceState } = useContext(ThemeContext)

  const setAppearanceMode = useCallback(
    (newVariant: AppearanceMode) => {
      switch (newVariant) {
        case 'system':
          setAppearanceState({ ...state, useSystemAppearance: true })
          break
        default:
          const manualAppearance = (newVariant as unknown) as Appearance
          setAppearanceState({ manualAppearance, useSystemAppearance: false })
          break
      }
    },
    [state, setAppearanceState]
  )

  const currentApearanceMode: AppearanceMode = useMemo(
    () => (state.useSystemAppearance ? AppearanceMode.system : ((state.manualAppearance as unknown) as AppearanceMode)),
    [state]
  )

  return { setAppearanceMode, currentApearanceMode }
}

export default useThemeControls
