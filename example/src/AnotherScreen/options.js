import { createOptions } from '@busfor/react-native-navigation-appearance'
import { defaultOptions } from '../defaultOptions'

export default createOptions((props) =>
  defaultOptions(props, {
    topBar: {
      title: {
        text: props.appearance,
      },
    },
  })
)
