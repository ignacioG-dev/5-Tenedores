import React from 'react'
import { View } from 'react-native'
import {Text, Icon} from "react-native-elements"
import { styles } from './NotFoundRestaurant.styles'

export function NotFoundRestaurant() {
  return (
    <View style={styles.content} >
      <Icon 
        type='material-community'
        name='book-plus-multiple-outline'
        size={80}
      />

      <Text style={styles.text} >
        Agrega restaurantes a tu lista de favoritos
      </Text>
    </View>
  )
}