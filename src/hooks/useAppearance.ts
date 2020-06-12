import { useMemo, useContext } from 'react'

import { Appearance } from '../types'
import { ThemeContext } from '../Context'

import useDeviceAppearance from './useDeviceAppearance'

const useAppearance = (): Appearance => {
  const deviceAppearance = useDeviceAppearance()
  const {
    state: { useSystemAppearance, manualAppearance },
  } = useContext(ThemeContext)

  const appearance = useMemo(() => (useSystemAppearance ? deviceAppearance : manualAppearance), [
    useSystemAppearance,
    deviceAppearance,
    manualAppearance,
  ])

  return appearance
}

export default useAppearance
