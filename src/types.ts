import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Options } from 'react-native-navigation'

export enum Appearance {
  light = 'light',
  dark = 'dark',
}

export interface AppearanceState {
  useSystemAppearance: boolean
  manualAppearance: Appearance
}

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export interface StylesProps {
  appearance: Appearance
}

export type DefaultOptions = (props: StylesProps, options?: Options) => Options

export type StylesType<T> = (props: StylesProps) => T | NamedStyles<T>

export type ThemedOptions<T> = (props: StylesProps & T) => Options
