import React, { createContext, ReactNode, useState, useCallback, useEffect } from 'react'
import { Appearance as RNAppearance } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { EventEmitter } from 'events'

import { Appearance, DefaultOptions, AppearanceState } from './types'
import { isAutomaticDarkAppearanceAvailable, initialAppearance } from './utils'
import NativeModule from './NativeModule'
import storage from './storage'

const AppearanceStateEventEmitter = new EventEmitter()

const EVENT_TYPE = 'setAppearanceState'

const updateNativeAppearance = (state: AppearanceState) => {
  const manualMode =
    state.manualAppearance === Appearance.dark ? NativeModule.MODE_NIGHT_YES : NativeModule.MODE_NIGHT_NO
  const mode = state.useSystemAppearance ? NativeModule.MODE_NIGHT_FOLLOW_SYSTEM : manualMode
  NativeModule.setDefaultNightMode(mode)
}

export interface ThemeContextValue {
  state: AppearanceState
  setAppearanceState: (state: AppearanceState) => void
}

export let currentAppearanceState: AppearanceState = {
  useSystemAppearance: isAutomaticDarkAppearanceAvailable,
  manualAppearance: initialAppearance,
}

export const getCurrentAppearance = (): Appearance => {
  const { useSystemAppearance, manualAppearance } = currentAppearanceState
  if (!useSystemAppearance) {
    return manualAppearance
  }
  console.log(NativeModule.DEVICE_BRAND)
  return RNAppearance.getColorScheme() as Appearance
}

export const initAppearanceModule = async (defaultOptions: DefaultOptions, defaultState?: AppearanceState) => {
  try {
    const state = await storage.getState()
    const newState = state === null ? defaultState || currentAppearanceState : (JSON.parse(state) as AppearanceState)
    currentAppearanceState = newState
    updateNativeAppearance(newState)
    Navigation.setDefaultOptions(defaultOptions({ appearance: getCurrentAppearance() }))
  } catch {}
}

export const ThemeContext = createContext<ThemeContextValue>({
  state: currentAppearanceState,
  setAppearanceState: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppearanceState>(currentAppearanceState)

  const setAppearanceState = useCallback((newState: AppearanceState) => {
    currentAppearanceState = newState
    storage.setState(newState)
    updateNativeAppearance(newState)
    AppearanceStateEventEmitter.emit(EVENT_TYPE, newState)
  }, [])

  useEffect(() => {
    const listener = (newState: AppearanceState) => setState(newState)
    AppearanceStateEventEmitter.addListener(EVENT_TYPE, listener)
    return () => AppearanceStateEventEmitter.removeListener(EVENT_TYPE, listener)
  }, [])

  return <ThemeContext.Provider value={{ state, setAppearanceState }}>{children}</ThemeContext.Provider>
}
