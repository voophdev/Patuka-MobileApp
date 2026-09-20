import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ModalLayout = ({ children }) => {
  return (
    <View style={styles.feedConsumption}>
      {children}
    </View>
  )
}

export default ModalLayout

const styles = StyleSheet.create({
  feedConsumption: {
    width: "100%",
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "transparent",
  },
});