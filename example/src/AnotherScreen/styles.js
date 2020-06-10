import { createStyles } from '@busfor/react-native-navigation-appearance'
import { theme } from '../theme'

export default createStyles(({ appearance }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme[appearance].backgroundColor,
  },

  text: {
    color: theme[appearance].textColor,
    paddingVertical: 8,
    textAlign: 'center',
  },

  button: {
    marginVertical: 16,
  },
}))
